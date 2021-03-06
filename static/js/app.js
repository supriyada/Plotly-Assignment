//reads samples.json 
var dataset = undefined;
var demoSelect = d3.select("#sample-metadata").node();


function init() {
    var nameSelect = d3.select("#selDataset").node();
    d3.json("./data/samples.json").then(function (data) {
        
        dataset = data;
        var nameList = data.names;
        nameList.forEach(element => {
            var opt = document.createElement("option");
            opt.value = element;
            opt.text = element;
            nameSelect.append(opt);
        });

        document.getElementById("sample-metadata").innerHTML = "";
        var demographValues = data.metadata;

        // Group by count of subjects on particular washing frequency
        var washFreq = demographValues.map(wf => wf.wfreq);
        pie_array = [];
        var total = 0;
        for (var i = 0; i < 10; i++) {
            var one = demographValues.filter(wf => wf.wfreq === parseInt(`${i}`))
            total += one.length;
            
            pie_array.push(one.length);
        }
        var not_defined = demographValues.length - total
        pie_array.push(not_defined)

        // Collecting demographics information
        var demoGraphFiltered = demographValues.filter(subjectInfo => subjectInfo.id === 940);

        var id = demoGraphFiltered[0].id;
        demoSelect.append("Subject ID:" + id + "\n");

        var ethnicity = demoGraphFiltered[0].ethnicity;
        demoSelect.append(`Ethnicity: ${ethnicity}\n`);

        var gender = demoGraphFiltered[0].gender;
        demoSelect.append(`Gender: ${gender}\n`);

        var age = demoGraphFiltered[0].age;
        demoSelect.append(`Age: ${age}\n\n`);

        var location = demoGraphFiltered[0].location;
        demoSelect.append(`Location: ${location}\n\n`);

        var bbtype = demoGraphFiltered[0].bbtype;
        demoSelect.append(`BBtype: ${bbtype}\n`);

        var wfreq = demoGraphFiltered[0].wfreq;
        demoSelect.append(`Wfreq: ${wfreq}`);

        //Filtering OTU ID and sample values for bar/bubble/guage chart
        var sampleValues = data.samples;
        var filteredSample = sampleValues.filter(subjectDetail => subjectDetail.id === "940");
        var otuId = filteredSample[0].otu_ids;
        var tenOtuId = otuId.slice(0, 10);
        tenOtuIdArray = []
        tenOtuId.forEach((id) => {
            tenOtuIdArray.push(`Otu${id}`);
        })
        
        var otuLabels = filteredSample[0].otu_labels;

        var formattedLabel = []
        otuLabels.forEach(function (l) {
            formattedLabel.push(l.split(";").join("<br />"))
        })

        var tenOtuLabels = otuLabels.slice(0, 10);
        

        var formattedTenLabel = []
        tenOtuLabels.forEach(function (l) {
            formattedTenLabel.push(l.split(";").join("<br />"))
        })

        
        var otuSamples = filteredSample[0].sample_values;
        var tenOtuSamples = otuSamples.slice(0, 10);
        
        //Bar chart 
        var trace1 = {
            x: tenOtuSamples.reverse(),
            y: tenOtuIdArray.reverse(),
            text: formattedTenLabel.reverse(),
            marker: { color: 'rgba(38, 24, 74, 0.8)' },
            hoverlabel: {
                bgcolor: 'rgba(164, 163, 204, 0.85)',
                font_size: 16,
                font_color: "white"
            },

            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout1 = {
            title: `<b>Top 10 OTU on subject id: 940</b>`,

            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 15,
                color: '#black'
            },

            xaxis: {
                title: "<b>Sample values</b>",

                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#black'
                },
            },
            yaxis: {
                title: "<b>OTU ID</b>",

                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#black'
                },
            },

            paper_bgcolor: "burlywood",
            plot_bgcolor: 'bisque'

        }

        Plotly.newPlot("bar", data1, layout1);

        //Bubble chart
        var trace2 = {
            x: otuId,
            y: otuSamples,
            text: formattedLabel,
            mode: 'markers',
            marker: {
                color: otuId,
                size: otuSamples
            }
        };

        var data2 = [trace2];

        var layout2 = {
            title: '<b>Individual sample info for all OTUs</b>',
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 15,
                color: '#black'
            },
            xaxis: {
                title: "<b>OTU ID</b>",

                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#black'
                },
            },
            yaxis: {
                title: "<b>Sample values</b>",

                font: {
                    family: 'Arial, Helvetica, sans-serif',
                    size: 12,
                    color: '#black'
                },
            },
            showlegend: false,
            paper_bgcolor: "burlywood",
            plot_bgcolor: 'bisque'
        };

        Plotly.newPlot('bubble', data2, layout2);

        //Guage chart
        var traceA = {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81],
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ['rgb(241, 236, 236)', 'rgb(230, 209, 203)', 'rgb(221, 182, 170)', 'rgb(213, 156, 137)', 'rgb(205, 129, 103)', 'rgb(196, 102, 73)', 'rgb(186, 74, 47)', 'rgb(172, 44, 36)', 'rgb(149, 19, 39)', 'burlywood']
            },
            hoverinfo: "none"
        }
        var layoutA = {
            title: "<b>Washing Frequency (Scrubs per week)</b>",
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 15,
                color: '#black'
            },


            'shapes': [
                {
                    'type': 'path',
                    'path': `M 0.47 0.5 L 0.25 0.65 L 0.53 0.5 Z`,
                    'fillcolor': "black",
                    'line': {
                        'width': 1.0
                    },
                    'xref': 'paper',
                    'yref': 'paper'
                }
            ],
            paper_bgcolor: "burlywood",
            plot_bgcolor: 'bisque'
        };


        var dataA = [traceA];

        Plotly.newPlot("gauge", dataA, layoutA);

        //Pie Chart
        var trace3 = {
            type: "pie",
            values: pie_array,
            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "No data"],
            marker: {

                line: {
                    color: 'black',
                    width: 3
                }
            },
            textinfo: "label+percent",
            text: pie_array.map(function (v) {
                return `subject count: ${v}`
            }),
            hoverinfo: "text",
            pull: [0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0, 0],

        }
        var data3 = [trace3];
        var layout3 = {
            title: "<b>% of samples with same wash frequency</b>",
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 15,
                color: '#black'
            },

            paper_bgcolor: "burlywood",
            plot_bgcolor: 'bisque'
        };

        Plotly.newPlot("pie", data3, layout3)
    });
}


