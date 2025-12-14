// script.js
document.addEventListener('DOMContentLoaded', function () {
    // البحث (للاستعداد)
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            console.log('Searching for:', this.value);
            // هنا تقدر تضيف منطق البحث لاحقًا
        });
    }

    // تأكيد الحذف
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', function () {
            if (!confirm('Are you sure you want to delete this restaurant?')) {
                event.preventDefault();
            }
        });
    });
});