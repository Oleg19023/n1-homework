// Темная тема
document.getElementById('themeToggle').addEventListener('click', function() {
    let body = document.body;
    let navbar = document.querySelector('.navbar');
    let cardBodies = document.querySelectorAll('.card-body');
    let imgTheme = document.querySelectorAll('.img-theme');
    let themeIcon = document.getElementById('themeIcon');
    body.classList.toggle('dark-theme');
    navbar.classList.toggle('dark-theme-navbar');
    imgTheme.forEach(img => img.classList.toggle('img-theme-dark'));
    cardBodies.forEach(cardBody => cardBody.classList.toggle('card-body-theme'));
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});


// Получаем курсы валют от НБУ
fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())
    .then(data => {
        let rates = {};
        data.forEach(item => {
            rates[item.cc] = item.rate;
        });

        rates["UAH"] = 1;

        // Пересчитываем цены товаров
        function recalculatePrices(selectedCurrency) {
            let items = document.querySelectorAll('#phones_ul li');
            items.forEach(item => {
                let priceTag = item.querySelector('.badge');
                let [currency, price] = priceTag.textContent.split(' ');
                price = parseFloat(price);

                if (rates[currency] && rates[selectedCurrency]) {
                    let newPrice = price * rates[currency] / rates[selectedCurrency];
                    priceTag.textContent = selectedCurrency + ' ' + newPrice.toFixed(2);
                }
            });
        }

        // Добавляем обработчик событий для элемента select
        let select = document.getElementById('currencySelect');
        select.addEventListener('change', function() {
            recalculatePrices(this.value);
        });
    });




