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
    const password = document.getElementById('InputPassword').value;
    const mobile = document.getElementById('mobile').value;
    const country = document.getElementById('country').value;
    const cpassword = document.getElementById('confirmInputPassword').value;
    let isValid = true;
    // Check if all fields are filled
    if(!firstName){
        isValid = false;
        document.getElementsByClassName('empty-fn')[0].style.display = 'block';
    }
    if(!lastName){
        isValid = false;
        document.getElementsByClassName('empty-ln')[0].style.display = 'block';
    }
    if(!userName){
        isValid = false;
        document.getElementsByClassName('v-username')[0].style.display = 'block';
    }
    if(!email){
        isValid = false;
        document.getElementsByClassName('empty-em')[0].style.display = 'block';
    }
    if(!mobile){
        isValid = false;
        document.getElementsByClassName('empty-mob')[0].style.display = 'block';
    }
    if(country=='0'){
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
    if(password!=cpassword){
        isValid = false;
        document.getElementsByClassName('match')[0].style.display = 'block';
    }
    if (isValid) {
        // Proceed with form submission or further processing
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, userName, email, password, 'phone':mobile,country })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle success (e.g., show a success message, redirect to another page, etc.)
                alert('Signup successful!y');
                window.location.href = '/home.html';
            } else {
                // Handle server-side validation errors or other issues
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred during signup. Please try again.');
        }
    } else {
        return;
    }
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName,userName,email,password,mobile,country })
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Sign up successfully');
    } else {
      alert(data.message);
    }
  });