// Admin password
const ADMIN_PASSWORD = 'pinksones'; 

// Store purchase data temporarily
const userPurchases = {};

// Admin login validation
function validatePassword() {
    const enteredPassword = document.getElementById('adminPasswordInput').value.trim();

    if (enteredPassword === ADMIN_PASSWORD) {
        // Show the input, edit, and delete forms after successful login
        document.getElementById('inputSection').style.display = 'block';
        document.getElementById('editSection').style.display = 'block';
        document.getElementById('deleteSection').style.display = 'block';
        alert('Welcome, Admin!');
    } else {
        alert('Incorrect password.');
    }

    // Clear the password input field
    document.getElementById('adminPasswordInput').value = '';
}

// Handle purchase data submission
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value.trim();
    const purchases = document.getElementById('purchasesInput').value.trim();

    if (name && purchases) {
        // Save purchases to the userPurchases object
        userPurchases[name] = purchases.split(',').map(item => item.trim());

        // Clear form fields
        document.getElementById('nameInput').value = '';
        document.getElementById('purchasesInput').value = '';

        alert('Purchases saved successfully!');
    } else {
        alert('Please fill in both fields.');
    }
});

// Handle purchase data update
document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('editNameInput').value.trim();
    const newPurchases = document.getElementById('editPurchasesInput').value.trim();

    if (name && newPurchases) {
        // If the user already exists, append new purchases to the existing list
        if (userPurchases[name]) {
            userPurchases[name] = userPurchases[name].concat(newPurchases.split(',').map(item => item.trim()));
            alert('Purchases updated successfully!');
        } else {
            alert('User not found.');
        }

        // Clear form fields
        document.getElementById('editNameInput').value = '';
        document.getElementById('editPurchasesInput').value = '';
    } else {
        alert('Please fill in both fields.');
    }
});

// Handle deletion of purchases
document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('deleteNameInput').value.trim();

    if (name) {
        // If the user exists, show their purchases and provide delete buttons
        const purchases = userPurchases[name];
        const deleteItemList = document.getElementById('deleteItemList');
        deleteItemList.innerHTML = '';  // Clear previous results

        if (purchases) {
            purchases.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item;

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function() {
                    deleteItem(name, index);
                };

                li.appendChild(deleteButton);
                deleteItemList.appendChild(li);
            });
        } else {
            deleteItemList.innerHTML = "<li>No purchases found for this name.</li>";
        }
    } else {
        alert("Please enter a name.");
    }

    // Clear the delete name input field
    document.getElementById('deleteNameInput').value = '';
});

// Function to delete an item
function deleteItem(name, index) {
    const purchases = userPurchases[name];
    if (purchases) {
        // Remove the item at the specified index
        purchases.splice(index, 1);
        alert('Item deleted successfully!');

        // Refresh the delete section to show the updated list
        const deleteItemList = document.getElementById('deleteItemList');
        deleteItemList.innerHTML = ''; // Clear previous list
        purchases.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteItem(name, index);
            };

            li.appendChild(deleteButton);
            deleteItemList.appendChild(li);
        });
    }
}

// Search function
function searchPurchases() {
    const name = document.getElementById('searchNameInput').value.trim();

    if (name === "") {
        alert("Please enter a name.");
        return;
    }

    const purchases = userPurchases[name];
    const purchaseList = document.getElementById('purchaseList');
    purchaseList.innerHTML = '';  // Clear previous results

    if (purchases) {
        purchases.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            purchaseList.appendChild(li);
        });
    } else {
        purchaseList.innerHTML = "<li>No purchases found for this name.</li>";
    }
}