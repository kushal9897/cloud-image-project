document.addEventListener("DOMContentLoaded", () => {
    loadCategory("world"); // Load default category
});

function loadCategory(category) {
    fetch(`http://localhost:5000/news?category=${category}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById("news-container");
            newsContainer.innerHTML = "";

            data.forEach(news => {
                const newsCard = document.createElement("div");
                newsCard.classList.add("news-card");

                newsCard.innerHTML = `
                    <img src="${news.image}" alt="News Image">
                    <div>
                        <h2>${news.title}</h2>
                        <p>${news.content.substring(0, 100)}...</p>
                        <button class="more-button" onclick="readMore('${news._id}')">More</button>
                    </div>
                `;

                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.error("Error fetching news:", error));
}

function readMore(newsId) {
    window.location.href = `news.html?id=${newsId}`;
}
