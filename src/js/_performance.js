const separation_graph_1_data = [{
    name: 'Intel',
    y: 5,
    z: 100,
    color: "#5BDE60"
}, {
    name: 'Texas instrumental',
    y: 23.03,
    z: 100,
    color: "#5B97DE"
}, {
    name: 'Tractor supply',
    y: 7.11,
    z: 100,
    color: "#DE5B5B"
}, {
    name: 'Pool',
    y: 8.25,
    z: 100,
    color: "#DEAA5B"
}, {
    name: 'ZM company',
    y: 3.03,
    z: 100,
    color: "#5E5BDE"
}, {
    name: 'Mastercard',
    y: 5.24,
    z: 100,
    color: "#BC5BDE"
}, {
    name: 'Other',
    y: 55.67,
    z: 100,
    color: "#acacac"
}];

const separation_graph_2_data = [{
    name: 'Financial',
    y: 5,
    z: 100,
    color: "#5BDE60"
}, {
    name: 'Technology',
    y: 33.03,
    z: 100,
    color: "#5B97DE"
}, {
    name: 'Tractor supply',
    y: 17.11,
    z: 100,
    color: "#DE5B5B"
}, {
    name: 'Pool',
    y: 28.25,
    z: 100,
    color: "#DEAA5B"
}, {
    name: 'ZM company',
    y: 13.03,
    z: 100,
    color: "#5E5BDE"
}];

const separation_graph_3_data = [{
    name: 'Equity',
    y: 100,
    z: 100,
    color: "#DE5B5B"
}];

const separation_graph_4_data = [{
    name: 'INT',
    y: 23.03,
    z: 100,
    color: "#2C7259"
}, {
    name: 'TXN',
    y: 7.11,
    z: 100,
    color: "#FFEB34"
}, {
    name: 'TCKO',
    y: 8.25,
    z: 100,
    color: "#B22D2D"
}, {
    name: 'Pool',
    y: 3.03,
    z: 100,
    color: "#BC5BDE"
}, {
    name: 'MA',
    y: 5.24,
    z: 100,
    color: "#2D1336"
}, {
    name: 'MMA',
    y: 55.67,
    z: 100,
    color: "#842EA3"
}, {
    name: 'LEG',
    y: 3.03,
    z: 100,
    color: "#5BDE60"
}, {
    name: 'INT',
    y: 23.03,
    z: 100,
    color: "#2C7259"
}, {
    name: 'TXN',
    y: 7.11,
    z: 100,
    color: "#FFEB34"
}, {
    name: 'TCKO',
    y: 8.25,
    z: 100,
    color: "#B22D2D"
}, {
    name: 'Pool',
    y: 3.03,
    z: 100,
    color: "#BC5BDE"
}, {
    name: 'MA',
    y: 5.24,
    z: 100,
    color: "#2D1336"
}, {
    name: 'MMA',
    y: 55.67,
    z: 100,
    color: "#842EA3"
}, {
    name: 'LEG',
    y: 3.03,
    z: 100,
    color: "#5BDE60"
}, {
    name: 'INT',
    y: 23.03,
    z: 100,
    color: "#2C7259"
}, {
    name: 'TXN',
    y: 7.11,
    z: 100,
    color: "#FFEB34"
}, {
    name: 'TCKO',
    y: 8.25,
    z: 100,
    color: "#B22D2D"
}, {
    name: 'Pool',
    y: 3.03,
    z: 100,
    color: "#BC5BDE"
}, {
    name: 'MA',
    y: 5.24,
    z: 100,
    color: "#2D1336"
}, {
    name: 'MMA',
    y: 55.67,
    z: 100,
    color: "#842EA3"
}, {
    name: 'LEG',
    y: 3.03,
    z: 100,
    color: "#5BDE60"
}];

