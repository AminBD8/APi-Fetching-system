const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

// Create user card HTML
function createUserCard(user) {
    const card = document.createElement('div');
    card.classList.add('user-card');

    const nameEl = document.createElement('h3');
    nameEl.textContent = user.name;

    const emailEl = document.createElement('p');
    emailEl.textContent = user.email;

    card.appendChild(nameEl);
    card.appendChild(emailEl);

    return card;
}

// Fetch and display users
function fetchUsers() {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        userList.innerHTML = '';
        data.slice(0, 10).forEach(user => {
        const card = createUserCard(user);
        userList.appendChild(card);
        });
    })
    .catch(err => console.error('Failed to fetch users:', err));
}

// Handle form submission
userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !email) {
    alert('Please fill out both fields.');
    return;
    }

    const newUser = {
    name,
    email
    };

    fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then(data => {
        const newCard = createUserCard(data);
        userList.prepend(newCard);
        userForm.reset();
    })
    .catch(err => console.error('Failed to add user:', err));
});

// Initial load
fetchUsers();