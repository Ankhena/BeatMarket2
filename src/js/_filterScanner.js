function filterScanner() {
  const companies = [
    {
      img: "pcg.png",
      imgAlt: 'Иконка PCG',
      title: 'PCG',
      subtitle: 'Microsoft',
      price: '126.23 USD',
      percent: '1.13',
      exchange: "NYSE",
      globalScoring: 93,
      localScoring: 62,
      pe: "P/aE",
      ps: "P/rS",
      continent: 'Азия'
    },
    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '883.23 USD',
      percent: '8.2',
      exchange: "NYSE",
      globalScoring: 95,
      localScoring: 45,
      pe: "P/xE",
      ps: "P/tS",
      continent: 'Европа'
    },
    {
      img: "pcg.png",
      imgAlt: 'Иконка PCG',
      title: 'PCG',
      subtitle: 'Microsoft',
      price: '123.23 USD',
      percent: '1.23',
      exchange: "NYSE",
      globalScoring: 75,
      localScoring: 65,
      pe: "P/eE",
      ps: "P/tS",
      continent: 'Северная Америка'
    },
    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '85.23 USD',
      percent: '1.2',
      exchange: "NYSEGE",
      globalScoring: 15,
      localScoring: 25,
      pe: "P/eE",
      ps: "P/tS",
      continent: 'Южная Америка'
    },

    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '82.23 USD',
      percent: '1.2',
      exchange: "NYSEGE",
      globalScoring: 55,
      localScoring: 35,
      pe: "P/eE",
      ps: "P/tSb",
      continent: 'Австралия'
    },

  ]

  const content = document.querySelector(".table-ticker")
  const tableHeader = document.querySelector(".table-ticker__header")
  const box = document.querySelector(".table-ticker__box")
  const btns = document.querySelectorAll(".table-ticker-header__item")
  const filterContinent = document.querySelector("#analyticScannerContinent")
  const filterScoring = document.querySelector("#analyticScannerScoring")
  const inputSearch = document.querySelector("#search-company")
  const inputCounts = document.querySelectorAll('.analyticScanner__count input')
  const resetBtnElement = document.querySelector("#reset-filter")
  const sortedPriceBtn = document.querySelector("#sorted-price")
  const sortedPercentBtn = document.querySelector("#sorted-percent")
  const sortedExChangeBtn = document.querySelector("#sorted-exChange")
  const sortedBmsGlobalBtn = document.querySelector("#sorted-bmsGlobal")
  const sortedBmsLocalBtn = document.querySelector("#sorted-bmsLocal")
  const sortedPEBtn = document.querySelector("#sorted-PE")
  const sortedPSBtn = document.querySelector("#sorted-PS")
  const sortedContinentBtn = document.querySelector("#sorted-continent")
  const sortedPriceBtnMobile = document.querySelector(".sorted-price")
  const sortedPercentBtnMobile = document.querySelector(".sorted-percent")
  const sortedExChangeBtnMobile = document.querySelector(".sorted-exChange")
  const sortedBmsGlobalBtnMobile = document.querySelector(".sorted-bmsGlobal")
  const sortedBmsLocalBtnMobile = document.querySelector(".sorted-bmsLocal")
  const sortedPEBtnMobile = document.querySelector(".sorted-PE")
  const sortedPSBtnMobile = document.querySelector(".sorted-PS")
  const sortedContinentBtnMobile = document.querySelector(".sorted-continent")

  inputCounts.forEach(inputCount => {
    inputCount.addEventListener("input", (e) => {
      let pattern = /[^\d.]/

      e.target.value = e.target.value.replace(pattern, '')
    })
  })

  function sortedList(dataName, element, event) {
    const activesBtn = tableHeader.getElementsByClassName("active")
    for (let i = 0; i < box.children.length; i++) {
      for (let j = i; j < box.children.length; j++) {
        if (box.children[i].getAttribute(`data-${dataName}`) < box.children[j].getAttribute(`data-${dataName}`)) {
          let currentActive = activesBtn[0]
          if (currentActive) {
            currentActive.classList.remove("active");
          }

          if (currentActive !== element || !currentActive.classList.contains('active')) {
            element.classList.add("active")
            let replacedNode = box.replaceChild(box.children[j], box.children[i])
            insertAfter(replacedNode, box.children[i])
          }

        }
      }
    }
  }

  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
  }

  sortedPriceBtn.addEventListener("click", sortedList.bind(null, "price", sortedPriceBtn))
  sortedPercentBtn.addEventListener("click", sortedList.bind(null, "percent", sortedPercentBtn))
  sortedBmsGlobalBtn.addEventListener("click", sortedList.bind(null, "bmsGlobal", sortedBmsGlobalBtn))
  sortedBmsLocalBtn.addEventListener("click", sortedList.bind(null, "bmsLocal", sortedBmsLocalBtn))
  sortedPEBtn.addEventListener("click", sortedList.bind(null, "PE", sortedPEBtn))
  sortedPSBtn.addEventListener("click", sortedList.bind(null, "PS", sortedPSBtn))
  sortedContinentBtn.addEventListener("click", sortedList.bind(null, "continent", sortedContinentBtn))
  sortedExChangeBtn.addEventListener("click", sortedList.bind(null, "exChange", sortedExChangeBtn))
  sortedPriceBtnMobile.addEventListener("click", sortedList.bind(null, "price", sortedPriceBtnMobile))
  sortedPercentBtnMobile.addEventListener("click", sortedList.bind(null, "percent", sortedPercentBtnMobile))
  sortedBmsGlobalBtnMobile.addEventListener("click", sortedList.bind(null, "bmsGlobal", sortedBmsGlobalBtnMobile))
  sortedBmsLocalBtnMobile.addEventListener("click", sortedList.bind(null, "bmsLocal", sortedBmsLocalBtnMobile))
  sortedPEBtnMobile.addEventListener("click", sortedList.bind(null, "PE", sortedPEBtnMobile))
  sortedPSBtnMobile.addEventListener("click", sortedList.bind(null, "PS", sortedPSBtnMobile))
  sortedContinentBtnMobile.addEventListener("click", sortedList.bind(null, "continent", sortedContinentBtnMobile))
  sortedExChangeBtnMobile.addEventListener("click", sortedList.bind(null, "exChange", sortedExChangeBtnMobile))

  function resetBtn() {
    inputSearch.value = ""
    removeCompanies()
    listCompanies()
  }

  resetBtnElement.addEventListener("click", resetBtn)

  function listCompanies() {
    companies.forEach(company => {
      renderCompanies(company)
    })
  }


  function renderCompanies(company) {
    const htmlElement = `
              <div class="table-ticker__content" data-price=${company.price} data-title=${company.title} data-percent=${company.percent} data-exChange=${company.exchange} data-bmsGlobal=${company.globalScoring} data-bmsLocal=${company.localScoring} data-PE=${company.pe} data-PS=${company.ps} data-continent=${company.continent}>
                <div class="table-ticker__block">
                  <div class="table-ticker-block__item">
                    <div class="table-ticker-block__img">
                      <img src="./img/statTable__icons/${company.img}" alt="${company.imgAlt}">
                    </div>
                    <div class="table-ticker-block__content table-ticker-block__info">
                      <div class="table-ticker-block-info__content">
                        <h3 class="table-ticker-block-info__title">${company.title}</h3>
                        <div class="table-ticker-block__paperDontTrade">
                          <svg class="table-ticker-block-paperDontTrade__icon">
                            <use xlink:href="img/main.svg#icon-trendUp"></use>
                          </svg>
                        </div>
                      </div>
                      <span class="table-ticker-block__subtitle">${company.subtitle}</span>
                    </div>
                  </div>
                </div>
                <div class="table-ticker__block onlyText">
                  <span class="mobile-info">${company.price}</span>
                  ${company.price}
                </div>
                <div class="table-ticker__block percent onlyText">
                  <span class="mobile-info">+${company.percent}%</span>
                  +${company.percent}%
                </div>
                <div class="table-ticker__block onlyText">
                  <span class="mobile-info">${company.exchange}</span>
                  ${company.exchange}
                </div>
                <div class="table-ticker__block">
                  <span class="mobile-info">BMS global</span>
                  <div class="table-ticket__scoring">
                    <div class="table-ticket-scoring__value table-ticket-scoring__value--negative">21</div>
                    <div class="table-ticket-scoring__diagram" style="--persent: ${company.globalScoring}px; --diagram-color: #de4355;">
                      <svg width="51" height="51" viewBox="0,0,38.16, 38.16">
                        <circle r="15.9" cx="19.08" cy="19.08"></circle>
                        <circle r="15.9" cx="19.08" cy="19.08" style=""></circle>
                        <text id="text" x="50%" y="50%" dy="0.35em" text-anchor="middle" style=" line-height: 1">
                          ${company.globalScoring}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="table-ticker__block">
                  <span class="mobile-info">BMS local</span>
                  <div class="table-ticket__scoring">
                    <div class="table-ticket-scoring__value table-ticket-scoring__value--negative">21</div>
                    <div class="table-ticket-scoring__diagram" style="--persent: ${company.localScoring}px; --diagram-color: #de4355;">
                      <svg width="51" height="51" viewBox="0,0,38.16, 38.16">
                        <circle r="15.9" cx="19.08" cy="19.08"></circle>
                        <circle r="15.9" cx="19.08" cy="19.08" style=""></circle>
                        <text id="text" x="50%" y="50%" dy="0.35em" text-anchor="middle" style=" line-height: 1">
                          ${company.localScoring}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="table-ticker__block onlyText">
                  <span class="mobile-info">${company.pe}</span>
                  ${company.pe}
                </div>
                <div class="table-ticker__block onlyText">
                  <span class="mobile-info">${company.ps}</span>
                  ${company.ps}
                  </div>
                  <div class="table-ticker__block onlyText">
                    <span class="mobile-info">${company.continent}</span>
                    ${company.continent}
                  </div>
              </div>
      `
    box.insertAdjacentHTML("beforeend", htmlElement)
  }

  function removeCompanies(company) {
    box.innerHTML = ""
  }

  listCompanies()
}

filterScanner()