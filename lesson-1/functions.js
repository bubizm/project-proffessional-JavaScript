'use strict'

// function f1(a, b) {
//     return a + b;
// }

// const f2 = function (a, b) {
//     console.log( `${this.name} ${this.lastname}`);
// }

// const f3 = x => x





//  const f3 = (x) => x.map(item => '<div>' + item + '</div>');

//==========================================

// function f() {
//     console.log(this)
// }



// =========================================

const person = {
    name: 'John',
    lastname: 'Doe',

    getFullName: function () {
        return `${this.name} ${this.lastname}`;
    },

    getFullNameArrow: () => {
        return `${this.name} ${this.lastname}`
    },

    scopeThis: function () {
        // this = person
       return () => {
         return `${this.name} ${this.lastname}`
       }
    }

 }

// console.log(person.getFullName());
// console.log(person.getFullNameArrow());
// console.log(person.scopeThis);

let s = person.scopeThis()

console.log(s())