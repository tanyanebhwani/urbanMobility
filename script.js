svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
navBar = document.getElementsByClassName('navbar')[0];
bannerText = document.getElementsByClassName('banner-text')[0];
body = document.getElementsByTagName('body')[0];
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
        navBar.style.position = 'relative';
        bannerText.style.height = '60vh';
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        menuBlock.style.height = '0';
        navBar.style.position = 'absolute';
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
        // Check if all fields are filled
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
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    window.location.href = '/home.html';
                } else {
                    alert(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred during login. Please try again.');
            }
        }
    });
    document.getElementsByClassName('btn-signup')[0].addEventListener('click',()=>{
        window.location.href = '\signup.html';
    })
    document.getElementsByClassName('btn-signup')[1].addEventListener('click',()=>{
        window.location.href = '\signup.html';
    })
    document.getElementsByClassName('btn-demo')[0].addEventListener('click',()=>{
        window.location.href = '\home.html';
    })
});