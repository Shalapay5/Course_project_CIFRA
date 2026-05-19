let allItems = [];



function loadAndRender(categoryId) {

    fetch('data.xml')
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            let productNodes;

            if (categoryId === 'all') {
                productNodes = xmlDoc.getElementsByTagName('product');
                document.getElementById('category-title').textContent = "Каталог";
            } else {
                const category = xmlDoc.querySelector(`category[id="${categoryId}"]`);
                productNodes = category.getElementsByTagName('product');
                document.getElementById('category-title').textContent = category.getAttribute('title');
            }

            allItems = Array.from(productNodes).map(p => ({

                name: p.getElementsByTagName('name')[0].textContent,
                cost: parseFloat(p.getElementsByTagName('cost')[0].textContent),
                img: p.getElementsByTagName('img')[0].textContent,
                brand: p.getElementsByTagName('brand')[0]?.textContent || '',
                specs: Array.from(p.getElementsByTagName('item')).map(i => i.textContent)

            }));

            const brandParam = new URLSearchParams(window.location.search).get('brand');
            if (brandParam) {
                const checkbox = document.querySelector(`.brand-filter[value="${brandParam}"]`);
                if (checkbox) checkbox.checked = true;
            }

            applyFilters(); // Сразу запускаем фильтрацию
        });

    }



function applyFilters() {
    const minPrice = parseFloat(document.getElementById('price-from').value) || 0;
    const maxPrice = parseFloat(document.getElementById('price-to').value) || Infinity;
    const activeBrands = Array.from(document.querySelectorAll('.brand-filter:checked'))
    .map(cb => cb.value);

    const filtered = allItems.filter(item => {

        const priceMatch = item.cost >= minPrice && item.cost <= maxPrice;
        const brandMatch = activeBrands.length === 0 || activeBrands.includes(item.brand);
        return priceMatch && brandMatch;

    });



    renderHTML(filtered);

}



function renderHTML(products) {

    const container = document.querySelector('.catalog');

    container.innerHTML = products.map(p => `

        <article>
            <img src="${p.img}" class="desktop-img">
            <div class="info">

                <div class="name-cost">

                    <p class="name">${p.name}</p>

                    <a class="cost" href="item.html?name=${p.name}">${p.cost} BYN</a>

                </div>

                <div class="mobile-img-specs">

                <img src="${p.img}" class="mobile-img">

                <div class="specs">

                ${p.specs.map(s => `<p>${s}</p>`).join('')}

                </div>

                </div>

            </div>

            <a class="more" href="item.html?name=${p.name}">Подробнее</a>

        </article>

    `).join('');

}



document.addEventListener('change', (e) => {

    if (e.target.classList.contains('brand-filter') || e.target.classList.contains('price-input')) {

        applyFilters();

    }

});



const cat = new URLSearchParams(window.location.search).get('cat') || 'all';

loadAndRender(cat);