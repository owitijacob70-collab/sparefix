import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Use your exact Firebase Config from app.js
const firebaseConfig = {
  apiKey: "AIzaSyB0yjspvD7fUOpQxVjxwldxZjfyAjLnGwU",
  authDomain: "sparefix-37faa.firebaseapp.com",
  projectId: "sparefix-37faa",
  storageBucket: "sparefix-37faa.firebasestorage.app",
  messagingSenderId: "922125349096",
  appId: "1:922125349096:web:f7e966591659b95b2bd95d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadForm = document.getElementById('uploadForm');
const statusMessage = document.getElementById('statusMessage');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Capture data and format it
    const supplier = document.getElementById('supplierName').value;
    const part_name = document.getElementById('partName').value.trim().toLowerCase();
    const price = parseFloat(document.getElementById('partPrice').value); // Saves as Number/Double
    const location = document.getElementById('location').value;
    const contact = document.getElementById('contact').value;

    statusMessage.innerText = "Saving...";

    try {
        await addDoc(collection(db, "listings"), {
            supplier: supplier,
            part_name: part_name,
            price: price,
            location: location,
            contact: contact,
            timestamp: new Date()
        });
        statusMessage.style.color = "green";
        statusMessage.innerText = "Part added successfully!";
        uploadForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        statusMessage.style.color = "red";
        statusMessage.innerText = "Error: Could not save data.";
    }
});