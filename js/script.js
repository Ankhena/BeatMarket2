// Проверка на поддержку WebP от браузера

function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp-support');
    }
});;

$(document).ready(function () {

  function initModal(DOMelem) {

    let overlay = document.querySelector(".overlay_modal");
    let html = document.documentElement;
    let body = document.body;
    let scrollBarWidth = 0

    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); // общ. высота страницы

    if (height > vh) {
        scrollBarWidth = getScrollBarWidth(); // чтобы не прыгала ширина сайта при скрытии скролла 
    }

    //console.log(scrollBarWidth);
    
    function showModal(id) {
        overlay.classList.add("visible");
        body.classList.add("hideScroll");
        body.style.paddingRight = `${scrollBarWidth}px`;
        document.querySelector(`#${id}`).classList.add("visible");
    }

    function changeModal(id) { // закрыть текущее модальное окно, и открыть новое через 700 мс
        closeModal();
        setTimeout(() => showModal(id), 700);
    }
    
    function closeModal() {
        document.querySelector(".modal.visible").classList.remove("visible");
        setTimeout(() => {
            overlay.classList.remove("visible");
            if (!document.querySelector(".burger input[type='checkbox']").checked) {
                body.classList.remove("hideScroll");
            }
            body.style.paddingRight = "";
        }, 150); // так как 0.3s ease-in-out, это нужно чтобы окно модальное не прыгало резко влево во время закрытия
    }

    function getScrollBarWidth() {
        const scrollBlock = document.createElement("div");
        scrollBlock.classList.add("scroll_block_dummy");
        document.body.appendChild(scrollBlock);

        const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
        document.body.removeChild(scrollBlock);
        return scrollBarWidth;
    }

    if (DOMelem) { // для того, чтобы назначить обработчик на недавно созданный узел, и не вешать заново на остальные
        DOMelem.addEventListener("click", () => {
            showModal(DOMelem.dataset.modal)
        });
        return;
    }

    document.querySelectorAll("[data-modal]").forEach(item => {
        item.addEventListener("click", () => {
            showModal(item.dataset.modal)
        });
    });

    document.querySelectorAll("[data-changeModal]").forEach(item => {
        item.addEventListener("click", () => changeModal(item.dataset.changemodal));
    });
    
    document.querySelectorAll("[data-closeModal]").forEach(item => {
        item.addEventListener("click", () => closeModal());
    });
}

initModal();
  function initBurgerMenu() {
    let button_burger = $("[data-burger='button']");
    let menu_burger = $("[data-burger='menu']");
    let overlay = document.querySelector(".overlay_burger");
    let body = document.body;
    
    $(button_burger).click(() => {
        menu_burger.toggleClass("active")
        body.classList.toggle("hideScroll");
    });

    overlay.addEventListener("click", () => {
        $(button_burger).click();
        $(button_burger).find("input").prop('checked', false);
    });
}

initBurgerMenu();
  // link: https://selectric.js.org

function initSelectric() {
    document.querySelectorAll("select").forEach(item => {
        $(item).selectric();
    });
}

initSelectric();
  function initScroll() {
    let overlay_burger = document.querySelector(".overlay_burger");

    document.querySelectorAll("[data-scroll]").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            scrollTo(e.target.dataset.scroll)
        });
    });

    function scrollTo(target) {
        if (document.querySelector(".overlay_burger.visible") !== null) { // если в момент клика открыта шторка бургер-меню
            overlay_burger.click();
        }
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
}

initScroll();
  const myRenderGraph = document.querySelector("#stategyPromoChart");
const myRenderGraphCategories = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const myRenderShowYLine = true; // если нужен показ верт. линий в графе, ставим true

if (myRenderGraph !== null) {
    Highcharts.chart('stategyPromoChart', {
        chart: {
            type: 'spline',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: myRenderGraphCategories,
            labels: {
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            gridLineWidth: (myRenderShowYLine ? 1 : 0)
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value / 1000) + 'к';
                },
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            valueSuffix: '$'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: 'transparent',
                    lineWidth: 1
                }
            }
        },
        series: [
    
            {
                name: 'Портфель',
                marker: {
                    symbol: 'circle'
                },
                data: [1500, 2100, 3500, 5500, 4200, 6500, 7200],
                color: "#3E54D8"
            },
            {
                name: 'S&P 500',
                marker: {
                    symbol: 'circle'
                },
                data: [2200, 2300, 5200, 3700, 4000, 7800, 3800],
                color: "#DE4355"
            },
            {
                name: 'Советник',
                marker: {
                    symbol: 'circle'
                },
                data: [4200, 3300, 1200, 7700, 2000, 5800, 1800],
                color: "#199F27"
            }
    
        ]
    });

    if (myRenderShowYLine) {
        let renderChartWidth = +document.querySelector(".stategyPromo-graph-chart .highcharts-plot-background").getAttributeNode("width").value;
        let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;
    
        document.querySelectorAll(".stategyPromo-graph-chart .highcharts-xaxis-grid .highcharts-grid-line").forEach(item => {
            item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
        });
    }
    
}
  function initSearchInput() {
    document.querySelectorAll(".mySearchContainer").forEach(item => {

        item.addEventListener("input", (e) => {
            let input, filter, a, i;
            input = document.querySelector(".mySearchInput");
            filter = input.value.toUpperCase();
            div = document.querySelector(".mySearchContainer");
            a = div.getElementsByTagName("div");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    if (!a[i].classList.contains("add")) {
                        a[i].style.display = "none";
                    }
                }
            }
        });
    
    });

    let breadcrumbs = []; // тут будут хранится объекты для breadcrumb

    function renderBreadcrumbs(breadcrumbsData) {
        const breadcrumbsContainer = document.querySelector(".breadcrumbs");
        if (breadcrumbsContainer !== null) {
            breadcrumbsContainer.innerHTML = ""; // очищаем все внутренние ноды

            breadcrumbsData.forEach((item, i) => { // и по дате загружаем новые
                let breadcrumb = document.createElement("div");
                breadcrumb.classList.add("breadcrumb");
                breadcrumb.setAttribute("data-id", i);
    
                let breadcrumb_name = document.createElement("strong");
                breadcrumb_name.innerHTML = item.name;
    
                let breadcrumb_org = document.createElement("span");
                breadcrumb_org.innerHTML = item.org;
    
                breadcrumb.appendChild(breadcrumb_name);
                breadcrumb.appendChild(breadcrumb_org);

                // добавление popup

                let popup = document.createElement("div");
                popup.classList.add("breadcrumb-popup");

                let popup_link = document.createElement("span");
                popup_link.classList.add("breadcrumb-popup__link");
                popup_link.innerHTML = "Редактирование транзакций";
                popup_link.setAttribute("data-modal", "modal_add");
                popup.appendChild(popup_link);

                let popup_link_delete = document.createElement("span");
                popup_link_delete.classList.add("breadcrumb-popup__link");
                popup_link_delete.classList.add("breadcrumb-popup__link--delete");
                popup_link_delete.innerHTML = "Удалить компанию";
                popup.appendChild(popup_link_delete);

                breadcrumb.appendChild(popup);
    
                breadcrumbsContainer.appendChild(breadcrumb);

                popup_link_delete.addEventListener("click", function(e) {
                    let id = breadcrumb.getAttribute("data-id"); // при клике получаем id breadcrumb
                    breadcrumbs.splice(id, 1); // удаляем из массива объект с необходимым breadcrmb
                    renderBreadcrumbs(breadcrumbs); // перерисовываем
                });
    
                breadcrumb.addEventListener("click", function(e) {
                    breadcrumb.querySelector(".breadcrumb-popup").classList.toggle("visible");
                });

                initModal(popup_link); // инициализируем модалку именно на этот узел
    
            });
        }
    }

    document.querySelectorAll(".input_search-container > div").forEach(item => {

        item.addEventListener("mousedown", () => {
            let name = item.querySelector(".content strong").innerHTML;
            let org = item.querySelector(".content span").innerHTML;

            breadcrumbs.push({name, org}); // добавили в массив новый объект с выбранными данными
            renderBreadcrumbs(breadcrumbs); // перерисовали

        });
    });
    
    document.querySelectorAll(".mySearchInput").forEach(item => {
        myContainer = document.querySelector(".input_search-container");
    
        item.addEventListener("focus", (e) => {
            myContainer.classList.add("visible");
        });
    
        item.addEventListener("blur", (event) => {
            myContainer.classList.remove("visible");
        });
    });

    renderBreadcrumbs(breadcrumbs);
}

