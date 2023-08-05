CREATE EXTENSION IF NOT EXISTS "vector";


drop table if exists messages;
drop table if exists conversations;
drop table if exists comments;
drop table if exists shares;
drop table if exists udvotes;
drop table if exists bookmarks;
drop table if exists post_hierarchy;
drop table if exists enrollments;
drop table if exists posts;
drop table if exists post_types;
drop table if exists courses;
drop table if exists uni_users;
drop table if exists departments;
drop table if exists university;
create table university
(
  id text primary key,
  name text
);
alter table university enable row level security;
create policy "everyone can see universities" on university
  for select using (true);

create table departments
(
  id text primary key,
  name text,
  university text references university (id) on delete cascade
);
alter table departments enable row level security;
create policy "everyone can see departments" on departments
  for select using (true);

create table courses
(
  id text primary key,
  name text,
  department text references departments (id) on delete cascade
);
alter table courses enable row level security;
create policy "everyone can see courses" on courses
  for select using (true);

CREATE TABLE uni_users
(
    user_id     uuid primary key references auth.users (id) on delete cascade,
    username    text unique,
    bio         TEXT,
    profile_pic text,
    full_name text,
    email text,
    iss text,
    metadata jsonb,
    is_first_time BOOLEAN default true,
    is_verified BOOLEAN default false
--     constraint prompt_users_pkey primary key (user_id)
);
alter table uni_users enable row level security;
create policy "everyone can see user info" on uni_users
  for select using (true);
create policy "users can only insert their data" on uni_users
  for insert with check (auth.uid() = user_id);
create policy "users can update their info" on uni_users
  for update using(auth.uid() = user_id);

create table enrollments
(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES uni_users (user_id) on delete cascade,
  course text REFERENCES courses (id) on delete cascade on update cascade,
  CONSTRAINT uniq_user_course UNIQUE (user_id, course)
);
alter table enrollments enable row level security;
create policy "user can only see their enrollments" on enrollments
  for select using(auth.uid() = user_id);
create policy "users can only insert their enrollments" on enrollments
  for insert with check (auth.uid() = user_id);
create policy "users can update their enrollments" on enrollments
  for update using(auth.uid() = user_id);
create policy "users can delete their enrollments" on enrollments
  for delete using(auth.uid() = user_id);

create table post_types
(
  name text primary key
);
alter table post_types enable row level security;
create policy "everyone can see post_types" on post_types
  for select using (true);

create table posts
(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text,
  user_id uuid REFERENCES uni_users (user_id) on delete cascade,
--   hierarchy text,
  embedding vector(1536),
  content text,
  date_posted           TIMESTAMPTZ default now(),
  post_type text REFERENCES post_types (name) on delete cascade on update cascade
);
alter table posts enable row level security;
create policy "everyone can see posts" on posts
  for select using (true);

-- drop table if exists post_hierarchy;
create table post_hierarchy
(
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts (id) on delete cascade,
  course text REFERENCES courses (id) on delete cascade on update cascade,
  department text REFERENCES departments (id) on delete cascade on update cascade,
  university text REFERENCES university (id) on delete cascade on update cascade,
  CONSTRAINT uniq_post_hierarchy UNIQUE (post_id, course, university)
);
alter table post_hierarchy enable row level security;
create policy "user can only see their post_hierarchy" on post_hierarchy
  for select using(auth.uid() = (select user_id from posts where posts.id = post_id));
create policy "users can only insert their post_hierarchy" on post_hierarchy
  for insert with check (auth.uid() = (select user_id from posts where posts.id = post_id));
create policy "users can update their post_hierarchy" on post_hierarchy
  for update using(auth.uid() = (select user_id from posts where posts.id = post_id));


