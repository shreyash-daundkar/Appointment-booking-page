// Selecting elements

const form = document.querySelector('#my-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const msg = document.querySelector('.msg');



// Managing form Events

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if(!validation()) return
}



// Validation

function validation() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    if(name.value.trim().length < 2 && !emailPattern.test(email.value)) showMsg('error', 'Name and Email is invalid');
    else if(name.value.trim().length < 2) showMsg('error', 'Name is invalid');
    else if(!emailPattern.test(email.value)) showMsg('error', 'Email is invalid');
    else {
        showMsg('success', 'Submitted');
        return true;
    }
}

function showMsg(result, text) {
    msg.classList.add(result);
    msg.textContent = text;
    setTimeout(() => {
        msg.classList.remove(result);
        msg.textContent = '';
    }, 3000);
}

