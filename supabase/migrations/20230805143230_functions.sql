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


DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.uni_users (user_id, username, profile_pic, full_name, email, iss)
  values (new.id, new.id, new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'iss');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();