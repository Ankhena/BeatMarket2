--include("_webpsup.js");

$(document).ready(function () {

  --include("_modal.js")
  --include("_burger.js")
  --include("_selectric.js")
  --include("_scroll.js")
  --include("_strategyPromoGraph.js")
  --include("_searchInput.js")
  --include("_moveStrategy.js")
  --include("_dividendsGraph.js")
  --include("_payoutDynamicsGraph.js") //
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
  --include("_averageDividentsGraph.js")
  --include("_filterScanner.js")

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


  $(".customRange").each((i, mainElem) => {
    if (mainElem) {
      if ($(".customRange__info")) {
        const elemMain = mainElem.getAttribute("id");
        $(`#${elemMain} .customRange__slider`).each((_, elem) => {
          const dataMin = document.querySelector('[data-min]');
          const dataMax = document.querySelector('[data-max]');

          $(elem).slider({
            range: true,
            min: 0,
            max: 120,
            values: [0, 120],

            slide: function (event, ui) {
              $(`#${elemMain} #min`).val(ui.values[0])
              $(`#${elemMain} #max`).val(ui.values[1])
              dataMin.setAttribute("data-min", ui.values[0])
              dataMax.setAttribute("data-max", ui.values[1])
            },

            change: function (event, ui) {
              $(`#${elemMain} #min`).val(ui.values[0])
              $(`#${elemMain} #max`).val(ui.values[1])
              dataMin.setAttribute("data-min", ui.values[0])
              dataMax.setAttribute("data-max", ui.values[1])
            }
          });

          $(`#${elemMain} #min`).on("input", (e) => {
            let pattern = /[^\d.]/

            e.target.value = e.target.value.replace(pattern, '')

          })

          $(`#${elemMain} #min`).on("click", (e) => {
            e.target.focus()
            let value = e.target.value
            e.target.value = ""
            e.target.value = value
          })

          $(`#${elemMain} #max`).on("click", (e) => {
            e.target.focus()
            let value = e.target.value
            e.target.value = ""
            e.target.value = value
          })

          $(`#${elemMain} #max`).on("input", (e) => {
            let pattern = /[^\d.]/

            e.target.value = e.target.value.replace(pattern, '')

          })

          $(`#${elemMain} #min`).change(function () {
            let val = $(this).val()

            dataMin.dataset.min = val
            $(elem).slider("values", [val, dataMax.dataset.max])
          })

          $(`#${elemMain} #max`).change(function () {
            let val = $(this).val()

            dataMax.dataset.max = val
            $(elem).slider("values", [dataMin.dataset.min, val])
          })

        });
      } else {
        $(`.customRange__slider`).each((_, elem) => {
          $(elem).slider({
            range: true,
            min: 0,
            max: 100,
            values: [2, 48],
          });
        });
      }
    }
  })

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

function tabsScroll(table) {
  let speed = 2; // Скорость скролла.


  let scroll = document.querySelector(`.${table}`);

  let left = 0; // отпустили мышку - сохраняем положение скролла
  let drag = false;
  let coorX = 0; // нажали мышку - сохраняем координаты.

  if (!scroll) {
    return false
  }
  scroll.addEventListener('mousedown', function (e) {
    drag = true;
    coorX = e.pageX - this.offsetLeft;
  });
  scroll.addEventListener('mouseup', function () {
    drag = false;
    left = scroll.scrollLeft;
  });
  scroll.addEventListener('mousemove', function (e) {
    if (drag) {
      this.scrollLeft = left + (e.pageX - this.offsetLeft - coorX) * speed;
    }
  });
}

tabsScroll("statTable--scroll")
tabsScroll("table-scroll")
tabsScroll("table-scroll")
tabsScroll("table-ticker__scroll")

document.querySelector(".main-menu-btn").addEventListener("click", () => {
  document.querySelector(".main-menu").classList.toggle("active")
})

document.querySelectorAll('.modal-content-toggle').forEach(toggleElement => {
  toggleElement.querySelector(".selectDropdownMenu__toggler").addEventListener("click", () => {
    toggleElement.querySelector(".toggleOverlay").classList.toggle("active")
  })
})
