const fs = require('fs');
const generatePage = require('./src/page-template.js'); //generates the page template to hold cards
const inquirer = require('inquirer');

const Manager = require('./lib/Manager.js'); //calls for Manager function
const Engineer = require('./lib/Engineer.js'); //calls for Engineer function
const Intern = require('./lib/Intern.js'); //calls for Intern function

var allEmp = []; //start with an empty array

//initial manager questions on command line
const startApp = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `What's your team manager's name? (Required!)`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log(`Must enter your team manager's name!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: `What's your team manager's employee ID #? (Required!)`,
            validate: inputId => {
                if (inputId) {
                    return true;
                } else {
                    console.log(`Must enter your team manager's employee ID #!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: `What's your team manager's email? (Required!)`,
            validate: inputEmail => {
                if (inputEmail) {
                    return true;
                } else {
                    console.log(`Must enter your team manager's email!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: `What's your team manager's office number? (Required!)`,
            validate: officeNumberInput => {
                if (officeNumberInput) {
                    return true;
                } else {
                    console.log(`Must enter your team manager's office number!`);
                    return false;
                }
            }
        },
    ])
        .then((data) => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            allEmp.push(manager);

            addEmployee();
        });
};
// prompts for adding employees
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'Would you like to add an engineer or intern?',
            choices: ['Engineer', 'Intern', 'No']
        }
    ])
        .then((data) => {
            // if the user selects engineer then run the engineer function
            if (data.employeeType === 'Engineer') {
                addEngineer();
            }
            // if the user selects intern then run the intern function 
            else if (data.employeeType === 'Intern') {
                addIntern();
            }
            // else create the page 
            else {
                createPage();
            }
        });
};
// prompt for adding engineer's info
const addEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `What's your Engineer's name? (Required!)`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log(`Must enter your Engineer's name!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: `What's your engineer's employee ID? (Required!)`,
            validate: inputId => {
                if (inputId) {
                    return true;
                } else {
                    console.log(`Must enter your engineer's employee ID!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: `What's your engineer's email? (Required!)`,
            validate: inputEmail => {
                if (inputEmail) {
                    return true;
                } else {
                    console.log(`Must enter your engineer's email!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: `What's your engineer's github username? (Required!)`,
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log(`Must enter your engineer's github username!`);
                    return false;
                }
            }
        }
    ])
        // creates new engineer and pushes it to the allEmp array
        .then(data => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            allEmp.push(engineer);

            addEmployee();
        })
}
// adds an intern
const addIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `What's your intern's name? (Required!)`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log(`Must enter your intern's name!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: `What's your intern's employee ID? (Required!)`,
            validate: inputId => {
                if (inputId) {
                    return true;
                } else {
                    console.log(`Must enter your intern's employee ID!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: `What's your intern's email? (Required!)`,
            validate: inputEmail => {
                if (inputEmail) {
                    return true;
                } else {
                    console.log(`Must enter your intern's email!`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: `What's your intern's school? (Required!)`,
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log(`Must enter your intern's school!`);
                    return false;
                }
            }
        }
    ])
        // add a new intern, pushes it to allEmp array
        .then(data => {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            allEmp.push(intern);

            addEmployee();
        })
}

const createPage = () => {
    // write file to dist folder
    fs.writeFile('./dist/index.html', generatePage(allEmp), err => {
        var obj = {
            ok: true,
            message: 'File created!'
        }

        if (err) {
            console.log(err);
            return;
        }

       
        copyStyle();
    })
};
const copyStyle = () => {
    // copy the style page and add it to the dist folder
    fs.copyFile('./src/style.css', './dist/style.css', err => {
        var obj = {
            ok: true,
            message: 'Style sheet copied successfully!'
        }

        if (err) {
            console.log(err);
            return;
        }

        console.log(obj);
    });
}



startApp(); //starts app