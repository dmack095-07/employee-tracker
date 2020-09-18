DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) NULL 
);

CREATE TABLE employee_role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INT NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;