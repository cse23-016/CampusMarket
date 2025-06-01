import supabase from './supabaseClient.js';

const productImage = document.getElementById("productImage");
const imagePreview = document.getElementById("imagePreview");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

// Handle image preview
productImage.addEventListener("change", function () {
  imagePreview.innerHTML = "";
  Array.from(this.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Product Image";
      img.addEventListener("click", () => {
        modalImage.src = img.src;
        modal.classList.remove("hidden");
      });
      imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Handle form submission
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const files = document.getElementById("productImage").files;
  const productName = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value || document.getElementById("otherCategory").value;
  const location = document.getElementById("location").value;

  // 1. Create product entry
  const { data: product, error: productError } = await supabase
    .from("product_listings")
    .insert([{ product_name: productName, price, product_description: description, category, base_location: location }])
    .select()
    .single();

  if (productError) {
    console.error("Product insert error:", productError);
    return;
  }

  const productId = product.product_id;

  // 2. Upload each image
  for (let file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 5)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('images').upload(fileName, file);

    if (error) {
      console.error("Image upload error:", error);
      continue;
    }

    const { data: urlData } = supabase.storage.from('images').getPublicUrl(fileName);

    // 3. Save image URL to product_images table
    await supabase.from("product_images").insert([{ product_id: productId, image_url: urlData.publicUrl }]);
  }

  alert("Product uploaded successfully!");
  location.reload();
});
