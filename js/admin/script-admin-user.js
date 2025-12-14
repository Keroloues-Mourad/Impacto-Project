// script.js
// يمكنك إضافة وظائف JavaScript هنا لاحقًا

document.addEventListener('DOMContentLoaded', function () {
    // مثال: إضافة وظيفة بسيطة للبحث (سيتم تنفيذها لاحقًا)
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', function () {
            console.log('Searching for:', this.value);
            // هنا تقدر تضيف منطق البحث لاحقًا
        });
    }

    // مثال: تنبيه عند الضغط على زر الحذف
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', function () {
            if (confirm('Are you sure you want to delete this user?')) {
                // هنا يروح الكود اللي بيحذف المستخدم (من خلال API مثلاً)
                console.log('Delete confirmed');
            }
        });
    });
});