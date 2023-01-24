INSERT INTO department (department_id, name)
VALUES 
(1, 'Engineering'),
(2, 'Finance'),
(3, 'Legal'),
(4, 'Sales');

INSERT INTO role (role_id, title, department, salary) 
VALUES 
(1, 'Sales Lead', 'Sales', 100000),
(2, 'Salesperson', 'Sales', 80000),
(3, 'Lead Engineer', 'Engineering', 150000),
(4, 'Software Engineer', 'Engineering', 120000),
(5, 'Account Manager', 'Finance', 160000),
(6, 'Accountant', 'Finance', 125000),
(7, 'Legal Team Lead', 'Legal', 250000),
(8, 'Lawyer', 'Legal', 190000);

INSERT INTO employee (employee_id, first_name, last_name, title, department, salary, manager)
VALUES 
(1, 'John', 'Doe', 'Sales Lead', 'Sales', 100000, null), 
(2, 'Amelia', 'Evans', 'Salesperson', 80000, 'John Doe'),
(3, 'Malia', 'Brown', 'Lead Engineer', 'Engineering', 150000, null),
(4, 'Regina', 'George', 'Software Engineer', 'Engineering', 120000, 'Malia Brown'), 
(5, 'Jessica', 'Rodriguez', 'Account Manager', 'Finance', 160000, null),
(6, 'Shane', 'Popowski', 'Accountant', 'Finance', 125000, 'Jessica Rodriguez'),
(7, 'Amy', 'Winehouse', 'Legal Team Lead', 'Legal', 250000, null),
(8, 'Kurt', 'Cobain', 'Lawyer', 'Legal', 190000, 'Amy Winehouse');