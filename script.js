// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Récupération du formulaire
const form = document.getElementById("inscriptionForm");
const successMsg = document.getElementById("messageSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = form.nom.value.trim();
  const email = form.email.value.trim();
  const telephone = form.telephone.value.trim();
  const track = form.track.value;

  try {
    await db.collection("inscriptions").add({
      nom,
      email,
      telephone,
      track,
      date: new Date(),
      statut: "en attente",
    });

    form.reset();
    successMsg.style.display = "block";

    setTimeout(() => {
      successMsg.style.display = "none";
    }, 4000);
  } catch (error) {
    alert("Erreur lors de l'envoi : " + error.message);
  }
});
