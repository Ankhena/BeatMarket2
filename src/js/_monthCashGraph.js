function initMonthCashGraph() {

  let colorPaybackDividends = "#47b252";
  let colorOverallDividends = "#e6eeff";
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
    ['Янв', 19.12, "Январь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Фев', 24.12, "Февраль", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Мар', 38.12, "Март", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Апр', 11.12, "Апрель", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Май', 24.12, "Май", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Июн', 38.12, "Июнь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Июл', 29.12, "Июль", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Авг', 46.12, "Август", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Сен', 24.12, "Сентябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Окт', 38.12, "Октябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Ноя', 29.12, "Ноябрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Дек', 46.12, "Декабрь", [{name: "AMAT", payment: 20.22}, {name: "BMG", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]]
  ];

  // выплаченные дивиденды
  let data = [
    ['Янв', 15.12, "Январь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Фев', 19.12, "Февраль", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Мар', 26.12, "Март", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Апр', 17.12, "Апрель", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Май', 19.12, "Май", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Июн', 0, "Июнь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {name: "TSLA", payment: 32.44}]],
    ['Июл', 27.12, "Июль", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Авг', 46.12, "Август", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Сен', 24.12, "Сентябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Окт', 38.12, "Октябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Ноя', 29.12, "Ноябрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]],
    ['Дек', 46.12, "Декабрь", [{name: "STR", payment: 20.22}, {name: "GRT", payment: 2.44}, {
      name: "TSLA",
      payment: 32.44
    }]]
  ];

  function generateDataObject(yearsArrayData, costArrayData, className) {
    let innerHTML = ``;
    yearsArrayData.forEach((data, i) => {
      innerHTML += `
            <div class="customTooltip__item">
                <span class="customTooltip__key">${yearsArrayData[i]}</span>
                <span class="customTooltip__value ${className}">${costArrayData[i]} USD</span>
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
        style: {"fontFamily": ""},
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
        formatter: function () {
          let index = this.points[0].point.index;
          let yearsArrayData = data[index][3].map(item => item.name);
          let costArrayData = data[index][3].map(item => item.payment);

          let yearsArrayDataOld = dataPrev[index][3].map(item => item.name);
          let costArrayDataOld = dataPrev[index][3].map(item => item.payment);

          return `
                        <div class="customTooltip">
                         <!--   <h5 class="customTooltip__title">Дивиденды, ${data[index][2]} <span class="customTooltip__label">82.12 $</span></h5> -->
                            <div class="customTooltip__grid">
                              <div>
                                <h6 class="customTooltip__subtitle">Подтверждено:</h6>
                                ${generateDataObject(yearsArrayData, costArrayData, "success")}
                              </div>
                              <div>
                                  <h6 class="customTooltip__subtitle">Прогноз:</h6>
                                    ${generateDataObject(yearsArrayDataOld, costArrayDataOld, "secondary")}
                              </div>
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
          states: {hover: {enabled: false}},
          color: colorOverallDividends, // ожидаемые дивиденды
          borderColor: "#d3e3ff",
          linkedTo: 'main',
          data: dataPrev.slice(),
        },
        {
          name: 'Выпл. дивиденды',
          states: {hover: {enabled: false}},
          borderColor: colorPaybackDividends,
          id: 'main',
          dataLabels: [{
            enabled: true,
            inside: true,
            useHTML: true,
            verticalAlign: "bottom",
            style: {
              ...labelsStyle,
              color: "#24252e",
            },
            formatter: function (e) {
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
