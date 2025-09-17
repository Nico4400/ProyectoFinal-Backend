const logoutBtn = document.getElementById('logoutBtn');
const productsBtn = document.getElementById('productsBtn');
const createBtn = document.getElementById('createBtn');

logoutBtn.addEventListener('click', async (e) => {
    const result = await fetch('http://localhost:8080/api/sessions/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {redirect} = await result.json();
    window.location.href = redirect;
});

productsBtn.addEventListener('click', async (e) => {
    window.location.href = 'http://localhost:8080/products';
});

createBtn.addEventListener('click', async (e) => {
    window.location.href = 'http://localhost:8080/realtimeProducts';
});