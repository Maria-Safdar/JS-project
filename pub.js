/////////retrieve data from local storage


function publishersdata() {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    const dataBody = document.getElementById('publisherTable');
    const publisherCounts = {};

    // ////////////Calculate publisher-wise book counts
    storedData.map(rowData => rowData.publisher)
    .forEach(publisher => {
        publisherCounts[publisher] = (publisherCounts[publisher] || 0) + 1;
    });

    ////////////////// Display publishers' data in the table
    for (const publisher in publisherCounts) {
        const totalBooks = publisherCounts[publisher];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="innerrows">${publisher}</td>
            <td class="innerrows">${totalBooks}</td>
            <td class="innerrows">
                <button onclick="deletePublisher('${publisher}')">Delete</button>
            </td>
        `;
        dataBody.appendChild(row);
    }
}

function deletePublisher(publisher) {
    const storedData = JSON.parse(localStorage.getItem('StoredData') || '[]');
    const newData = storedData.filter(data => data.publisher !== publisher);
    localStorage.setItem('StoredData', JSON.stringify(newData));
    refreshTable();
}

function refreshTable() {
    const dataBody = document.getElementById('publisherTable');
    dataBody.innerHTML = '';
    publishersdata();
}

publishersdata(); // Call the function to display publisher data on page load
