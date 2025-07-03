fetch("services.json")
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

  let allServices = {};

fetch("states.json")
  .then(res => res.json())
  .then(states => {
    const stateSelector = document.createElement("select");
    stateSelector.innerHTML = `<option>Select State</option>` +
      states.map(state => `<option value="${state}">${state}</option>`).join("");
    document.getElementById("state-dropdown-container").appendChild(stateSelector);


    stateSelector.addEventListener("change", (e) => {
      const selected = e.target.value;
      if (allServices[selected]) renderServices(allServices[selected]);
    });
  });

fetch("services.json")
  .then(res => res.json())
  .then(data => {
    allServices = data;
  });

function renderServices(services) {
  const list = document.getElementById("service-list");
  const details = document.getElementById("service-details");
  list.innerHTML = "";
  details.innerHTML = "";
  details.style.display = "none";

  services.forEach(service => {
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
}
