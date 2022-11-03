// Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const ctable = require('console.table');
const { exit } = require('process');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    port: 3307,
    database: 'management_db'
  },
  console.log(`Connected to the management_db database.`)
);

// Create the options question array.
const optionQuestion = [
  {
    type: 'list',
    name: 'options',
    message: 'What would you like to do? ',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
  }
];

// Create the add department question array.
const addDeprtmentQuestion = [
  {
    type: 'input',
    name: 'addDepartment',
    message: 'What is the name of the new department? ',
  }
];

// Create a function to initialize app
function init() {
  // Greet user.
  console.log(`Welcome to my app`);

  // Ask option questions.
  optionQuestions();
};

// Menu Option Questions Function.
function optionQuestions() {
  inquirer
  .prompt(optionQuestion)
  .then((selected => {
    switch(selected.options) {
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Quit':
        console.log("Goodbye!");
        process.exit(0);
    };
  }));
};

// A function for viewing all employees.
function viewAllEmployees() {
  db.query(`SELECT employees.id AS ID, employees.first_name AS First_name, employees.last_name AS Last_name, roles.title AS title, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
  FROM employees 
  LEFT JOIN roles ON employees.role_id = roles.id 
  LEFT JOIN departments on roles.department_id = departments.id 
  LEFT JOIN employees AS manager ON employees.manager_id = manager.id`, function (err, results) {
    console.table(results);
    optionQuestions()
  });
};

// A function for adding an employee.
function addEmployee() {
  db.query('SELECT roles.title FROM roles', function (err, results) {
    const roles = results.map((obj) => obj.title);

    db.query(`SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS employee FROM employees`, function (err, results) {
      const managers = results.map((obj) => obj.employee);

      // Ask for information about the new employee.
      inquirer
      .prompt([
        {
          type: 'input',
          name: 'addEmployeeFirstName',
          message: "What is the new employee's first name? ",
        },
        {
          type: 'input',
          name: 'addEmployeeLastName',
          message: "What is the new employee's last name? ",
        },
        {
          type: 'list',
          name: 'addEmployeeRole',
          message: "What is the new employee's role? ",
          choices: roles
        },
        {
          type: 'list',
          name: 'addEmployeeManager',
          message: "Who is the new employee's manager? ",
          choices: managers
        },
      ])
      .then((response) => {
        db.query(`SELECT roles.id FROM roles WHERE roles.title = '${response.addEmployeeRole}'`, function (err, results) {
          const newRoleId = results[0].id

          db.query(`SELECT employees.id FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = '${response.addEmployeeManager}'`, function (err, results) {
            const newManagerId = results[0].id

            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES
            ("${response.addEmployeeFirstName}","${response.addEmployeeLastName}",${newRoleId},${newManagerId})
            ;`, function (err, results) {
              optionQuestions();
            });
          });
        });
      });
    });
  });
};

// A function for updating an employee role.
function updateEmployeeRole() {
  db.query(`SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS employee FROM employees`, function (err, results) {
    const employees = results.map((obj) => obj.employee);

    db.query('SELECT roles.title FROM roles', function (err, results) {
      const roles = results.map((obj) => obj.title);

      // Ask for information about which employee to update.
      inquirer
      .prompt([
        {
          type: 'list',
          name: 'updateEmployeeName',
          message: "Which employee's role do you want to update? ",
          choices: employees
        },
        {
          type: 'list',
          name: 'updateEmployeeRole',
          message: "Which role do you want to assign the selected employee? ",
          choices: roles
        }
      ])
      .then((response) => {
        db.query(`SELECT roles.id FROM roles WHERE roles.title = '${response.updateEmployeeRole}'`, function (err, results) {
          const newRoleId = results[0].id
          db.query(`UPDATE employees SET employees.role_id = ${newRoleId } WHERE CONCAT(employees.first_name, ' ', employees.last_name) = '${response.updateEmployeeName}'`, function (err, results) {
            optionQuestions();
          });
        });
      });
    });
  });
};

// A function for viewing all roles.
function viewAllRoles() {
  db.query(`SELECT roles.id AS ID, roles.title AS Title, departments.name AS Department, roles.salary AS Salary FROM roles
  JOIN departments
  ON roles.department_id=departments.id`, function (err, results) {
    console.table(results);
    optionQuestions();
  });
};

// A function for adding a role.
function addRole() {
  db.query('SELECT departments.name FROM departments', function (err, results) {
    const departments = results.map((obj) => obj.name);
    // Ask for information about the new employee.
    inquirer
    .prompt([
      {
        type: 'input',
        name: 'addRoleName',
        message: "What is the name of the new role? ",
      },
      {
        type: 'input',
        name: 'addRoleSalary',
        message: "What is the salary of the new role? ",
      },
      {
        type: 'list',
        name: 'addRoleDepartment',
        message: "Which department does the role belong to? ",
        choices: departments
      },
    ])
    .then((response) => {
      db.query(`SELECT departments.id FROM departments WHERE departments.name = '${response.addRoleDepartment}'`, function (err, results) {
        console.log(results);
        console.log(results[0].id);
        db.query(`INSERT INTO roles (title, department_id, salary)
        VALUES
        ("${response.addRoleName}",${results[0].id},${response.addRoleSalary})
        ;`, function (err, results) {
          optionQuestions();
        });
      });
    });
  });
};

// A function for viewing all departments.
function viewAllDepartments() {
  db.query(`SELECT departments.id AS ID, departments.name AS Name
    FROM departments`, function (err, results) {
    console.table(results);
    optionQuestions();
  });
};

// A function for adding a department.
function addDepartment() {

  // Ask for information about the new employee.
  inquirer
  .prompt(addDeprtmentQuestion)
  .then((response) => {
    db.query(`INSERT INTO departments (name)
    VALUES
    ("${response.addDepartment}")
    ;`, function (err, results) {
      optionQuestions();
    });
  });
};

// Function call to initialize app
init();