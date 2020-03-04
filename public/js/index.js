import '@babel/polyfill';
import login from './login';
import displayMap from './mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('form');

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
        login(email.value, password.value);
    });
}
