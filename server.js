const inquirer = require("inquirer");
const mysql = require("mysql");
const { connect } = require("http2");
const Table = require("console.table");
const { title } = require("process");

const connection = mysql.createConnection({
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
  if (err);
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
      "Add a Department",
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
      choices: ["0", "3"]
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
        if (err)throw err;
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
      if (err);
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
    connection.query("INSERT INTO department SET ?",
    {
      name: answer.add
    },
    function(err) {
      if (err);
      runemployeeTracker();
    }
  );
    });
}

function searchEmployee() {
  var query = connection.query("SELECT * FROM employee", function(err, res){
    if (err) throw err;
    console.log(query.sql);
    for (var i=0; i < res.length; i++) {
        console.table([
          {
          Id:  res[i].id,
          FirstName: res[i].first_name, 
          LastName: res[i].last_name, 
          RoleId: res[i].role_id ,
          ManagerId: res[i].manager_id
    }
  ]);
    console.log("------------------------------------------------")

};
runemployeeTracker();
  })
}

function departmentSearch() {
      var query = connection.query("SELECT * FROM department INNER JOIN employee ON department.id = employee.id", function(err, res){
      if (err) throw err;
      console.log(query.sql); 
      for (var i=0; i < res.length; i++) {
          console.table([
            {
            Id:  res[i].id,
            DepartmentName: res[i].name,
            FirstName: res[i].first_name, 
            LastName: res[i].last_name, 
            RoleId: res[i].role_id ,
            ManagerId: res[i].manager_id
      }
    ]);
      console.log("-------------------------------------------------------")
  };
  runemployeeTracker();
    })
  }

function roleSearch() {
    var query = connection.query("SELECT * FROM role INNER JOIN employee ON role.id = employee.id", function(err, res){
      if (err) throw err;
      console.log(query.sql); 
      for (var i=0; i < res.length; i++) {
          console.table([
            {
            Id:  res[i].id,
            Title: res[i].title,
            Salary: res[i].salary, 
            DepartmentId: res[i].department_id
      }
    ]);
      console.log("------------------------------------------------")
  };
  runemployeeTracker();
    })
  }
    
    

    function updateRole() {
      console.log("Updating role...\n");
      var query = connection.query("UPDATE role SET ? WHERE ?", function(err, res){
        if (err) throw err;
        console.log(query.sql); 
        for (var i=0; i < res.length; i++) {
            console.table([
              {
              Id:  res[i].id,
              Title: res[i].title,
              Salary: res[i].salary, 
              DepartmentId: res[i].department_id
        }

      ]);
        console.log("------------------------------------------------")
  };
  runemployeeTracker();
    })
  }
    