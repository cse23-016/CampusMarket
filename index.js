document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-box input");
  const products = document.querySelectorAll(".featured-products .product");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    products.forEach(product => {
      const name = product.querySelector("strong").textContent.toLowerCase();
      const description = product.querySelectorAll("p")[1].textContent.toLowerCase();

      if (name.includes(query) || description.includes(query)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });
});
