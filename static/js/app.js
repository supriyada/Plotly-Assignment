//reads samples.json 
var dataset = undefined;
var nameSelect = d3.select("#selDataset").node();
d3.json("./data/samples.json").then(function(data){ 
    console.log(data)
    dataset = data;
    var nameList = data.names;
    nameList.forEach(element => {
        var opt = document.createElement("option");
        opt.value = element;
        opt.text = element;
        nameSelect.append(opt);
    });
    
});

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  }

var demoSelect = d3.select("#sample-metadata").node();

function optionChanged(element) {
    console.log(demoSelect)
    console.log("value: "+demoSelect.value);
    document.getElementById("sample-metadata").innerHTML = "";
    var chosenSubject = element;
    console.log(chosenSubject);
    d3.json("./data/samples.json").then(function(data){
        //Demographics data collection
        var demographValues = data.metadata;
        console.log(demographValues);
        var demoGraphFiltered = demographValues.filter(subjectInfo => subjectInfo.id === parseInt(chosenSubject));
        console.log(demoGraphFiltered);
        
        var id = demoGraphFiltered[0].id;
        demoSelect.append("Subject ID:"+id+"\n");
        
        var ethnicity = demoGraphFiltered[0].ethnicity;
        demoSelect.append(`Ethnicity: ${ethnicity}\n`);
        
        var gender = demoGraphFiltered[0].gender;
        demoSelect.append(`gender: ${gender}\n`);
        
        var age = demoGraphFiltered[0].age;
        demoSelect.append(`age: ${age}\n`);
        
        var location = demoGraphFiltered[0].location;
        demoSelect.append(`location: ${location}\n`);
        
        var bbtype = demoGraphFiltered[0].bbtype;
        demoSelect.append(`bbtype: ${bbtype}\n`);
        
        var wfreq = demoGraphFiltered[0].wfreq;
        demoSelect.append(`wfreq: ${wfreq}`);      
        
        //Chart data
        var sampleValues = data.samples;
        var filteredSample = sampleValues.filter(subjectDetail => subjectDetail.id === chosenSubject);
        console.log(sampleValues);
        var otuId = filteredSample[0].otu_ids;
        var tenOtuId = otuId.slice(0, 10);
        tenOtuIdArray = []
        tenOtuId.forEach((id) => {
            tenOtuIdArray.push(`Otu${id}`);
        })
        console.log(tenOtuId);
        var otuLabels = filteredSample[0].otu_labels;
        var tenOtuLabels = otuLabels.slice(0, 10);
        console.log(tenOtuLabels);
        var otuSamples = filteredSample[0].sample_values;
        var tenOtuSamples = otuSamples.slice(0, 10);
        console.log(tenOtuSamples)

        //Bar chart 
        var trace1 = {
            x: tenOtuSamples.reverse(),
            y: tenOtuIdArray.reverse(),
            text: tenOtuLabels.reverse(),
            marker:{color:'rgba(38, 24, 74, 0.8)'},
            hoverlabel: {bgcolor:'rgba(164, 163, 204, 0.85)',
                        font_size:16,
                        font_color:"white"},
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout = {title: `Top 10 OTU on subject id:${chosenSubject}`,
                    font: {size: 12},
                    xaxis: {title:"Sample values"},
                    yaxis: {title:"OTU ID"}
                    }

        Plotly.newPlot("bar", data1, layout);

        //Bubble chart
        var trace2 = {
            x: otuId,
            y: otuSamples,
            text: otuLabels,
            mode: 'markers',
            marker: {
              color: otuId,
              size: otuSamples
            }
          };

          var data2 = [trace2];

          var layout1 = {
            title: 'Individual sample info',
            showlegend: false,
        };
          
          Plotly.newPlot('bubble', data2, layout1);
    });
}


