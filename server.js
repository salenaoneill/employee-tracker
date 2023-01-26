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
                'add an employee',
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

addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDep',
            message: 'enter name of department'
        }
    ]).then(answer => {
        const sql = `INSERT INTO department (name)
                    VALUES (?)`
        connection.query(sql, answer.newDep, (err, result) => {
            if (err) throw err;
            console.log(answer.newDep + ' has been added to the database!')
            viewDepartments(); 
            userPrompt();
        })
    })
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'enter name of role', 
        }, 
        {
            type: 'input',
            name: 'salary',
            message: 'enter salary of role',
        },
    ]).then(answer => {
        const roleAndSalary = [answer.role, answer.salary];
        const sqlRole = `SELECT name, id FROM department`;
        connection.query(sqlRole, (err, data) => {
            if (err) throw err;
            const dep = data.map(({name, id }) => ({ name: name, value: id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'dep',
                    message: 'what department does the role belong to?',
                    choices: dep
                }
            ]).then(depChoice => {
                const dep = depChoice.dep;
                roleAndSalary.push(dep);
                const sql = `INSERT INTO ROLE (title, salary, department_id)
                VALUES (?, ?, ?)`;
                connection.query(sql, roleAndSalary, (err, result) =>{
                    if (err) throw err; 
                    viewRoles();
                    userPrompt();
                });
            });
        });
    });
};



addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'what is the employee first name?',
        },
        {
            type: 'input', 
            name: 'lastName', 
            message: 'what is the employee last name?'
        }
    ]).then(answer => {
        const fullName = [answer.firstName, answer.lastName]
        const sqlEmployee = `SELECT role.id, role.title FROM role`;
        connection.query(sqlEmployee, (err, data) => {
            if (err) throw err;
            const roles = data.map(({id, title}) => ({name: title, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the employee role?',
                    choices: roles
                }
            ]).then(roleChoice => {
                const role = roleChoice.role;
                fullName.push(role);
                const sqlManager = `SELECT * FROM employee`;
                connection.query(sqlManager, (err, data) => {
                    if (err) throw err;
                    const managers = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the employee manager?',
                            choices: managers
                        }
                    ]).then(managerChoice => {
                        const manager = managerChoice.manager
                        fullName.push(manager);
                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`;
                        connection.query(sql, fullName, (err, result) => {
                            if (err) throw err;
                            viewEmployees();
                            userPrompt();
                        });
                    });
                });
            });
        });
    });
}


updateEmployee = () => {
    const sqlEmployee = `SELECT * FROM employee`;
    connection.query(sqlEmployee, (err, data) => {
        if (err) throw err;
        const employees = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee role do you want to update?',
                choices: employees
            }
        ]).then(employeeChoice => {
            const employeeId = employeeChoice.employee;
            const roleChange = [];
            const sqlRole = `SELECT * FROM role`;
            connection.query(sqlRole, (err, data) => {
                if (err) throw err;
                const roles = data.map(({id, title}) => ({name: title, value: id}));
                inquirer.prompt([
                    {
                        type: 'list', 
                        name: 'role',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: roles
                    }
                ]).then(roleChoice => {
                    const role = roleChoice.role;
                    roleChange.push(role);
                    roleChange.push(employeeId);
                    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                    connection.query(sql, roleChange, (err, result) => {
                        if (err) throw (err);
                        viewEmployees();
                        userPrompt();
                    });
                });
            });
        });
    });
}