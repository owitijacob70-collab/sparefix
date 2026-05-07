function runComparison() {
    const query = document.getElementById('searchInput').value;
    const resultsContainer = document.getElementById('comparison-results');

    if (query.length < 3) {
        alert("Please enter a valid model name");
        return;
    }

    // This is "Mock Data" - In the next step, we replace this with real database data
    const mockData = [
        { supplier: "Downtown Electronics", price: 3200, quality: "Original", delivery: "30 mins" },
        { supplier: "Luthuli Spares", price: 2800, quality: "AAA Grade", delivery: "1 hour" },
        { supplier: "Tech-Fix Wholesalers", price: 2500, quality: "Used", delivery: "2 hours" }
    ];

    resultsContainer.innerHTML = `<h3>Results for: ${query}</h3>`;

    mockData.forEach(item => {
        resultsContainer.innerHTML += `
            <div class="supplier-card">
                <strong>${item.supplier}</strong><br>
                <span>Quality: ${item.quality}</span><br>
                <span class="price-tag">KES ${item.price}</span><br>
                <small>Delivery: ${item.delivery}</small><br>
                <button style="background:#007BFF; margin-top:5px; width:100%">Order with Escrow</button>
            </div>
        `;
    });
}