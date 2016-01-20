var Dashboard = function () {

    var dataSets = {};

    var initWidgetTotals = function () {
        var resp = dataSets.widget_totals;
        $('.widget-row .total_categories').html(resp.total_categories).attr('data-value', resp.total_categories);
        $('.widget-row .total_resources').html(resp.total_resources).attr('data-value', resp.total_resources);
        $('.widget-row .total_views').html(resp.total_views).attr('data-value', resp.total_views);
        $('.widget-row .total_tags').html(resp.total_tags).attr('data-value', resp.total_tags);
        if ($().counterUp) {
            $("[data-counter='counterup']").counterUp({
                delay: 10,
                time: 1000
            });
        }
    };

    var initTopTags = function () {

        if (typeof (AmCharts) === 'undefined' || $('#top-tags').size() === 0) {
            return;
        }

        $('.portlet-loading').hide();
        $('.portlet-content').show();

        AmCharts.makeChart("top-tags", {
            "type": "pie",
            "theme": "light",
            "fontFamily": 'Open Sans',
            "color": '#888',
            "dataProvider": dataSets.top_tags,
            "valueField": "count",
            "titleField": "name",
            "exportConfig": {
                menuItems: [{
                    icon: "/vendor/amcharts/amcharts/images/export.png",
                    format: 'png'
                }]
            }
        });
    }

    var initTopDays = function () {

        if (typeof (AmCharts) === 'undefined' || $('#top-days').size() === 0) {
            return;
        }

        $('.portlet-loading').hide();
        $('.portlet-content').show();

        var d = new Date();

        for (var i = 0, l = dataSets.top_days.length; i < l; i++) {
            if (dataSets.top_days[i].day == d.getDay()) {
                dataSets.top_days[i].dashLengthLine = 5;
                dataSets.top_days[i].alpha = 0.2;
                dataSets.top_days[i].additional = dataSets.top_days[i].average;
            }
        }

        var chart = AmCharts.makeChart("top-days", {
            "type": "serial",
            "theme": "light",
            "pathToImages": "/vendor/amcharts/dist/amcharts/images/",
            "autoMargins": false,
            "marginLeft": 30,
            "marginRight": 8,
            "marginTop": 10,
            "marginBottom": 26,
            "fontFamily": 'Open Sans',
            "color": '#888',
            "dataProvider": dataSets.top_days,
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "startDuration": 1,
            "graphs": [{
                "alphaField": "alpha",
                "balloonText": "<span style='font-size:13px;'>[[title]] [[category]]: <b>[[value]]</b> [[additional]]</span>",
                "dashLengthField": "dashLengthColumn",
                "fillAlphas": 1,
                "title": "Total",
                "type": "column",
                "valueField": "total"
            }, {
                "balloonText": "<span style='font-size:13px;'>[[title]] [[category]]: <b>[[value]]</b> [[additional]]</span>",
                "bullet": "round",
                "dashLengthField": "dashLengthLine",
                "lineThickness": 3,
                "bulletSize": 7,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "fillAlphas": 0,
                "lineAlpha": 1,
                "title": "Views",
                "valueField": "views"
            }],
            "categoryField": "dayname",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "tickLength": 0
            }
        });

    };

    var initMonthlyActivity = function () {

        if (!jQuery.plot) return;

        var el = $('#monthly_activity');

        if (el.size() === 0) return;

        $('.portlet-loading').hide();
        $('.portlet-content').show();

        function drawChart(obj) {

            var plotdata = [];

            var chartData = obj.yearly_activity,
                keys = Object.keys(chartData);

            if (typeof chartData[keys[0]] !== 'undefined') {

                var mapData = chartData[keys[0]].map(function (key) {
                    return [key['monthname'], key['total']];
                });

                plotdata.push({
                    label: keys[0] + ' - Resources',
                    data: mapData,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#BAD9F5']
                }, {
                    data: mapData,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#9ACAE6",
                        lineWidth: 2
                    },
                    color: '#9ACAE6',
                    shadowSize: 1
                }, {
                    data: mapData,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#9ACAE6',
                    shadowSize: 0
                });

            }

            if (typeof chartData[keys[1]] !== 'undefined') {

                var mapData = chartData[keys[1]].map(function (key) {
                    return [key['monthname'], key['total']];
                });

                plotdata.push({
                    label: keys[1] + ' - Resources',
                    data: mapData,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#a13437']
                }, {
                    data: mapData,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#a13437",
                        lineWidth: 2
                    },
                    color: '#a13437',
                    shadowSize: 1
                }, {
                    data: mapData,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#a13437',
                    shadowSize: 0
                });
            }

            var options = {
                xaxis: {
                    tickLength: 0,
                    tickDecimals: 0,
                    mode: "categories",
                    min: 0,
                    font: {
                        lineHeight: 18,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                yaxis: {
                    ticks: 5,
                    tickDecimals: 0,
                    tickColor: "#eee",
                    font: {
                        lineHeight: 14,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#eee",
                    borderColor: "#eee",
                    borderWidth: 1
                }
            };

            $.plot(el, plotdata, options);

            el.bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    Dashboard.showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' - Records');
                }
            });

            el.bind("mouseleave", function () {
                $("#tooltip").remove();
            });

        }

        drawChart(dataSets);

    };

    var initWeeklyActivity = function () {

        if (!jQuery.plot) return;

        var el = $('#weekly_activity');

        if (el.size() === 0) return;

        $('.portlet-loading').hide();
        $('.portlet-content').show();

        function drawChart(obj) {

            var plotdata = [];

            var chartData = obj.weekly_activity,
                keys = Object.keys(chartData);

            if (typeof chartData[keys[0]] !== 'undefined') {

                var mapData = chartData[keys[0]].map(function (key) {
                    return [key['week'], key['total']];
                });

                plotdata.push({
                    label: keys[0] + ' - Resources',
                    data: mapData,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#BAD9F5']
                }, {
                    data: mapData,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#9ACAE6",
                        lineWidth: 2
                    },
                    color: '#9ACAE6',
                    shadowSize: 1
                }, {
                    data: mapData,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#9ACAE6',
                    shadowSize: 0
                });

            }

            if (typeof chartData[keys[1]] !== 'undefined') {

                var mapData = chartData[keys[1]].map(function (key) {
                    return [key['week'], key['total']];
                });

                plotdata.push({
                    label: keys[1] + ' - Resources',
                    data: mapData,
                    lines: {
                        fill: 0.2,
                        lineWidth: 0,
                    },
                    color: ['#a13437']
                }, {
                    data: mapData,
                    points: {
                        show: true,
                        fill: true,
                        radius: 4,
                        fillColor: "#a13437",
                        lineWidth: 2
                    },
                    color: '#a13437',
                    shadowSize: 1
                }, {
                    data: mapData,
                    lines: {
                        show: true,
                        fill: false,
                        lineWidth: 3
                    },
                    color: '#a13437',
                    shadowSize: 0
                });
            }

            var options = {
                xaxis: {
                    tickLength: 0,
                    tickDecimals: 0,
                    mode: "categories",
                    min: 0,
                    font: {
                        lineHeight: 18,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                yaxis: {
                    ticks: 5,
                    tickDecimals: 0,
                    tickColor: "#eee",
                    font: {
                        lineHeight: 14,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#eee",
                    borderColor: "#eee",
                    borderWidth: 1
                }
            };

            $.plot(el, plotdata, options);

            el.bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);
                    Dashboard.showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' - Records');
                }
            });

            el.bind("mouseleave", function () {
                $("#tooltip").remove();
            });

        }

        drawChart(dataSets);

    };
    
    var initDailyGrowthLine = function () {

        if (typeof (Highcharts) === 'undefined' || $('#daily-growth').size() === 0) {
            return;
        }

        var chartData = dataSets.daily_growth;

        var values = Object.keys(chartData).map(function (key) {
            return chartData[key];
        });

        var dataSeries = [];
        for (var i = 0, l = values.length; i < l; i++) {
            dataSeries.push([Date.UTC(values[i].year, values[i].month - 1, values[i].day), parseFloat(dataSets.daily_growth[i].total)]);
        }
        
        console.log(dataSeries, 'wretwert');

        $('#daily-growth').highcharts({
            chart: {
                zoomType: 'x',
                style: {
                    fontFamily: 'Open Sans'
                }
            },
            title: {
                text: 'Resource daily growth analysis.'
            },
            subtitle: {
                text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: 'Total profit amount.'
                },
                //min: 0,
                labels: {
                    formatter: function () {
                        return '#' + this.value;
                    }
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            
            tooltip: {
                formatter: function () {
                    return (this.point.y) ? '<b>' + this.series.name + '</b>: #' + this.point.y : '<b>' + this.series.name + '</b>: none.';
                }
            },

            series: [{
                type: 'area',
                name: 'Count',
                data: dataSeries
            }]
        });

    }

    return {

        load: function () {
            var that = this;
            $.when($.post('/admin/dashboard')).done(function (response) {
                dataSets = JSON.parse(response);
                that.init();
            });
        },

        init: function () {
            initWidgetTotals();
            initTopTags();
            initTopDays();
            //initMonthlyActivity();
            initWeeklyActivity();
            
            initDailyGrowthLine();
        },

        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        getViewPort: function () {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },

        getResponsiveBreakpoint: function (size) {
            var sizes = {
                'xs': 480, // extra small
                'sm': 768, // small
                'md': 992, // medium
                'lg': 1200 // large
            };

            return sizes[size] ? sizes[size] : 0;
        },

        randValue: function () {
            return (Math.floor(Math.random() * (1 + 50 - 20))) + 10;
        },

        showChartTooltip: function (x, y, xValue, yValue) {
            $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 40,
                border: '0px solid #ccc',
                padding: '2px 6px',
                'background-color': '#fff'
            }).appendTo("body").fadeIn(200);
        },

    };

}();

jQuery(document).ready(function () {
    Dashboard.load();
});