const separation_graph_5_data = [{
    name: 'Financial',
    y: 5,
    z: 100,
    color: "#5BDE60"
}, {
    name: 'Technology',
    y: 33.03,
    z: 100,
    color: "#5B97DE"
}, {
    name: 'Tractor supply',
    y: 17.11,
    z: 100,
    color: "#DE5B5B"
}, {
    name: 'Pool',
    y: 28.25,
    z: 100,
    color: "#DEAA5B"
}, {
    name: 'ZM company',
    y: 13.03,
    z: 100,
    color: "#5E5BDE"
}, {
    name: 'Industrial goods',
    y: 5.24,
    z: 100,
    color: "#BC5BDE"
}];

const separation_graph_6_data = [{
    name: 'Акции',
    y: 80,
    z: 100,
    color: "#5E5BDE"
}, {
    name: 'ETFS',
    y: 0,
    z: 100,
    color: "#5B97DE"
}, {
    name: 'Фонды',
    y: 20,
    z: 100,
    color: "#DE5B5B"
}, {
    name: 'Денежные средства',
    y: 0,
    z: 100,
    color: "#DEAA5B"
}];

const separation_graph_1 = document.querySelector("#separation_graph_1");
const separation_graph_2 = document.querySelector("#separation_graph_2");
const separation_graph_3 = document.querySelector("#separation_graph_3");
const separation_graph_4 = document.querySelector("#separation_graph_4");
const separation_graph_5 = document.querySelector("#separation_graph_5");
const separation_graph_6 = document.querySelector("#separation_graph_6");

addPerformanceGraph(separation_graph_1, "separation_graph_1", separation_graph_1_data, false, "60%");
addPerformanceGraph(separation_graph_2, "separation_graph_2", separation_graph_2_data, false, "60%");
addPerformanceGraph(separation_graph_3, "separation_graph_3", separation_graph_3_data, false,"60%");
addPerformanceGraph(separation_graph_4, "separation_graph_4", separation_graph_4_data, false, "70%");
addPerformanceGraph(separation_graph_5, "separation_graph_5", separation_graph_5_data, true, "60%");
addPerformanceGraph(separation_graph_6, "separation_graph_6", separation_graph_6_data, true, "60%");

function addPerformanceGraph(node, id, data, isInput, size) {
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
            <div style="text-align: center;">
              <h5>{point.name}</h5>
              <span>{point.y}%</span>
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

function addPerformanceGraphLabels(node, data) {

    data.forEach(item => {
        let graphContent = document.createElement("div");
        graphContent.classList.add("graphContent");

        let graphContentName = document.createElement("div");
        graphContentName.classList.add("graphContent-name");

        let graphRound = document.createElement("div");
        graphRound.style.backgroundColor = item.color;

        let graphName = document.createElement("span");
        graphName.innerHTML = item.name;

        graphContentName.appendChild(graphRound);
        graphContentName.appendChild(graphName);
    
        let graphValue = document.createElement("strong");
        graphValue.classList.add("graphContent-value");
        graphValue.innerHTML = item.y + "%";

        graphContent.appendChild(graphContentName);
        graphContent.appendChild(graphValue);

        node.appendChild(graphContent);
    });

}

function addPerformanceGraphLabelsRadio(node, data, name) {

    data.forEach(item => {
        let graphContent = document.createElement("div");
        graphContent.classList.add("graphContent");

        let graphContentName = document.createElement("label");
        graphContentName.classList.add("graphContent-name");
        graphContentName.classList.add("label");

        let graphRound = document.createElement("div");
        graphRound.style.backgroundColor = item.color;

        let graphRadio = document.createElement("input");
        graphRadio.setAttribute("type", "radio");
        graphRadio.setAttribute("name", name);
        graphRadio.classList.add("visually_hidden");
        graphRadio.classList.add("radio_custom");

        let graphName = document.createElement("span");
        graphName.innerHTML = item.name;

        graphContentName.appendChild(graphRound);
        graphContentName.appendChild(graphRadio);
        graphContentName.appendChild(graphName);
    
        let graphValue = document.createElement("strong");
        graphValue.classList.add("graphContent-value");
        graphValue.innerHTML = item.y + "%";

        graphContent.appendChild(graphContentName);
        graphContent.appendChild(graphValue);

        node.appendChild(graphContent);
    });

}