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