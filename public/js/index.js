/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import displayMap from './mapbox';
import { updateUserInfo } from './updateUserData';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const updateUserInfoForm = document.querySelector('.form.form-user-data');

// MAP BOX
if (mapBox) {
    const locations = JSON.parse(
        document.getElementById('map').dataset.locations
    );
    displayMap(locations);
}

// LOGIN FORM
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        //console.log(email.value, password.value);
        login(email.value, password.value);
    });
}

// LOGOUT
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

// UPDATE USER INFO
if (updateUserInfoForm) {
    updateUserInfoForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        updateUserInfo(name.value, email.value);
    });
}