initSearchInput()
  function initMoveStrategy() {
    let moveActive = false;
    let strategies = document.querySelectorAll(".myStrategy-items-item");

    $(".myStrategy-items").sortable();
    $(".myStrategy-items").disableSelection();
    $(".myStrategy-items").sortable("disable");

    document.querySelectorAll(".myStrategy-header button").forEach(item => {
        item.addEventListener("click", (e) => {
            item.classList.toggle("active");
            moveActive = !moveActive;

            if (moveActive) {
                $(".myStrategy-items").sortable("enable");
                item.children[1].innerHTML = "Сохранить порядок";
            }
            else {
                $(".myStrategy-items").sortable("disable");
                item.children[1].innerHTML = "Изменить порядок";
            }

            strategies.forEach(item => {
                item.classList.toggle("move");
            });

        });
    });
}

initMoveStrategy();
  const myGraph = document.querySelector("#dividendsGraph");

if (myGraph !== null) {
    Highcharts.chart('dividendsGraph', {
        chart: {
            type: 'variablepie',
            backgroundColor: 'transparent'
        },
        title: {
            text: ''
        },
        tooltip: {
            headerFormat: '',
            pointFormat: `
        <div style="text-align: center;">
          <h5>{point.name}</h5>
          <span>{point.y}$</span>
        </div>
      `,
            useHTML: true
        },
        series: [{
            innerSize: '60%',
            zMin: 1,
            name: 'countries',
            borderWidth: 0,
            borderColor: null,
            data: [{
                name: 'AMAT',
                y: 1000,
                z: 100,
                color: "#199F27"
            }, {
                name: 'AMGN',
                y: 1000,
                z: 100,
                color: "#DE4355"
            }, {
                name: 'BFB',
                y: 1000,
                z: 100,
                color: "#3E54D8"
            }, {
                name: 'Other',
                y: 2000,
                z: 100,
                color: "#929398"
            }]
        }]
    });
}
  function initInputCounter() {
    document.querySelectorAll("[data-counter]").forEach(item => {
        item.addEventListener("click", () => {
            let value = +document.querySelector(`#${item.dataset.counter}`).innerText;
            (item.dataset.operation === "minus" ? value-- : value++);
            document.querySelector(`#${item.dataset.counter}`).innerText = value;
        });
    });
}

initInputCounter();
  function initBanchGraphModern() {
    let graphContent = document.querySelector(".banchGraph .banchGraph-content");

    if (graphContent === null) {
        return false;
    }

    const banchGraphData = {
        names: [
            'Янв 2020', 'Фев 2020', 'Мар 2020', 'Апр 2020', 'Май 2020', 
            'Июн 2020', 'Июл 2020', 'Авг 2020', 'Сен 2020', 'Окт 2020', 'Ноя 2020', 'Дек 2020'
        ],
        plots: [
            {
                name: "Мой портфель",
                data: [32.56, 4.44, 6.18, -10.22, 10.23, 12.22, 32.56, 4.44, 6.18, -10.22, 10.23, 12.22],
                color: 'rgba(62, 84, 216, 0.8)',
                marker: {
                    symbol: 'circle'
                }
            },
            {
                name: "S&P 500",
                data: [-12.22, 5.12, -5.22, -7.22, 16.23, -12.22, 18.56, -14.44, 16.18, 10.22, -10.23, 3.22],
                color: 'rgba(25, 159, 39, 0.8)'
            }
        ]
    }

    function fillDescrItems() {
        const items = document.querySelector(".banchGraph .banchGraph-descr-items");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            elem.classList.add("banchGraph-descr-items-item");
            elem.innerHTML = item.name;
            elem.style.setProperty('--background_label', item.color);
            items.appendChild(elem);
        });
    }

    function fillDescrSummaryContent() {
        const content = document.querySelector(".banchGraph .banchGraph-descr-summary-content");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            let summary = item.data.reduce((accum, value) => accum + value).toFixed(2);
            elem.innerHTML = summary + "%";
            elem.classList.add(summary > 0 ? "success" : "error");
            elem.style.setProperty('--background_label', item.color);
            content.appendChild(elem);
        });
    }

    function getAbsBanchData() {
        let absValues = [];
        banchGraphData.plots.forEach(item => {
            absValues.push(Math.abs(...item.data));
        });
        return Math.max(...absValues);
    }

    function getSeries(id) {
        let data = [];
        banchGraphData.plots.forEach(item => {
            data.push({
                name: item.name,
                data: [item.data[id]],
                color: item.color,
                borderRadiusTopLeft: item.data[id] > 0 ? 4 : 0,
                borderRadiusTopRight: item.data[id] > 0 ? 4 : 0,
                borderRadiusBottomLeft: item.data[id] < 0 ? 4 : 0,
                borderRadiusBottomRight: item.data[id] < 0 ? 4 : 0,
                // shadow: {
                //     color: item.color,
                //     width: 4,
                //     offsetY: -0.5,
                //     offsetX: -0.5
                // }
            });
        });
        return data;
    }

    function renderBanchHTML(id) {
        let item = document.createElement("div");
        item.classList.add("banchGraph-content-item");

        let itemGraph = document.createElement("div");
        itemGraph.classList.add("banchGraph-content-item-graph");
        itemGraph.setAttribute("id", "banchGraphModern-" + id)

        // date

        let itemDate = document.createElement("div");
        itemDate.classList.add("banchGraph-content-item-date");

        let itemDateSpan = document.createElement("span");
        itemDateSpan.innerHTML = banchGraphData.names[id];
        itemDate.appendChild(itemDateSpan);

        // /date

        // stat

        let itemStat = document.createElement("div");
        itemStat.classList.add("banchGraph-content-item-stat");

        banchGraphData.plots.forEach(elem => {
            let itemStatSpan = document.createElement("span");
            itemStatSpan.innerHTML = elem.data[id] + "%";

            if (elem.data[id] > 0) {
                itemStatSpan.classList.add("success");
            }
            if (elem.data[id] < 0) {
                itemStatSpan.classList.add("error");
            }

            itemStat.appendChild(itemStatSpan);
        });

        // /stat

        item.appendChild(itemGraph);
        item.appendChild(itemDate);
        item.appendChild(itemStat);

        graphContent.appendChild(item);
    }

    function renderBanchGraph(id) {
        Highcharts.chart('banchGraphModern-' + id, {
            chart: {
                type: 'column',
                borderRadius: 6
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [banchGraphData.names[id]],
                labels: {
                    enabled: false
                },
                lineWidth: 0
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    enabled: false
                },
                min: -1 * getAbsBanchData(),
                max: getAbsBanchData()

            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointWidth: 24,
                    groupPadding: 0,
                    borderWidth: 0,
                    enableMouseTracking: false,
                }
            },
            series: getSeries(id)
        });
    }

    fillDescrSummaryContent()
    fillDescrItems()

    banchGraphData.names.forEach((elem, i) => {
        renderBanchHTML(i);
        renderBanchGraph(i);
    });

    //console.log(getAbsBanchData());
}

initBanchGraphModern();
  const separation_graph_1_data = [{
  name: 'Intel',
  y: 5,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'Texas instrumental',
  y: 23.03,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Tractor supply',
  y: 7.11,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Pool',
  y: 8.25,
  z: 100,
  color: "#DEAA5B"
}, {
  name: 'ZM company',
  y: 3.03,
  z: 100,
  color: "#5E5BDE"
}, {
  name: 'Mastercard',
  y: 5.24,
  z: 100,
  color: "#BC5BDE"
}, {
  name: 'Other',
  y: 55.67,
  z: 100,
  color: "#acacac"
}];

const separation_graph_2_data = [{
  name: 'Financial',
  y: 5,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'Technology',
  y: 33.03,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Tractor supply',
  y: 17.11,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Pool',
  y: 28.25,
  z: 100,
  color: "#DEAA5B"
}, {
  name: 'ZM company',
  y: 13.03,
  z: 100,
  color: "#5E5BDE"
}];

const separation_graph_3_data = [{
  name: 'Equity',
  y: 100,
  z: 100,
  color: "#DE5B5B"
}];

