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