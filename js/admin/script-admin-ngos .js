// إدارة NGOs - JavaScript لاحقًا (بحث، حذف، تحرير، إلخ)
document.addEventListener('DOMContentLoaded', function () {
    // مثال: إضافة وظيفة بحث بسيطة
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                row.style.display = name.includes(filter) ? '' : 'none';
            });
        });
    }

    // يمكنك إضافة وظائف الحذف، التحرير، إلخ هنا لاحقًا
});