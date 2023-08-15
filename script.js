// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');




// Managing form Events

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if(!isValid()) return;
    storeLocally(name.value, email.value);
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

function showMsg(result, text) {
    msg.classList.add(result);
    msg.textContent = text;
    setTimeout(() => {
        msg.classList.remove(result);
        msg.textContent = '';
    }, 3000);
}





// Store in local storage

function storeLocally(name, email) {
     localStorage.setItem(name.toLowerCase(), JSON.stringify({name, email}));
}
