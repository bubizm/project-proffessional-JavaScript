// destructuring ============================

const arr = ['first', 'second', 'new'];

const [a, , c] = arr;

// console.log(a); // first
// //console.log(b); // second
// console.log(c)
// console.log(arr);

// ------------------------------------------

// const person = {name: 'John', lastname: 'Doe'};

// const {name, lastname} = person;
// const {name, lastname: second} = person;

// console.log(name); // John
// console.log(lastname); // Doe
// console.log(second); // Doe

// --------------------------------------------

// let user = {
//     params: {
//       firstname: 'John',
//       lastname: 'Smith'
//     },
//     goods: ['Book', 'Phone']
//   }

let {params: {firstname, lastname}, goods: [good1, good2]} = user;

//   console.log(firstname); // John
//   console.log(lastname);  // Smith
//   console.log(good1);     // Book
//   console.log(good2);     // Phone

// ---------------------------------------------

const person = {name: 'John', lastname: 'Doe'};

function fn({name}) {
    const str = `hello ${name}`;
    console.log(str);
}

fn(person);


// const person = [4, 8];

// function fn([x, y]) {
//     console.log(`${x}; ${y}`);
// }

// fn(person);

// ----------------------------------------------

// const arr = [1, 2, 3, 4, 5, 6, 7]

// let [ , , a, , b ] = arr;

// console.log(a, b);


// const x = [4, 5, 1, 3, 8];
// const z = [1, 1, 1];
// const y = [...x, 42, ...z];

// // // y[0] *= 10;

// console.log( y)

// function name(a, b, c) {
//     console.log(a, b, c)
// }

// name(z[0], z[1], z[2])
// name(...z)


// function x(x, y, ...z) {
//   console.log(x, y, z)
// }

// x(1, 2, 3, 4, 5)