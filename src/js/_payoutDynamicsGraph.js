const myPayoutDynamicsGraph = document.querySelector("#PayoutDynamicsGraph");




if (myPayoutDynamicsGraph !== null) {

  const myRenderGraphCategories2 = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const myRenderShowYLine2 = true; // если нужен показ верт. линий в графе, ставим true

  Highcharts.chart(myPayoutDynamicsGraph, {
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
      categories: myRenderGraphCategories2,
      labels: {
        style: {
          fontSize: "16px",
          color: "#373943"
        }
      },
      gridLineWidth: (myRenderShowYLine2 ? 1 : 0)
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
      valueSuffix: ' USD'
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
        data: [43.00, 44.30, 45.00, 50.00, 52.00, 57.00, 59.00],
        color: "#3E54D8",
        dataLabels: [{
          enabled: true,
          inside: true,
          useHTML: true,
          verticalAlign: "bottom",
          style: {
            color: "#24252e",
            fontWeight: "500",
            fontSize: "15px",
          },
          format:'{y:0.2f} USD'
        }]
      }

    ]
  });

  if (myRenderShowYLine) {
    let renderChartWidth = +document.querySelector(`#PayoutDynamicsGraph .highcharts-plot-background`).getAttributeNode("width").value;
    let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;

    document.querySelectorAll(`#PayoutDynamicsGraph .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
      item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
    });
  }
}
