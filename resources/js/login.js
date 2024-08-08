
document.addEventListener('DOMContentLoaded', function () {
    const errorElement = document.getElementById('error');
    const sessionError = errorElement ? errorElement.innerHTML.trim() : '';

    if (sessionError) {
        setTimeout(() => {
            fetch('/delete-sessions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                errorElement.style.opacity = 0;
                setTimeout(() => {
                    errorElement.remove();
                }, 500); 
            })
            .catch(error => {
                console.error('Error clearing session:', error);
            });
        }, 2000); 
    }
});