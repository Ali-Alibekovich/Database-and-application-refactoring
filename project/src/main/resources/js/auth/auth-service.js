import axios from 'axios';

class AuthService {
    login(user) {
        return axios
            .post('/api/auth/signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user')
    }

    register(user) {
        return axios.post('/api/auth/signup', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();