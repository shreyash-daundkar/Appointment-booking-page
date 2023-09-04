// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');
const list = document.querySelector('#list');




// Server address and routs

const url = 'https://crudcrud.com/api/fbb7a21c8fee4bfc86c63735e73451fe';
const route = '/Appointment-Data'




// On page refresh

window.addEventListener('DOMContentLoaded',onRefresh)
async function onRefresh() {
    try {
        const res = await axios.get( url + route);
        for(user of res.data) addUser(user);
        showMsg('success', 'Welcome');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Managing form Events

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if(!isValid()) return;
    storeOnServer(name.value, email.value)
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




// Store on server

async function storeOnServer (name, email) {
    try {
        const res = await axios.post(url + route, {email,name});
        addUser(res.data);
        showMsg('success', 'Submitted');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Manage list events

list.addEventListener('click', listEvent);
function listEvent(e) {
    if(e.target.classList.contains('list-btn')) dltUser(e.target.parentElement);
    if(e.target.classList.contains('edit-btn')) editUser(e.target.parentElement);
}




// Delete user

async function dltUser(li) {
    try {
        const id = li.getAttribute('data-id');
        await axios.delete( url + route + "/" + id);
        li.style.display = 'none';
        showMsg('success', 'Deleted');
    } catch (err) {
        console.log(err.message);
        showMsg('error', 'Something went wrong');
    }
}




// Edit user 

function editUser(li) {
    name.value = li.children[2].textContent;
    email.value = li.children[3].textContent;
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
    const dlt = addElement('button', li, 'X', 'dlt-btn', 'list-btn');
    const edit = addElement('button', li, 'Edit', 'edit-btn', 'list-btn');
    const liName =  addElement('span', li, user.name, 'li-name');
    const liEmail = addElement('span', li, user.email, 'li-email');
    li.setAttribute('data-id', user["_id"]);
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}