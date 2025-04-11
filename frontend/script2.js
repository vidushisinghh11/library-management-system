const API_BASE = "http://localhost:5000/books";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".add-btn").addEventListener("click", addBook);
    document.querySelector(".update-btn").addEventListener("click", updateBook);
    document.querySelector(".delete-btn").addEventListener("click", deleteBookByName);

    fetchBooks(); // Load existing books from the backend
});

function fetchBooks() {
    fetch(API_BASE)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("bookList");
            table.innerHTML = "";
            data.forEach(book => {
                const row = table.insertRow();
                row.setAttribute("data-id", book.BookID);
                row.insertCell(0).textContent = book.Title;
                row.insertCell(1).textContent = book.Author;
                row.insertCell(2).innerHTML = `
                    <button class="edit-btn" onclick="editBook(this)">Edit</button>
                    <button class="delete-btn" onclick="deleteBook(this)">Delete</button>
                `;
            });
        })
        .catch(err => console.error("Error fetching books:", err));
}

function addBook() {
    const Title = document.getElementById("bookName").value;
    const Author = document.getElementById("authorName").value;

    if (!Title || !Author) return alert("Please fill in both fields.");

    fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Title,
            Author,
            Genre: "",             // Optional or extend later
            ISBN: `TEMP-${Date.now()}`, // Temp ISBN
            PublishedYear: 2024,   // Default
            Quantity: 1            // Default quantity
        })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        fetchBooks();
        document.getElementById("bookName").value = "";
        document.getElementById("authorName").value = "";
    })
    .catch(err => console.error("Error adding book:", err));
}

function editBook(button) {
    const row = button.parentNode.parentNode;
    const BookID = row.getAttribute("data-id");
    const currentTitle = row.cells[0].textContent;
    const currentAuthor = row.cells[1].textContent;

    const newTitle = prompt("Edit Book Title", currentTitle);
    const newAuthor = prompt("Edit Author", currentAuthor);

    if (!newTitle || !newAuthor) return alert("Fields cannot be empty.");

    fetch(`${API_BASE}/${BookID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Title: newTitle,
            Author: newAuthor,
            Genre: "",
            ISBN: `TEMP-${BookID}`,
            PublishedYear: 2024,
            Quantity: 1
        })
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        fetchBooks();
    })
    .catch(err => console.error("Error updating book:", err));
}

function deleteBook(button) {
    const row = button.parentNode.parentNode;
    const BookID = row.getAttribute("data-id");

    fetch(`${API_BASE}/${BookID}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        fetchBooks();
    })
    .catch(err => console.error("Error deleting book:", err));
}

function updateBook() {
    const oldTitle = document.getElementById("updateBookName").value;
    const newTitle = document.getElementById("newBookName").value;
    const newAuthor = document.getElementById("newAuthorName").value;

    const table = document.getElementById("bookList");
    let found = false;

    for (let row of table.rows) {
        if (row.cells[0].textContent === oldTitle) {
            found = true;
            const BookID = row.getAttribute("data-id");

            fetch(`${API_BASE}/${BookID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Title: newTitle,
                    Author: newAuthor,
                    Genre: "",
                    ISBN: `TEMP-${BookID}`,
                    PublishedYear: 2024,
                    Quantity: 1
                })
            })
            .then(res => res.text())
            .then(msg => {
                alert(msg);
                fetchBooks();
                document.getElementById("updateBookName").value = "";
                document.getElementById("newBookName").value = "";
                document.getElementById("newAuthorName").value = "";
            });
            break;
        }
    }

    if (!found) alert("Book not found!");
}

function deleteBookByName() {
    const bookNameToDelete = document.getElementById("deleteBookName").value;
    const table = document.getElementById("bookList");
    let found = false;

    for (let row of table.rows) {
        if (row.cells[0].textContent === bookNameToDelete) {
            found = true;
            const BookID = row.getAttribute("data-id");

            fetch(`${API_BASE}/${BookID}`, {
                method: "DELETE"
            })
            .then(res => res.text())
            .then(msg => {
                alert(msg);
                fetchBooks();
                document.getElementById("deleteBookName").value = "";
            });
            break;
        }
    }

    if (!found) alert("Book not found!");
}
