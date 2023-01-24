//dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const { listenerCount } = require('mysql2/typings/mysql/lib/Connection');

//connection to sql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vegetable',
    database: 'employee_db'
});

//connect & call prompt function
connection.connect(err => {
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
    })
}