/* eslint-disable */
import axios from 'axios';
import showAlert from './alerts';

// export default object = export object
export default async (email, password) => {
    try {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3000/api/v1/users/login', //-> CAN NOT work with 127.0.0.1:3000
            data: {
                email,
                password
            }
        });
        console.log(res);

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1500);
        }
    } catch (e) {
        showAlert('error', e.response.data.message);
    }
};
