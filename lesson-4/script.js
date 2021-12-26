const text = `
The teacher said, 'I'll be free tomorrow and can meet with you'. 
'Tell me about your education' the manager said.
As Shakespeare told in his tragedy, 
'There is no any novel sadly than the one about 
Romeo and Juliette' [W. Shakespeare].
The teacher said, 'I'll be free tomorrow and can meet with you'.`;

const reg = /([^\w]+)'|'(\n?)'|'(\s?)'|'(\B)/gm;

console.log(text.replace(reg, '"'));

const formEl = document.querySelector('form');
const nameEl = document.getElementById('name');
const telEl = document.getElementById('tel');
const mailEl = document.getElementById('mail');
const textEl= document.getElementById('msg')


const regName = /[a-zA-Zа-яА-Я]+/;
const regTel = /^\+7\(9\d{2}\)\d{3}-\d{4}$/;
const regMail = /^(([a-z]+)|([a-z]+\.?[a-z]+?)|([a-z]+-[a-z]+))(@mail\.ru)$/;
// const regMail = /^[a-z]+\.?[a-z]+?@mail\.ru$|^[a-z]+-[a-z]+@mail\.ru$/;

formEl.addEventListener('click', event => {
    if (event.target.id !== 'submit') {
        return;
    }

    if (regName.test(nameEl.value) === false) {
        nameEl.classList.add('red');
        event.preventDefault();
    } else {
        nameEl.classList.remove('red');
    }
    if (regTel.test(telEl.value) === false) {
        telEl.classList.add('red');
        event.preventDefault();
    } else {
        telEl.classList.remove('red');
    }
    if (regMail.test(mailEl.value) === false) {
        mailEl.classList.add('red');
        event.preventDefault();
    } else {
        mailEl.classList.remove('red');
    }
    if (textEl.value === '') {
        textEl.classList.add('red');
        event.preventDefault();
    } else {
        textEl.classList.remove('red');
    }
})