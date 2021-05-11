//reads samples.json 
var nameSelect = d3.select("#selDataset").node();
d3.json("./data/samples.json").then(function(data){ 
    console.log(data)
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

function optionChanged(element){
    var chosenSubject = element;
    console.log(chosenSubject);
    d3.json("./data/samples.json").then(function(data){
        console.log(data.samples);
        var sampleValues = data.samples;
        var filteredSample = sampleValues.filter(subjectDetail => subjectDetail.id === chosenSubject);
        console.log(filteredSample);
        var otuId = filteredSample[0].otu_ids;
        var tenOtuId = otuId.slice(0,10);
        tenOtuIdArray = []
        tenOtuId.forEach((id) => {
            tenOtuIdArray.push(`Otu${id}`);
        })
        console.log(tenOtuId);
        var otuLabels = filteredSample[0].otu_labels;
        var tenOtuLabels = otuLabels.slice(0,10);
        console.log(tenOtuLabels);
        var otuSamples = filteredSample[0].sample_values;
        var tenOtuSamples = otuSamples.slice(0,10);
        //var reversed_sample = tenOtuSamples.reverse();
        console.log(tenOtuSamples)

        var trace1 = {x: tenOtuSamples.reverse(),
                    y: tenOtuIdArray.reverse(),
                    text: tenOtuLabels.reverse(),
                    type: "bar",
                    orientation: "h"};

        var data = [trace1];

        Plotly.newPlot("bar",data);
     });
}