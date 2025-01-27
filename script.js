document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = event.target.elements.Name.value;
    const dob = new Date(event.target.elements.Date_of_birth.value);
    const today = new Date();
    
    // Store data in sessionStorage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('dob', dob.toISOString());
    
    if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {
        // Redirect to birthday page
        window.location.href = 'birthday.html';
    } else {
        alert(`Hello, ${name}!`);
    }
});
