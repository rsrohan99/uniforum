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
    p_user_id uuid
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
      INSERT INTO posts (title, subtitle, user_id, embedding, content, post_type, university, department, course)
      VALUES (p_title, p_subtitle, p_user_id, p_content_embedding, p_content, p_post_type, p_uni, p_department, p_course)
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
