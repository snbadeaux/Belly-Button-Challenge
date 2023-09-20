# Belly-Button-Challenge

## Descripton

This is an interactive dashboard to explore the Belly Button Biodiversity Dataset which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Dashboard Features

  **Drop Down Menu**
  - Select the Test Subject ID No. from drop down menu to view the visualizations (bar, gauge, bubble charts)

  **Demographic Info Panel**
  - This Panel shows the demographic information of the selected test subject
   
  **Horizontal Bar Graph**
  - A bar chart is generated when a test subject is selected on the drop menu
  - The top 10 OTUs found in that test subject will be displayed in bars, where the `sample_values` are presented as the    
    values for the bar chart and the `otu_ids` presented as the labels for the bar chart
 
   **Gauge Chart**
  - A gauge chart is generated when a test subject is selected on the drop menu
  - The value of wash frequency per week (`wfreq`) is displayed on the chart with a green-colored bar
  
  **Bubble Chart**
  - A bubble chart is generated when a test subject is selected on the drop menu
  - Each sample will be displayed as a bubble, where the larger the sample value is, the larger the bubble size
  - On the chart, the x values are the `otu_ids`, the y values are the `sample_values`
  - The colors of the bubbles are based on `otu_ids`, and the hover text is the `otu_labels`

## Credits
  - Python Tutorial. (n.d.). https://www.w3schools.com/python/<br>
  - Stack Overflow - Where Developers Learn, Share, & Build Careers. (n.d.). Stack Overflow. https://stackoverflow.com/<br>
  - Plotly https://plotly.com/javascript/<br>
  - Starter code given from bootcamp class and instructions<br>
