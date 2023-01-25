INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, department_id, salary) 
VALUES 
('Sales Lead', 4, 100000),
('Salesperson', 4, 80000),
('Lead Engineer', 1, 150000),
('Software Engineer', 1, 120000),
('Account Manager', 2, 160000),
('Accountant', 2, 125000),
('Legal Team Lead', 2, 250000),
('Lawyer', 2, 190000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 1, null), 
('Amelia', 'Evans', 2, 1),
('Malia', 'Brown', 3, null),
('Regina', 'George', 4, 3), 
('Jessica', 'Rodriguez', 5,  null),
('Shane', 'Popowski', 6, 5),
('Amy', 'Winehouse', 7, null),
('Kurt', 'Cobain', 8, 7);