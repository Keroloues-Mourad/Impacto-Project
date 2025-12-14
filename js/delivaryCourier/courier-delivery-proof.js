
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (id) {
    document.getElementById("donationTitle").innerText = "Donation #" + id;
}


function confirmDelivery() {
    alert("Delivery has been marked as completed!");
    return true; 
}
