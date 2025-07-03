fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("service-list");
    const details = document.getElementById("service-details");

    data.forEach(service => {
      const div = document.createElement("div");
      div.className = "service-card";
      div.innerHTML = `<h3>${service.title}</h3><p>${service.category}</p>`;
      div.onclick = () => showDetails(service);
      list.appendChild(div);
    });

    function showDetails(service) {
      details.innerHTML = `
        <h2>${service.title}</h2>
        <h4>Required Documents:</h4>
        <ul>${service.documents.map(doc => `<li>${doc}</li>`).join("")}</ul>
        <h4>Steps:</h4>
        <ol>${service.steps.map(step => `<li>${step}</li>`).join("")}</ol>
        <p><a href="${service.link}" target="_blank">Official Portal</a></p>
      `;
      details.style.display = "block";
      window.scrollTo({ top: details.offsetTop - 40, behavior: "smooth" });
    }
  });
