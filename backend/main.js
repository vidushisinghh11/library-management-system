const form = document.getElementById('bookForm');
const list = document.getElementById('bookList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const book = Object.fromEntries(formData.entries());

  await fetch('/api/Books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });

  loadBooks();
});

async function loadBooks() {
  const res = await fetch('/api/Books');
  const books = await res.json();

  list.innerHTML = books.map(b => `<p>${b.title} by ${b.author} (${b.published_year})</p>`).join('');
}

loadBooks();
