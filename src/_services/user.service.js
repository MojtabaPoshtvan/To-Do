
export const userService = {
    login,
    logout
};

function login(email, password) {
    return this.$http.post('', {
            email: email,
            password: password}).then(user => {
                if (user.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.$http.headers.common['Authorization'] = 'Bearer ' + user.token; 
                }
                return user;
            });
}

function logout() {
    localStorage.removeItem('user');
    this.$http.headers.common['Authorization'] = ''; 
}
