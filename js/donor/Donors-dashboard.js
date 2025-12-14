// مثال: تحديث القيم تلقائياً (يمكن لاحقاً ربطها بقاعدة بيانات)
document.addEventListener("DOMContentLoaded", () => {
    
    // تحديث إحصائيات (كمثال فقط)
    const total = 48;
    const pending = 12;
    const accepted = 30;
    const rejected = 6;

    document.getElementById("totalDonations").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("acceptedCount").textContent = accepted;
    document.getElementById("rejectedCount").textContent = rejected;

});