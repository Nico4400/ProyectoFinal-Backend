const logoutBtn = document.getElementById('logoutBtn');
const productsBtn = document.getElementById('productsBtn');
const createBtn = document.getElementById('createBtn');

logoutBtn.addEventListener('click', async (e) => {
    const result = await fetch('/api/sessions/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const {redirect} = await result.json();
    window.location.href = redirect;
});

productsBtn.addEventListener('click', async (e) => {
    window.location.href = '/products';
});

createBtn.addEventListener('click', async (e) => {
    window.location.href = '/realtimeProducts';
});