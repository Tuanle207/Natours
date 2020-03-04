/* eslint-disable */
import exios from 'axios';

exports.login = async (email, password) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/users/login', //-> CAN NOT work with 127.0.0.1:3000
            data: {
                email,
                password
            }
        });

        if (res.data.status === 'success') {
            alert('Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (e) {
        alert(e.response.data.message);
    }
};
