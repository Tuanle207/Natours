/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import displayMap from './mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');

// VALUES
const email = document.getElementById('email');
const password = document.getElementById('password');

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
        //console.log(email.value, password.value);
        login(email.value, password.value);
    });
}

// LOGOUT
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
