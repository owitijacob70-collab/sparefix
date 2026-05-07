// 1. Import the Firebase Libraries from the web
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. PASTE YOUR PROJECT KEYS BELOW (Replace this block with yours)
const firebaseConfig = {
  apiKey: "AIzaSyB0yjspvD7fUOpQxVjxwldxZjfyAjLnGwU",
  authDomain: "sparefix-37faa.firebaseapp.com",
  projectId: "sparefix-37faa",
  storageBucket: "sparefix-37faa.firebasestorage.app",
  messagingSenderId: "922125349096",
  appId: "1:922125349096:web:f7e966591659b95b2bd95d",
  measurementId: "G-1FK300J903"
};

// 3. Initialize Firebase & Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. The Search Function
async function runComparison() {
    const searchTerm = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('comparison-results');
    
    if (!searchTerm) {
        alert("Please type a part name (e.g. iPhone 11 Screen)");
        return;
    }

    resultsContainer.innerHTML = "<p>Searching SpareFix Database...</p>";

    try {
        // Look for parts that MATCH the user's search
        const q = query(collection(db, "listings"), where("part_name", "==", searchTerm));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultsContainer.innerHTML = "<p>No suppliers found for that part. Try another name.</p>";
            return;
        }

        resultsContainer.innerHTML = ""; // Clear loader
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            resultsContainer.innerHTML += `
                <div class="supplier-card" style="border-left: 5px solid #007BFF; background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <strong style="font-size: 1.1em;">${data.supplier}</strong><br>
                    <span style="color: #666;">Part: ${data.part_name}</span><br>
                    <span style="font-weight: bold; color: #d9534f; font-size: 1.2em;">KES ${data.price}</span><br>
                    <button onclick="alert('M-Pesa Escrow coming soon!')" style="background:#28a745; color:white; border:none; padding:10px; width:100%; border-radius:5px; margin-top:10px; cursor:pointer;">Order Now</button>
                </div>
            `;
        });
    } catch (error) {
        console.error("Database Error:", error);
        resultsContainer.innerHTML = "<p>Connection error. Check your internet.</p>";
    }
}

// Ensure the button in index.html can see this function
window.runComparison = runComparison;
