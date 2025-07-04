firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Vérifier l'authentification
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html"; // Rediriger si non connecté
  }
});
// Gérer l'envoi des messages
document.querySelectorAll(".btn-message").forEach((button) => {
  button.addEventListener("click", () => {
    const docId = button.getAttribute("data-id");
    const messageContent = document.getElementById(`msg-${docId}`).value.trim();

    if (messageContent) {
      db.collection("inscriptions")
        .doc(docId)
        .collection("messages")
        .add({
          contenu: messageContent,
          date: new Date(),
        })
        .then(() => {
          alert("Message envoyé ✅");
          document.getElementById(`msg-${docId}`).value = "";
        });
    } else {
      alert("Le message est vide.");
    }
  });
});
// Statistiques
let total = 0,
  frontend = 0,
  excel = 0,
  confirmes = 0;

snapshot.forEach((doc) => {
  const data = doc.data();
  total++;
  if (data.track === "frontend") frontend++;
  if (data.track === "excel") excel++;
  if (data.statut === "confirmé") confirmes++;
});

document.getElementById("stat-total").innerText = total;
document.getElementById("stat-frontend").innerText = frontend;
document.getElementById("stat-excel").innerText = excel;
document.getElementById("stat-confirmes").innerText = confirmes;

card.innerHTML = `
  <div class="card-header">
    <h3>${data.nom}</h3>
    <span class="track-badge">${
      data.track === "frontend" ? "Front-End" : "Excel"
    }</span>
  </div>
  <p><strong>Email:</strong> ${data.email}</p>
  <p><strong>Téléphone:</strong> ${data.telephone}</p>
  <p class="status">Statut: ${data.statut}</p>
  ${
    data.statut === "confirmé"
      ? ""
      : `<button class="btn-confirmer" data-id="${id}">Confirmer</button>`
  }

  <textarea placeholder="Message au candidat" class="message-area" id="msg-${id}"></textarea>
  <button class="btn-message" data-id="${id}">Envoyer le message</button>
`;

// Permet aussi de se déconnecter si besoin

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const candidatsList = document.getElementById("candidatsList");
const filtre = document.getElementById("filtre");

// Charger les candidatures
function chargerCandidats(track = "all") {
  db.collection("inscriptions")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      candidatsList.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;

        if (track !== "all" && data.track !== track) return;

        const card = document.createElement("div");
        card.className = "candidat-card";

        card.innerHTML = `
        <div class="card-header">
          <h3>${data.nom}</h3>
          <span class="track-badge">${
            data.track === "frontend" ? "Front-End" : "Excel"
          }</span>
        </div>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Téléphone:</strong> ${data.telephone}</p>
        <p class="status">Statut: ${data.statut}</p>
        ${
          data.statut === "confirmé"
            ? ""
            : `<button class="btn-confirmer" data-id="${id}">Confirmer</button>`
        }
      `;

        candidatsList.appendChild(card);
      });

      // Gérer les clics sur "Confirmer"
      document.querySelectorAll(".btn-confirmer").forEach((button) => {
        button.addEventListener("click", () => {
          const docId = button.getAttribute("data-id");
          confirmerCandidat(docId);
        });
      });
    });
}

function confirmerCandidat(id) {
  db.collection("inscriptions")
    .doc(id)
    .update({
      statut: "confirmé",
    })
    .then(() => {
      chargerCandidats(filtre.value);
    });
}

// Initialisation
filtre.addEventListener("change", () => {
  chargerCandidats(filtre.value);
});

window.onload = () => {
  chargerCandidats();
};
