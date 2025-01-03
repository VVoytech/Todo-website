import {Employee} from "./types";

const employees: Employee[] = [
    {
        firstName: "Wojciech",
        lastName: "Kieliszek",
        age: 21,
        position: "Developer",
        programmingLanguages: ["C++", "JavaScript"]
    },
    {
        firstName: "Katarzyna",
        lastName: "Nowak",
        age: 28,
        position: "Developer",
        programmingLanguages: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
        firstName: "Michał",
        lastName: "Jabłoński",
        age: 34,
        position: "Manager",
        programmingLanguages: ["Java", "Python", "SQL"]
    },
    {
        firstName: "Anna",
        lastName: "Zielińska",
        age: 25,
        position: "Designer",
        programmingLanguages: ["C#", "JavaScript", "Vue.js"]
    },
    {
        firstName: "Jakub",
        lastName: "Kowalski",
        age: 30,
        position: "Developer",
        programmingLanguages: ["Kotlin", "Swift", "React Native"]
    }
]

const getDevelopers = (employees: Employee[]) => {
    return employees.filter(e => e.position === "Developer");
}

const findEmployee = (employees: Employee[], name: string) => {
    return employees.find(e => e.firstName.includes(name) || e.lastName.includes(name));
}

function addExperience(employee: Employee, lang: string) {
    employee.programmingLanguages.push(lang);
}

function addExperiences(employee: Employee[], lang: string) {
    return employee.map(e => e.programmingLanguages.push(lang));
}

console.log("employees", employees);
const developers = getDevelopers(employees);
console.log("developers", developers);
const anna = findEmployee(employees, "Anna")
console.log("Anna", anna);
if (developers)
    addExperiences(developers, "C++");
console.log("Developers", developers);