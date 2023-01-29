function initAverageDividentsGraph() {

	const graphs = ["averageGrowthGraph-1"];

	const myRenderGraphCategories = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
	const myRenderShowYLine = true; // если нужен показ верт. линий в графе, ставим true

	graphs.forEach(item => {
		let myRenderGraph = document.querySelector(`#${item}`);

		if (myRenderGraph !== null) {
			Highcharts.chart(item, {
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
					itemStyle: { "fontSize": "0.85rem", "fontWeight": "400", "paddingLeft": "0.5rem" },
					x: -8,
					margin: 25,
					symbolWidth: 0,
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: myRenderGraphCategories,
					labels: {
						style: {
							fontSize: "16px",
							color: "#373943"
						}
					},
					gridLineWidth: (myRenderShowYLine ? 1 : 0)
				},
				yAxis: {
					title: {
						text: ''
					},
					labels: {
						formatter: function () {
							return this.value + '%';
						},
						style: {
							fontSize: "16px",
							color: "#373943"
						}
					},
					plotLines: [{
						value: 10,
						color: '#3E54D8',
						width: 2,
						zIndex: 4,
						label: { text: '' }
					}],
				},
				tooltip: {
					crosshairs: true,
					shared: true,
					useHTML: true,
					valueSuffix: '%'
				},
				plotOptions: {
					spline: {
						marker: {
							enable: false,
						}
					}
				},

				series: [

					{
						name: "Доход",
						data: [0, 6.5, 7.5, 8.5, 9.5, 10.5, 11, 15, 17.5, 19],
						color: "#3E54D8"
					}

				]
			});

			if (myRenderShowYLine) {
				let renderChartWidth = +document.querySelector(`#${item} .highcharts-plot-background`).getAttributeNode("width").value;
				let renderChartOffsetX = (renderChartWidth / myRenderGraphCategories.length) / 2;

				document.querySelectorAll(`#${item} .highcharts-xaxis-grid .highcharts-grid-line`).forEach(item => {
					item.style.transform = 'translateX(' + renderChartOffsetX + 'px)';
				});
			}

		}
	});

}

initAverageDividentsGraph();
