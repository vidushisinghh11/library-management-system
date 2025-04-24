
CREATE DATABASE IF NOT EXISTS library;
USE library;

-- ADMINS TABLE (Replaces Users)
CREATE TABLE Admins (
    AdminID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    PasswordHash VARCHAR(255)
);

-- BOOKS TABLE
CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Genre VARCHAR(50),
    ISBN VARCHAR(20) UNIQUE,
    PublishedYear INT,
    Quantity INT 
);

-- TRANSACTIONS TABLE (Updated: UserID → AdminID)
CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT,
    BookID INT,
    IssueDate DATE,
    DueDate DATE NOT NULL,
    ReturnDate DATE,
    Status ENUM('Issued', 'Returned') DEFAULT 'Issued',
    Fine DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- FINES TABLE
CREATE TABLE Fines (
    FineID INT AUTO_INCREMENT PRIMARY KEY,
    TransactionID INT,
    Amount DECIMAL(10,2) NOT NULL,
    PaidStatus ENUM('Paid', 'Unpaid') DEFAULT 'Unpaid',
    FOREIGN KEY (TransactionID) REFERENCES Transactions(TransactionID)
);

-- RESERVATIONS TABLE
CREATE TABLE Reservations (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    AdminID INT,
    BookID INT,
    ReservationDate DATE,
    Status ENUM('Pending', 'Cancelled', 'Fulfilled') DEFAULT 'Pending',
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
);

-- TRIGGER TO UPDATE BOOK QUANTITY ON ISSUE
DELIMITER //
CREATE TRIGGER UpdateBookQuantityAfterIssue
AFTER INSERT ON Transactions
FOR EACH ROW
BEGIN
    UPDATE Books
    SET Quantity = Quantity - 1
    WHERE BookID = NEW.BookID;
END;
//
DELIMITER ;

-- TRIGGER TO UPDATE BOOK QUANTITY ON RETURN
DELIMITER //
CREATE TRIGGER UpdateBookQuantityAfterReturn
AFTER UPDATE ON Transactions
FOR EACH ROW
BEGIN
    IF NEW.Status = 'Returned' THEN
        UPDATE Books
        SET Quantity = Quantity + 1
        WHERE BookID = NEW.BookID;
    END IF;
END;
//
DELIMITER ;

-- FUNCTION TO CALCULATE FINE BASED ON RETURN DATE
DELIMITER //
CREATE FUNCTION CalculateFine(due_date DATE, return_date DATE) RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
    DECLARE fine DECIMAL(10,2);
    IF return_date > due_date THEN
        SET fine = DATEDIFF(return_date, due_date) * 5;
    ELSE
        SET fine = 0;
    END IF;
    RETURN fine;
END;
//
DELIMITER ;

-- VIEW TO DISPLAY ADMIN TRANSACTIONS
CREATE VIEW AdminTransactions AS
SELECT t.TransactionID, a.Name, b.Title, t.IssueDate, t.DueDate, t.ReturnDate, t.Status, t.Fine
FROM Transactions t
JOIN Admins a ON t.AdminID = a.AdminID
JOIN Books b ON t.BookID = b.BookID;

-- STORED PROCEDURE TO GET OVERDUE BOOKS
DELIMITER //
CREATE PROCEDURE GetOverdueBooks()
BEGIN
    SELECT t.TransactionID, a.Name, b.Title, t.DueDate, t.Fine
    FROM Transactions t
    JOIN Admins a ON t.AdminID = a.AdminID
    JOIN Books b ON t.BookID = b.BookID
    WHERE t.Status = 'Issued' AND t.DueDate < CURDATE();
END;
//
DELIMITER ;
