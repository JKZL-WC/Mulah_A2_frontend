// Page 1: Validate phone number with country code
if (document.getElementById('checkBtn')) {
    document.getElementById('checkBtn').addEventListener('click', function () {
        const countryCode = document.getElementById('countryCode').value; // Get selected country code
        const phoneInput = document.getElementById('phone').value.trim(); // Get phone number input

        const fullPhoneNumber = countryCode + phoneInput; // Combine country code and phone number

        if (fullPhoneNumber === '+60173527250') {
            localStorage.setItem('phone', fullPhoneNumber); // Store full phone number in localStorage
            window.location.href = 'page2.html'; // Redirect to Page 2
        } else {
            alert('Invalid phone number. Please try again.'); // Alert if phone number is incorrect
        }
    });
}

// Page 2: Handle form submission
if (document.getElementById('registrationForm')) {
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value.trim();
        const day = document.getElementById('day').value.trim();
        const month = document.getElementById('month').value.trim();
        const year = document.getElementById('year').value.trim();
        const email = document.getElementById('email').value.trim();
        const noEmail = document.getElementById('noEmail').checked;

        let hasError = false;

        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
            return emailRegex.test(email);
        }

        // Validate name
        if (!name) {
            alert('Please insert a name.');
            hasError = true;
        }

        // Validate birthday
        if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
            alert('Please insert a valid birthday in DD/MM/YYYY format.');
            hasError = true;
        }

        // Validate email if "No email address" is unchecked
        if (!noEmail) {
            if (!email) {
                alert('Please insert an email address.');
                hasError = true;
            } else if (!isValidEmail(email)) {
                alert('Please insert a valid email address.');
                hasError = true;
            }
        }

        if (!hasError) {
            // Store the data in localStorage
            localStorage.setItem('name', name);
            localStorage.setItem('birthday', `${day}-${month}-${year}`);
            localStorage.setItem('email', noEmail ? 'No email provided' : email);

            // Redirect to Page 3
            window.location.href = 'page3.html';
        }
    });
}

// Page 3: Display stored user information
if (document.getElementById('phoneDisplay')) {
    document.addEventListener('DOMContentLoaded', function () {
        // Retrieve stored data from localStorage
        const phone = localStorage.getItem('phone') || 'Not provided';
        const name = localStorage.getItem('name') || 'Not provided';
        const birthday = localStorage.getItem('birthday') || 'Not provided';
        const email = localStorage.getItem('email') || 'Not provided';

        // Update the DOM elements with the retrieved data
        document.getElementById('phoneDisplay').textContent = phone;
        document.getElementById('nameDisplay').textContent = name;
        document.getElementById('birthdayDisplay').textContent = birthday;
        document.getElementById('emailDisplay').textContent = email;
    });
}
