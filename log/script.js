const wrapper = document.querySelector('.wrapper');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');

signUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signIn');
    wrapper.classList.remove('animate-signUp');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-signUp');
    wrapper.classList.remove('animate-signIn');
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDH88-4n2R-AuVKT-R0rZiV2-oSIFpxLZE",
    authDomain: "employee-4db87.firebaseapp.com",
    databaseURL: "https://employee-4db87-default-rtdb.firebaseio.com",
    projectId: "employee-4db87",
    storageBucket: "employee-4db87.appspot.com",
    messagingSenderId: "864308202844",
    appId: "1:864308202844:web:ccc570980f62c66d914599"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Set up our register function
function register() {
    // Get all our input fields
    var email = document.querySelector('.sign-up input[type="email"]').value;
    var password = document.querySelector('.sign-up input[type="password"]').value;
    var full_name = document.querySelector('.sign-up input[type="text"]').value;

    // Validate input fields
    if (!validate_password(password) || !validate_field(full_name)) {
        alert('One or more fields are invalid.');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Add this user to Firebase Database (For demonstration purposes only)
            var database_ref = database.ref();

            // Create User data (For demonstration purposes only)
            var user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now(),
                username: email, // Storing email as username (not recommended)
                password: password, // Storing password in plain text (not recommended)
            };

            // Push to Firebase Database (For demonstration purposes only)
            database_ref.child('users/' + user.uid).set(user_data);

            // Done
            alert('User Created!!');
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}

// Set up our login function
// Set up our login function
function login() {
    // Get all our input fields
    var username = document.querySelector('.sign-in input[type="text"]').value; // Change to text input
    var password = document.querySelector('.sign-in input[type="password"]').value;

    // Validate input fields
    if (!validate_username(username) || !validate_password(password)) {
        alert('Username or Password is invalid.');
        return;
    }

    // Attempt to fetch the user's data from the database
    var database_ref = database.ref('users');
    var loggedIn = false; // Add a flag to track login status

    database_ref.once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var userData = childSnapshot.val();
            if (userData.username === username && userData.password === password) {
                // User found and password matches (For demonstration purposes only)
                // In a real-world application, use proper authentication and hashed passwords
                alert('User Logged In!!');
                loggedIn = true; // Set the flag to indicate successful login
                window.location.href = 'dashboard.html';
                return; // Exit the loop
            }
        });

        // Check the login status and show appropriate alert
        if (!loggedIn) {
            alert('Login failed. Please check your credentials.');
        }
    });
}


// Validate Functions
function validate_username(username) {
    return username && username.length > 0;
}

function validate_password(password) {
    return password.length >= 6;
}

function validate_field(field) {
    return field && field.length > 0;
}