const separation_graph_4_data = [{
  name: 'INT',
  y: 23.03,
  z: 100,
  color: "#2C7259"
}, {
  name: 'TXN',
  y: 7.11,
  z: 100,
  color: "#FFEB34"
}, {
  name: 'TCKO',
  y: 8.25,
  z: 100,
  color: "#B22D2D"
}, {
  name: 'Pool',
  y: 3.03,
  z: 100,
  color: "#BC5BDE"
}, {
  name: 'MA',
  y: 5.24,
  z: 100,
  color: "#2D1336"
}, {
  name: 'MMA',
  y: 55.67,
  z: 100,
  color: "#842EA3"
}, {
  name: 'LEG',
  y: 3.03,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'INT',
  y: 23.03,
  z: 100,
  color: "#2C7259"
}, {
  name: 'TXN',
  y: 7.11,
  z: 100,
  color: "#FFEB34"
}, {
  name: 'TCKO',
  y: 8.25,
  z: 100,
  color: "#B22D2D"
}, {
  name: 'Pool',
  y: 3.03,
  z: 100,
  color: "#BC5BDE"
}, {
  name: 'MA',
  y: 5.24,
  z: 100,
  color: "#2D1336"
}, {
  name: 'MMA',
  y: 55.67,
  z: 100,
  color: "#842EA3"
}, {
  name: 'LEG',
  y: 3.03,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'INT',
  y: 23.03,
  z: 100,
  color: "#2C7259"
}, {
  name: 'TXN',
  y: 7.11,
  z: 100,
  color: "#FFEB34"
}, {
  name: 'TCKO',
  y: 8.25,
  z: 100,
  color: "#B22D2D"
}, {
  name: 'Pool',
  y: 3.03,
  z: 100,
  color: "#BC5BDE"
}, {
  name: 'MA',
  y: 5.24,
  z: 100,
  color: "#2D1336"
}, {
  name: 'MMA',
  y: 55.67,
  z: 100,
  color: "#842EA3"
}, {
  name: 'LEG',
  y: 3.03,
  z: 100,
  color: "#5BDE60"
}];

const separation_graph_5_data = [{
  name: 'Financial',
  y: 5,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'Technology',
  y: 33.03,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Tractor supply',
  y: 17.11,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Pool',
  y: 28.25,
  z: 100,
  color: "#DEAA5B"
}, {
  name: 'ZM company',
  y: 13.03,
  z: 100,
  color: "#5E5BDE"
}, {
  name: 'Industrial goods',
  y: 5.24,
  z: 100,
  color: "#BC5BDE"
}];

const separation_graph_6_data = [{
  name: 'Акции',
  y: 80,
  z: 100,
  color: "#5E5BDE"
}, {
  name: 'ETFS',
  y: 0,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Фонды',
  y: 20,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Денежные средства',
  y: 0,
  z: 100,
  color: "#DEAA5B"
}];
const separation_graph_7_data = [{
  name: 'Нидерланды',
  y: 5,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'США',
  y: 23.03,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Россия',
  y: 7.11,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Нидерланды',
  y: 8.25,
  z: 100,
  color: "#DEAA5B"
},
{
  name: 'Россия',
  y: 3.03,
  z: 100,
  color: "#5E5BDE"
},
{
  name: 'США',
  y: 5.24,
  z: 100,
  color: "#BC5BDE"
}];
const separation_graph_8_data = [{
  name: 'Нидерланды',
  y: 5,
  z: 100,
  color: "#5BDE60"
}, {
  name: 'США',
  y: 23.03,
  z: 100,
  color: "#5B97DE"
}, {
  name: 'Россия',
  y: 7.11,
  z: 100,
  color: "#DE5B5B"
}, {
  name: 'Нидерланды',
  y: 8.25,
  z: 100,
  color: "#DEAA5B"
},
{
  name: 'Россия',
  y: 3.03,
  z: 100,
  color: "#5E5BDE"
},
{
  name: 'США',
  y: 5.24,
  z: 100,
  color: "#BC5BDE"
}];

const separation_graph_1 = document.querySelector("#separation_graph_1");
const separation_graph_2 = document.querySelector("#separation_graph_2");
const separation_graph_3 = document.querySelector("#separation_graph_3");
const separation_graph_4 = document.querySelector("#separation_graph_4");
const separation_graph_5 = document.querySelector("#separation_graph_5");
const separation_graph_6 = document.querySelector("#separation_graph_6");
const separation_graph_7 = document.querySelector("#separation_graph_7");
const separation_graph_8 = document.querySelector("#separation_graph_8");

addPerformanceGraph(separation_graph_1, "separation_graph_1", separation_graph_1_data, false, "60%");
addPerformanceGraph(separation_graph_2, "separation_graph_2", separation_graph_2_data, false, "60%");
addPerformanceGraph(separation_graph_3, "separation_graph_3", separation_graph_3_data, false, "60%");
addPerformanceGraph(separation_graph_4, "separation_graph_4", separation_graph_4_data, false, "70%");
addPerformanceGraph(separation_graph_5, "separation_graph_5", separation_graph_5_data, true, "60%");
addPerformanceGraph(separation_graph_6, "separation_graph_6", separation_graph_6_data, true, "60%");
addPerformanceGraph(separation_graph_7, "separation_graph_7", separation_graph_7_data, false, "60%");
addPerformanceGraph(separation_graph_8, "separation_graph_8", separation_graph_8_data, false, "60%");

function addPerformanceGraph(node, id, data, isInput, size) {
  if (node !== null) {
    Highcharts.chart(id, {
      chart: {
        type: 'variablepie',
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      tooltip: {
        headerFormat: '',
        pointFormat: `
            <div style="text-align: center;">
              <h5>{point.name}</h5>
              <span>{point.y}%</span>
            </div>
          `,
        useHTML: true
      },
      series: [{
        innerSize: size,
        zMin: 1,
        name: 'countries',
        borderWidth: 0,
        borderColor: null,
        data: data
      }]
    });

    if (isInput) {
      addPerformanceGraphLabelsRadio(node.nextElementSibling, data, id);
    }
    else {
      if (size === "70%") {
        addPerformanceGraphLabels(document.querySelector(".content-graphInfo"), data);
      }
      else {
        addPerformanceGraphLabels(node.nextElementSibling, data);
      }
    }


  }
}

function addPerformanceGraphLabels(node, data) {

  data.forEach(item => {
    let graphContent = document.createElement("div");
    graphContent.classList.add("graphContent");

    let graphContentName = document.createElement("div");
    graphContentName.classList.add("graphContent-name");

    let graphRound = document.createElement("div");
    graphRound.style.backgroundColor = item.color;

    let graphName = document.createElement("span");
    graphName.innerHTML = item.name;

    graphContentName.appendChild(graphRound);
    graphContentName.appendChild(graphName);

    let graphValue = document.createElement("strong");
    graphValue.classList.add("graphContent-value");
    graphValue.innerHTML = item.y + "%";

    graphContent.appendChild(graphContentName);
    graphContent.appendChild(graphValue);

    node.appendChild(graphContent);
  });

}

function addPerformanceGraphLabelsRadio(node, data, name) {

  data.forEach(item => {
    let graphContent = document.createElement("div");
    graphContent.classList.add("graphContent");

    let graphContentName = document.createElement("label");
    graphContentName.classList.add("graphContent-name");
    graphContentName.classList.add("label");

    let graphRound = document.createElement("div");
    graphRound.style.backgroundColor = item.color;

    let graphRadio = document.createElement("input");
    graphRadio.setAttribute("type", "radio");
    graphRadio.setAttribute("name", name);
    graphRadio.classList.add("visually_hidden");
    graphRadio.classList.add("radio_custom");

    let graphName = document.createElement("span");
    graphName.innerHTML = item.name;

    graphContentName.appendChild(graphRound);
    graphContentName.appendChild(graphRadio);
    graphContentName.appendChild(graphName);

    let graphValue = document.createElement("strong");
    graphValue.classList.add("graphContent-value");
    graphValue.innerHTML = item.y + "%";

    graphContent.appendChild(graphContentName);
    graphContent.appendChild(graphValue);

    node.appendChild(graphContent);
  });

}
  function initDateRangePicker() {

    rusLocale = {
        "format": 'DD.MM.YYYY',
        "applyLabel": "Ок",
        "cancelLabel": "Отмена",
        "fromLabel": "От",
        "toLabel": "До",
        "customRangeLabel": "Произвольный",
        "daysOfWeek": [
            "Вс",
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        firstDay: 1
    }

    $("").daterangepicker({
        locale: rusLocale,
        opens: 'left'
    });

    $('.inputGroup__item--date').each((_, elem) => {
        $(elem).daterangepicker({
            locale: rusLocale,
            opens: 'left'
        }, function(start, end, label) {
            $(".inputGroup__item--date .inputGroup__control").val(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));
        });
    });

    $('.stategyPromo-graph').each((_, elem) => {
        $(elem).find(".strategyViewDateChoose").daterangepicker({
            locale: rusLocale,
            opens: 'left'
        }, function(start, end, label) {
            $(elem).find(".strategyViewDate").text(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));
        });
    });
    
    $('#chooseDataStrategy').daterangepicker({
        locale: rusLocale,
        opens: 'left'
    }, function(start, end, label) {
        $("#chooseDataStrategyValue").text(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));
    });

    $('.period-info-date').each((_, elem) => {
        $(elem).daterangepicker({
            locale: rusLocale,
            opens: 'left'
        }, function(start, end, label) {
            $(elem).find("span").text(start.format('DD.MM.YYYY') + " - " + end.format('DD.MM.YYYY'));
        });
    });
}

