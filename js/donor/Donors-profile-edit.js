// Populate fields from localStorage
window.onload = function () {
    let saved = localStorage.getItem("restaurantProfile");

    if (saved) {
        let data = JSON.parse(saved);

        document.getElementById("restName").value = data.restName;
        document.getElementById("managerName").value = data.managerName;
        document.getElementById("email").value = data.email;
        document.getElementById("phone").value = data.phone;
        document.getElementById("restType").value = data.restType;
    }
};

// Preview uploaded image
document.getElementById("imgInput").addEventListener("change", function () {
    let file = this.files[0];
    if (file) {
        document.getElementById("previewImg").src = URL.createObjectURL(file);
    }
});

// Save data
document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        restName: document.getElementById("restName").value,
        managerName: document.getElementById("managerName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        restType: document.getElementById("restType").value
    };

    localStorage.setItem("restaurantProfile", JSON.stringify(data));

    // Redirect
    window.location.href = "restaurant-profile.html";
});