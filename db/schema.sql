DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT
    title VARCHAR(30) NOT NULL
    salary DECIMAL NOT NULL
    department_id INT
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT
    first_name VARCHAR(30) NOT NULL
    last_name VARCHAR(30) NOT NULL
    role_id INT
    manager_id INT
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
    ON DELETE SET NULL
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);