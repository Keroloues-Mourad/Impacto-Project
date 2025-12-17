const API = 'http://localhost:3000/api';
const token = localStorage.getItem('token');

fetch(`${API}/courier/dashboard`, {
  headers: {
    Authorization: 'Bearer ' + token
  }
})
  .then(res => res.json())
  .then(data => {
    document.getElementById('availableCount').innerText = data.available;
    document.getElementById('acceptedCount').innerText = data.accepted;
    document.getElementById('deliveredToday').innerText = data.deliveredToday;
    document.getElementById('rating').innerText = data.rating;

    const list = document.getElementById('tasksList');
    list.innerHTML = '';

    if (data.tasks.length === 0) {
      list.innerHTML = '<li>No current tasks</li>';
      return;
    }

    data.tasks.forEach(task => {
      const li = document.createElement('li');
      li.innerText = `Order #${task.id} — ${task.food_type}`;
      list.appendChild(li);
    });
  })
  .catch(() => {
    alert('Failed to load dashboard');
  });
