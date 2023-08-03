delete from courses;
delete from departments;
delete from university;
-- Insert the university (buet)
INSERT INTO university (id, name) VALUES ('buet', 'Bangladesh University of Engineering and Technology');

-- Insert the departments (cse and me)
INSERT INTO departments (id, name, university) VALUES
  ('cse', 'Computer Science and Engineering', 'buet'),
  ('me', 'Mechanical Engineering', 'buet');

-- Insert courses in the departments
INSERT INTO courses (id, name, department) VALUES
  ('cse101', 'Introduction to Programming', 'cse'),
  ('cse201', 'Data Structures and Algorithms', 'cse'),
  ('cse301', 'Database Management Systems', 'cse'),
  ('me101', 'Engineering Mechanics', 'me'),
  ('me201', 'Thermodynamics', 'me');

insert into post_types (name) values
  ('discussion'),
  ('announcement'),
  ('q&a'),
  ('poll');


-- Seed posts
-- Seed posts for user with id "cf7fe057-be01-402b-9076-55b5e230934e"
-- Post 1
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('First Post', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/cse', 'This is my first post in the Computer Science department.', 'discussion');

-- Post 2
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Course Update', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/cse/cse301', 'There will be a change in the course schedule for CSE301.', 'announcement');

-- Post 3
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Internship Opportunity', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/me', 'There is an exciting internship opportunity for Mechanical Engineering students.', 'announcement');

-- Post 4
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Research Paper Publication', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/cse', 'Our research paper on machine learning has been accepted for publication.', 'announcement');

-- Post 5
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Course Registration', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/cse/cse201', 'The course registration for CSE201 will start next week.', 'announcement');

-- Post 6
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Alumni Meetup', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet', 'Calling all alumni for a meetup on the university campus next month.', 'discussion');

-- Post 7
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Important Announcement', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet/me', 'All students are requested to attend the departmental meeting tomorrow.', 'announcement');

-- Post 8
INSERT INTO posts (title, user_id, hierarchy, content, post_type)
VALUES ('Career Fair', 'cf7fe057-be01-402b-9076-55b5e230934e', 'buet', 'Don\''t miss the annual career fair happening next week in the university premises.', 'announcement');

