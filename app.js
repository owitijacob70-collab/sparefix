// 1. Import the Firebase Libraries from the web
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Added 'orderBy' to the imports below to enable price sorting
import { getFirestore, collection, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 2. YOUR PROJECT KEYS (Kept exactly from your file)
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
    // Converts input to lowercase and removes extra spaces
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('comparison-results');
    
    if (!searchTerm) {
        alert("Please type a part name (e.g. iphone 11 screen)");
        return;
    }

    resultsContainer.innerHTML = "<p>Searching SpareFix Database...</p>";

    try {
        // UPDATED QUERY: Now matches part_name AND sorts by price (lowest to highest)
        const q = query(
            collection(db, "listings"), 
            where("part_name", "==", searchTerm),
            orderBy("price", "asc")
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            resultsContainer.innerHTML = "<p>No suppliers found for '" + searchTerm + "'. Ensure the part name is lowercase in your database.</p>";
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
                    <span style="color: #555;">Location: ${data.location || 'Not Specified'}</span><br>
                    <button onclick="alert('M-Pesa Escrow coming soon!')" style="background:#28a745; color:white; border:none; padding:10px; width:100%; border-radius:5px; margin-top:10px; cursor:pointer;">Order Now</button>  
                </div>
            `;
        });
    } catch (error) {
        console.error("Database Error:", error);
        // This error often appears if the Firebase Index is still building
        resultsContainer.innerHTML = "<p>Connection error. If this is your first search, wait 2 minutes for the database to index.</p>";
    }
}

// Ensure the button in index.html can see this function
window.runComparison = runComparison;
