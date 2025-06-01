import supabase from './supabaseClient.js';

     const listingsContainer = document.getElementById('listings');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    let allProducts = [];

    async function fetchListings() {
      const { data, error } = await supabase
        .from('product_listings')
        .select('*, product_images(image_url)')
        .eq('status', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching listings:', error.message);
        return;
      }

      allProducts = data;
      populateCategoryFilter();
      renderListings(data);
    }

    function populateCategoryFilter() {
      const categories = Array.from(new Set(allProducts.map(p => p.category))).filter(Boolean);
      categories.forEach(category => {
        const opt = document.createElement('option');
        opt.value = category;
        opt.textContent = category;
        categoryFilter.appendChild(opt);
      });
    }

    function renderListings(products) {
      listingsContainer.innerHTML = '';
      if (products.length === 0) {
        listingsContainer.innerHTML = '<p style="text-align:center;">No products found.</p>';
        return;
      }

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
          <img src="${product.product_image || 'https://via.placeholder.com/250'}" alt="${product.product_name}" />
          <h3>${product.product_name}</h3>
          <p><strong>Price:</strong> $${parseFloat(product.price).toFixed(2)}</p>
          <p>${product.product_description || ''}</p>
          <p><strong>Category:</strong> ${product.category || 'N/A'}</p>
          <p><strong>Location:</strong> ${product.base_location || 'N/A'}</p>
        `;

        listingsContainer.appendChild(card);
      });
    }

    function filterAndSearch() {
      const category = categoryFilter.value.toLowerCase();
      const searchText = searchInput.value.toLowerCase();

      const filtered = allProducts.filter(product => {
        const matchesCategory = !category || (product.category && product.category.toLowerCase() === category);
        const matchesSearch = product.product_name.toLowerCase().includes(searchText) ||
                              (product.product_description && product.product_description.toLowerCase().includes(searchText));
        return matchesCategory && matchesSearch;
      });

      renderListings(filtered);
    }

    categoryFilter.addEventListener('change', filterAndSearch);
    searchInput.addEventListener('input', filterAndSearch);

    fetchListings();