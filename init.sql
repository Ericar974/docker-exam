CREATE DATABASE IF NOT EXISTS docker_exam;
USE docker_exam;
CREATE TABLE IF NOT EXISTS todos(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT
);
