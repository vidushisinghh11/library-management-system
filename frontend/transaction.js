const API_BASE = "http://localhost:5000/api/transaction";
document.addEventListener('DOMContentLoaded', fetchTransactions);

// Issue Book
document.getElementById('issue-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const adminID = document.getElementById('admin-id').value;
  const bookID = document.getElementById('book-id').value;
  const issueDate = document.getElementById('issue-date').value;
  const dueDate = document.getElementById('due-date').value;

  try {
    const res = await fetch(`${API_BASE}/issue`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminID, bookID, issueDate, dueDate })
    });

    const data = await res.json();
    if (res.ok) {
      showPopup(data.message || "Book issued successfully!");
      document.getElementById('issue-form').reset();
      fetchTransactions();
    } else {
      alert(data.error || "Issue failed.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Return Book
document.getElementById('return-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const transactionID = document.getElementById('transaction-id').value;
  const returnDate = document.getElementById('return-date').value;

  try {
    const res = await fetch(`${API_BASE}/return`, {
      method: 'POST', // ✅ Correct: POST method
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionID, returnDate })
    });

    const data = await res.json();
    if (res.ok) {
      showPopup(data.message || "Book returned successfully!");
      document.getElementById('return-form').reset();
      fetchTransactions();
    } else {
      alert(data.error || "Return failed.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Fetch Transaction History
async function fetchTransactions() {
  try {
    const res = await fetch(`${API_BASE}`);
    const transactions = await res.json();
    
    // Log the transactions data to check what is returned
    console.log("Transactions data:", transactions);
    
    const tableBody = document.querySelector("#transaction-table tbody");
    tableBody.innerHTML = "";

    if (transactions.length === 0) {
      console.log("No transactions found.");
    }

    transactions.forEach(t => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${t.TransactionID}</td>
        <td>${t.AdminName}</td>
        <td>${t.BookTitle}</td>
        <td>${t.IssueDate}</td>
        <td>${t.DueDate}</td>
        <td>${t.ReturnDate || '-'}</td>
        <td>${t.Status}</td>
        <td>₹${parseFloat(t.Fine).toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading transactions:", err);
  }
}


// Popup function
function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}

// Load transactions on page load
document.addEventListener('DOMContentLoaded', fetchTransactions);
