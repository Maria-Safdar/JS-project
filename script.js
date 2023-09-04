////////////////////save form data function is used to store data in local storage////////////////////////
function saveFormData() {
        const book = document.getElementById('bookName').value;
        const author = document.getElementById('authorName').value;
        const publisher = document.getElementById('publisherName').value;
        const date = document.getElementById('publishDate').value;
    
        const data = {
            book: book,
            author: author,
            publisher: publisher,
            date: date
        };
    //JSON parse is convert the data into string to store data in local storage,
        const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
        storedData.push(data);
    //store data in form of strings.Stored Data store an array in local storage.
        localStorage.setItem('StoredData', JSON.stringify(storedData));
    
        alert('Form data stored in local storage');
        ////////////////////////// Navigating to Main Page////////////////////////
function goToMainPage() {
    window.location.href = 'mainpage.html';
}


//////////////////////////// Displaying Stored Data on Main Page and retrive from local storage///////////////////////


document.addEventListener('DOMContentLoaded', function() {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    const dataBody = document.getElementById('dataBody');

    storedData.forEach((rowData, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rowData.book}</td>
            <td>${rowData.author}</td>
            <td>${rowData.publisher}</td>
            <td>${rowData.date}</td>
            <td>
                <button onclick="deleteRow(${index})"style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Delete</button>
                <button onclick="editRow(${index})"style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Update</button>
            </td>
        `;
        dataBody.appendChild(row);
    });
});
////////////////////To delete the rows.//////////////////
function deleteRow(index) {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    storedData.splice(index, 1);
    localStorage.setItem('StoredData', JSON.stringify(storedData));
    refreshTable();
}
///////////////////After deleting the row the table will refresh and display data that is left////////////////
function refreshTable() {
    const dataBody = document.getElementById('dataBody');
    dataBody.innerHTML = '';

    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');

    ////////////////////////////// After refreshing rows will be appear/////////////////////////////////
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Book Name</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>Date</th>
        <th>Actions</th>
    `;
    dataBody.appendChild(headerRow);

    ///////////////// Create rows for each data item///////////////////
    for (const rowData of storedData) {
        const row = document.createElement('tr');
        const actions = `
            <td>
                <button onclick="deleteRow(${storedData.indexOf(rowData)})" style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Delete</button>
                <button onclick="editRow(${storedData.indexOf(rowData)})" style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Update</button>
            </td>
        `;

        row.innerHTML = `
            <td>${rowData.book}</td>
            <td>${rowData.author}</td>
            <td>${rowData.publisher}</td>
            <td>${rowData.date}</td>
            ${actions}
        `;
        dataBody.appendChild(row);
    }
}

/////////////////////////////////To done Update Function///////////////////////////////

function editRow(index) {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');

    // Retrieve the row's current data
    const currentData = storedData[index];

    // Get updated data from user (you can implement this part using prompts or input fields)
    const updatedBook = prompt('Enter updated book name:', currentData.book);
    const updatedAuthor = prompt('Enter updated author name:', currentData.author);
    const updatedPublisher = prompt('Enter updated publisher:', currentData.publisher);
    const updatedDate = prompt('Enter updated date:', currentData.date);

    // Update the data
    storedData[index] = {
        book: updatedBook,
        author: updatedAuthor,
        publisher: updatedPublisher,
        date: updatedDate
    };

    // Save the updated data back to local storage
    localStorage.setItem('StoredData', JSON.stringify(storedData));

    // Refresh the table to reflect the changes
    refreshTable();
}
}
