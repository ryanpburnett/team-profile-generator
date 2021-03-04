const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const validator = require("email-validator");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

function generateTeam() {
    function generateNewEmployee() {
        inquirer.prompt([
            {
                type: "list",
                message: "What role would you like to input?",
                name: "employeeRole",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "End input, generate team",
                ]
            },
        ]).then(answer => {
            const { employeeRole } = answer;
            if(employeeRole === "Manager") {
                addManager();
            }else if(employeeRole === "Engineer") {
                addEngineer();
            }else if(employeeRole === "Intern") {
                addIntern();
            }else{
                renderTeam();
            }
        });
    }
    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email",
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber",
            },

        ]).then(answers => {
            const { name, id, email, officeNumber }
            = answers;
            const manager = new Manager(name, id, email, officeNumber);
            team.push(manager);
            generateNewEmployee()
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is the engineers github?",
                name: "github"
            },

        ]).then(answers => {
            const { name, id, email, github }
            = answers;  
            const engineer = new Engineer(name, id, email, github);
            team.push(engineer);
            generateNewEmployee()
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is the interns's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is the interns's school?",
                name: "school"
            },

        ]).then(answers => {
            const { name, id, email, school }
            = answers;  
            const intern = new Intern(name, id, email, school);
            team.push(intern);
            generateNewEmployee()
        });
    }

    function renderTeam() {
        fs.writeFile(outputPath, render(team),
        (err) => {
            if(err) {
                console.log(err)
            }else{
                console.log("Success! Check 'output' folder for HTML!")
            }
        });
    }
    generateNewEmployee()
}
generateTeam()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
