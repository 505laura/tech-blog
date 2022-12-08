const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        // TODO: Add error message
    }
};

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', logout);