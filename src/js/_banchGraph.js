function initBanchGraph() {
    const banchData = {
        months: ["Янв 2020", "Фев 2020", "Мар 2020", "Апр 2020", "Май 2020", "Июн 2020", "Июл 2020", "Авг 2020", "Сен 2020", "Окт 2020", "Ноя 2020", "Дек 2020"],
        data: [
            {
                name: "Мой портфель",
                class: "primary"
            },
            {
                name: "S&P 500",
                class: "success"
            },
        ],
        percentData: [
            [32.56, -12.22],
            [4.44, 5.12], 
            [6.18, -5.22], 
            [-10.22, 16.66],
            [10.23, -5.11],
            [12.22, 20.66],
            [-5.22, 4.44], 
            [10.23, -12.22], 
            [-5.11, 20.66], 
            [32.56, 10.23], 
            [5.12, 20.66], 
            [-5.11, 16.66]
        ]
    };

    const maxValue = fillGraphLabels();
    fillDescrItems();
    fillMainGraph(maxValue);

    function fillGraphLabels() { // заполнить серые цифры и графика (обозначения слева)
        let nums = banchData.percentData.map(item => Math.max.apply(null, item));
        let maxNum = Math.max.apply(null, nums);
        let cleanMaxNum = Math.ceil(maxNum).toFixed(2);
        let cleanArray = [cleanMaxNum, 0, "-" + cleanMaxNum];

        let parentNode = document.querySelector(".banchGraph-descr-percent");
        if (parentNode === null) {
            return false;
        }

        cleanArray.forEach(item => {
            let elem = document.createElement("span");
            elem.innerHTML = item;
            parentNode.appendChild(elem);
        });

        return cleanMaxNum;
    }

    function fillDescrItems() {
        let parentNode = document.querySelector(".banchGraph-descr-items");
        if (parentNode === null) {
            return false;
        }

        banchData.data.forEach(item => {
            let myNode = document.createElement("div");
            myNode.classList.add("banchGraph-descr-items-item");
    
            let mySpan = document.createElement("span");
            mySpan.classList.add(item.class);

            //if (window.outerWidth > 720) {
                mySpan.innerHTML = item.name;
            //}

            myNode.appendChild(mySpan);
            parentNode.appendChild(myNode);
        });
    }

    function fillMainGraph(maxValue) {
        let parentNode = document.querySelector(".banchGraph-content");
        if (parentNode === null) {
            return false;
        }

        banchData.months.forEach((item, i) => {
            let banchGraph_item = document.createElement("div");
            banchGraph_item.classList.add("banchGraph-content-item");

            let banchGraph_item_graph = document.createElement("div");
            banchGraph_item_graph.classList.add("banchGraph-content-item-graph");

            let banchGraph_item_graph_half = document.createElement("div");
            banchGraph_item_graph_half.classList.add("banchGraph-content-item-graph-half");


            let banchGraph_item_date = document.createElement("div");
            banchGraph_item_date.classList.add("banchGraph-content-item-date");

            let banchGraph_item_date_span = document.createElement("span");
            banchGraph_item_date_span.innerHTML = item;
            banchGraph_item_date.appendChild(banchGraph_item_date_span);

            let banchGraph_item_stat = document.createElement("div");
            banchGraph_item_stat.classList.add("banchGraph-content-item-stat");

            banchData.percentData[i].forEach((elem, j) => {
                let mySpan = document.createElement("span");
                mySpan.innerHTML = elem + "%";
                mySpan.classList.add((elem > 0 ? "success" : "error"));
                banchGraph_item_stat.appendChild(mySpan);

                let banchGraph_item_graph_half_item = document.createElement("div");
                banchGraph_item_graph_half_item.classList.add("banchGraph-content-item-graph-half-item");
                banchGraph_item_graph_half_item.classList.add(banchData.data[j].class);

                let myHeight = (elem * 100) / maxValue;

                if (myHeight < 0) {
                    myHeight = Math.abs(myHeight);
                    banchGraph_item_graph_half_item.style.transform = "translateY(calc(100% + 2px)) rotate(180deg)";
                }

                banchGraph_item_graph_half_item.style.height = `${myHeight}%`;

                banchGraph_item_graph_half.appendChild(banchGraph_item_graph_half_item);

            });

            banchGraph_item_graph.appendChild(banchGraph_item_graph_half);

            banchGraph_item.appendChild(banchGraph_item_graph);
            banchGraph_item.appendChild(banchGraph_item_date);
            banchGraph_item.appendChild(banchGraph_item_stat);
            parentNode.appendChild(banchGraph_item);
        });
    }
}

initBanchGraph();