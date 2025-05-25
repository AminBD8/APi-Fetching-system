const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const postList = document.getElementById('postList');
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');

// Create a single post card
function createPostCard(post) {
  const card = document.createElement('div');
  card.className = 'post-card';

  const title = document.createElement('h3');
  title.textContent = post.title;

  const body = document.createElement('p');
  body.textContent = post.body;

  card.appendChild(title);
  card.appendChild(body);

  return card;
}

// Fetch posts from the API
function fetchPosts() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      postList.innerHTML = ''; // Clear existing
      data.slice(0, 50).forEach(post => {
        const card = createPostCard(post);
        postList.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

// Handle form submission to create new post
postForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title === '' || body === '') {
    alert('Please fill in both fields.');
    return;
  }

  const newPost = {
    title: title,
    body: body
  };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  })
    .then(response => response.json())
    .then(post => {
      const card = createPostCard(post);
      postList.prepend(card); // Add new post to top
      postForm.reset();       // Clear form fields
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
});

// Initial load
fetchPosts();
