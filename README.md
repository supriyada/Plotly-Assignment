# Plotly-Assignment

### Overview:
An interactive dashboard is built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

### Plotly - bar chart & bubble chart
>   D3 library is used to read in `samples.json`. <br>
>   A drop down menu with all the sample subject id is created.<br>
>   A horizontal bar chart is plotted for top 10 OTU found in the selected individual with `otu_ids` & `sample_values` with `otu_labels` as a hover text. <br>
>   A bubble chart is plotted with all the OTU's for the selected subject with `otu_ids` & `sample_values` as axes values and `sample_values` for marker size & `otu_ids` for marker color. <br>
>   The demographic information of that individual is also displayed in the page. <br>
>   `Plotly.restyle` is used to update all the plots when new individual is selected. <br>
>   The hover text is exceeding the size of the text box, hence used split by `;` and then included in the trace.<br>

### Advanced Challenge - gauge chart
>   Guage chart is adapted to plot the weekly washing frequency of the individual. <br>
>   The values ranging from 0 to 9 are used. A needle is drawn and gets updated to point to the corresponding washing frequency. <br>

### Additional chart plotted - exploding pie chart
>   Collected/grouped the count of the samples those fall within the same washing frequency. <br>
>   Pie chart is plotted with the count.
>   Whenever the individual is selected, the pie explodes to highlight the % of subject id's fall within the same washing frequency.
>   For example, if the individual selected has washing frequency of 2, the pie part with subjects with wash frequency 2 gets exploded.
>   It helps to identify how many subjects has the same washing frequency.

##### Finally the dashboard is deployed in github: https://supriyada.github.io/Plotly-Assignment/
