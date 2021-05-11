//reads samples.json 
var nameSelect = d3.select("#selDataset").node();
d3.json("./data/samples.json").then(function(data){ 
    console.log(data.names)
    var nameList = data.names;
    nameList.forEach(element => {
        var opt = document.createElement("option");
        opt.value = element;
        opt.text = element;
        nameSelect.append(opt);
    });
    
});