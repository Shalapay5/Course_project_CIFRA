const urlParams = new URLSearchParams(window.location.search);
const nameFromUrl = urlParams.get('name'); 

fetch('items.xml')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, "text/xml");

        let products = xmlDoc.getElementsByTagName('product');
        let foundProduct = null;

        for (let i = 0; i < products.length; i++) {
            let nameInXml = products[i].getElementsByTagName('name')[0].textContent;
            if (nameInXml === nameFromUrl) {
                foundProduct = products[i];
                break;
            }
        }

        if (foundProduct) {
            document.getElementById('product-title').textContent = nameFromUrl;

            let imgPath = foundProduct.getElementsByTagName('img')[0].textContent;
            document.getElementById('product-img').src = imgPath;

            let specs = foundProduct.getElementsByTagName('specs')[0].children;
            
            const labels = {
                storage: "Постоянная память",
                ram: "Оперативная память",
                screen_size: "Диагональ экрана",
                refresh_rate: "Частота обновления",
                resolution: "Разрешение экрана",
                screen_type: "Тип матрицы",
                cpu_model: "Процессор",
                cpu_freq: "Частота процессора",
                cores: "Ядра"
            };

            let tableHTML = "";
            for (let j = 0; j < specs.length; j++) {
                let tag = specs[j].tagName;
                let value = specs[j].textContent;
                let rusName = labels[tag] || tag;

                tableHTML += `

                    <p class="label">${rusName}</p>
                    <p class="value">${value}</p>
                   
                `;
            }
            document.getElementById('specs-table').innerHTML = tableHTML;
        }
    });