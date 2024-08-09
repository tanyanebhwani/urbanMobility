svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
bannerText = document.getElementsByClassName('banner-text')[0];
rotate = 0;
svg.addEventListener('click', () => {
    console.log('I am listening');
    if (rotate == 0) {
        svg.style.rotate = '90deg';
        rotate = 1;
        menuBlock.style.display = 'flex';
        menu.style.display = 'block';
        menuBlock.style.height = '150px';
        menuBlock.style.width = "100%";
        bannerText.style.height = '60vh';
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        menuBlock.style.height = '0';
        bannerText.style.height = '80vh';
        menu.style.display = 'none';
    }
});
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
                const response = await fetch('http://localhost:5000/api/auth/login', {
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
document.getElementsByClassName('btn-signup')[0].addEventListener('click', () => {
    window.location.href = '/signup.html';
});
document.getElementsByClassName('btn-signup')[1].addEventListener('click', () => {
    window.location.href = '/signup.html';
});
document.getElementsByClassName('btn-demo')[0].addEventListener('click', () => {
    window.location.href = '/home.html';
});