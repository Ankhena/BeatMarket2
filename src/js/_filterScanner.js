function filterScanner() {
  const companies = [
    {
      img: "pcg.png",
      imgAlt: 'Иконка PCG',
      title: 'PCG',
      subtitle: 'Microsoft',
      price: '126.23',
      percent: '1.13',
      exchange: "NYSE",
      globalScoring: 93,
      localScoring: 62,
      pe: "3.5",
      ps: "1.2",
      continent: 'Азия'
    },
    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '100.23',
      percent: '8.2',
      exchange: "NYSE",
      globalScoring: 95,
      localScoring: 45,
      pe: "1.23",
      ps: "1.67",
      continent: 'Европа'
    },
    {
      img: "pcg.png",
      imgAlt: 'Иконка PCG',
      title: 'PCG',
      subtitle: 'Microsoft',
      price: '123.23',
      percent: '1.23',
      exchange: "NYSE",
      globalScoring: 75,
      localScoring: 65,
      pe: "2.98",
      ps: "1.78",
      continent: 'Северная Америка'
    },
    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '85.23',
      percent: '1.2',
      exchange: "NYSE",
      globalScoring: 15,
      localScoring: 25,
      pe: "2.35",
      ps: "2.85",
      continent: 'Южная Америка'
    },

    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '82.23',
      percent: '1.28',
      exchange: "NYSE",
      globalScoring: 55,
      localScoring: 35,
      pe: "2.75",
      ps: "2.15",
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
  const sortedTitleBtn = document.querySelector("#sorted-title")
  const sortedTitleBtnMobile = document.querySelector("#sorted-title-mobile")
  const sortedPriceBtn = document.querySelector("#sorted-price")
  const sortedPercentBtn = document.querySelector("#sorted-percent")
  const sortedExChangeBtn = document.querySelector("#sorted-exChange")
  const sortedBmsGlobalBtn = document.querySelector("#sorted-bmsGlobal")
  const sortedBmsLocalBtn = document.querySelector("#sorted-bmsLocal")
  const sortedPEBtn = document.querySelector("#sorted-PE")
  const sortedPSBtn = document.querySelector("#sorted-PS")
  const sortedContinentBtn = document.querySelector("#sorted-continent")

  inputCounts.forEach(inputCount => {
    inputCount.addEventListener("input", (e) => {
      let pattern = /[^\d.]/

      e.target.value = e.target.value.replace(pattern, '')
    })

    inputCount.addEventListener("click", (e) => {
      e.target.focus()
      let value = e.target.value
      e.target.value = ""
      e.target.value = value
    })
  })

  function sortedList(dataName, element, numberElement = true, event) {
    const activesBtn = content.getElementsByClassName("active")
    let currentActive = activesBtn[0]

    for (let i = 0; i < box.children.length; i++) {
      for (let j = i; j < box.children.length; j++) {
        if (!element.classList.contains('active') && !element.classList.contains("bottom")) {
          if (currentActive) {
            currentActive.classList.remove("active");
            currentActive.classList.remove("bottom");
          }

          if (currentActive !== element || !currentActive.classList.contains('active')) {
            element.classList.add("active")
            element.classList.remove("bottom")
          }

          if (numberElement) {
            if (+box.children[i].getAttribute(`data-${dataName}`) > +box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          } else {
            if (box.children[i].getAttribute(`data-${dataName}`) > box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          }
        } else if (element.classList.contains('active') && !element.classList.contains("bottom")) {
          element.classList.add("bottom")
          if (numberElement) {
            if (+box.children[i].getAttribute(`data-${dataName}`) < +box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          } else {
            if (box.children[i].getAttribute(`data-${dataName}`) < box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          }

        } else if (element.classList.contains('active') && element.classList.contains("bottom")) {
          element.classList.remove("bottom")
          if (numberElement) {
            if (+box.children[i].getAttribute(`data-${dataName}`) > +box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          } else {
            if (box.children[i].getAttribute(`data-${dataName}`) > box.children[j].getAttribute(`data-${dataName}`)) {
              let replacedNode = box.replaceChild(box.children[j], box.children[i])
              insertAfter(replacedNode, box.children[i])
            }
          }
        }
      }
    }
  }


  function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
  }

  sortedTitleBtn.addEventListener("click", sortedList.bind(null, "title", sortedTitleBtn, false))
  sortedTitleBtnMobile.addEventListener("click", sortedList.bind(null, "title", sortedTitleBtnMobile, false))
  sortedPriceBtn.addEventListener("click", sortedList.bind(null, "price", sortedPriceBtn))
  sortedPercentBtn.addEventListener("click", sortedList.bind(null, "percent", sortedPercentBtn))
  sortedBmsGlobalBtn.addEventListener("click", sortedList.bind(null, "bmsGlobal", sortedBmsGlobalBtn))
  sortedBmsLocalBtn.addEventListener("click", sortedList.bind(null, "bmsLocal", sortedBmsLocalBtn))
  sortedPEBtn.addEventListener("click", sortedList.bind(null, "PE", sortedPEBtn))
  sortedPSBtn.addEventListener("click", sortedList.bind(null, "PS", sortedPSBtn))
  sortedContinentBtn.addEventListener("click", sortedList.bind(null, "continent", sortedContinentBtn, false))
  sortedExChangeBtn.addEventListener("click", sortedList.bind(null, "exChange", sortedExChangeBtn, false))

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
    const fixedHtmlElement = `
      <div class="table-ticker-fixed__block" data-title=${company.title}>
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
      </div>
    `

    const fixedBox = document.querySelector(".table-ticker-fixed__box")

    const htmlElement = `
              <div class="table-ticker__content" data-price=${company.price} data-title=${company.title} data-percent=${company.percent} data-exChange=${company.exchange} data-bmsGlobal=${company.globalScoring} data-bmsLocal=${company.localScoring} data-PE=${company.pe} data-PS=${company.ps} data-continent=${company.continent}>
                <div class="table-ticker__block table-ticker__block--moving">
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
                <div class="table-ticker__block onlyText whnr">
                  ${company.price} USD
                </div>
                <div class="table-ticker__block percent onlyText whnr">
                  +${company.percent}%
                </div>
                <div class="table-ticker__block onlyText">
                  ${company.exchange}
                </div>
                <div class="table-ticker__block">
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
                  ${company.pe}
                </div>
                <div class="table-ticker__block onlyText">
                  ${company.ps}
                  </div>
                  <div class="table-ticker__block onlyText">
                    ${company.continent}
                  </div>
              </div>
      `
    fixedBox.insertAdjacentHTML("beforeend", fixedHtmlElement)
    box.insertAdjacentHTML("beforeend", htmlElement)
  }

  function removeCompanies(company) {
    box.innerHTML = ""
  }

  listCompanies()
}

filterScanner()