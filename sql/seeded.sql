USE employee_trackerDB;

INSERT INTO department (name)
VALUES ("Engineering"),("Sales"), ("Manager");

INSERT INTO employee_role (role, salary, department_id)
VALUES ("Software Developer", 70000, 1);
INSERT INTO employee_role (role, salary, department_id)
VALUES ("Sales", 50000, 2);
INSERT INTO employee_role (role, salary, department_id)
VALUES ("Manager", 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bill","Loft", 2, null),
("Victoria","Gates", 1, null),
("Ken","Bold", 3, 3);









