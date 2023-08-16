// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const list = document.querySelector('#list');




// Fetch users from local storage

const userObj = JSON.parse(localStorage.getItem('users'));
for(user in userObj) addUser(userObj[user]);




// Managing form Events

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if(!isValid()) return;
    if(!storeLocally(name.value, email.value)) return
    showMsg('success', 'Submitted');
    name.value = '';
    email.value = '';
}




// Validation

function isValid() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    if(name.value.trim().length < 2 && !emailPattern.test(email.value)) showMsg('error', 'Name and Email is invalid');
    else if(name.value.trim().length < 2) showMsg('error', 'Name is invalid');
    else if(!emailPattern.test(email.value)) showMsg('error', 'Email is invalid');
    else return true;
}




// Store in local storage

function storeLocally(name, email) {
    if(!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify({}));
    const obj = JSON.parse(localStorage.getItem('users'));
    if(obj.hasOwnProperty(email)) {
        showMsg('error', 'Email is already used');
        return false;
    }
    obj[email] = {name, email};
    localStorage.setItem('users', JSON.stringify(obj))
    addUser(obj[email]);
    return true;
}




// Utility functions 

function showMsg(result, text) {
    msg.classList.add(result);
    msg.textContent = text;
    setTimeout(() => {
        msg.classList.remove(result);
        msg.textContent = '';
    }, 3000);
}

function addUser(user) {
    const li = addElement('li', list);
    const liName =  addElement('span', li, user.name, 'li-name');
    const liEmail = addElement('span', li, user.email, 'li-email');
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}