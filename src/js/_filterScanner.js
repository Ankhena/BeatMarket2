function filterScanner() {
  const companies = [
    {
      img: "pcg.png",
      imgAlt: 'Иконка PCG',
      title: 'PCG',
      subtitle: 'Microsoft',
      price: '123.23 USD',
      percent: '+1.23%',
      exchange: "NYSE",
      globalScoring: 75,
      localScoring: 65,
      continent: 'Азия'
    },
    {
      img: "viac.svg",
      imgAlt: 'Иконка VIAC',
      title: 'VIAC',
      subtitle: 'Microsoft company',
      price: '883.23 USD',
      percent: '+11.2%',
      exchange: "NYSE",
      globalScoring: 85,
      localScoring: 55,
      continent: 'Европа'
    },
  ]

  const content = document.querySelector(".table-ticker")
  const btns = document.querySelectorAll(".table-ticker-header__item")
  const filterContinent = document.querySelector("#analyticScannerContinent")
  const filterScoring = document.querySelector("#analyticScannerScoring")
  const inputSearch = document.querySelector("#search-company")


  //function searchCompany(companies) {

  //  inputSearch.addEventListener("input", (e) => {
  //    const input = e.target.value

  //    companies.filter(company => {
  //      if(company.title == input) {
  //        renderCompanies(company)
  //      }
  //    })
  //  })
  //}

  //searchCompany(companies)

  function listCompanies() {
    companies.forEach(company => {
      renderCompanies(company)
    })
  }

  
  function renderCompanies(company) {
    const htmlElement = `
              <div class="table-ticker__content">
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
                  <span class="mobile-info">${company.percent}</span>
                  ${company.percent}
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
                  <span class="mobile-info">${company.continent}</span>
                  ${company.continent}
                </div>
              </div>
      `
    content.insertAdjacentHTML("beforeend", htmlElement)
  }

  listCompanies()
}

filterScanner()