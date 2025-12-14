// Load profile data from localStorage
const saved = localStorage.getItem("restaurantProfile");

if (saved) {
    const data = JSON.parse(saved);

    document.getElementById("restName").textContent = data.restName;
    document.getElementById("managerName").innerHTML = "<strong>Manager Name:</strong> " + data.managerName;
    document.getElementById("email").innerHTML = "<strong>Email:</strong> " + data.email;
    document.getElementById("phone").innerHTML = "<strong>Phone:</strong> " + data.phone;
    document.getElementById("restType").innerHTML = "<strong>Restaurant Type:</strong> " + data.restType;

    
    if (data.imgURL) {
        document.getElementById("profileImg").src = data.imgURL;
    }
}

// Add home button dynamically
const homeBtn = document.createElement("a");
homeBtn.textContent = "Back to Home";
homeBtn.className = "btn btn-secondary w-100 mt-3";
homeBtn.href = "Donors-dashboard.html";

document.querySelector(".profile-box").appendChild(homeBtn);