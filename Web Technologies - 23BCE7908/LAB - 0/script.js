document.getElementById('regForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting automatically so we can validate first
    event.preventDefault();

    // Get values from the input fields
    var regNo = document.getElementById('regNo').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    // 1. Validate Registration Number (Must be exactly 9 characters)
    if (regNo.length !== 9) {
        alert("Error: Registration Number must be exactly 9 characters long.");
        return; // Stop execution
    }

    // 2. Validate Phone Number (Must be exactly 10 digits)
    if (phone.length !== 10) {
        alert("Error: Phone Number must be exactly 10 digits.");
        return; 
    }

    // 3. Validate Email (Must contain '@')
    // Note: HTML input type="email" usually handles this, but here is the JS manual check
    if (!email.includes('@')) {
        alert("Error: Please provide a valid email address containing '@'.");
        return;
    }

    // If all checks pass
    alert("Validation Successful! Form Submitted.");
    
    // You can uncomment the line below if you want the form to actually reset/submit after alert
    // event.target.submit(); 
});