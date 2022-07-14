function dopFunctional() {
    let brokerContainer = document.querySelectorAll(".broker-container");

    brokerContainer.forEach((item) => {
        let brokerChoose = item.querySelectorAll(".broker-choose");
        if (brokerChoose.length > 15) { // если брокеров больше 15, делаем уменьшенный список
            item.classList.add("broker-container--long");
        }
    });

    ///////////// ПЕРЕКЛЮЧАТЕЛЬ КОНТЕНТА В МОДАЛКЕ БРОКЕРА //////////////////

    let contentSwitcherSelector = document.querySelectorAll(".contentSwitcher__selector");
    let contentSwitcherContainer = document.querySelectorAll(".contentSwitcher__container");

    contentSwitcherSelector.forEach((item, id) => {
        item.addEventListener("change", () => {
            contentSwitcherContainer[id].classList.toggle("contentSwitcher__container--visible")
        });
    });

    ////////// ПЕРЕКЛЮЧАТЕЛЬ ГЛАВНОГО ГРАФИКА /////////////////////////

    let mainGraphSwitcherHeader = document.querySelectorAll(".mainGraphTypeChoose__item--header");
    let mainGraphSwitcherItems = document.querySelectorAll(".mainGraphTypeChoose__content .mainGraphTypeChoose__item");
    let mainGraphContent = document.querySelectorAll(".promoGraphArea__graphContent");
    let forecastSwitcher = document.querySelectorAll(".promoGraphArea__selector.forecastGraph");

    mainGraphSwitcherItems.forEach(item => {
        item.addEventListener("click", function() {
            mainGraphSwitcherHeader[0].innerHTML = item.innerHTML; // меняем header на нужный

            mainGraphSwitcherItems.forEach((elem, i) => {
                elem.classList.toggle("mainGraphTypeChoose__item--active"); // переключаем активный класс
                mainGraphContent[i].classList.toggle("promoGraphArea__graphContent--disabled");
            });

            forecastSwitcher.forEach((forecast) => { // если есть переключатель прогноза, переключаем
                forecast.classList.toggle("forecastGraph--disabled");
            });

        });
    });

    /////////// ПЕРЕКЛЮЧАТЕЛЬ ПРОГНОЗА ПРОМО ГРАФИК /////////////////////////

    let forecastPromoContainer = $(".promoGraphArea__forecast");
    let forecastClose = forecastPromoContainer.find(".forecastArea__close")

    forecastSwitcher.forEach(elem => {
        elem.querySelector(".forecastGraph__content").addEventListener("click", () => {
            forecastPromoContainer.slideToggle();
        });

        forecastClose.click(() => {
            forecastPromoContainer.slideToggle();
        });
    });
}

dopFunctional();