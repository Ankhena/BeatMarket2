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