-- Prompts table
-- CREATE TABLE prompts
-- (
--     prompt_id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     url                   TEXT unique,
--     score                 real     default 0,
--     description           TEXT,
--     tasks                 TEXT,
--     title                 TEXT,
--     user_id               uuid REFERENCES prompt_users (user_id) on delete cascade,
--     content               TEXT NOT NULL,
--     date_posted           TIMESTAMPTZ default now(),
--     model_used            VARCHAR(255) REFERENCES models (name) on delete cascade on update cascade,
--     description_embedding vector(1536),
--     convo_embedding       vector(1536)
-- );
-- alter table prompts enable row level security;
--
-- create policy "everyone can see all conversations" on prompts
--   for select using (true);
-- create policy "users can only insert new conversations" on prompts
--   for insert with check (auth.uid() = user_id);
-- create policy "users can update their conversations" on prompts
--   for update using(auth.uid() = user_id);
-- create policy "users can delete their conversations" on prompts
--   for delete using(auth.uid() = user_id);


-- Bookmarks table
-- CREATE TABLE bookmarks
-- (
--     bookmark_id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id         uuid REFERENCES prompt_users (user_id) on delete cascade,
--     prompt_id       uuid REFERENCES prompts (prompt_id) on delete cascade,
--     date_bookmarked TIMESTAMPTZ NOT NULL default now(),
--     unique (user_id, prompt_id)
-- );
-- alter table bookmarks enable row level security;
--
-- create policy "Only logged in user can see bookmark" on bookmarks
--   for select using (auth.uid() = user_id);
-- create policy "only users can bookmark" on bookmarks
--   for insert with check (auth.uid() = user_id);
-- create policy "only users can remove bookmark" on bookmarks
--   for delete using(auth.uid() = user_id);
--
-- -- Likes table
-- CREATE TABLE likes
-- (
--     like_id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id         uuid REFERENCES prompt_users (user_id) on delete cascade,
--     prompt_id       uuid REFERENCES prompts (prompt_id) on delete cascade,
--     date_liked TIMESTAMPTZ NOT NULL default now(),
--     unique (user_id, prompt_id)
-- );
-- alter table likes enable row level security;
--
-- create policy "Only logged in user can see likes" on likes
--   for select using (auth.uid() = user_id);
-- create policy "only users can like" on likes
--   for insert with check (auth.uid() = user_id);
-- create policy "only users can unlike" on likes
--   for delete using(auth.uid() = user_id);
--
-- -- Re-shares table
-- CREATE TABLE shares
-- (
--     share_id    uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id     uuid REFERENCES prompt_users (user_id) on delete cascade,
--     prompt_id   uuid REFERENCES prompts (prompt_id) on delete cascade,
--     date_shared TIMESTAMPTZ NOT NULL default now()
-- );
-- alter table shares enable row level security;
--
--
-- -- Comments table
-- CREATE TABLE comments
-- (
--     comment_id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     user_id           uuid REFERENCES prompt_users (user_id) on delete cascade,
--     prompt_id         uuid REFERENCES prompts (prompt_id) on delete cascade,
--     parent_comment_id uuid REFERENCES comments (comment_id) on delete cascade,
--     comment_content   TEXT        NOT NULL,
--     date_commented    TIMESTAMPTZ NOT NULL default now(),
--     is_edited         BOOLEAN,
--     best_answer       BOOLEAN default false
-- );
-- alter table comments enable row level security;
--
-- create table conversations
-- (
--     conversation_id   uuid primary key DEFAULT uuid_generate_v4(),
--     user1_id          uuid references prompt_users (user_id),
--     user2_id          uuid references prompt_users (user_id),
--     last_message_date timestamptz not null default now()
-- );
-- alter table conversations enable row level security;
--
-- -- Messages table
-- CREATE TABLE messages
-- (
--     message_id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--     sender_id      uuid REFERENCES prompt_users (user_id),
--     receiver_id    uuid REFERENCES prompt_users (user_id),
--     MessageContent TEXT        NOT NULL,
--     date_sent      TIMESTAMPTZ NOT NULL default now()
-- );
-- alter table messages enable row level security;
