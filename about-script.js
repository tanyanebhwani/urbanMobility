svg = document.getElementsByTagName('svg')[0];
menu = document.getElementsByClassName('nav-list')[0];
menuBlock = document.getElementsByClassName('nav-items-vertical')[0];
rotate = 0;
svg.addEventListener('click', () => {
    if (rotate == 0) {
        svg.style.rotate = '90deg';
        rotate = 1;
        menuBlock.style.display = 'flex';
        menu.style.display = 'block';
        menuBlock.style.height = '150px';
        menuBlock.style.width = "100%";
    }
    else if (rotate == 1) {
        svg.style.rotate = '0deg';
        rotate = 0;
        menuBlock.style.height = '0';
        menu.style.display = 'none';
    }
});
document.addEventListener('DOMContentLoaded', function () {
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
                    exampleModal.hide();
                    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                    document.getElementsByClassName('log-in')[0].style.color = '#007050';
                    loginModal.show();
                    window.location.href = '/home.html';
                } else {
                    console.log("error:\t",data.message);
                    exampleModal.hide();
                    const loginNotModal = new bootstrap.Modal(document.getElementById('loginNotModal'));
                    loginNotModal.show();
                    document.getElementsByClassName('log-not')[0].style.color = '#e85a76';
                    document.getElementsByClassName('log-not-heading')[0].textContent = 'Invalid email or password';
                }
            } catch (error) {
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
document.addEventListener('DOMContentLoaded', () => {
    const elementsToSlideRight = document.querySelectorAll('.slide-right');
    const elementsToSlideLeft = document.querySelectorAll('.slide-left');
    const bannerImage = document.querySelector('.banner-image img');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        elementsToSlideRight.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > elementTop) {
                element.classList.add('visible');
            }
        });

        elementsToSlideLeft.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > elementTop) {
                element.classList.add('visible');
            }
        });

        if (bannerImage) {
            const bannerTop = bannerImage.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > bannerTop) {
                bannerImage.classList.add('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top + scrollTop;
            const itemHeight = item.offsetHeight;
            
            // Check if the item is in the viewport
            if (scrollTop + windowHeight > itemTop + (itemHeight / 4)) {
                item.classList.add('visible');
            }
        });
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    };
});

