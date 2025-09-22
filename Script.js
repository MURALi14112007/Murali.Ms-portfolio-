document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const profileUsernameSpan = document.getElementById('profileUsername');

    // Handle registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            
            // Get existing users from localStorage or initialize an empty object
            const users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[username]) {
                alert('Username already exists! Please choose another one.');
            } else {
                // Store the new user's username and password
                users[username] = password;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful! You can now log in.');
                window.location.href = 'login.html'; // Redirect to login page
            }
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('logUsername').value;
            const password = document.getElementById('logPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || {};

            if (users[username] && users[username] === password) {
                // Set the current user in session storage
                sessionStorage.setItem('loggedInUser', username);
                window.location.href = 'profile.html'; // Redirect to profile page
            } else {
                alert('Invalid username or password!');
            }
        });
    }

    // Check if on the profile page and handle authentication
    if (profileUsernameSpan) {
        const loggedInUser = sessionStorage.getItem('loggedInUser');

        if (loggedInUser) {
            profileUsernameSpan.textContent = loggedInUser;
        } else {
            // If not logged in, redirect to the login page
            window.location.href = 'login.html';
        }
    }
});

// Logout function
function logout() {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}
