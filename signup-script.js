document.addEventListener('DOMContentLoaded', function () {
    console.log("Outside login form");
    document.getElementsByClassName('login-form')[0].addEventListener('submit', async (event) => {
        event.preventDefault();
        let isValid = true;
        const username = document.getElementById('username').value;
        const password = document.getElementById('InputPassword').value;
        const exampleModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        if (!username) {
            isValid = false;
            document.querySelector('.v-username').style.display = 'block';
        }
        if (!password) {
            isValid = false;
            document.querySelector('.v-pass').style.display = 'block';
        }

        if (isValid) {
            console.log('listening');
            // Proceed with form submission or further processing
            try {
                const response = await fetch('https://urbanmobility.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "userName":username, password })
                });
                const data = await response.json();
                if (response.ok) {
                    // Handle success (e.g., save token, redirect to another page, etc.)
                    localStorage.setItem('auth-token', data.token);
                    console.log('Login successful');
                    exampleModal.hide();
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    console.log(loginModal);
                    console.log(exampleModal);
                    document.getElementsByClassName('log-in')[0].style.color = '#007050';
                    loginModal.show();
                    window.location.href = '/home.html';
                } else {
                    console.log(exampleModal);
                    console.log("error:\t",data.message);
                    exampleModal.hide();
                    const loginNotModal = new bootstrap.Modal(document.getElementById('loginNotModal'));
                    console.log(document.getElementById('loginNotModal'));
                    loginNotModal.show();
                    document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
                    document.getElementsByClassName('log-not-heading')[0].textContent = 'Invalid email or password';
                    console.log(document.getElementsByClassName('log-not-heading')[0].textContent); 
                }
            } catch (error) {
                console.log(exampleModal);
                console.log('Error:', error);
                exampleModal.hide();
                const loginNotModal = new bootstrap.Modal(document.getElementById('loginNotModal'));
                document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
                document.getElementsByClassName('log-not-heading')[0].textContent = 'Failed to login. Try again after some time.';                
                loginNotModal.show();
            }
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.querySelector('input[type="email"]');
    console.log(emailInput);
    const phoneInput = document.querySelector('input[type="tel"]');
    console.log(phoneInput);
    const emailIcon = document.getElementById('email-icon');
    const phoneIcon = document.getElementById('phone-icon');

    emailInput.addEventListener('focus', function () {
        console.log("Listening");
        emailIcon.classList.add('fa-envelope-open-text');
    });

    emailInput.addEventListener('blur', function () {
        emailIcon.classList.remove('fa-envelope-open-text');
    });

    phoneInput.addEventListener('focus', function () {
        phoneIcon.classList.add('fa-phone-volume');
    });

    phoneInput.addEventListener('blur', function () {
        phoneIcon.classList.remove('fa-phone-volume');
    });
    document.getElementsByClassName('btn-signup')[0].addEventListener('click', () => {
        window.location.href = '/signup.html';
    })
});
document.getElementsByClassName('needs-validation')[0].addEventListener('submit', async (event) => {
    console.log('listening');
    event.preventDefault();
    // Reset all error messages
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userName = document.getElementById('userName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('inputPassword').value;
    const mobile = document.getElementById('mobile').value;
    const country = document.getElementById('country').value;
    const cpassword = document.getElementById('confirmInputPassword').value;
    console.log(password,mobile);
    let isValid = true;
    // Check if all fields are filled
    if (!firstName) {
        isValid = false;
        document.getElementsByClassName('empty-fn')[0].style.display = 'block';
    }
    if (!lastName) {
        isValid = false;
        document.getElementsByClassName('empty-ln')[0].style.display = 'block';
    }
    if (!userName) {
        isValid = false;
        document.getElementsByClassName('v-username')[0].style.display = 'block';
    }
    if (!email) {
        isValid = false;
        document.getElementsByClassName('empty-em')[0].style.display = 'block';
    }
    if (!mobile) {
        isValid = false;
        document.getElementsByClassName('empty-mob')[0].style.display = 'block';
    }
    if (country == '0') {
        isValid = false;
        document.getElementsByClassName('v-country')[0].style.display = 'block';
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementsByClassName('v-email')[0].style.display = 'block';
    }
    // Validate password strength (minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        isValid = false;
        document.getElementsByClassName('ps')[0].style.display = 'block';
    }
    // Validate mobile number format (example: 10 digits)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        isValid = false;
        document.getElementsByClassName('v-mobile')[0].style.display = 'block';
    }
    if (password != cpassword) {
        console.log(password+"\t"+cpassword);
        isValid = false;
        document.getElementsByClassName('match')[0].style.display = 'block';
    }
    if (isValid) {
        // Proceed with form submission or further processing
        try {
            const response = await fetch('https://urbanmobility.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, userName, email, password, 'phone': mobile, country })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Sign up successfully');
                document.getElementsByClassName('log-in')[0].style.color = '#007050';
                const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
                console.log(signupNotModal);
                signupModal.show();
                window.location.href = '/home.html';
            } else {
                console.log(data.message);
                const signupNotModal = new bootstrap.Modal(document.getElementById('signupNotModal'));
                signupNotModal.show();
                console.log(signupNotModal);
                document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
            }
        } catch (error) {
            console.log(error);
            console.log('An error occurred during signup. Please try again.');
            const signupNotModal = new bootstrap.Modal(document.getElementById('signupNotModal'));
            console.log(signupNotModal);
            signupNotModal.show();
            document.getElementsByClassName('log-not')[1].style.color = '#e85a76';
        }
    } else {
        return;
    }
});