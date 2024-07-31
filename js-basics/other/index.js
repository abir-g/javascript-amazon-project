let person = {
    name: 'abir',
    age: 30
};

// Dot notation
person.name = 'John';

// Bracket notation
let selection = 'name';
person[selection] = 'Mary';

console.log(person.name);




let selectedColors = [' red' , 'blue'];
selectedColors[2] = 'green';
console.log(selectedColors);

function greet(person_name) {
    console.log('Hello ' + person_name)
}

greet('abir');

function square(number) {
    return number * number
}