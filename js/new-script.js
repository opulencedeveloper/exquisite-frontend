// Select all accordion headers
const accordionHeaders = document.querySelectorAll(".accordion-header");

// Function to close all open accordions
function closeAllAccordions() {
  const allContents = document.querySelectorAll(".accordion-content");
  allContents.forEach((content) => {
    content.style.maxHeight = null;
    content.classList.remove("show");
  });

  accordionHeaders.forEach((header) => {
    header.classList.remove("active");
  });
}

accordionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const content = document.getElementById(
      "content-" + this.dataset.accordion
    );

    // Close all other accordions
    if (!content.classList.contains("show")) {
      closeAllAccordions();
    }

    // Toggle active class for header and caret rotation
    this.classList.toggle("active");

    // Toggle accordion content
    if (content.classList.contains("show")) {
      content.style.maxHeight = null;
      content.classList.remove("show");
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // Dynamically set height
      content.classList.add("show");
    }
  });
});


const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';​
const params = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 10,​
    page: 1,
    sparkline: false
};

