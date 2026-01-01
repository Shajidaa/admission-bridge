
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS universities CASCADE;


CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    degree_level VARCHAR(50) NOT NULL,
    tuition_fee INT NOT NULL,
    min_gpa DECIMAL(3,2) NOT NULL,
    min_ielts DECIMAL(2,1) NOT NULL,
   
);


CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    university_id INT REFERENCES universities(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_gpa DECIMAL(3,2) NOT NULL,
    student_ielts DECIMAL(2,1) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending'
);

INSERT INTO universities (name, country, degree_level, tuition_fee, min_gpa, min_ielts) VALUES
('University of Dhaka', 'Bangladesh', 'Masters', 2000, 3.5, 6.5),
 ('Jagannath University', 'Bangladesh', 'Masters', 1700, 3.3, 6.5),
('University of Oxford', 'UK', 'Masters', 35000, 3.8, 7.5),
('MIT', 'USA', 'Bachelors', 55000, 3.9, 7.0),
('Technical University of Munich', 'Germany', 'Masters', 0, 3.2, 6.5),
('National University of Singapore', 'Singapore', 'Bachelors', 25000, 3.7, 7.0),
('Monash University', 'Australia', 'Masters', 30000, 3.0, 6.5),
('University of Toronto', 'Canada', 'Bachelors', 45000, 3.5, 7.0),
('ETH Zurich', 'Switzerland', 'Masters', 2000, 3.6, 7.0),
('Kyoto University', 'Japan', 'Bachelors', 15000, 3.0, 6.0),
('University of Amsterdam', 'Netherlands', 'Masters', 18000, 3.3, 6.5),
('Seoul National University', 'South Korea', 'Bachelors', 12000, 3.4, 6.5)