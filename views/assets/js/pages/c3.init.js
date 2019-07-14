! function(t) {
    "use strict";
    var e = function() {};
    e.prototype.init = function() {
					c3.generate({
            bindto: "#combine-chart",
            data: {
            	  x: 'x',
                columns: [
                		['x', '2019-01-02', '2019-02-03', '2019-03-04', '2019-04-05', '2019-05-06', '2019-06-07'],
                    ["Kebajikan", 30, 20, 50, 40, 60, 50],
                    ["Penipuan", 100, 140, 90, 240, 140, 220],
                    ["Ah Long", 300, 200, 160, 400, 250, 250],
                    ["Perbankan", 200, 130, 90, 240, 130, 220],
                    ["Hartanah", 130, 120, 150, 140, 160, 150]
                ],
                types: {
                    Kebajikan: "spline",
                    Penipuan: "spline",
                    'Ah Long': "spline",
                    Perbankan: "spline",
                    Hartanah: "spline"
                },
                colors: {
                    Kebajikan: "#dcdcdc",
                    Penipuan: "#4a81d4",
                    'Ah Long': "#36404a",
                    Perbankan: "#fb6d9d",
                    Hartanah: "#1abc9c"
                }
            },
            axis: {
                x: {
				            type: 'timeseries',
				            tick: {
				                format: '%m'
				            }
                }
            }
        })
    }, t.ChartC3 = new e, t.ChartC3.Constructor = e
}(window.jQuery),
function(t) {
    "use strict";
    window.jQuery.ChartC3.init()
}();