//On selecting the subject ID, below function is called
function optionChanged(element) {

    //Remove the existing demographics information
    document.getElementById("sample-metadata").innerHTML = "";

    var chosenSubject = element;

    d3.json("./data/samples.json").then(function (data) {

        //Demographics data collection
        var demographValues = data.metadata;

        var demoGraphFiltered = demographValues.filter(subjectInfo => subjectInfo.id === parseInt(chosenSubject));

        var id = demoGraphFiltered[0].id;
        demoSelect.append("Subject ID:" + id + "\n");

        var ethnicity = demoGraphFiltered[0].ethnicity;
        demoSelect.append(`Ethnicity: ${ethnicity}\n`);

        var gender = demoGraphFiltered[0].gender;
        demoSelect.append(`Gender: ${gender}\n`);

        var age = demoGraphFiltered[0].age;
        demoSelect.append(`Age: ${age}\n\n`);

        var location = demoGraphFiltered[0].location;
        demoSelect.append(`Location: ${location}\n\n`);

        var bbtype = demoGraphFiltered[0].bbtype;
        demoSelect.append(`BBtype: ${bbtype}\n`);

        var wfreq = demoGraphFiltered[0].wfreq;
        demoSelect.append(`Wfreq: ${wfreq}`);

        //Chart data
        var sampleValues = data.samples;
        var filteredSample = sampleValues.filter(subjectDetail => subjectDetail.id === chosenSubject);

        var otuId = filteredSample[0].otu_ids;
        var tenOtuId = otuId.slice(0, 10);
        tenOtuIdArray = []
        tenOtuId.forEach((id) => {
            tenOtuIdArray.push(`Otu${id}`);
        })

        var otuLabels = filteredSample[0].otu_labels;

        //Formats OTU labels so everything gets displayed within hoverlabel 
        var formattedLabel = []
        otuLabels.forEach(function (l) {
            formattedLabel.push(l.split(";").join("<br />"))
        })

        var tenOtuLabels = otuLabels.slice(0, 10);

        var formattedTenLabel = []
        tenOtuLabels.forEach(function (l) {
            formattedTenLabel.push(l.split(";").join("<br />"))
        })

        var otuSamples = filteredSample[0].sample_values;
        var tenOtuSamples = otuSamples.slice(0, 10);

        //Updates subject ID in title of the barchart
        var layout_update = {
            title: `<b>Top 10 OTU on subject id: ${chosenSubject}</b>`, // updates the title
        };

        //Restyle Bar chart
        var bar_chart = d3.selectAll("#bar").node();
        Plotly.relayout(bar_chart, layout_update)
        Plotly.restyle(bar_chart, "x", [tenOtuSamples.reverse()]);
        Plotly.restyle(bar_chart, "y", [tenOtuIdArray.reverse()]);
        Plotly.restyle(bar_chart, "text", [formattedTenLabel.reverse()]);

        //Restyle bubble chart
        var bubble_chart = d3.selectAll("#bubble").node();
        Plotly.restyle(bubble_chart, "x", [otuId]);
        Plotly.restyle(bubble_chart, "y", [otuSamples]);
        Plotly.restyle(bubble_chart, "text", [formattedLabel]);

        //Restyle pie chart
        var pieChart = d3.selectAll("#pie").node();
        var newExplode = [];
        for (var i = 0; i < 11; i++) {
            if (i === wfreq) {
                newExplode.push(0.3)
            }
            else if (wfreq === null) {
                newExplode.push(0.3)
                break;
            }
            else {
                newExplode.push(0)
            }
        }
        Plotly.restyle(pieChart, "pull", [newExplode]);

        //Gauge Chart
        var traceA = {
            type: 'pie',
            showlegend: false,
            hole: 0.4,
            rotation: 90,
            values: [81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81 / 9, 81],
            text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9'],
            direction: 'clockwise',
            textinfo: 'text',
            textposition: 'inside',
            marker: {
                colors: ['rgb(241, 236, 236)', 'rgb(230, 209, 203)', 'rgb(221, 182, 170)', 'rgb(213, 156, 137)', 'rgb(205, 129, 103)', 'rgb(196, 102, 73)', 'rgb(186, 74, 47)', 'rgb(172, 44, 36)', 'rgb(149, 19, 39)', 'burlywood'],
            },
            hoverinfo: "none"
        }
        switch (wfreq) {

            case 1:
                x = 0.25;
                y = 0.55;
                break;
            case 2:
                x = 0.25;
                y = 0.65;
                break;
            case 3:
                x = 0.35;
                y = 0.71;
                break;
            case 4:
                x = 0.40;
                y = 0.75;
                break;
            case 5:
                x = 0.5;
                y = 0.78;
                break;
            case 6:
                x = 0.60;
                y = 0.80;
                break;
            case 7:
                x = 0.68;
                y = 0.72;
                break;
            case 8:
                x = 0.75;
                y = 0.65;
                break;
            case 9:
                x = 0.75;
                y = 0.55;
                break;
            default:
                x = 0.25;
                y = 0.5;
                break;
        }


        var layoutA = {
            title: "<b>Washing Frequency (Scrubs per week)</b>",
            font: {
                family: 'Arial, Helvetica, sans-serif',
                size: 15,
                color: '#black'
            },
            xaxis: { visible: false, range: [-1, 1] },
            yaxis: { visible: false, range: [-1, 1] },
            'shapes': [
                {
                    'type': 'path',
                    'path': `M 0.47 0.5 L ${x} ${y} L 0.53 0.5 Z`,
                    'fillcolor': "black",
                    'line': {
                        'width': 1.0
                    },
                    'xref': 'paper',
                    'yref': 'paper'
                }
            ],
            paper_bgcolor: "burlywood",
            plot_bgcolor: 'bisque'
        };


        var dataA = [traceA];
        Plotly.newPlot("gauge", dataA, layoutA);
    });
}


init();