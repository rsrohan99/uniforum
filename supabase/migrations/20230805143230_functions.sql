drop function if exists insert_post;
CREATE OR REPLACE FUNCTION insert_post(
    p_content TEXT,
    p_title TEXT,
    p_subtitle TEXT,
    p_post_type TEXT,
    p_content_embedding VECTOR(1536),
    p_course text,
    p_department text,
    p_uni text,
    p_user_id uuid,
    p_metadata jsonb
)
RETURNS VOID AS
$$
DECLARE
    v_post_id UUID;
BEGIN
    -- Check if all arguments are provided
    IF (
        p_content IS NULL OR
        p_title IS NULL OR
        p_subtitle IS NULL OR
        p_post_type IS NULL OR
        p_content_embedding IS NULL OR
        p_course IS NULL OR
        p_department IS NULL OR
        p_uni IS NULL OR
        p_user_id IS NULL
    ) THEN
        RAISE EXCEPTION 'All information must be provided to post.';
    END IF;

    -- Insert a new row into prompts table
    begin
      INSERT INTO posts (title, subtitle, user_id, embedding, content, post_type, university, department, course, metadata)
      VALUES (p_title, p_subtitle, p_user_id, p_content_embedding, p_content, p_post_type, p_uni, p_department, p_course, p_metadata)
      RETURNING id INTO v_post_id;
    exception
      when unique_violation then
      RAISE EXCEPTION 'Conversation already exists in DB.';
     end;

    EXCEPTION
        WHEN others THEN
            RAISE EXCEPTION 'Error inserting prompt: %', SQLERRM;
END;
$$
LANGUAGE plpgsql;

drop function if exists search;
create or replace function search (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  similarity float
)
language sql stable
as $$
  select
    posts.id,
    1 - (posts.embedding <=> query_embedding) as similarity
  from posts
  where 1 - (posts.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

drop trigger if exists on_update_vote on udvotes;
drop function if exists update_vote;
-- Create the 'update_vote' trigger function
CREATE OR REPLACE FUNCTION update_vote() RETURNS TRIGGER AS $$
BEGIN
    -- Update votes_count when a new row is inserted or an existing row is updated in udvotes
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE posts
        SET votes_count = (SELECT SUM(vote_value) FROM udvotes WHERE post_id = NEW.post_id)
        WHERE id = NEW.post_id;
    -- Update votes_count when a row is deleted from udvotes
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts
        SET votes_count = (SELECT SUM(vote_value) FROM udvotes WHERE post_id = OLD.post_id)
        WHERE id = OLD.post_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create the 'update_vote' trigger
CREATE TRIGGER on_update_vote
AFTER INSERT OR UPDATE OR DELETE ON udvotes
FOR EACH ROW
EXECUTE FUNCTION update_vote();

drop trigger if exists tr_notify_announcement on posts;
CREATE OR REPLACE FUNCTION notify_announcement()
RETURNS TRIGGER AS
$$
BEGIN
    IF NEW.post_type = 'Announcement' THEN
        INSERT INTO notifications(user_id, content, link)
        SELECT e.user_id,
               'New announcement in ' || UPPER(REPLACE(NEW.course, '_all_~', '')),
               NEW.id
        FROM enrollments e
        WHERE e.course = NEW.course;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql security definer;

CREATE TRIGGER tr_notify_announcement
AFTER INSERT ON posts
FOR EACH ROW
EXECUTE FUNCTION notify_announcement();

drop trigger if exists tr_notify_comment on comments;
CREATE OR REPLACE FUNCTION notify_comment()
RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO notifications(user_id, content, link)
    SELECT p.user_id,
           '@' || (SELECT username FROM uni_users WHERE user_id = NEW.user_id) || ' commented on your post',
           NEW.post_id
    FROM posts p
    WHERE p.id = NEW.post_id;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql security definer;

CREATE TRIGGER tr_notify_comment
AFTER INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION notify_comment();

CREATE OR REPLACE FUNCTION vote_on_poll(p_poll_id UUID, p_vote_option TEXT, p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    new_metadata JSONB;
    option_exists BOOLEAN;
BEGIN
    -- Check if user has already voted
    IF EXISTS (SELECT 1 FROM user_polls WHERE user_id = p_user_id AND poll_id = p_poll_id) THEN
        RAISE EXCEPTION 'User has already voted';
    END IF;

    -- Check if the option exists in the poll
    SELECT EXISTS(
        SELECT 1
        FROM posts
        WHERE id = p_poll_id AND metadata->'currentPolls' @> jsonb_build_array(jsonb_build_object('option', p_vote_option))
    ) INTO option_exists;

    IF NOT option_exists THEN
        RAISE EXCEPTION 'Option does not exist';
    END IF;

    -- Construct the new metadata with updated vote count
    SELECT jsonb_build_object(
      'isOpen', (SELECT metadata->'isOpen' from posts where id=p_poll_id),
      'currentPolls', jsonb_agg(
        CASE
            WHEN elem->>'option' = p_vote_option THEN jsonb_build_object('option', p_vote_option, 'count', (elem->>'count')::INTEGER + 1)
            ELSE elem
        END
    ))
    INTO new_metadata
    FROM posts, jsonb_array_elements(posts.metadata->'currentPolls') AS elem
    WHERE id = p_poll_id;

    -- Update the poll's metadata with the new_metadata
    UPDATE posts
    SET metadata = new_metadata
    WHERE id = p_poll_id;

    -- Insert the user's vote into user_votes table
    INSERT INTO user_polls (user_id, post_id, poll_option) VALUES (p_user_id, p_poll_id, p_vote_option);
END;
$$ LANGUAGE plpgsql security definer;

DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.uni_users (user_id, username, profile_pic, full_name, email, iss)
  values (new.id, new.id, new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'iss');
  insert into public.enrollments (user_id, course)
  values (new.id, 'buet_all_~');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
