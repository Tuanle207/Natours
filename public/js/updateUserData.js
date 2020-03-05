import axios from 'axios';
import showAlert from './alerts';

// Update date
export const updateUserInfo = async (name, email) => {
    try {
        const res = await axios({
            method: 'patch',
            url: 'http://localhost:3000/api/v1/users/updateMe',
            data: {
                name,
                email
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Update information successfully!');
            location.reload(true);
        }
    } catch (e) {
        showAlert('error', e.response.data.message);
    }
};
