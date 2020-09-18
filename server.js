const inquirer = require("inquirer");
const mysql = require("mysql");
const Table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Pillows12@",
  database: "employee_trackerDB"
});


connection.connect(function(err){
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  runemployeeTracker();
});

function runemployeeTracker() {
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "Add an Employee",
      "Add a Role",
      "Add Department",
      "View all Employees",
      "View all Employees by Department",
      "View all Employees by Role",
      "Update Employee Role"
    ]
  })
  .then(function(answer){
    if (answer.action === "Add an Employee") {
      createEmployee();
    }
    if (answer.action === "Add a Role") {
      addRole();
    }
    if (answer.action === "Add a Department") {
      addDepartment();
    }
    if (answer.action === "View all Employees") {
      searchEmployee();
    }
    if (answer.action === "View all Employees by Department") {
      departmentSearch();
    }
    if (answer.action === "View all Employees by Role") {
      roleSearch();
    }
    if (answer.action === "Update Employee Role") {
      updateRole();
    }

  });
}

function createEmployee() {
  inquirer
  .prompt([
    {
      name:"firstname",
      type: "input",
      message: " What is your first name?"
    },
    {
      name:"lastname",
      type: "input",
      message: " What is your last name?"
    },
    {
      name:"role",
      type: "list",
      message: "What is your role ID?",
      choices: ["1", "2"]
    },
    {
      name:"manager",
      type: "list",
      message: "What is your manager ID?",
      choices: ["3", "null"]
    },
  ])
  .then(function(answer){
    console.log("Creating a new employee...\n");
  var query = connection.query("INSERT INTO employee SET ?",
      {
        first_name: answer.firstname,
        last_name: answer.lastname,
        role_id: answer.role,
        manager_id: answer.manager
      },
      function(err) {
        if (err) throw err;
        console.log("Employee was added!");
        runemployeeTracker();
      }
    );
  });
}

function addRole() {
  inquirer
    .prompt([
      {
      name:"title",
      type: "input",
      message: "What is your job title?"
    },
    {
      name:"salary",
      type: "input",
      message: "What is your current salary?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }, 
    {
      name:"departmentID",
      type: "input",
      message: "What is your department id?",
      choices: ["1", "2", "3"]
    }
    ])
    .then(function(answer){
      console.log("Adding a employee role...\n" );
     var query = connection.query("INSERT INTO role SET ?",
    {
      title: answer.title,
      salary: answer.salary,
      department_id: answer.departmentID
    },
    function(err) {
      if (err) throw err;
      runemployeeTracker();
    }
  );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
      name:"add",
      type: "input",
      message: "What is your department name?"
    }
  ])
    .then(function(answer){
      console.log("Adding a department...\n" );
     var query = connection.query("INSERT INTO department SET ?",
    {
      name: answer.add,
    },
    function(err) {
      if (err) throw err;
      console.log("Department was added!");
      runemployeeTracker();
    }
  );
    });
}

function searchEmployee() {
 connection.query("SELECT * FROM employee ORDER BY last_name DESC ", function(err, res) {
    if (err);
    // logs the actual query being run
    console.log(query.sql);
    for (var i = 0; i < result.length; i++) {
      console.log("First Name: " + result[i].first_name + " || Last name: " + result[i].last_name + "|| Role Id: " + result[i].role_id + " || Manager Id: " + result[i].manager_id);
    }
    console.log("-----------------------------------");
  });
  connection.end();
}





