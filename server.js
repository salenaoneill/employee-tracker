//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vegetable',
    database: 'employee_db'
});

//connect & call prompt function
connection.connect((err) => {
    if (err) throw err;
    
    console.log('connected as id' + connection.threadId);
    userPrompt();
});

//initial prompt
function userPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'what would you like to do?',
            name: 'choices',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an emplyee',
                'update an employee role'
            ]
        }
    ]).then((answer) => {
        const { choices } = answer;

        if (choices === 'view all departments') {
            viewDepartments();
        }

        if (choices === 'view all roles') {
            viewRoles();
        }

        if (choices === 'view all employees') {
            viewEmployees();
        }

        if (choices === 'add a department') {
            addDepartment();
        }

        if (choices === 'add a role') {
            addRole();
        }

        if (choices === 'add an employee') {
            addEmployee();
        }

        if (choices === 'update an employee role') {
            updateEmployee();
        }
    });
}

viewDepartments = () => {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    })
} 

viewRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary
                FROM role
                INNER JOIN department ON role.department_id = department.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    })
}

viewEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,
                department.name AS department, role.salary,
                CONCAT (manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        userPrompt();
    })
}