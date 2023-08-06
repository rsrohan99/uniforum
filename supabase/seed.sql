delete from courses;
delete from departments;
delete from university;
delete from posts;
delete from post_types;
-- Insert the university (buet)
INSERT INTO university (id, name) VALUES ('buet', 'Bangladesh University of Engineering and Technology');

-- Insert the departments (cse and me)
INSERT INTO departments (id, name, university) VALUES
  ('buet_all_~', 'All BUET departments', 'buet'),
  ('cse', 'Computer Science and Engineering', 'buet'),
  ('me', 'Mechanical Engineering', 'buet');

-- Insert courses in the departments
INSERT INTO courses (id, name, department) VALUES
  ('cse_all_~', 'All CSE courses', 'cse'),
  ('buet_all_~', 'All BUET courses', 'buet_all_~'),
  ('cse101', 'Introduction to Programming', 'cse'),
  ('cse201', 'Data Structures and Algorithms', 'cse'),
  ('cse301', 'Database Management Systems', 'cse'),
  ('me_all_~', 'All ME courses', 'me'),
  ('me101', 'Engineering Mechanics', 'me'),
  ('me201', 'Thermodynamics', 'me');

insert into post_types (name) values
  ('Discussion'),
  ('Announcement'),
  ('Q&A'),
  ('Poll');


-- Seed posts
-- Seed posts for user with id "cf7fe057-be01-402b-9076-55b5e230934e"
-- Post 1
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('First Post', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'This is my first post in the Computer Science department.', 'Discussion', 'buet', 'cse', 'cse_all_~');

-- Post 2
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Course Update', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'There will be a change in the course schedule for CSE301.', 'Announcement', 'buet', 'cse', 'cse301');

-- Post 3
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Internship Opportunity', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'There is an exciting internship opportunity for Mechanical Engineering students.', 'Announcement', 'buet', 'me', 'me_all_~');

-- Post 4
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Research Paper Publication', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'Our research paper on machine learning has been accepted for publication.', 'Discussion', 'buet', 'cse', 'cse_all_~');

-- Post 5
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Course Registration', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'The course registration for CSE201 will start next week.', 'Announcement', 'buet', 'cse', 'cse301');

-- Post 6
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Alumni Meetup', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'Calling all alumni for a meetup on the university campus next month.', 'Discussion', 'buet', 'buet_all_~', 'buet_all_~');

-- Post 7
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Important Announcement', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'All students are requested to attend the departmental meeting tomorrow.', 'Announcement', 'buet', 'me', 'me_all_~');

-- Post 8
INSERT INTO posts (title, user_id, subtitle, post_type, university, department, course)
VALUES ('Career Fair', '4ffd8ef2-4a3b-45b5-a47b-47660ef54be5', 'Don\''t miss the annual career fair happening next week in the university premises.', 'Announcement', 'buet', 'buet_all_~', 'buet_all_~');

