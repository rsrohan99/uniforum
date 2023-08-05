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
