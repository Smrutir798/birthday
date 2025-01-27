document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = event.target.elements.Name.value;
    const dob = new Date(event.target.elements.Date_of_birth.value);
    const today = new Date();
    const profilePicture = event.target.elements.Profile_picture.files[0];
    
    // Store data in sessionStorage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('dob', dob.toISOString());
    
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(e) {
            sessionStorage.setItem('profilePicture', e.target.result);
            checkBirthdayAndRedirect(name, dob, today);
        };
        reader.readAsDataURL(profilePicture);
    } else {
        checkBirthdayAndRedirect(name, dob, today);
    }
});

function checkBirthdayAndRedirect(name, dob, today) {
    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
        // Redirect to birthday page
        window.location.href = 'birthday.html';
    } else {
        alert(`Hello, ${name}!`);
    }
}