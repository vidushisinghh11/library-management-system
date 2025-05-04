const API_BASE = "http://localhost:5000/api/books";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".add-btn").addEventListener("click", addBook);
    document.querySelector(".update-btn").addEventListener("click", updateBook);
    document.querySelector(".delete-btn").addEventListener("click", deleteBookByName);

    document.addEventListener("DOMContentLoaded", 
        fetchBooks);
 // Load existing books from the backend
});
localStorage.setItem("adminName", "AdminUser");

const adminName = localStorage.getItem("adminName");
if (adminName) {
    document.getElementById("welcomeMsg").textContent = `Welcome, ${adminName}`;
}



function fetchBooks() {
    fetch(API_BASE)

        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("bookList");
            table.innerHTML = "";
            data.forEach(book => {
                const row = table.insertRow();
                row.setAttribute("data-id", book.BookID);
                row.insertCell(0).textContent = book.BookID;
                row.insertCell(1).textContent = book.Title;
                row.insertCell(2).innerHTML = book.Author;
            });
        })
        .catch(err => console.error("Error fetching books:", err));
}

function addBook() {
    const Title = document.getElementById("bookName").value;
    const Author = document.getElementById("authorName").value;
    const Genre = document.getElementById("bookGenre").value;
    const ISBN = document.getElementById("bookISBN").value;
    const Quantity = document.getElementById("bookQuantity").value;

    if (!Title || !Author || !Genre || !ISBN || !Quantity) {
        return alert("Please fill in all the fields.");
    }

    fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title, Author, Genre, ISBN, Quantity }) // ✅ no PublishedYear
    })
    .then(res => res.text())
    .then(msg => {
        showPopup("✅ Book added successfully!");
        fetchBooks();
        // Reset fields
        document.getElementById("bookName").value = "";
        document.getElementById("authorName").value = "";
        document.getElementById("bookGenre").value = "";
        document.getElementById("bookISBN").value = "";
        document.getElementById("bookQuantity").value = "";
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

// function deleteBookByTitle() {
//     const title = document.getElementById("deleteBookName").value.trim();
//     if (!title) {
//         return alert("Please enter a book title to delete.");
//     }

//     if (!confirm(`Are you sure you want to delete the book "${title}"?`))
//          return;
//     console.log("Deleting book with title:", title);


//     fetch(`http://localhost:5000/api/books/deleteByName/${encodeURIComponent(title)}`, {
//         method: 'DELETE',
//     })
//     .then(response => {
//         if (!response.ok) throw new Error("Delete failed");
//         return response.json();
//     })
//     .then(data => {
//         alert(data.message);
//         fetchBooks(); // Refresh list
//         document.getElementById("deleteBookName").value = "";
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to delete book');
//     });
// }



  
//   ✅ Show popup for delete success
function deleteBookByTitle() {
    const title = document.getElementById("deleteBookName").value.trim();
    if (!title) {
        return alert("Please enter a book title to delete.");
    }

    if (!confirm(`Are you sure you want to delete the book "${title}"?`)) return;

    fetch(`${API_BASE}/deleteByName/${encodeURIComponent(title)}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) throw new Error("Delete failed");
        return response.json();
    })
    .then(data => {
        alert(data.message);
        fetchBooks();
        document.getElementById("deleteBookName").value = "";
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete book');
    });
}


function updateBook() {
    const oldTitle = document.getElementById("updateBookName").value;
    const newTitle = document.getElementById("newBookName").value;
    const newAuthor = document.getElementById("newAuthorName").value;

    const table = document.getElementById("bookList");
    let found = false;

    for (let row of table.rows) {
        if (row.cells[1].textContent === oldTitle) {  // Searching by Title in the second cell
            found = true;
            const BookID = row.getAttribute("data-id"); // Using BookID from the data-id attribute

            fetch(`${API_BASE}/${BookID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Title: newTitle,
                    Author: newAuthor,
                    Genre: "",
                    ISBN: `TEMP-${BookID}`, // Or update accordingly
                    Quantity: 1
                })
            })
            .then(res => res.text())
            .then(msg => {
                showPopup("✏️ Book updated successfully!");
                fetchBooks();
                document.getElementById("updateBookName").value = "";
                document.getElementById("newBookName").value = "";
                document.getElementById("newAuthorName").value = "";
            })
            .catch(err => console.error("Error updating book:", err));
            
            break;
        }
    }

    if (!found) {
        alert("Book not found!");
    }
}



function showPopup(message) {
    const popup = document.getElementById("successPopup");
    const popupText = document.getElementById("popupMessage");
    popupText.textContent = message;
    popup.classList.add("show");
  
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000); // 2 seconds
  }
  

  function searchBooks() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const table = document.getElementById("bookList");
    const rows = table.getElementsByTagName("tr");

    for (let row of rows) {
        const bookNameCell = row.cells[1]; // Book Name column
        if (bookNameCell) {
            const bookTitle = bookNameCell.textContent.toLowerCase();
            row.style.display = bookTitle.includes(input) ? "" : "none";
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // other listeners...
    document.getElementById("searchToggle").addEventListener("click", () => {
        const searchInput = document.getElementById("searchInput");
        searchInput.style.display = searchInput.style.display === "none" ? "block" : "none";
        searchInput.focus();
    });

    document.getElementById("searchInput").addEventListener("input", function() {
        const filter = this.value.toLowerCase();
        const rows = document.getElementById("bookList").getElementsByTagName("tr");
        
        for (let row of rows) {
            const title = row.cells[1]?.textContent.toLowerCase();
            row.style.display = title.includes(filter) ? "" : "none";
        }
    });
});
function loadBooks() {
    fetch("http://localhost:5000/api/book/getAllBooks")
        .then(res => res.json())
        .then(books => {
            const bookList = document.getElementById("bookList");
            bookList.innerHTML = ""; // Clear existing
            books.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.available}</td>
                    <td>
                        <button class="update-btn" onclick="populateForm('${book.title}')">Update</button>
                        <button class="delete-btn" onclick="deleteBook('${book.title}')">Delete</button>
                    </td>
                `;
                bookList.appendChild(row);
            });
        });
}

document.addEventListener("DOMContentLoaded", loadBooks);
fetchBooks();