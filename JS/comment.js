const API_URL = 'https://jsonplaceholder.typicode.com/comments';

const commentList = document.getElementById('commentList');
const commentForm = document.getElementById('commentForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const bodyInput = document.getElementById('body');

// Create a single comment card
function createCommentCard(comment) {
    const card = document.createElement('div');
    card.className = 'comment-card';

    const nameEl = document.createElement('h3');
    nameEl.textContent = comment.name;

    const emailEl = document.createElement('small');
    emailEl.textContent = comment.email;

    const bodyEl = document.createElement('p');
    bodyEl.textContent = comment.body;

    card.appendChild(nameEl);
    card.appendChild(emailEl);
    card.appendChild(bodyEl);

    return card;
}

// Fetch and display comments
function fetchComments() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        commentList.innerHTML = '';
        data.slice(0, 250).forEach(comment => {
        const card = createCommentCard(comment);
        commentList.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Failed to fetch comments:', error);
    });
}

// Handle form submission
commentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const body = bodyInput.value.trim();

if (!name || !email || !body) {
    alert('Please fill in all fields.');
    return;
}

const newComment = {
    name: name,
    email: email,
    body: body
};

fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        const card = createCommentCard(data);
      commentList.prepend(card); // Add new comment at top
      commentForm.reset();       // Clear form
    })
    .catch(error => {
        console.error('Failed to post comment:', error);
    });
});

// Load initial comments
fetchComments();
