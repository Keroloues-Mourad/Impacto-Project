document.addEventListener('DOMContentLoaded', function () {

   
    const searchInput = document.getElementById('search-orders');
    const tableRows = document.querySelectorAll('#orders-table tbody tr');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase();
            tableRows.forEach(row => {
                const customer = row.cells[1]?.textContent.toLowerCase() || '';
                const orderId = row.cells[0]?.textContent.toLowerCase() || '';
                const hotel = row.cells[2]?.textContent.toLowerCase() || '';
                const item = row.cells[3]?.textContent.toLowerCase() || '';

                const match = orderId.includes(term) || customer.includes(term) ||
                              hotel.includes(term) || item.includes(term);

                row.style.display = match ? '' : 'none';
            });
        });
    }


    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            document.getElementById('search-orders').value = '';
            document.getElementById('filter-status').value = '';
            document.getElementById('filter-hotel').value = '';
            tableRows.forEach(row => row.style.display = '');
        });
    }

   
    document.querySelectorAll('.btn-success').forEach(btn => {
        btn.addEventListener('click', function () {
            const row = this.closest('tr');
            const statusCell = row.querySelector('td:nth-child(7)');
            if (statusCell) {
                statusCell.innerHTML = '<span class="badge bg-success">Approved</span>';
            
                alert('Order approved!');
            }
        });
    });

    
    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', function () {
            if (confirm('Are you sure you want to reject this order?')) {
                const row = this.closest('tr');
                const statusCell = row.querySelector('td:nth-child(7)');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="badge bg-danger">Rejected</span>';
                    alert('Order rejected.');
                }
            }
        });
    });

});