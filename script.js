// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const list = document.querySelector('#list');




// Fetch users from local storage

if(!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify({}));
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





// Manage list events

list.addEventListener('click', listEvent);
function listEvent(e) {
    if(e.target.classList.contains('list-btn')) dltUser(e.target.parentElement);
    if(e.target.classList.contains('edit-btn')) editUser(e.target.parentElement);
}




// Delete user

function dltUser(li) {
    const email = li.lastElementChild.textContent;
    delete userObj[email];
    updateStorage();
    li.style.display = 'none';
}




// Edit user 

function editUser(li) {
    name.value = li.children[2].textContent;
    email.value = li.children[3].textContent;
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
    if(userObj.hasOwnProperty(email)) {
        showMsg('error', 'Email is already used');
        return false;
    }
    userObj[email] = {name, email};
    updateStorage()
    addUser(userObj[email]);
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

function updateStorage() {
    localStorage.setItem('users', JSON.stringify(userObj));
}

function addUser(user) {
    const li = addElement('li', list);
    const dlt = addElement('button', li, 'X', 'dlt-btn', 'list-btn');
    const edit = addElement('button', li, 'Edit', 'edit-btn', 'list-btn');
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