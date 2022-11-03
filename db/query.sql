-- TODO: HOW DO I JOIN TABLES CORRECTLY?

-- SELECT * FROM roles
-- JOIN departments
-- ON roles.department_id=departments.id
-- ;

SELECT * FROM employees
JOIN roles
ON employees.role_id=roles.id
;

-- SELECT roles.id AS ID, roles.title AS Title, departments.name AS Department, roles.salary AS Salary FROM roles
-- JOIN departments
-- ON roles.department_id=departments.id
-- ;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.department_id, roles.salary, employees.manager_id FROM employees
-- JOIN roles
-- ON employees.role_id=roles.id
-- ;

-- SELECT employees.id AS ID, employees.first_name AS First_name, employees.last_name AS Last_name, roles.title AS title, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
-- FROM employees 
-- LEFT JOIN roles ON employees.role_id = roles.id 
-- LEFT JOIN departments on roles.department_id = departments.id 
-- LEFT JOIN employees AS manager ON employees.manager_id = manager.id

-- SELECT departments.id FROM departments WHERE departments.name = 'Sales'

-- SELECT employees.role_id FROM employees WHERE CONCAT(employees.first_name, ' ', employees.last_name) = 'John Doe'

-- SELECT employees.role_id FROM employees WHERE employees.first_name = 'John'

-- TODO: Add, Delete and Update
-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES
-- ("New", "Guy", 2, 1)
-- ;

-- INSERT INTO departments (name)
-- VALUES
-- ("Services")
-- ;


-- UPDATE employees
-- SET last_name = "Tester"
-- WHERE id = 2
-- ;