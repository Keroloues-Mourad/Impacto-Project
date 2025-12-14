document.addEventListener('DOMContentLoaded', function () {

    // === وظيفة عامة للبحث في الجداول ===
    function initTableSearch(searchInputId, tableId, searchableColumns) {
        const input = document.getElementById(searchInputId);
        const table = document.getElementById(tableId);
        if (!input || !table) return;

        const rows = table.querySelectorAll('tbody tr');

        input.addEventListener('input', () => {
            const term = input.value.toLowerCase();
            rows.forEach(row => {
                let found = false;
                searchableColumns.forEach(colIndex => {
                    const cell = row.cells[colIndex];
                    if (cell && cell.textContent.toLowerCase().includes(term)) {
                        found = true;
                    }
                });
                row.style.display = found ? '' : 'none';
            });
        });
    }

    // === البحث في صفحة التبرعات ===
    initTableSearch('search-donations', 'donations-table', [0, 1, 2, 3]); // ID, Restaurant, NGO, Type

    // === البحث في صفحة الطلبات (Last Order) ===
    initTableSearch('search-orders', 'orders-table', [0, 1, 2, 3]); // Order ID, Customer, Hotel, Item

    // === البحث في صفحة NGOs ===
    const ngoSearch = document.getElementById('search');
    if (ngoSearch) {
        ngoSearch.addEventListener('input', () => {
            const term = ngoSearch.value.toLowerCase();
            document.querySelectorAll('#ngos-table tbody tr').forEach(row => {
                const name = row.cells[1]?.textContent.toLowerCase() || '';
                row.style.display = name.includes(term) ? '' : 'none';
            });
        });
    }

    // === إعادة تعيين الفلاتر (إن وُجد زر Reset) ===
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.querySelectorAll('input, select').forEach(el => {
                if (el.type !== 'submit' && el.type !== 'button') el.value = '';
            });
            document.querySelectorAll('tbody tr').forEach(row => row.style.display = '');
        });
    }

    // === زر Accept/Reject (مثال تفاعلي) ===
    document.querySelectorAll('.btn-main').forEach(btn => {
        if (btn.textContent.trim() === 'Accept') {
            btn.addEventListener('click', () => {
                const row = btn.closest('tr');
                const statusCell = row.querySelector('td:nth-child(6)');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="badge bg-success">Accepted</span>';
                    alert('Donation accepted!');
                }
            });
        }
    });

    document.querySelectorAll('.btn-danger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Reject this donation?')) {
                const row = btn.closest('tr');
                const statusCell = row.querySelector('td:nth-child(6)');
                if (statusCell) {
                    statusCell.innerHTML = '<span class="badge bg-danger">Rejected</span>';
                    alert('Donation rejected.');
                }
            }
        });
    });

});