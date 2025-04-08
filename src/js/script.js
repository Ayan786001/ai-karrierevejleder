// scripts.js

document.getElementById('careerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const strengths = document.getElementById('strengths').value;
    const interests = document.getElementById('interests').value;

    if (!strengths || !interests) {
        alert("Please fill in both fields.");
        return;
    }

    // Clear previous recommendation result
    document.getElementById('recommendation-result').innerHTML = "Loading recommendation...";

    // Send user input to the backend API
    fetch('http://localhost:8080/api/recommendation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            input: `${strengths} ${interests}` // Combining both strengths and interests for the request
        })
    })
        .then(response => response.json())
        .then(data => {
            // Display the recommendation response
            const recommendationResult = data.recommendation || "No recommendation found. Please try again!";
            document.getElementById('recommendation-result').innerHTML = `<p><strong>Career Recommendation:</strong> ${recommendationResult}</p>`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error getting the recommendation. Please try again later.');
            document.getElementById('recommendation-result').innerHTML = "Error fetching recommendation.";
        });
});
