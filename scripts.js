document.addEventListener("DOMContentLoaded", () => {
    const articles1 = [
        {
            title: "Top Journal Articles of 2023",
            img: "https://www.apa.org/images/monitor-january-2023_tcm7-309150.png",
            url: "https://www.apa.org/monitor/2023/01/top-journal-articles"
        },
        {
            title: "10 Superfoods to Boost a Healthy Diet",
            img: "https://www.health.harvard.edu/media/content/images/p1_superfoods_s.jpg",
            url: "https://www.health.harvard.edu/staying-healthy/10-superfoods-to-boost-a-healthy-diet"
        },
        {
            title: "2022 Product of the Year Awards",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/product-of-the-year.jpg",
            url: "https://www.electronicproducts.com/electronic-products-announces-winners-of-the-2022-product-of-the-year-awards/"
        }
    ];
    
    const articles2 = [
        {
            title: "Top 10 5G Chips and Modules",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/5G.jpg",
            url: "https://www.electronicproducts.com/top-10-5g-chips-and-modules/"
        },
        {
            title: "Top 10 Image Sensors",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/image-sensors.jpg",
            url: "https://www.electronicproducts.com/top-10-image-sensors/"
        },
        {
            title: "Designer's Guide to Automotive Processors",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/automotive-processors.jpg",
            url: "https://www.electronicproducts.com/designers-guide-automotive-processors/"
        }
    ];
    
    const articles3 = [
        {
            title: "APEC 2023: Advances in Power Devices",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/power-devices.jpg",
            url: "https://www.electronicproducts.com/apec-2023-underscores-advances-in-power-devices/"
        },
        {
            title: "How Hall Effect Sensors Make Better Joysticks",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/hall-effect-sensors.jpg",
            url: "https://www.electronicproducts.com/how-hall-effect-sensors-can-make-better-joysticks/"
        },
        {
            title: "Bosch Unveils New Sensors at CES",
            img: "https://www.electronicproducts.com/wp-content/uploads/2022/10/bosch-sensors.jpg",
            url: "https://www.electronicproducts.com/bosch-unveils-new-sensors-at-ces/"
        }
    ];

    const article1 = document.getElementById("article1");
    const article2 = document.getElementById("article2");
    const article3 = document.getElementById("article3");

    let index1 = 0;
    let index2 = 0;
    let index3 = 0;

    function rotateArticles() {
        index1 = (index1 + 1) % articles1.length;
        index2 = (index2 + 1) % articles2.length;
        index3 = (index3 + 1) % articles3.length;

        updateArticle(article1, articles1[index1]);
        updateArticle(article2, articles2[index2]);
        updateArticle(article3, articles3[index3]);
    }

    function updateArticle(element, article) {
        element.querySelector("h3").textContent = article.title;
        element.querySelector("img").src = article.img;
        element.href = article.url;
    }

    setInterval(rotateArticles, 3000); // Rotate every 3 seconds
});
