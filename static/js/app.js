// Set url to be a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Initialize the dashboard when the data is loaded
dataPromise.then(data => {
    // Select the dropdown menu for sample selection
    let selector = d3.select("#selDataset");

    // Collect all sample names from the data
    let sampleNames = data.names;

    // Add sample names to the dropdown menu options
    sampleNames.forEach(sample => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });

    // Set the first sample name displayed on the dashboard
    let firstSample = sampleNames[0];

    // Show information and charts for the first sample
    buildMetadata(firstSample, data);
    buildCharts(firstSample, data);
});

// This function runs when the user selects the next sample from the dropdown menu
function optionChanged(nextSample) {
    // Update the information and charts with next sample data
    dataPromise.then(data => {
        buildMetadata(nextSample, data);
        buildCharts(nextSample, data);
    });
}

// This function shows the metadata (demographic information) for the selected sample
function buildMetadata(sample, data) {
    // Get the metadata for all samples
    let metadata = data.metadata;

    // Filter the metadata to only include the selected sample
    let metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let selectedSample = metadataArray[0];
    let PANEL = d3.select("#sample-metadata");

    // Clear the previous demographic information
    PANEL.html("");

    // Show the demographic information for the selected sample
    Object.entries(selectedSample).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
    });
}

// This function shows the charts for the selected sample
function buildCharts(sample, data) {
    // Get all the sample data
    let samples = data.samples;

    // Filter the sample data to only include the selected sample
    let sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    // Filter the metadata data to only include the selected sample
    let metadataArray = data.metadata.filter(sampleObj => sampleObj.id == sample);
    let selectedSample = sampleArray[0];

    // Get the data for the selected sample to be used for all charts
    let otu_ids = selectedSample.otu_ids;
    let otu_labels = selectedSample.otu_labels;
    let sample_values = selectedSample.sample_values;
    let wfreq = metadataArray[0].wfreq;

    // Code for Bar Chart
      // Create y labels and use the slice function to only get the top 10
      let yvalues = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

      // Reversing the x axis will emphasize that it is the top 10
      let barData = [{
          x: sample_values.slice(0, 10).reverse(),
          y: yvalues,
          type: "bar",
          orientation: "h",
          text: otu_labels.slice(0, 10),
      }];

      let barlayout = {
        title: "Top 10 Sample Values",
        titlefont: "Arial"
      };
  
  
      // Plot the bar chart using Plotly
      Plotly.newPlot("bar", barData, barlayout);
  

    // Code for Bubble Chart
      let bubbleData = [{
          x: otu_ids,
          y: sample_values,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Viridis"
          },
          text: otu_labels
      }];
  
      let bubbleLayout = {
          xaxis: {title: "OTU ID"}
      };
  
      // Plot the bubble chart
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    


    // Code for the Gauge Chart
      let gaugedata = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          marker: {size: 28, color:'850000'},
          value: wfreq,
          title: {
            text: "Belly Button Washing Frequency<br> Scrubs per Week",
            font: { color: "black", size: 16}
          },    
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
            bar: {color: "black"},
            steps: [
              {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
              {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
              {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
              {range: [3, 4], color: "rgba(202, 209, 95, .5)"},
              {range: [4, 5], color: "rgba(184, 205, 68, .5)"},
              {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
              {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
              {range: [7, 8], color: "rgba(110, 154, 22, .5)"},
              {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
              {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
            ]
          }
        }  
      ];
    
      let gaugelayout = {
          width: 600,
          height: 450,
          margin: { t: 100, r: 100, l: 100, b: 100 },
          line: { color: '600000' },
          font: { color: "#49a81d", family: "Arial, Helvetica, sans-serif" }
       };

       Plotly.newPlot("gauge", gaugedata, gaugelayout);
    }       
        