initDateRangePicker();
  function initTableMain() {
    let commentTableText = document.querySelectorAll(".modal-content-simpleText");

    document.querySelectorAll(".statTable__content").forEach(item => {
        if (document.body.offsetWidth <= 768) {
            let statSticker = item.querySelector(".statSticker");
            if (statSticker !== null) {
                statSticker.addEventListener("click", (e) => {
                    item.classList.toggle("statTable__content--opened");
                    e.stopPropagation();
                });
            }
        }
        else {
            item.addEventListener("click", (e) => {
                item.classList.toggle("statTable__content--opened");
                e.stopPropagation();
            });
        }
    });

    document.querySelectorAll(".statTable__item--comment").forEach(item => {
        item.addEventListener("click", (e) => {
            let text = item.querySelector(".statTable__value").innerHTML;
            if (commentTableText.length > 0) {
                commentTableText[0].innerHTML = text;
            }
            e.stopPropagation();
        });
    });
}

initTableMain();
  // contenteditable

let pens = document.querySelectorAll('.js-contenteditable-btn');

let priceInpus = document.querySelectorAll('.js-contenteditable-input');
let priceTexts = document.querySelectorAll('.js-contenteditable-span');

pens.forEach((pen) => pen.addEventListener('click', function (e) {

  priceInpus.forEach(item => item.classList.add('h-hide'));
  priceTexts.forEach(item => item.classList.remove('h-hide'));

  let priceText = this.parentElement.querySelector('.js-contenteditable-span');
  let priceInput = this.parentElement.querySelector('.js-contenteditable-input');

  priceText.classList.add('h-hide');

  priceInput.classList.remove('h-hide');
  priceInput.focus();


}))


// end contenteditable
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// toggle details

let detailsBtns = document.querySelectorAll('.details__btn, .details__title');
if (detailsBtns !== null) {
  detailsBtns.forEach((btn) => btn.addEventListener('click', function (e) {
    this.closest('.details').classList.toggle('details--open');
  }))
}


// end toggle details
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// close prompt

let btnsClosePrompt = document.querySelectorAll('.prompt__close');

btnsClosePrompt.forEach((btn) => btn.addEventListener('click', function (e) {
  this.closest('.prompt').classList.add('prompt--hide');
}))

// end close prompt
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// tooltip

let tooltip = document.querySelectorAll('.tooltip');
let tooltipBtn = document.querySelectorAll('.tooltip__btn');
tooltipBtn.forEach(btn => btn.addEventListener('click', (e) => {
  tooltip.forEach(tooltip => tooltip.classList.remove('tooltip--open'));
  e.target.parentElement.classList.toggle('tooltip--open');
}))

// закроем по клику мимо
document.addEventListener('mouseup', function (evt) {
  if (evt.target.closest('.tooltip') === null) {
    tooltip.forEach(tooltip => tooltip.classList.remove('tooltip--open'));
  }
});

// end tooltip
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Highcharts
if (document.querySelector('#adv-prtf-ready__comparison-chart')) {
  Highcharts.chart('adv-prtf-ready__comparison-chart', {
    chart: {
      type: 'spline',
      style: { "fontFamily": "" },
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      labels: {
        style: {
          fontSize: "16px",
          color: "#373943"
        }
      }
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        formatter: function () {
          return (this.value / 1000) + 'к';
        },
        style: {
          fontSize: "16px",
          color: "#373943"
        }
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      useHTML: true
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: 'transparent',
          lineWidth: 1
        }
      }
    },
    series: [

      {
        name: 'Ваш портфель',
        marker: {
          symbol: 'circle'
        },
        data: [1500, 2100, 3500, 5500, 4200, 6500, 7200],
        color: "#3E54D8"
      },
      {
        name: 'S&P 500',
        marker: {
          symbol: 'circle'
        },
        data: [2200, 2300, 5200, 3700, 4000, 7800, 3800],
        color: "#DE4355"
      },

    ]
  });

}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

  function initOnBoard(isOnBoard) { // isOnBoard - опция показа
    let body = document.body;
    let html = document.documentElement;
    let scrollBarWidth = 0

    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0); // высота видимой страницы
    let height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); // общ. высота страницы

    if (height > vh) {
        scrollBarWidth = getScrollBarWidth(); // чтобы не прыгала ширина сайта при скрытии скролла 
    }

    const data = [
        {
            title: 'Вкладка "Мой портфель"', 
            text: `Ведите учет своих собственных инвестиций и отслеживайте доходность. 
                    Проверяйте и сравнивайте разные стратегии, следите за выбранными компаниями или криптовалютой. 
                    Все ваши инвестиции в одном месте. Легко и удобно`
        },
        {
            title: 'Вкладка "Советник"', 
            text: `Если вы хотите инвестировать, используя рекомендации советника BeatMarket, тогда эта вкладка для вас. 
                    BeatMarket Advisor поможет сгенерировать сбалансированный персональный портфель акций, проследит за выбранными 
                    компаниями и укажет, если стоит продать.`
        },
        {
            title: 'Вкладка "Подписка"', 
            text: `Здесь вы можете ознакомиться со всеми имеющимися тарифами и выбрать тот, который подойдет именно вам. 
                    Вся актуальная информация по подписке будет находится в этой вкладке`
        }
    ]

    if (isOnBoard) {
        const onboardMain = document.querySelector(".onboard");
        const overlay_container = onboardMain.querySelector(".onboard-container");
        const pagination = onboardMain.querySelectorAll(".onboard-content-info-pagination-item");
        const menus = onboardMain.querySelectorAll(".onboard-items li");

        const btn_next = onboardMain.querySelector(".onboard-content-info-buttons .next");
        const btn_prev = onboardMain.querySelector(".onboard-content-info-buttons .prev");
        const btn_close = document.querySelector(".onboard-content-info-buttons .close");

        const onboard_title = onboardMain.querySelector(".onboard-content-info-subtitle"); 
        const onboard_text = onboardMain.querySelector(".onboard-content-info-description"); 

        let active_id = 0; // базовое значение активного пункта

        document.querySelectorAll(".onboard_activate").forEach(item => { // ПОКАЗ ПО КЛИКУ НА НАСТРОЙКИ
            item.addEventListener("click", (e) => {
                e.preventDefault();
                showOnBoard();
            });
        });

        document.querySelectorAll("[data-onboardOpen]").forEach(item => { // ПОКАЗ ПО КЛИКУ НА НАСТРОЙКИ
            let id = +item.dataset.onboardopen;
            //console.log(id);
            item.addEventListener("click", (e) => {
                e.preventDefault();
                showOnBoardAdvisor(id);
            });
        });

        document.querySelectorAll(".onboard .close").forEach(item => {
            item.addEventListener("click", () => {
                closeOnBoard(active_id + 1);
            });
        });

        btn_next.addEventListener("click", (item) => {
            updateData(active_id + 1)
            active_id += 1;
        });

        btn_prev.addEventListener("click", (item) => {
            updateData(active_id - 1)
            active_id -= 1;
        });

        btn_close.addEventListener("click", (item) => {
            closeOnBoard(active_id + 1);
        });

        pagination.forEach((item) => {
            item.addEventListener("click", () => {
                const id = Number(item.dataset.id);
                updateData(id);
                active_id = id;
            });
        });

        function updateData(id) {

            if (id === data.length) {
                closeOnBoard(id);
                return;
            }

            if (id === 0) {
                btn_prev.classList.add("hidden");
            }

            if (id > 0) {
                btn_prev.classList.remove("hidden");
            }

            if (id === (data.length - 1)) {
                btn_next.innerHTML = "Закрыть";
            }
            else {
                btn_next.innerHTML = "Далее";
            }

            pagination[active_id].classList.remove("active");
            pagination[id].classList.add("active");

            menus[active_id].classList.remove("active");
            menus[id].classList.add("active");

            onboard_title.innerHTML = data[id].title;
            onboard_text.innerHTML = data[id].text;
        }

        function closeOnBoard(id) {
            overlay_container.classList.add("invisible");

            setTimeout(() => {
                if (!document.querySelector(".burger input[type='checkbox']").checked) {
                    body.classList.remove("hideScroll");
                }
                body.style.paddingRight = "";
                onboardMain.classList.remove("visible");
                overlay_container.classList.add("hidden");

                let onboardAdvisor = document.querySelectorAll(".onboard--advisor");
                onboardAdvisor.forEach(item => {
                    item.classList.remove("visible");
                    item.querySelector(".onboard-container").classList.add("hidden");
                });

            }, 150);

            setTimeout(() => {
                pagination[id-1].classList.remove("active");
                menus[id-1].classList.remove("active");

                pagination[0].classList.add("active");
                menus[0].classList.add("active");
                btn_next.innerHTML = "Далее";

                active_id = 0;
            }, 160);

        }

        function showOnBoard() {
            active_id = 0; // изначально у нас активный первый пункт
            btn_prev.classList.add("hidden"); // заодно убираем кнопку предыдущего пункта (так как у нас уже начальный)
    
            overlay_container.classList.remove("invisible");
            overlay_container.classList.remove("hidden");
    
            onboardMain.classList.add("visible");
            body.classList.add("hideScroll");
            body.style.paddingRight = `${scrollBarWidth}px`;
        }

        function showOnBoardAdvisor(id) {
            document.querySelector(`[data-onboard="${id}"]`).querySelector(".onboard-container").classList.remove("invisible");
            document.querySelector(`[data-onboard="${id}"]`).querySelector(".onboard-container").classList.remove("hidden");
    
            document.querySelector(`[data-onboard="${id}"]`).classList.add("visible");
            body.classList.add("hideScroll");
            body.style.paddingRight = `${scrollBarWidth}px`;
        }

    }

    function getScrollBarWidth() {
        const scrollBlock = document.createElement("div");
        scrollBlock.classList.add("scroll_block_dummy");
        document.body.appendChild(scrollBlock);

        const scrollBarWidth = scrollBlock.offsetWidth - scrollBlock.clientWidth;
        document.body.removeChild(scrollBlock);
        return scrollBarWidth;
    }

}

