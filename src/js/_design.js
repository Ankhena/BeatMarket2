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
