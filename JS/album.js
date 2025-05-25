const API_URL = 'https://jsonplaceholder.typicode.com/albums';

const albumList = document.getElementById('albumList');
const albumForm = document.getElementById('albumForm');
const albumTitleInput = document.getElementById('albumTitle');

// Create album card
function createAlbumCard(album) {
  const card = document.createElement('div');
  card.className = 'album-card';

  const title = document.createElement('h3');
  title.textContent = album.title;

  card.appendChild(title);
  return card;
}

// Fetch albums
function fetchAlbums() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      albumList.innerHTML = '';
      data.slice(0, 50).forEach(album => {
        const card = createAlbumCard(album);
        albumList.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching albums:', error);
    });
}

// Submit new album
albumForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = albumTitleInput.value.trim();
  if (!title) {
    alert('Please enter an album title.');
    return;
  }

  const newAlbum = {
    title: title,
    userId: 1 // static for demo
  };

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newAlbum),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const card = createAlbumCard(data);
      albumList.prepend(card);
      albumForm.reset();
    })
    .catch(error => {
      console.error('Error creating album:', error);
    });
});

// Load albums on start
fetchAlbums();
