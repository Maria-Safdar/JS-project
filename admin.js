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
}
////////////////////Navigating to Main Page///////////////////
function goToMainPage() {
window.location.href = 'mainpage.html';
}
//////////////////////////// Displaying Stored Data on Main Page and retrive from local storage///////////////////////


document.addEventListener('DOMContentLoaded', function() {
const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
const dataBody = document.getElementById('dataBody');

const headerRow = `
<tr>
    <th>Number</th>
    <th>Book Name</th>
    <th>Author</th>
    <th>Publisher</th>
    <th>Date</th>
    <th>Actions</th>
</tr>
`;

const rows = storedData.map((rowData, index) => {
return createRow(rowData, index + 1);
});

dataBody.innerHTML = headerRow + rows.join('');
});

function createRow(rowData, rowNumber) {
const actions = `
<td class="innerrows">
    <button onclick="deleteRow(${rowNumber - 1})" style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Delete</button>
    <button onclick="editRow(${rowNumber - 1})" style="background-color: #007bff;color:white; border: none; padding: 10px 20px;">Update</button>
</td>
`;

return `
<tr>
    <td class="innerrows">${rowNumber}</td>
    <td class="innerrows">${rowData.book}</td>
    <td class="innerrows">${rowData.author}</td>
    <td class="innerrows">${rowData.publisher}</td>
    <td class="innerrows">${rowData.date}</td>
    ${actions}
</tr>
`;
}
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

// Retrieve the row current data
const currentData = storedData[index];

// Get updated data from user 
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



