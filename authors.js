//////////////Retireve data from local storage and display on page///////////



function authorsdata() {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    const dataBody = document.getElementById('authorTable');
    const authorCounts = {};

    // Calculate author-wise book counts
    storedData.map(rowData => rowData.author)
    .forEach(author => {
        authorCounts[author] = (authorCounts[author] || 0) + 1;
    });
    //////////// //////////Display authors' data in the table////////////////////////////
    for (const author in authorCounts) {
        const totalBooks = authorCounts[author];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="innerrows">${author}</td>
            <td class="innerrows">${totalBooks}</td>
            <td class="innerrows">
                <button onclick="deleteAuthor('${author}')">Delete</button>
            </td>
        `;
        dataBody.appendChild(row);
    }
}

function deleteAuthor(author) {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    const newData = storedData.filter(data => data.author !== author);
    localStorage.setItem('StoredData', JSON.stringify(newData));
    refreshTable();
}

function refreshTable() {
    const dataBody = document.getElementById('authorTable');
    dataBody.innerHTML = '';
    authorsdata();
}

authorsdata(); // Call the function to display author data on page load



