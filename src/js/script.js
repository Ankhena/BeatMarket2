--include("_webpsup.js");

$(document).ready(function() {

    --include("_modal.js")
    --include("_burger.js")
    --include("_selectric.js")
    --include("_scroll.js")
    --include("_strategyPromoGraph.js")
    --include("_searchInput.js")
    --include("_moveStrategy.js")
    --include("_dividendsGraph.js")
    --include("_inputCounter.js")
    --include("_banchGraphModern.js")
    --include("_performance.js")
    --include("_dateRangePicker.js")
    --include("_tableMain.js")
    --include("_design.js")
    --include("_onboard.js")
    --include("_ticketSelect.js")
    --include("_monthCashGraph.js")
    --include("_cryptAnalyticsGraph.js")
    --include("_demoGraph.js")
    --include("_mainFactorsGraph.js")
    --include("_subscribeChanger.js")
    --include("_dopFunctional.js")
    --include("_mainPromoGraph.js")
    --include("_growthPaymentsGraph.js")
    --include("_slider.js")
    --include("_averageGrowthGraph.js")
    --include("_growthOfDividendsGraph.js")
    --include("_portfolioProfitGraph.js")

    document.querySelectorAll(".myStrategy-news-container .table-content-item").forEach(item => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("shown")
        });
    });

    document.querySelectorAll(".myStrategy-items-item").forEach(item => {
        let indicatorTable = document.querySelectorAll(".myStrategy-indicators-container .table-scroll");
        indicatorTable.forEach(elem => {
            elem.style.width = `${item.offsetWidth-2}px`
        });
    });

    $(".strategyCards-card-range").slider();

    document.querySelectorAll(".myStrategy-items-item-header-toggle").forEach(item => { // открытие/закрытие стратегий
        item.addEventListener("click", () => {
            item.classList.toggle("active");
            const content = item.parentNode.nextElementSibling;
            if (content !== null) {
                content.classList.toggle("hidden");
            }
        });
    });

    const myHeader = document.querySelector(".section-header");
    if (myHeader !== null && window.innerWidth >= 768) {
        const myNav = document.querySelector(".main-menu-nav.nav");
        if (myNav !== null) {
            let atStart = true;

            if (pageYOffset >= myHeader.clientHeight) {
                atStart = false;
                myNav.classList.add("fixed");
            }
    
            window.addEventListener('scroll', () => {
                if (pageYOffset >= myHeader.clientHeight && atStart) {
                    atStart = false;
                    myNav.classList.add("fixed");
                }
                if (pageYOffset <= myHeader.clientHeight && !atStart) {
                    atStart = true;
                    myNav.classList.remove("fixed");
                }
            });
        }
    }

    document.querySelectorAll(".eye").forEach(item => {
        item.addEventListener("click", () => {
            let input = item.parentNode;
            input.classList.toggle("visible");

            let input_text = input.querySelector(".input_text");
            if (input.classList.contains("visible")) {
                input_text.setAttribute("type", "text");
            }
            else {
                input_text.setAttribute("type", "password");
            }
        });
    });

    $(".btn_addOperation").click(function() {
        $(this).parent().next().toggleClass("active");
    });

    $("#tabs").tabs();
    $(".tabs").tabs();

    document.querySelectorAll("[data-contentShower]").forEach(item => {
        function changeVisibilityElems() {
            hiddenElems.forEach(item => {
                if (item.style.display === "") {
                    item.style.display = "none";
                }
                else {
                    item.style.display = "";
                }
            });
        }

        let btn = item.querySelector(".btnShowAll");
        let btn_text = item.querySelector(".btnShowAll__text");
        let hiddenElems = item.querySelectorAll("[data-contentShowerHidden]");
        changeVisibilityElems();

        btn.addEventListener("click", () => {
            btn.classList.toggle("btnShowAll--active");
            changeVisibilityElems();

            if (btn.classList.contains("btnShowAll--active")) {
                btn_text.innerHTML = "Скрыть";
            }
            else {
                btn_text.innerHTML = "Показать все";
            }
        });
    });

    $(".customRange .customRange__slider").each((_, elem) => {
        $(elem).slider({
            range: true,
            min: 0,
            max: 100,
            values: [12, 88],
        });
    });

    $(".modal-content-toggle").each((_, elem) => {
        let btn = $(elem).find(".btnShowAll");
        let content = $(elem).find(".toggleOverlay");

        btn.click(() => {
            content.slideToggle();
            btn.toggleClass("btnShowAll--active");
        });
    });

    document.querySelectorAll(".tablePaymentSchedule").forEach(table => {
        let tableItems = table.querySelectorAll(".table-content-item:not(.table-content-item.bottom)");
        let tableItemsFixed = table.querySelectorAll(".table-fixed-item.inline:not(.table-fixed-item.bottom)");

        tableItems.forEach((tableItem, id) => {
            tableItem.addEventListener("click", () => {
                clickToTableElem(id);
            });
        });

        tableItemsFixed.forEach((tableItemFixed, id) => {
            tableItemFixed.addEventListener("click", () => {
                clickToTableElem(id);
            });
        });

        function clickToTableElem(id) {
            let growthDividendPayments = tableItems[id].querySelector(".growthDividendPayments");
            if (growthDividendPayments !== null) {
                tableItems[id].classList.toggle("opened");
                tableItemsFixed[id].classList.toggle("opened");
                //console.log(id);
            }
        }
    });

});