USE management_db;

INSERT INTO departments (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal")
;

INSERT INTO roles (title, department_id, salary)
VALUES
("Sales Lead", 1, 100000),
("Salesperson", 1, 80000),
("Lead Engineer", 2, 140000),
("Software Engineer", 2, 120000),
("Account Manager", 3, 160000),
("Accountant", 3, 125000),
("Legal Team Lead", 4, 200000),
("Lawyer", 4, 180000)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, null),
("Tom", "Sawyer", 2, 1),
("Jill", "Johnson", 2, 1),
("Bob", "Dole", 3, null),
("Jane", "Pearson", 4, 3),
("Tim", "Kane", 5, null),
("Kevin", "Parker", 6, 5),
("Dane", "Crawford", 7, null),
("Ryan", "Lawson", 8, 7),
("Jesse", "Lawton", 8, 7)
;