initOnBoard(true); // ЕСЛИ TRUE - ИНИЦИАЛИЗИРУЕМ, ИНАЧЕ НЕТ 
  function initTicketSelect() {
    $('.inputSelect__radio').on('change', function(){
        $('.inputSelect__value').html($(this).next().html());
    });
}

initTicketSelect();
  function initMonthCashGraph() {

    let colorPaybackDividends = "#47B252";
    let colorOverallDividends = "#E6EEFF";
    let widthGraphPoint = 80;
    let labelsStyle = {
        fontFamily: "Montserrat",
        fontWeight: "500",
        fontSize: '0.9rem'
    }

    if (document.body.offsetWidth < 1500) {
        widthGraphPoint = 65;
    }

    // общее кол-во дивидендов
    let dataPrev = [
        ['Янв', 19.12, "Январь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Фев', 24.12, "Февраль", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Мар', 38.12, "Март", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Апр', 11.12, "Апрель", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Май', 24.12, "Май", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Июн', 38.12, "Июнь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Июл', 29.12, "Июль", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Авг', 46.12, "Август", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Сен', 24.12, "Сентябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Окт', 38.12, "Октябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Ноя', 29.12, "Ноябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Дек', 46.12, "Декабрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {name: "TSLA", payment: 32.44}]]
    ];

    // выплаченные дивиденды
    let data = [
        ['Янв', 15.12, "Январь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Фев', 19.12, "Февраль", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Мар', 26.12, "Март", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Апр', 17.12, "Апрель", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Май', 19.12, "Май", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Июн', 0, "Июнь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Июл', 27.12, "Июль", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Авг', 46.12, "Август", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Сен', 24.12, "Сентябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Окт', 38.12, "Октябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Ноя', 29.12, "Ноябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
        ['Дек', 46.12, "Декабрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]]
    ];

    function generateDataObject(yearsArrayData, costArrayData, className) {
        let innerHTML = ``;
        yearsArrayData.forEach((data, i) => {
            innerHTML += `
            <div class="customTooltip__item">
                <span class="customTooltip__key">${yearsArrayData[i]}</span>
                <span class="customTooltip__value ${className}">${costArrayData[i]} $</span>
            </div>`
        });
        return innerHTML;
    }

    function getData(data) {
        return data.map(function (country, i) {
            return {
                name: country[0],
                y: country[1],
                color: colorPaybackDividends
            };
        });
    }

    let elem = document.querySelector("#monthCashGraph");
    if (elem !== null) {
        var chart = Highcharts.chart('monthCashGraph', {
            chart: {
                type: 'column',
                style: { "fontFamily": "" },
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',
            },
            legend: {
                enabled: false
            },
            tooltip: {
                // enabled: false
            },
            xAxis: {
                type: 'category',
                labels: {
                    useHTML: true,
                    animate: true,
                    style: {
                        ...labelsStyle,
                        color: "#606371",
                    }
                }
            },
            yAxis: [{
                labels: {
                    enabled: false,
                },
                title: {
                    text: ''
                },
                showFirstLabel: false,
                gridLineWidth: 0,
            }],
            tooltip: {
                crosshairs: true,
                shared: true,
                useHTML: true,
                formatter: function() {
                    let index = this.points[0].point.index;
                    let yearsArrayData = data[index][3].map(item => item.name);
                    let costArrayData = data[index][3].map(item => item.payment);

                    let yearsArrayDataOld = dataPrev[index][3].map(item => item.name);
                    let costArrayDataOld = dataPrev[index][3].map(item => item.payment);
    
                    return `
                        <div class="customTooltip">
                            <h5 class="customTooltip__title">Дивиденды, ${data[index][2]} <span class="customTooltip__label">82.12 $</span></h5>
                            <div class="customTooltip__grid">
                                <h6 class="customTooltip__subtitle">Выплачено:</h6>
                                ${generateDataObject(yearsArrayData, costArrayData, "success")}
                                <h6 class="customTooltip__subtitle">Ожидается:</h6>
                                ${generateDataObject(yearsArrayDataOld, costArrayDataOld, "secondary")}
                            </div>
                        </div>
                    `;
                }
            },
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0,
                },
                column: {
                    borderWidth: 1,
                    pointWidth: widthGraphPoint,
                    //enableMouseTracking: false,
                    borderRadiusTopLeft: widthGraphPoint / 15,
                    borderRadiusTopRight: widthGraphPoint / 15,
                }
            },
            series: [
            {
                name: 'Ож.дивиденды',
                states: { hover: { enabled: false } },
                color: colorOverallDividends, // ожидаемые дивиденды
                borderColor: "#D3E3FF",
                linkedTo: 'main',
                data: dataPrev.slice(),
            }, 
            {
                name: 'Выпл. дивиденды',
                states: { hover: { enabled: false } },
                borderColor: colorPaybackDividends,
                id: 'main',
                dataLabels: [{
                    enabled: true,
                    inside: true,
                    useHTML: true,
                    verticalAlign: "bottom",
                    style: {
                        ...labelsStyle,
                        color: "#24252E",
                    },
                    formatter: function(e) {
                        return dataPrev[this.x][1] + "$";
                    }
                }],
                data: getData(data).slice(),
            }],
            exporting: {
                allowHTML: true
            }
        });
    }
}

initMonthCashGraph()
  const cryptAnalyticsGraphData = [{
    name: 'BTC',
    y: 23.03,
    z: 100,
    color: "#2C3259",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'TXN',
    y: 7.11,
    z: 100,
    color: "#FFEB34",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'TCKO',
    y: 8.25,
    z: 100,
    color: "#B22D2D",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'Pool',
    y: 3.03,
    z: 100,
    color: "#BC5BDE",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'MA',
    y: 5.24,
    z: 100,
    color: "#2D1336",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'MMA',
    y: 55.67,
    z: 100,
    color: "#842EA3",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'LEG',
    y: 3.03,
    z: 100,
    color: "#5BDE60",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}, {
    name: 'INT',
    y: 23.03,
    z: 100,
    color: "#2C7259",
    cash: "2.299.222",
    img: "./img/statTable__icons/bitcoin.svg"
}];

const cryptAnalyticsGraph = document.querySelector("#cryptAnalyticsGraph");
addAnalyticsGraph(cryptAnalyticsGraph, "cryptAnalyticsGraph", cryptAnalyticsGraphData, false, "70%");

function addAnalyticsGraph(node, id, data, isInput, size) {
    if (node !== null) {
        Highcharts.chart(id, {
            chart: {
                type: 'variablepie',
                backgroundColor: 'transparent'
            },
            title: {
                text: ''
            },
            tooltip: {
                headerFormat: '', 
                pointFormat: `
                    <div class="cryptAnalitycsGraphTooltip">
                        <div class="cryptAnalitycsGraphTooltip__title">
                            <img class="cryptAnalitycsGraphTooltip__img" src="{point.img}" alt="Иконка валюты">
                            <h5>{point.name}</h5>
                        </div>
                        <p class="cryptAnalitycsGraphTooltip__cash">{point.cash}$</p>
                        <p class="cryptAnalitycsGraphTooltip__percent">{point.y}%</p>
                    </div>
                `,
                useHTML: true
            },
            series: [{
                innerSize: size,
                zMin: 1,
                name: 'countries',
                borderWidth: 0,
                borderColor: null,
                data: data
            }]
        });

        if (isInput) {
            addPerformanceGraphLabelsRadio(node.nextElementSibling, data, id);
        }
        else {
            if (size === "70%") {
                addPerformanceGraphLabels(document.querySelector(".content-graphInfo"), data);
            }
            else {
                addPerformanceGraphLabels(node.nextElementSibling, data);
            }
        }
        
        
    }
}
  function initDemoGraph() {

    const graphs = ["demoGraph-1", "demoGraph-2", "demoGraph-3", "demoGraph-4", "demoGraph-5", "demoGraph-6"];

    const myRenderGraphCategories = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const myRenderShowYLine = true; // если нужен показ верт. линий в графе, ставим true

    graphs.forEach(item => {
        let myRenderGraph = document.querySelector(`#${item}`);

        if (myRenderGraph !== null) {
            Highcharts.chart(item, {
                chart: {
                    type: "spline",
                    style: { "fontFamily": "" },
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false,
    
                    useHTML: true,
                    align: "left",
                    verticalAlign: "top",
                    itemStyle: {"fontSize": "0.85rem", "fontWeight": "400", "paddingLeft": "0.5rem"},
                    x: -8,
                    margin: 35,
                    symbolWidth: 0,
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: myRenderGraphCategories,
                    labels: {
                        style: {
                            fontSize: "16px",
                            color: "#373943"
                        }
                    },
                    gridLineWidth: (myRenderShowYLine ? 1 : 0)
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return (this.value / 1000) + 'к';
                        },
                        style: {
                            fontSize: "16px",
                            color: "#373943"
                        }
                    },
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    useHTML: true,
                    valueSuffix: '$'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: 'transparent',
                            lineWidth: 1
                        }
                    }
                },
                series: [
            
                    {
                        name: 'VIAC',
                        marker: {
                            symbol: 'circle'
                        },
                        data: [1500, 2100, 3500, 5500, 4200, 6500, 7200],
                        color: "#3E54D8"
                    }
            
                ]
            });
        
            if (myRenderShowYLine) {
                let renderChartWidth = +document.querySelector(`#${item} .highcharts-plot-background`).getAttributeNode("width").value;
                let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;
            
                document.querySelectorAll(`#${item} .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
                    item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
                });
            }
            
        }
    });
    
}

initDemoGraph();
  function initMainFactorsGraph() {
    let baseWidth = 22;

    if (document.body.offsetWidth < 1500) {
        baseWidth = 10;
    }

    if (document.querySelector("#mainFactorsGraph") === null) {
        return false;
    }

    Highcharts.chart('mainFactorsGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true,
            labels: {
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: false
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value) + '%';
                },
                style: {
                    fontSize: "0.9rem",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            valueSuffix: ' $'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
            }
        },
        series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            color: "#3E54D8"
        }]
    });
}

initMainFactorsGraph()
  function initSubscribeChanger() {
    let toggler = document.querySelector(".subscribe-changer input[type='checkbox']");

    if (toggler !== null) {
        let costsBlock = document.querySelectorAll(".costSwitcher");
        let togglerDescr = document.querySelectorAll(".checkbox-toggle__descr");
    
        let subscribeCosts = [["290 руб.", "690 руб.", "890 руб."], ["1290 руб.", "2690 руб.", "3290 руб."]];
        let subscribeNames = ["/ месяц", "/ год"];
    
    
        toggler.addEventListener("change", function() {
            togglerDescr.forEach((item, i) => {
                item.classList.toggle("checkbox-toggle__descr--light");
            });
    
            costsBlock.forEach((item, i) => {
                item.querySelector("p strong").innerHTML = subscribeCosts[+toggler.checked][i];
                item.querySelector("p span").innerHTML = subscribeNames[+toggler.checked];
                item.querySelector(".btnShowAll").classList.toggle("btnShowAll--disabled");
            });
        });
    }
}

initSubscribeChanger();
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
  function mainPromoGraph() {

    const banchGraphData = { // общие данные для промо графика (линейного и столбчатого)
        names: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        plots: [
            {
                name: 'Портфель',
                marker: {
                    symbol: 'circle'
                },
                data: [32.56, 4.44, 6.18, -10.22, 10.23, 12.22, 32.56],
                color: "#3E54D8"
            },
            {
                name: 'S&P 500',
                marker: {
                    symbol: 'circle'
                },
                data: [-12.22, 5.12, -5.22, -7.22, 16.23, -12.22, 18.56],
                color: "#DE4355"
            },
            {
                name: 'Советник',
                marker: {
                    symbol: 'circle'
                },
                data: [5.12, -7.22, -12.22, -5.15, 2.77, 4.18, 15.22],
                color: "#199F27"
            }
        ]
    }

    // ЛИНЕЙНЫЙ ГРАФИК

    function fillLinearGraphInfo(name, id) {
        let sum = banchGraphData.plots[id].data.reduce((item, accum) => item + accum).toFixed(2);
        let className = sum > 0 ? "success" : "error";
        return `${name} <span class="legendPercent ${className}">${sum}%</span>`
    }

    function renderLinearGraph(graphName, renderShowYLine) { // params: [string: id графика линейного, boolean: рисовать верт. линии]
        let myRenderGraph = document.querySelector(`#${graphName}`);

        if (myRenderGraph !== null) {
            Highcharts.chart(graphName, {
                chart: {
                    type: 'spline',
                    style: { "fontFamily": "Montserrat" },
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: true,
                    verticalAlign: 'top',
                    align: 'left',
                    useHTML: true,
                    symbolWidth: 6,
                    itemDistance: 35,
                    itemMarginBottom: 20,
                    itemMarginTop: 10,
                    width: "80%",
                    labelFormatter: function () {
                        //console.log(this);
                        return fillLinearGraphInfo(this.name, this.index);
                        //return `<div class="asdsad">${this.name} ${this.index} (click to hide)</div>`;
                    }
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: banchGraphData.names,
                    labels: {
                        style: {
                            fontSize: "16px",
                            color: "#373943"
                        }
                    },
                    gridLineWidth: (myRenderShowYLine ? 1 : 0)
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return (this.value / 1) + '%';
                        },
                        style: {
                            fontSize: "16px",
                            color: "#373943"
                        }
                    },
                },
                tooltip: {
                    crosshairs: true,
                    shared: true,
                    useHTML: true,
                    valueSuffix: '%'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 5,
                            lineColor: 'transparent',
                            lineWidth: 2
                        }
                    }
                },
                series: banchGraphData.plots
            });
        
            if (renderShowYLine) {
                let renderChartWidth = +document.querySelector(`#${graphName} .highcharts-plot-background`).getAttributeNode("width").value;
                let renderChartOffsetX = (renderChartWidth / banchGraphData.names.length) / 2;
            
                document.querySelectorAll(`#${graphName} .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
                    item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
                });
            }
    
            banchGraphData.plots.forEach((item, id) => {
                let elem = myRenderGraph.querySelector(`.highcharts-series-${id}`);
                elem.setAttribute("style", `-webkit-filter: drop-shadow(0px 2px 2px ${item.color});`);
            });
            
        }
    }

    renderLinearGraph("mainPromoGraph", true);

    ///////////////////////////////


    // СТОЛБЧАТЫЙ ГРАФИК

    let graphBarWidth = 80;
    let graphBarSizeCoef = (graphBarWidth / (banchGraphData.plots.length * 1.6));
    let graphBarContent = document.querySelector(".promoGraphArea__graphBar .banchGraph-content");

    if (graphBarContent === null) {
        return false;
    }

    function fillDescrItems() {
        const items = document.querySelector(".promoGraphArea__graphBar .banchGraph-descr-items");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            elem.classList.add("banchGraph-descr-items-item");
            elem.innerHTML = item.name;
            elem.style.setProperty('--background_label', item.color);
            items.appendChild(elem);
        });
    }

    function fillDescrSummaryContent() {
        const content = document.querySelector(".promoGraphArea__graphBar .banchGraph-descr-summary-content");

        banchGraphData.plots.forEach(item => {
            let elem = document.createElement("span");
            let summary = item.data.reduce((accum, value) => accum + value).toFixed(2);
            elem.innerHTML = summary + "%";
            elem.classList.add(summary > 0 ? "success" : "error");
            elem.style.setProperty('--background_label', item.color);
            content.appendChild(elem);
        });
    }

    function getAbsBanchData() {
        let absValues = [];
        banchGraphData.plots.forEach(item => {
            absValues.push(Math.abs(...item.data));
        });
        return Math.max(...absValues);
    }

    function getSeries(id) {
        let data = [];
        banchGraphData.plots.forEach(item => {
            data.push({
                name: item.name,
                data: [item.data[id]],
                color: item.color,
                borderRadiusTopLeft: item.data[id] > 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusTopRight: item.data[id] > 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusBottomLeft: item.data[id] < 0 ? (graphBarSizeCoef / 6) : 0,
                borderRadiusBottomRight: item.data[id] < 0 ? (graphBarSizeCoef / 6) : 0,
            });
        });
        return data;
    }

    function renderBanchHTML(id) {
        let item = document.createElement("div");
        item.classList.add("banchGraph-content-item");

        let itemGraph = document.createElement("div");
        itemGraph.classList.add("banchGraph-content-item-graph");
        itemGraph.setAttribute("id", "banchGraphModernBar-" + id)

        // date

        let itemDate = document.createElement("div");
        itemDate.classList.add("banchGraph-content-item-date");

        let itemDateSpan = document.createElement("span");
        itemDateSpan.innerHTML = banchGraphData.names[id];
        itemDate.appendChild(itemDateSpan);

        // /date

        // stat

        let itemStat = document.createElement("div");
        itemStat.classList.add("banchGraph-content-item-stat");

        banchGraphData.plots.forEach(elem => {
            let itemStatSpan = document.createElement("span");
            itemStatSpan.innerHTML = elem.data[id] + "%";

            if (elem.data[id] > 0) {
                itemStatSpan.classList.add("success");
            }
            if (elem.data[id] < 0) {
                itemStatSpan.classList.add("error");
            }

            itemStat.appendChild(itemStatSpan);
        });

        // /stat

        item.appendChild(itemGraph);
        item.appendChild(itemDate);
        item.appendChild(itemStat);

        graphBarContent.appendChild(item);
    }

    function renderBanchGraph(id) {
        Highcharts.chart('banchGraphModernBar-' + id, {
            chart: {
                type: 'column',
                borderRadius: 6
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: [banchGraphData.names[id]],
                labels: {
                    enabled: false
                },
                lineWidth: 0
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    enabled: false
                },
                min: -1 * getAbsBanchData(),
                max: getAbsBanchData()

            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointWidth: graphBarSizeCoef,
                    groupPadding: 0,
                    borderWidth: 0,
                    enableMouseTracking: false,
                }
            },
            series: getSeries(id)
        });
    }

    fillDescrSummaryContent()
    fillDescrItems()

    banchGraphData.names.forEach((elem, i) => {
        renderBanchHTML(i);
        renderBanchGraph(i);
    });

    //////////////////////
    
}

mainPromoGraph();

  function initGrowthPaymentsGraph() {

    let colorPaybackDividends = "#47B252";
    let graphBgColor = "#F5F6FD";
    let widthGraphPoint = 75;
    let labelsStyle = {
        fontFamily: "Montserrat",
        fontWeight: "500",
        fontSize: '0.9rem'
    }

    if (document.body.offsetWidth < 1500) {
        widthGraphPoint = 55;
    }

    if (document.body.offsetWidth < 1200) {
        widthGraphPoint = 50;
    }

    // выплаченные дивиденды
    let data = [
        ['2007', 34.61, "rgba(25, 159, 39, 0.15)"],
        ['2008', 55.62, "rgba(25, 159, 39, 0.2)"],
        ['2009', 55.62, "rgba(25, 159, 39, 0.2)"],
        ['2010', 59.62, "rgba(25, 159, 39, 0.4)"],
        ['2011', 59.62, "rgba(25, 159, 39, 0.4)"],
        ['2012', 65.62, "rgba(25, 159, 39, 0.6)"],
        ['2013', 65.62, "rgba(25, 159, 39, 0.6)"],
        ['2014', 62.62, "rgba(25, 159, 39, 0.6)"],
        ['2015', 59.62, "rgba(25, 159, 39, 0.8)"],
        ['2016', 65.62, "rgba(25, 159, 39, 1)"],
        ['2017', 63.62, "rgba(25, 159, 39, 1)"],
        ['2018', 64.62, "rgba(222, 67, 85, 0.8)"],
        ['2019', 65.62, "rgba(222, 67, 85, 0.8)"],
        ['2020', 65.62, "rgba(222, 67, 85, 1)"],
        ['2021', 65.62, "rgba(222, 67, 85, 1)"]
    ];

    function getData(data) {
        return data.map(function (country, i) {
            return {
                name: country[0],
                y: country[1],
                color: country[2]
            };
        });
    }

    let elem = document.querySelector("#growthPaymentsGraph");
    if (elem !== null) {
        var chart = Highcharts.chart('growthPaymentsGraph', {
            chart: {
                type: 'column',
                backgroundColor: graphBgColor,
                height: 200
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',
            },
            legend: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                type: 'category',
                labels: {
                    useHTML: true,
                    animate: true,
                    style: {
                        ...labelsStyle,
                        color: "#606371",
                    }
                }
            },
            yAxis: [{
                labels: {
                    enabled: false,
                },
                title: {
                    text: ''
                },
                showFirstLabel: false,
                gridLineWidth: 0,
            }],
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0,
                },
                column: {
                    borderWidth: 0,
                    pointWidth: widthGraphPoint,
                    enableMouseTracking: false,
                    borderRadiusTopLeft: widthGraphPoint / 10,
                    borderRadiusTopRight: widthGraphPoint / 10,
                }
            },
            series: [
            {
                name: 'Выпл. дивиденды',
                borderColor: colorPaybackDividends,
                id: 'main',
                dataLabels: [{
                    enabled: true,
                    inside: true,
                    useHTML: true,
                    verticalAlign: "bottom",
                    style: {
                        ...labelsStyle,
                        color: "#24252E",
                    },
                    formatter: function(e) {
                        return data[this.x][1] + "$";
                    }
                }],
                data: getData(data).slice(),
            }],
            exporting: {
                allowHTML: true
            }
        });
    }
}

initGrowthPaymentsGraph()
  // link: http://sachinchoolur.github.io/lightslider/

function initSlider() {
    // data-slider="4,2,1" (СТРОКА, ГДЕ ЧИСЛА ЧЕРЕЗ ЗАПЯТУЮ БЕЗ ПРОБЕЛОВ: число элементов на компе, на планшете, на мобилках)

    let screen_xs = 576; // mobile
    let screen_sm = 768; // mobile-reverse

    $("[data-slider]").each(function(_, elem) {
        let items = elem.dataset.slider.split(",");
        if (items.length != 3) { // если в dataset слайдера нет 3 количеств элементов для 3 разрешений 
            items = [1, 1, 1]; // на всех разрешениях будет по 1 элементу
        }
        else {
            items = items.map(e => +e); // преобразуем строки в числа
        }

        $(elem).lightSlider({
            item: items[0],
            slideMove: 1,
            slideMargin: "",
            controls: true,
            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
            speed: 600,
            responsive: [
                {
                    breakpoint: screen_sm,
                    settings: {
                        item: items[1],
                    }
                },
                {
                    breakpoint: screen_xs,
                    settings: {
                        item: items[2],
                    }
                }
            ]
        }); 
    });

}

initSlider();
  function initAverageGrowthGraph() {
    let baseWidth = 22;
    let chartDataLabels = ["Янв.", "Фев.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сен.", "Окт.", "Нояб.", "Дек."];
    let chartDataNames = ["TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER"];
    let chartDataNamesFull = ["Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell"];
    let chartDataYears = [2021, 2020, 2019];
    let chartData = [
        [
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
        ],
        [
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
        ],
        [
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
        ]
    ];

    function generateDataObject(yearsArrayData, costArrayData) {
        let innerHTML = ``;
        yearsArrayData.forEach((data, i) => {
            innerHTML += `
            <div class="customTooltip__item">
                <span class="customTooltip__key">${yearsArrayData[i]}</span>
                <span class="customTooltip__value">${costArrayData[i]} $</span>
            </div>`
        });
        return innerHTML;
    }

    function average(arr) {
        if(arr.length === 0)
            return 0;
    
        let sum = 0;
    
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i];
        } 
        return sum / arr.length;
    }

    function averageGrowthGraphData() {
        let needArray = [];
        let yData = chartData.map(data => data.map(elem => elem.y));
        //console.log(yData);

        yData[0].forEach((elem, index) => {
            needArray.push(average([yData[0][index], yData[1][index], yData[2][index]]));
        });
        
        return needArray;
    }

    if (document.body.offsetWidth < 1500) {
        baseWidth = 10;
    }

    if (document.body.offsetWidth < 576) {
        baseWidth = 22;
    }

    if (document.querySelector("#averageGrowthGraph") === null) {
        return false;
    }

    Highcharts.chart('averageGrowthGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartDataLabels,
            crosshair: true,
            labels: {
                enabled: true,
                type: 'category',
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value) + '%';
                },
                style: {
                    fontSize: "0.9rem",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            formatter: function() {
                let index = this.points[0].point.index;
                //let costArrayData = chartData.map(item => item.point.cost);

                let costArrayData = chartData.map(item => item.filter((elem, i) => i === index).map(elem => elem.cost)[0]);
                let yearsArrayData = chartDataYears;

                return `
                    <div class="customTooltip">
                        <h5 class="customTooltip__title">${chartDataNames[index]} <span>${chartDataNamesFull[index]}</span></h5>
                        <div class="customTooltip__grid">
                            ${generateDataObject(yearsArrayData, costArrayData)}
                        </div>
                    </div>
                `;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
            }
        },
        series: [
            {
                name: "name",
                states: { hover: { enabled: false } },
                data: averageGrowthGraphData(),
                color: "#3E54D8",
            },
        ]
    });
}

initAverageGrowthGraph();
  function initGrowthOfDividendsGraph() {
    let baseWidth = 14;
    let chartDataLabels = ["Янв.", "Фев.", "Март", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сен.", "Окт.", "Нояб.", "Дек."];
    let chartDataNames = ["TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER", "TSLA", "FBA", "DPD", "OQER"];
    let chartDataNamesFull = ["Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell", "Opel autosell"];
    let chartDataYears = [2021, 2020, 2019];
    let chartData = [
        [
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
            {
                y: 49.9,
                cost: 1.12
            },
            {
                y: 71.5,
                cost: 1.12
            },
            {
                y: 106.4,
                cost: 1.12
            },
        ],
        [
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
            {
                y: 29.9,
                cost: 1.12
            },
            {
                y: 41.5,
                cost: 7.12
            },
            {
                y: 76.4,
                cost: 3.12
            },
        ],
        [
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
            {
                y: 64.9,
                cost: 8.12
            },
            {
                y: 14.5,
                cost: 12.12
            },
            {
                y: 56.4,
                cost: 2.12
            },
        ]
    ];

    function generateDataObject(yearsArrayData, costArrayData) {
        let innerHTML = ``;
        yearsArrayData.forEach((data, i) => {
            innerHTML += `
            <div class="customTooltip__item">
                <span class="customTooltip__key">${yearsArrayData[i]}</span>
                <span class="customTooltip__value">${costArrayData[i]} $</span>
            </div>`
        });
        return innerHTML;
    }

    if (document.body.offsetWidth < 1500) {
        baseWidth = 12;
    }

    if (document.body.offsetWidth < 576) {
        baseWidth = 12;
    }

    if (document.querySelector("#growthOfDividendsGraph") === null) {
        return false;
    }

    Highcharts.chart('growthOfDividendsGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            //enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartDataLabels,
            crosshair: true,
            labels: {
                enabled: true,
                type: 'category',
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value) + '%';
                },
                style: {
                    fontSize: "0.9rem",
                    color: "#373943"
                }
            },
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            useHTML: true,
            formatter: function() {
                let index = this.points[0].point.index;
                //let costArrayData = chartData.map(item => item.point.cost);

                let costArrayData = chartData.map(item => item.filter((elem, i) => i === index).map(elem => elem.cost)[0]);
                let yearsArrayData = chartDataYears;

                return `
                    <div class="customTooltip">
                        <div class="customTooltip__grid">
                            ${generateDataObject(yearsArrayData, costArrayData)}
                        </div>
                    </div>
                `;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
            }
        },
        series: [
            {
                name: chartDataYears[0],
                states: { hover: { enabled: false } },
                data: chartData[0],
                color: "#3E54D8",
            },
            {
                name: chartDataYears[1],
                states: { hover: { enabled: false } },
                data: chartData[1],
                color: "#E46877",
            },
            {
                name: chartDataYears[2],
                states: { hover: { enabled: false } },
                data: chartData[2],
                color: "#46B151",
            },
        ]
    });
}

initGrowthOfDividendsGraph();
  function initPortfolioProfitGraph() {
    let baseWidth = 14;
    let chartDataNames = ["ERT", "QRT", "RTE", "ERT", "QRT", "RTE", "ERT", "QRT", "RTE", "ERT", "QRT", "RTE"];
    let chartData = [17, 14, 12, 8, 7, 6 , 5, 4, 3, 2, 1, 1];

    if (document.body.offsetWidth < 1500) {
        baseWidth = 12;
    }

    if (document.body.offsetWidth < 576) {
        baseWidth = 12;
    }

    if (document.querySelector("#portfolioProfitGraph") === null) {
        return false;
    }

    Highcharts.chart('portfolioProfitGraph', {
        chart: {
            type: 'column',
            style: { "fontFamily": "" },
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: chartDataNames,
            crosshair: true,
            labels: {
                enabled: true,
                type: 'category',
                style: {
                    fontSize: "16px",
                    color: "#373943"
                }
            },
            visible: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return (this.value) + '%';
                },
                style: {
                    fontSize: "0.9rem",
                    color: "#373943"
                }
            },
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                pointWidth: baseWidth,
                borderRadiusTopLeft: baseWidth / 2,
                borderRadiusTopRight: baseWidth / 2,
                enableMouseTracking: false,
            }
        },
        series: [
            {
                name: "data",
                states: { hover: { enabled: false } },
                data: chartData,
                color: "#46B151",
            },
        ]
    });
}

initPortfolioProfitGraph();

  document.querySelectorAll(".myStrategy-news-container .table-content-item").forEach(item => {
    item.addEventListener("click", (e) => {
      item.classList.toggle("shown")
    });
  });

  document.querySelectorAll(".myStrategy-items-item").forEach(item => {
    let indicatorTable = document.querySelectorAll(".myStrategy-indicators-container .table-scroll");
    indicatorTable.forEach(elem => {
      elem.style.width = `${item.offsetWidth - 2}px`
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

  $(".btn_addOperation").click(function () {
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

