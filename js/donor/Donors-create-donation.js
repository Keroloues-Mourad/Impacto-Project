document.getElementById("donationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let donor = document.getElementById("donorType").value;
    let type = document.getElementById("foodType").value;
    let qty = document.getElementById("quantity").value;
    let exp = document.getElementById("expiry").value;

    if (donor === "" || type === "" || qty === "" || exp === "") {
        alert("Please fill required fields");
        return;
    }

    alert("Donation submitted successfully!");
});