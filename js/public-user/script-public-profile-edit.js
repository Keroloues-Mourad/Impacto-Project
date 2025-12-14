
document.getElementById("imgInput").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        document.getElementById("previewImage").src = URL.createObjectURL(file);
    }
});


function saveProfile(event) {
    event.preventDefault();

    alert("Profile updated successfully!");

   
}
