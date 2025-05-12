import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Final Submission
`
)}

function _2(md){return(
md`## Uncovering Crime Patterns in Los Angeles: Trends and Analysis`
)}

function _3(md){return(
md`#### NOTE: As our dataset is very large, all cells in the apendix must be run manually.`
)}

function _4(md){return(
md`Group Members:
- Elizabeth Vargas(ev2304)
- Jiazhao Liang(jl9356)
- Xintong Wang(xw3508)
`
)}

function _5(md){return(
md`## Introduction`
)}

function _6(md){return(
md`Our project seeks to analyze crime patterns in Los Angeles from 2020 to the present, highlighting trends, hotspots, and fluctuations in criminal activity across neighborhoods. By examining detailed crime data, we aim to understand how crime rates have evolved over time and to identify the key factors influencing these changes. Furthermore, the analysis will focus on determining which specific types of crimes, such as burglary, theft, or assault, are most prevalent, while assessing the underlying factors that pose significant threats to public safety.

This analysis is particularly important because understanding crime trends can help policymakers, law enforcement, and community organizations implement targeted interventions and allocate resources effectively. 

Additionally, given the impact of the COVID-19 pandemic on social behavior and mobility, we are interested in exploring how lockdown measures have affected crime rates.

Our main goal is to visualize and explain crime patterns to help answer important questions about crime fluctuations, geographic hotspots, and seasonal trends in Los Angeles.

To fully address these goals, we developed seven key questions, each targeting a specific aspect of criminal behavior:

**Q1-Q3** focus on temporal trends, investigating changes over time in overall crime levels, specific crime types, and crime severity.

**Q4-Q5** explore spatial distribution, revealing differences in crime across neighborhoods and regions, and which areas have consistently high crime rates.

**Q6-Q7** take a closer look at temporal resolution, delving into daily/weekly cycles and reporting behaviors to reveal more nuanced patterns of criminal activity and victim responses.

By grouping crime types by time (**Q1, Q2, Q3, Q6, Q7**) and by location (**Q4, Q5**), we are able to analyze trends from both a broad systemic level and a localized, community perspective. Together, these spatial and temporal perspectives provide a more complete picture of crime dynamics in Los Angeles County.
`
)}

function _7(md){return(
md`## Dataset`
)}

function _8(md){return(
md`The data used in this project comes from the "Crime Data from 2020 to Present" dataset provided by the City of Los Angeles on data.gov. It includes detailed crime records such as crime type and category, date and time, location coordinates, reporting districts, and crime status. Due to some missing data in 2024 and 2025, we truncated the dataset to only include crimes that occured between January 1, 2020 and December 31, 2023. 

Source: Crime Data from 2020 to Present (LA): https://catalog.data.gov/dataset/crime-data-from-2020-to-present `
)}

function _9(md){return(
md`### Question 1: What impact did COVID-19 and related lockdowns and procedures have on crime trends in Los Angeles County?`
)}

function _10(md){return(
md`This visualization effectively links crime data to key periods of the 2020 COVID-19 pandemic. By overlaying key events, such as the March 19 stay-at-home order and limited reopenings, the visualization enables viewers to correlate crime trends with public health measures. Some key observations are listed below.
- Sharp drop in April 2020: Crime dropped significantly after the stay-at-home order, suggesting that reduced mobility led to fewer opportunities for crime.
- Gradual rise after May: Crime began to rise again as restrictions eased and protests took place, suggesting that both policy and social unrest could influence trends.
- End-of-year drop: Crime dropped again as December approached, likely reflecting holiday seasonality and the start of the winter COVID peak.`
)}

function _11(md){return(
md`#### Data Preprocessing
- The raw dataset Crime_data_from_2020_to_present was filtered to include only crimes before January 2021.
- Each crime record was aggregated by monthYear using d3.rollups() and counted by DR_NO (unique case number).
- Dates are parsed and sorted in descending order to prepare them for time-based plotting.`
)}

function _12(md){return(
md`#### Design`
)}

function _13(md){return(
md`Rendering Components
- X-axis: Time scale from Jan 2020 to Dec 2020.
- Y-axis: Count of crime incidents, dynamically scaled using the max value.
- Area and Line Chart: Shows both overall crime volume (area) and monthly trend line.
- COVID Period Highlights: Semi-transparent colored bands label key COVID-19 periods, helping visually segment the timeline.
- Event Lines: Dotted vertical lines mark critical events (e.g., lockdown, protests) with labeled annotations.
- Data Points: Circles and numeric labels for exact monthly crime counts provide detail on specific values.

Key Features
- Color-coded time bands differentiate pandemic phases, improving interpretability.
- Interactive cues like labeled circles and event markers help link specific dates to real-world events.
- Clear axis formatting and rotated month labels ensure readability even in tight time scales.
- Title, axis labels, and legend box create a self-contained, publishable chart with all necessary context.`
)}

function _14(d3,crimeByMonth)
{
  const width = 800;
  const height = 550;
  const margin = { top: 70, right: 40, bottom: 90, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const x = d3.scaleTime()
    .domain(d3.extent(crimeByMonth, d => d[0]))
    .range([0, innerWidth]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(crimeByMonth, d => d[1]) * 1.1])
    .nice()
    .range([innerHeight, 0]);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b")));

  g.append("g").call(d3.axisLeft(y).tickFormat(d3.format(".2s")));

  svg.append("text")
    .attr("x", width/2)
    .attr("y", height - 45)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Month (2020)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("Number of Crime Incidents");

  svg.append("rect")
    .attr("x", width/2 - 200)
    .attr("y", 10)
    .attr("width", 400)
    .attr("height", 30)
    .attr("fill", "white")
    .attr("opacity", 0.8);

  svg.append("text")
    .attr("x", width/2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .text("Impact of COVID-19 on LA Crime Trends (2020)");

  const area = d3.area()
      .x(d => x(d[0]))
      .y0(y(0))              
      .y1(d => y(d[1])); 

  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  g.append("path")
    .datum(crimeByMonth)
    .attr("fill", "steelblue")
    .attr("fill-opacity", .4)
    .attr("d", area);

  g.append("path")
    .datum(crimeByMonth)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2.5)
    .attr("d", line);

  // dot labels
  g.selectAll("circle")
    .data(crimeByMonth)
    .join("circle")
    .attr("cx", d => x(d[0]))
    .attr("cy", d => y(d[1]))
    .attr("r", 5)
    .attr("fill", "steelblue")
    .attr("stroke", "white")
    .attr("stroke-width", 1.5);

  g.selectAll("text.data-label")
    .data(crimeByMonth)
    .join("text")
    .attr("class", "data-label")
    .attr("x", d => x(d[0]))
    .attr("y", d => y(d[1]) - 10)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(d => d[1]);


  // events
  const events = [
    {date: new Date("2020-03-19"), name: "Stay-Home Order", color: "red"},
    {date: new Date("2020-05-08"), name: "Limited Reopenings", color: "green"},
    {date: new Date("2020-07-13"), name: "Indoor Closures", color: "red"},
    {date: new Date("2020-10-01"), name: "Limited Reopenings", color: "green"},
  ];

  g.selectAll(".event-line")
    .data(events)
    .join("line")
    .attr("x1", d => x(d.date))
    .attr("x2", d => x(d.date))
    .attr("y1", -25)
    .attr("y2", innerHeight)
    .attr("stroke", d => d.color)
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", "4,4")
    .attr("opacity", 0.7);

  g.selectAll(".event-label")
    .data(events)
    .join("text")
    .attr("x", d => x(d.date)+50)
    .attr("y", d => 23)
    .attr("text-anchor", "end")
    .attr("font-size", "9px")
    .attr("font-weight", "bold")
    .attr("transform", d => `rotate(-90, ${x(d.date)}, 25)`)
    .text(d => d.name);

  return svg.node();
}


function _15(md){return(
md`#### Sub-Conclusion`
)}

function _16(md){return(
md`Crime in Los Angeles dropped sharply in April 2020 following the stay-at-home order, likely due to reduced public activity. It gradually rose after May as restrictions eased and protests occurred, then declined again toward December, reflecting both holiday seasonality and the winter COVID peak. The chart clearly shows how policy and social events influenced monthly crime trends throughout 2020.`
)}

function _17(md){return(
md`### Question 2: What types of crimes have increased or decreased significantly during 2020-2023?
`
)}

function _18(md){return(
md`This visualization directly addresses this question by plotting a time series trend of the top 10 most common crime types in Los Angeles from 2020 to 2023. Each crime type is shown as a separate line for easy identification. Some key observations we noted are listed below.

- **Simple Assault:** Simple assault and battery both rise in the summer with peaks seen around July. This is a common phenomenon observed throughout the U.S. Some researchers hypothesize that this spike may be due to increased heat (often linked to irritability and aggression) as well as a rise in social events and alcohol consumption.
- **Theft of Identity:** There is a very large increase in identity theft in LA County seen from the end of 2021 to the beginning of 2023. This massive increase was fueled by pandemic-related fraud. The U.S. Department of Labor Office of Inspector General reported that California lost billions to fraudilent unemployment claims in the COVID-19 relif period.
- **Car Theft:** Following COVID-19, car thefts increased significantly. Initially, this rise was due to more vehicles being left parked on the street for extended periods as people worked from home. However, the trend has continued in part because certain Kia and Hyundai models are particularly vulnerable to theft due to security flaws. Knowledge of this issue spread through social media challenges like the "Kia Challenge" which showed how to easily hotwire these vehicles.

By allowing users to filter and compare specific crime types, the chart becomes an interactive tool for exploring how the pandemic and recovery period have unevenly impacted various types of crime.`
)}

function _19(md){return(
md`#### Data Preprocessing
- Filtering: The dataset is filtered to include only the top 10 crime types by frequency.
- Grouping: A three-level d3.rollups() groups the data by crime type, then by monthYear, and counts the number of incidents (DR_NO) in each group.
- Sorting: Data is sorted by time to ensure correct plotting.`
)}

function _20(md){return(
md`#### Design`
)}

function _21(md){return(
md`Rendering Components
- X-Axis: Represents time (monthYear), spanning from early 2020 to the most recent date.
- Y-Axis: Represents the number of incidents for a given crime type per month.
- Line Paths: Each selected crime type is rendered as a colored line based on a consistent d3.schemeCategory10 palette.
- A checkbox control (Inputs.checkbox) lets users selectively view crime types.
- Buttons allow for clearing all selections or showing all crime types at once, giving the user quick control over the visual clutter.

Key Features
- Color-coded lines: Each crime type is assigned a unique and consistent color to make it easy to track over time.
- Minimalist axes and labels: Concise Y-axis labels and simplified X-axis scales bring trends into focus.
- Interactive filtering: Checkbox UI enhances readability by reducing line overlap and allowing for comparative exploration.
- Scalable layout: The chart design is scalable to include more years or more crime categories as needed.`
)}

function _selectedCrimes(Inputs,time_crime_grouped,crimeColor,crimeLabelMap,html)
{

  // checkboxes
  const defaultSelected = ["BATTERY - SIMPLE ASSAULT", "VEHICLE - STOLEN", "THEFT OF IDENTITY"]
  const view = Inputs.checkbox(
    time_crime_grouped.map(([crime]) => crime),
    {
      label: "Select Crime Types",
      value: defaultSelected,
      format: crime => {
        const color = crimeColor(crime); 
        const crimeShort = crimeLabelMap.get(crime);
        return html`<span style="border-bottom: solid 2px ${color}; font-weight: normal; width: 125px;">${crimeShort}</span>`;
      }
    }
  );

  // buttons
  const btn = html`<button style="margin-left:12px;">Clear All</button>`;
  btn.onclick = () => {
    view.value = [];
    view.dispatchEvent(new CustomEvent("input", {bubbles: true, detail: view.value}));
  };

   const showAllBtn = html`<button style="margin-left:25px;">Show All</button>`;
  showAllBtn.onclick = () => {
    view.value = time_crime_grouped.map(([crime]) => crime);
    view.dispatchEvent(new CustomEvent("input", {bubbles: true, detail: view.value}));
  };
  
  view.append(btn);
  view.append(showAllBtn);
  return view;
}


function _23(d3,Crime_data_from_2020_to_present,time_crime_grouped,selectedCrimes,crimeColor)
{
  const width = 800;
  const height = 550;
  const margin = { top: 70, right: 40, bottom: 90, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);
  
  const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const monthYearExtent = d3.extent(Crime_data_from_2020_to_present, d => d.monthYear)
  const x = d3.scaleTime()
      .domain(monthYearExtent)
      .range([0, innerWidth]);
  
  const maxCount = d3.max(time_crime_grouped, ([crime, counts]) => d3.max(counts, c => c[1]))
  const y = d3.scaleLinear()
      .domain([0, maxCount]).nice()
      .range([innerHeight, 0]);
  
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y).tickFormat(d3.format(".2s"));
  
  svg.append('text')
      .attr('x', (innerWidth + margin.left + margin.right) / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text('Crime Trends Over Time (2020-2023)');
  
  g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);
  
  g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.bottom - 45)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('Time Period');
  
  g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove());
  
  g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .text('Number of Incidents');
  
  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));
  const series = g.selectAll('.series')
    .data(time_crime_grouped.filter(([crime]) => selectedCrimes.includes(crime)))
    .join('g')
      .attr('class', 'series')
    .each(function([crime, counts]) {
    d3.select(this).append('path')
      .datum(counts)
      .attr('stroke', crimeColor(crime))
      .attr('fill', "none")
      .attr("stroke-width", 2.5)
      .attr('d', line);
  });
 
  return svg.node();
}


function _24(md){return(
md`#### Sub-Conclusion`
)}

function _25(md){return(
md`This visualization reveals clear shifts in crime trends in Los Angeles from 2020 to 2023, with notable increases in simple assault, identity theft, and car theft—each linked to pandemic-related factors and societal changes. The interactive design enables users to filter and compare trends effectively, making it a useful tool for analyzing the uneven impact of COVID-19 on different crime types. Its scalable layout also supports future expansion for broader temporal or categorical analysis.`
)}

function _26(md){return(
md`### Question 3: How did the trends in Part 1 and Part 2 crimes change in Los Angeles County between 2020 and 2023?`
)}

function _27(md){return(
md`This grouped bar chart shows a year-over-year comparison of total reported crimes in Los Angeles County from 2020 to 2023, distinguishing between Part 1 crimes (serious crimes such as homicide, burglary, and vehicle theft) and Part 2 crimes (lower-level but more frequent crimes such as vandalism, fraud, and drug offenses). Some key observations are listed below.
- Part 1 crimes have generally increased over the years, indicating an increase in serious criminal activity since the pandemic began.
- Part 2 crimes fluctuate more, with a slight increase in 2022, indicating variation in lower-level crimes, reflecting community-level disruptions.

Overall, this visualization effectively demonstrates the relative size of each crime type and the overall trend of increasing total crime incidents, helping stakeholders assess changes in public safety and resource needs over time.`
)}

function _28(md){return(
md`### Data Preprocessing`
)}

function _29(md){return(
md`The dataset is grouped by:
- Part 1-2 (crime severity: 1 = Part 1, 2 = Part 2)
- monthYear (standardized Date object)

d3.rollups() is used to count incidents by severity and time.

The data is structured into:
- A nested array for monthly trend lines
- A flattened array of { year, category, value } objects for bar chart display`
)}

function _30(md){return(
md`### Design`
)}

function _31(md){return(
md`Rendering Components
- X-Axis: Grouped by year (2020–2023), with sub-bars for each category
- Y-Axis: Total number of crimes
- Bars: Colored bars for each year-category pair, with hoverable tooltips
- Legend: Indicates which color corresponds to which part

Key Features
- Color distinction: Blue for Part 1, Green for Part 2 ensures intuitive understanding of severity.
- Gridlines provide visual anchors for comparing values across years.
- Legends, axis labels, and titles make both graphs informative even as standalone elements.`
)}

function _q3(html,grouped,d3,ResizeObserver)
{
  const container = html`<div> <style>
  .bar-chart-container {
    width: 100%;
    height: 100%;
  }
  svg {
    width: 100%;
    height: auto;
    max-height: 750px;
  }
  .bar { opacity: 0.8; transition: opacity 0.2s; }
  .bar:hover { opacity: 1; }
  .axis-label { font-size: 12px; }
  .chart-title { font-size: 16px; font-weight: bold; text-anchor: middle; }
  .chart-subtitle { font-size: 12px; text-anchor: middle; }
  .legend text { font-size: 12px; }
  .tooltip {
    position: absolute;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    pointer-events: none;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .grid line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  } </style> <div class="bar-chart-container"></div>

  </div>`;

  const getContainerDimensions = () => {
    const containerElement = container.querySelector('.bar-chart-container');
    const containerWidth = Math.max(containerElement.clientWidth, 320);
    return {
      width: containerWidth,
      height: Math.min(containerWidth * 0.75, 750)
    };
  };

  const processData = () => {
    const yearlyData = [];

    const years = [2020, 2021, 2022, 2023];

    grouped.forEach(([crimeType, monthData]) => {
      const yearTotals = {};
      years.forEach(year => yearTotals[year] = 0);
      
      monthData.forEach(([dateObj, count]) => {
        let year;
        if (dateObj instanceof Date) {
          year = dateObj.getFullYear();
        } else if (typeof dateObj === 'string') {
          year = parseInt(dateObj.slice(0, 4));
        } else if (typeof dateObj === 'number') {
          year = Math.floor(dateObj / 100);
        } else {
          console.log("Unhandled date format:", dateObj);
          return;
        }
        
        if (years.includes(year)) {
          yearTotals[year] += count;
        }
      });
      
      years.forEach(year => {
        yearlyData.push({
          year,
          category: crimeType,
          value: yearTotals[year]
        });
      });
    });

    return yearlyData;
  };

  const data = processData();
  console.log("Processed data:", data);

  const margin = { top: 60, right: 30, bottom: 100, left: 70 };
  
  const createChart = () => {
    const chartContainer = container.querySelector('.bar-chart-container');
    chartContainer.innerHTML = '';
    
    const dimensions = getContainerDimensions();
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3.select(chartContainer)
      .append('svg')
      .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", -30)
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .text("Los Angeles County Crime Trends (2020-2023)");

    svg.append("text")
      .attr("class", "chart-subtitle")
      .attr("x", width / 2)
      .attr("y", -10)
      .text("Comparing yearly totals of Part 1 crimes (violent/property) and Part 2 crimes (less serious offenses)");

    const years = [...new Set(data.map(d => d.year))];
    const categories = [...new Set(data.map(d => d.category))];

    const xScale0 = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.2);

    const xScale1 = d3.scaleBand()
      .domain(categories)
      .range([0, xScale0.bandwidth()])
      .padding(0.05);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(categories)
      .range(['#3b82f6', '#10b981']);

    svg.append("g")
      .attr("class", "y-axis")
      .call(
        d3.axisLeft(yScale)
          .ticks(10)
          .tickSize(-width)
          .tickFormat(d3.format(".2s"))
      )
      .selectAll("line")
      .style("stroke-dasharray", "3,3");

    svg.select(".y-axis")
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Number of Reported Crimes");

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale0))
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', 'black')
      .text('Year');

    const tooltip = d3.select(container)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    years.forEach(year => {
      const yearData = data.filter(d => d.year === year);

      svg.selectAll(`.bar-${year}`)
        .data(yearData)
        .enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', d => xScale0(d.year) + xScale1(d.category))
          .attr('y', d => yScale(d.value))
          .attr('width', xScale1.bandwidth())
          .attr('height', d => height - yScale(d.value))
          .attr('fill', d => colorScale(d.category))
          .on('mouseover', function(event, d) {
            d3.select(this).style('opacity', 1);
            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            tooltip.html(`<strong>${d.category === '1' ? 'Part 1' : 'Part 2'} (${d.year})</strong><br>Count: ${d.value.toLocaleString()}`)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 28) + "px");
          })
          .on('mouseout', function() {
            d3.select(this).style('opacity', 0.8);
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });
    });

    const legendLabels = {
      '1': 'Part 1',
      '2': 'Part 2'
    };

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150}, ${height + 35})`);

    categories.forEach((category, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);

      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', colorScale(category));
        
      legendRow.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .text(legendLabels[category]);
    });
  };

  createChart();
  
  const resizeObserver = new ResizeObserver(entries => {
    createChart();
  });
  
  resizeObserver.observe(container.querySelector('.bar-chart-container'));
  
  container.addEventListener('dispose', () => {
    resizeObserver.disconnect();
  });

  return container;
}


function _33(md){return(
md`#### Sub-Conclusion`
)}

function _34(md){return(
md`Our visualization reveals that Part 1 crimes—more serious offenses—have steadily increased from 2020 to 2023, suggesting a rise in severe criminal activity post-pandemic. In contrast, Part 2 crimes show more fluctuation, with a notable spike in 2022, reflecting shifts in community-level disturbances. The clear visual distinction and year-over-year comparison make this chart an effective tool for assessing crime severity trends and guiding resource allocation decisions.

`
)}

function _35(md){return(
md`### Question 4: How does crime type frequency differ across various areas within Los Angeles County?`
)}

function _36(md){return(
md`This map directly answers this question by:
- Mapping each LAPD reporting district (spatial polygon) and coloring it by its most frequent crime type.
- Displaying the top 5 crimes per district with percentages and counts when hovered.
- Allowing users to filter the map by crime type to see where specific crimes are most dominant.

Key Observations:
- Certain crime types, such as “Vehicle - Stolen” and “Burglary from Vehicle,” appear to dominate in large sections of South Los Angeles, Central LA, and the southern coastal areas, suggesting a strong spatial concentration of property-related offenses.
- “Theft of Identity” and “Burglary” are more prevalent in northern and western suburban areas, indicating different criminal patterns compared to the inner city.
- Violent offenses like “Simple Assault” and “Assault with a Deadly Weapon” are more dispersed but appear frequently in denser, central neighborhoods.
- The map reveals a clear spatial divide between inner-city districts and suburban zones, which exhibit distinct crime patterns. This spatial insight can help law enforcement, policymakers, and urban planners target interventions based on the dominant offense types in each community.`
)}

function _37(md){return(
md`### Data Preprocessing`
)}

function _38(md){return(
md`Crimes are grouped by Rpt Dist No and Crm Cd Desc to calculate:
- Total crime count per district
- Top 5 crime types by frequency and their percentages

GeoJSON Enhancement:
- The geoData (reporting district shapes) is enhanced with crime statistics using a mapping:
- Adds totalCrimes, topCrimes to each polygon
- Sorts by geographic area to layer larger polygons behind smaller ones

Top 10 Crime Types are also calculated across the dataset to focus the color mapping and filtering.`
)}

function _39(md){return(
md`### Design`
)}

function _40(md){return(
md`Rendering Components

Base Map:
- Each district is rendered using d3.geoPath() with a neutral fill.

Hover Interaction:

When users hover over a district:
- The color updates to the corresponding top crime type
- A styled tooltip shows:
  - District number
  - Total reported crimes
  - Top 5 crimes with counts and share

Legend Interactivity:
- The legend serves as a clickable filter control:
  - Click toggles visibility of each crime type on the map
  - Filters are applied live using an activeTypes set and updateHighlights() function

Reset & Show All Buttons:
- Let users quickly clear or restore all filters without refreshing the page.

Key Features
- Color Scheme: Uses d3.schemeCategory10 to clearly distinguish top crime types with consistent, visually accessible colors.
- Layered Map & Responsive Sizing: SVG and projection are responsive; smaller polygons are layered above for better interaction.
- Tooltip Details: Includes rich text with counts and formatted percentages, supporting both quick scans and deep dives.
- Click-to-Filter Legend: An intuitive UI for isolating areas where a specific crime dominates.
- Clear Titles & Labels: Adds necessary context about map behavior and interpretation without crowding the interface.`
)}

function _q4(preprocessData,Crime_data_from_2020_to_present,geoData,d3)
{
  const width = 1200;
  const height = 800;
  const margin = { top: 50, right: 300, bottom: 40, left: 40 };

  const { mergedGeoData, topCrimeTypes, crimeStatsByDistrict } = preprocessData(Crime_data_from_2020_to_present, geoData);

  const colorScale = d3.scaleOrdinal()
    .domain(topCrimeTypes)
    .range([
      "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
      "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
    ]);

  const container = document.createElement("div");
  container.style.position = "relative";

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto;");

  const tooltip = document.createElement("div");
  Object.assign(tooltip.style, {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    zIndex: "10",
    opacity: "0",
    transition: "opacity 0.2s",
    maxWidth: "280px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
  });
  container.appendChild(tooltip);

  const projection = d3.geoMercator()
    .fitSize(
      [width - margin.right - margin.left, height - margin.top - margin.bottom],
      mergedGeoData
    );

  const path = d3.geoPath().projection(projection);

  const mapGroup = svg.append("g")
    .attr("transform", `translate(0, ${margin.top + 20})`);

  const activeTypes = new Set(topCrimeTypes);

  const mapPaths = mapGroup.append("g")
    .selectAll("path")
    .data(mergedGeoData.features)
    .join("path")
      .attr("fill", "#cccccc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .attr("d", path)
      .attr("opacity", 0.85)
      .on("mouseover", function(event, d) {
        const t = d.properties.topCrimes[0]?.type;
        d3.select(this)
          .attr("fill", colorScale(t))
          .attr("opacity", 1)
          .attr("stroke-width", 1.5);
        const stats = crimeStatsByDistrict.get(d.properties.reportingDistrict);
        if (stats) {
          tooltip.innerHTML = `
            <div style="font-weight:bold;margin-bottom:5px;">
              District ${d.properties.reportingDistrict}
            </div>
            <div>Total Crimes: ${stats.totalCrimes}</div>
            <div style="margin-top:5px;font-weight:bold;">Top Crimes:</div>
            <ol style="margin:5px 0 0 20px;">
              ${stats.topCrimes.map(c => `<li>${c.type}: ${c.count} (${c.percentage}%)</li>`).join("")}
            </ol>
          `;
          tooltip.style.opacity = "1";
        }
      })
      .on("mouseout", function(event, d) {
        const t = d.properties.topCrimes[0]?.type;
        d3.select(this)
          .attr("fill", activeTypes.has(t) ? colorScale(t) : "#cccccc")
          .attr("opacity", 0.85)
          .attr("stroke-width", 0.5);
        tooltip.style.opacity = "0";
      });

  function updateHighlights() {
  mapPaths.attr("fill", d => {
    const t = d.properties.topCrimes[0]?.type;
    if (activeTypes.size === 0) return "#cccccc";
    return activeTypes.has(t) ? colorScale(t) : "#cccccc";
  });
}

  const legend = svg.append("g")
    .attr("transform", `translate(${width - margin.right - 50}, ${margin.top + 50})`);

  legend.append("text")
    .attr("x", 0).attr("y", 0)
    .attr("font-weight", "bold")
    .text("Top Crime Types (Click to filter)");

  const legendItems = legend.selectAll(".legend-item")
    .data(topCrimeTypes)
    .join("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 25 + 20})`)
      .style("cursor", "pointer")
      .on("click", function(event, type) {
        if (activeTypes.has(type)) activeTypes.delete(type);
        else activeTypes.add(type);
        updateHighlights();
      });

  legendItems.append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", d => colorScale(d));

  legendItems.append("text")
    .attr("x", 25).attr("y", 12)
    .attr("font-size", "12px")
    .text(d => d.length > 40 ? d.slice(0, 40) + "..." : d);

  svg.append("text")
    .attr("x", width/2).attr("y", margin.top/2)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px").attr("font-weight", "bold")
    .text("Crime Type Distribution Across Los Angeles County Areas");

  svg.append("text")
    .attr("x", width/2).attr("y", margin.top/2 + 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text("Hover for details; click legend to filter");

  svg.append("text")
    .attr("x", margin.left).attr("y", height - 10)
    .attr("font-size", "11px")
    .attr("font-style", "italic")
    .text("Use the Reset button below to clear or show all filters");

  container.appendChild(svg.node());

  // RESET BUTTON
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  Object.assign(resetBtn.style, {
    marginTop: "10px",
    marginLeft: "10px",
    padding: "6px 12px",
    fontSize: "14px",
    cursor: "pointer"
  });
  resetBtn.onclick = () => {
    activeTypes.clear();
    updateHighlights();
  };
  container.appendChild(resetBtn);

 const showAllBtn = document.createElement("button");
showAllBtn.textContent = "Show All";
Object.assign(showAllBtn.style, {
  marginTop: "10px",
  marginLeft: "10px",
  padding: "6px 12px",
  fontSize: "14px",
  cursor: "pointer"
});
showAllBtn.onclick = () => {
  activeTypes.clear();
  topCrimeTypes.forEach(type => activeTypes.add(type));
  updateHighlights();
};
container.appendChild(showAllBtn);

updateHighlights();

  return container;
}


function _42(md){return(
md`#### Sub-Conclusion`
)}

function _43(md){return(
md`This visualization reveals distinct geographic patterns in crime types across Los Angeles County, highlighting how property-related crimes cluster in southern and central areas, while identity theft and burglary are more common in suburban zones. Violent crimes show a more dispersed distribution, often centered in dense neighborhoods. The interactive filtering and detailed tooltips make this map a powerful tool for understanding localized crime dynamics, aiding targeted interventions and policy decisions.`
)}

function _44(md){return(
md`### Question 5: Which areas or neighborhoods in Los Angeles have the highest crime rates, and how have these areas changed over time?`
)}

function _45(md){return(
md`This interactive visualization explores the monthly crime distribution of Los Angeles neighborhoods from 2020 to 2023. It allows users to understand the geographic distribution of crime and how it changes over time. The tool includes several key features:
- Dynamic neighborhood ranking based on monthly crime counts.
- The top 15 neighborhoods are highlighted in a pie chart format with different color palettes for visual clarity.
- The remaining neighborhoods are grouped in the “Other” category to avoid visual clutter.
- The time slider allows users to navigate across months and observe changes in crime patterns.

Key Observations:
- The central region has continued to have high crime rates since the beginning of 2021, and remains a hotspot in the dataset.
- Some areas show seasonal trends, with clear increases or decreases in certain months.
- The distribution of crime changes from month to month, and some areas will rise or fall in the ranking depending on the selected time period.`
)}

function _46(md){return(
md`### Data Preprocessing`
)}

function _47(md){return(
md`Using same processed dataset as Question 4.`
)}

function _48(md){return(
md`### Design`
)}

function _49(md){return(
md`Rendering Components
- Time Slider: Located above the chart, allows the user to drag the time slider and dynamically updates the pie chart based on the selected month.
- Pie Chart:
  - Shows the relative crime rate for each region as colored slices.
  - The "Other" slice summarizes all regions that did not make the top 15.
- Drill-down Capability:
  - Clicking on an "Other" slice replaces it with its constituent regions.
  - The "Back to Overview" button resets the view to the main ranking.
- Labels and Tooltips:
  - Each slice is labeled with the region name and dynamically resizes to reduce clutter.
  - Tooltips on hover show the exact crime count and percentage.
- Trendline Overview:
  - Located below the pie chart, shows the time trend for the top 5 regions.
  - The line color for each region matches the pie color.

Key Features
- Color Palette: Assign unique, distinguishable colors to each area for clear visuals.
- Dynamic Interactions:
  - Hover events trigger tooltips and temporary trend highlights.
  - Click events enable in-depth viewing of lesser-known areas.
- Responsive Layout:
  - Layout components resize and adjust at different points in time for improved readability.
- Time Trend:
  - The bottom trendline graph provides a month-by-month perspective on the evolution of crime rates in key areas.
  - A “Current” indicator marks the selected month for more context.`
)}

function _q5(Crime_data_from_2020_to_present,d3,html)
{
  const crimeData = Crime_data_from_2020_to_present;
  const TOP_N = 15;

  const district = d =>
    d["AREA NAME"] ??
    d["Rpt Dist No"] ??
    d.reportingDistrict ??
    "Unknown";

  const parseDate = d3.isoParse;
  const formatMonth = d3.timeFormat("%Y-%m");
  const formatMonthPretty = d3.timeFormat("%B %Y"); 

  const timeCrimeGrouped = Array.from(
    d3.group(crimeData, d => {
      const parsedDate = parseDate(d["DATE OCC"]);
      return parsedDate ? formatMonth(parsedDate) : "Unknown";
    }),
    ([period, recs]) => [period, recs]
  ).filter(([period]) => period !== "Unknown")
   .sort(([a], [b]) => d3.ascending(a, b));

  const periods = timeCrimeGrouped.map(([p]) => p);
  
  const allTimeTopDistricts = new Set();
  const districtCounts = new Map();
  
  timeCrimeGrouped.forEach(([_, recs]) => {
    const periodCounts = d3.rollup(recs, v => v.length, district);
    periodCounts.forEach((count, name) => {
      districtCounts.set(name, (districtCounts.get(name) || 0) + count);
    });
  });
  
  Array.from(districtCounts.entries())
    .sort((a, b) => d3.descending(a[1], b[1]))
    .slice(0, TOP_N)
    .forEach(([name]) => allTimeTopDistricts.add(name));

  const slider = html`<input
    type="range"
    min="0"
    max="${periods.length - 1}"
    step="1"
    value="${periods.length - 1}"
    style="width:400px;"
  >`;

  const timeLabel = html`<span style="font-weight:bold; margin-left:12px; font-size:16px">
    ${formatMonthPretty(parseDate(periods[periods.length - 1]))}
  </span>`;

  const width = 640, height = 740, r = Math.min(width, height) / 2 - 80;
  const svg = d3.create("svg").attr("width", width).attr("height", height);
  const g = svg.append("g").attr("transform", `translate(${width/2 + 200},${height/2 - 100})`);

  const SAFE_PALETTE = [
    "#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b",
    "#e377c2","#7f7f7f","#bcbd22","#17becf",
    "#393b79","#637939","#8c6d31","#843c39","#7b4173",
    "#3182bd","#e6550d","#31a354","#756bb1","#7f2704",
    "#6baed6","#fdae6b","#74c476","#9e9ac8","#fd8d3c"
  ];
  
  const districtColorMap = new Map();
  [...allTimeTopDistricts].forEach((district, i) => {
    districtColorMap.set(district, SAFE_PALETTE[i % SAFE_PALETTE.length]);
  });
  
  function color(name) {
    if (districtColorMap.has(name)) return districtColorMap.get(name);
    const h = ((hashCode(name)%360)+360)%360;
    return d3.hsl(h, 0.7, 0.5).formatHex();
  }
  
  function hashCode(str){ 
    let h=0; 
    for(let i=0; i<str.length; ++i) h=(h<<5)-h+str.charCodeAt(i); 
    return h; 
  }
  
  const otherColor = "#888888";

  const trendHeight = 180;
  const trendSvg = svg.append("g")
    .attr("transform", `translate(${width/2 - 80}, ${height - trendHeight - 20})`)
    .attr("class", "trend-area");
    
  trendSvg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", trendHeight)
    .attr("fill", "#f9f9f9")
    .attr("stroke", "#ddd");

  // Back button for drill-down functionality
  const backBtn = Object.assign(document.createElement("button"), {
    textContent: "Back to Overview",
    style: "margin-top:6px; display:none; padding: 6px 12px;",
    onclick() {
      drillData = null;
      this.style.display = "none";
      draw(+slider.value);
    }
  });

  const title = html`<h2 style="text-align:center; margin-bottom:8px; margin-left:250px">
    LA Crime Rates by Neighborhood (2020-2023)
  </h2>`;

  const subTitle = html`<div style="text-align:center; margin-bottom:16px; font-style:italic">
    Showing the top ${TOP_N} districts by crime count, with temporal trend analysis
  </div>`;

  const container = html`
    <div style="text-align:center;">
      ${title}
      ${subTitle}
      <div style="margin-bottom:12px">
        <div style="margin-bottom:4px; font-weight:bold">Time Period</div>
        ${slider} ${timeLabel}
      </div>
      ${svg.node()}
      <div style="display:flex; justify-content:center; margin-top:8px">
        ${backBtn}
      </div>
      <div class="legend" style="display:flex; flex-wrap:wrap; justify-content:center; margin-top:12px"></div>
    </div>
  `;

  let drillData = null;
  
  const trendData = [];
  
  function updateTrendLine(highlightedDistrict = null) {
    trendSvg.selectAll("*").remove();
    
    if (trendData.length === 0) return;
    
    trendSvg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", trendHeight+ 20)
      .attr("fill", "#f9f9f9")
      .attr("stroke", "#ddd")
      .attr("rx", 4);
    
    trendSvg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(highlightedDistrict ? 
        `Crime Trend for ${highlightedDistrict}` : 
        "Crime Trends for Top 5 Districts");
    
    const topDistrictsToShow = highlightedDistrict ? 
      [highlightedDistrict] :
      [...allTimeTopDistricts].slice(0, 5);
    
    const xScale = d3.scaleLinear()
      .domain([0, periods.length - 1])
      .range([50, width - 50]);
    
    const yMax = d3.max(trendData, d => {
      return d3.max(topDistrictsToShow, district => d.counts.get(district) || 0);
    });
    
    const yScale = d3.scaleLinear()
      .domain([0, yMax * 1.1])
      .range([trendHeight - 40, 40]);
    
    const line = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);
    
    const yTicks = yScale.ticks(5);
    trendSvg.selectAll(".y-grid-line")
      .data(yTicks)
      .enter()
      .append("line")
      .attr("class", "y-grid-line")
      .attr("x1", 50)
      .attr("x2", width - 50)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "#e0e0e0")
      .attr("stroke-width", 1);

    const labelCoords = [];
    
    topDistrictsToShow.forEach(districtName => {
      const districtData = trendData.map(d => d.counts.get(districtName) || 0);
      
      const path = trendSvg.append("path")
        .datum(districtData)
        .attr("fill", "none")
        .attr("stroke", color(districtName))
        .attr("stroke-width", highlightedDistrict ? 3.5 : 2.5)
        .attr("d", line)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");
      
      trendSvg.selectAll(`.dot-${districtName.replace(/\s+/g, "-")}`)
        .data(districtData)
        .enter()
        .append("circle")
        .attr("class", `dot-${districtName.replace(/\s+/g, "-")}`)
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d))
        .attr("r", highlightedDistrict ? 4 : 3)
        .attr("fill", color(districtName))
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .append("title")
        .text((d, i) => {
          const period = periods[i];
          return `${districtName}: ${d} crimes in ${formatMonthPretty(parseDate(period))}`;
        });
      
      const lastValue = districtData[districtData.length - 1];
      const labelY = yScale(lastValue);
      
      labelCoords.push({
        x: xScale(districtData.length - 1),
        y: yScale(districtData[districtData.length - 1]),
        text: districtName,
        color: color(districtName)
      });
    });

    labelCoords.sort((a, b) => a.y - b.y);
    for (let i = 1; i < labelCoords.length; i++) {
      const prev = labelCoords[i - 1];
      const curr = labelCoords[i];
      if (curr.y - prev.y < 14) {
        curr.y = prev.y + 14;
      }
    }

    labelCoords.forEach(d => {
      trendSvg.append("rect")
        .attr("x", d.x + 5 - 2)
        .attr("y", d.y - 8)
        .attr("width", d.text.length * 6 + 4)
        .attr("height", 16)
        .attr("fill", "#fff")
        .attr("opacity", 0.7)
        .attr("rx", 2);

      trendSvg.append("text")
        .attr("x", d.x + 5)
        .attr("y", d.y)
        .attr("dominant-baseline", "middle")
        .attr("font-size", "11px")
        .attr("fill", d.color)
        .text(d.text);
    });
    
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((d, i) => {
        if (periods.length > 24) {
          return i % 3 === 0 ? formatMonthPretty(parseDate(periods[d])).slice(0, 3) + " '" + parseDate(periods[d]).getFullYear().toString().slice(2) : "";
        }
        return formatMonthPretty(parseDate(periods[d])).slice(0, 3) + " '" + parseDate(periods[d]).getFullYear().toString().slice(2);
      })
      .tickValues(d3.range(0, periods.length, Math.ceil(periods.length / 12)));
    
    trendSvg.append("g")
      .attr("transform", `translate(0, ${trendHeight - 40})`)
      .attr("class", "x-axis")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "9px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end");
    
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => d >= 1000 ? `${d/1000}k` : d);
    
    trendSvg.append("g")
      .attr("transform", `translate(50, 0)`)
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "10px");
    
    trendSvg.append("text")
      .attr("x", width / 2)
      .attr("y", trendHeight)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .text("Time Period");
    
    trendSvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -trendHeight / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .text("Crime Count");
    
    const currentIndex = +slider.value;
    trendSvg.append("line")
      .attr("x1", xScale(currentIndex))
      .attr("x2", xScale(currentIndex))
      .attr("y1", 30)
      .attr("y2", trendHeight - 40)
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4");
    
    trendSvg.append("text")
      .attr("x", xScale(currentIndex))
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "red")
      .text("Current");
  }

  function buildTrendData() {
    trendData.length = 0;
    
    timeCrimeGrouped.forEach(([period, recs]) => {
      const counts = new Map();
      d3.rollup(recs, v => v.length, district).forEach((count, name) => {
        counts.set(name, count);
      });
      
      trendData.push({
        period,
        counts
      });
    });
  }
  
  buildTrendData();
  
  function draw(index) {
    const currentPeriod = periods[index];
    const parsedDate = parseDate(currentPeriod);
    if (parsedDate) {
      timeLabel.textContent = formatMonthPretty(parsedDate);
    } else {
      timeLabel.textContent = currentPeriod;
    }

    const [_, recs] = timeCrimeGrouped[index];
    const counts = Array.from(
      d3.rollup(recs, v => v.length, district),
      ([name, count]) => ({ name, count })
    ).sort((a, b) => d3.descending(a.count, b.count));

    let data;
    if (drillData) {
      data = drillData;
    } else {
      const primary = counts.slice(0, TOP_N);
      const remainder = counts.slice(TOP_N);
      const otherSum = d3.sum(remainder, d => d.count);
      data = otherSum
        ? [...primary, { name: "Other", count: otherSum, children: remainder }]
        : primary;
    }

    g.selectAll("*").remove();
    
    const pie = d3.pie().value(d => d.count).sort(null)(data);
    const arc = d3.arc().innerRadius(0).outerRadius(r);
    
    const slices = g.selectAll("g.slice")
      .data(pie, d => d.data.name)
      .enter()
      .append("g")
      .attr("class", "slice");
    
    slices.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.name === "Other" ? otherColor : color(d.data.name))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .on("mouseover", function(event, d) {
        d3.select(this)
          .attr("stroke-width", 3)
          .attr("stroke", "#000")
          .transition()
          .duration(200)
          .attr("transform", function(d) {
            const dist = 5;
            const a = (d.startAngle + d.endAngle) / 2;
            const x = Math.sin(a) * dist;
            const y = -Math.cos(a) * dist;
            return `translate(${x},${y})`;
          });
          
        if (d.data.name !== "Other") {
          updateTrendLine(d.data.name);
        }
      })
      .on("mouseout", function() {
        d3.select(this)
          .attr("stroke-width", 1.5)
          .attr("stroke", "#fff")
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)");
          
        updateTrendLine();
      })
      .append("title")
      .text(d => `${d.data.name}: ${d.data.count.toLocaleString()} crimes (${(d.value / d3.sum(data, d => d.count) * 100).toFixed(1)}%)`);
    
    const textArc = d3.arc().innerRadius(r * 0.65).outerRadius(r * 0.65);
    
    slices.append("text")
      .attr("transform", d => {
        const pos = textArc.centroid(d);
        return `translate(${pos})`;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", d => {
        const angle = d.endAngle - d.startAngle;
        return angle < 0.2 ? "8px" : angle < 0.5 ? "10px" : "12px";
      })
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.1 ? d.data.name : "";
      });
    
    slices.append("text")
      .attr("transform", d => {
        const pos = textArc.centroid(d);
        return `translate(${pos[0]}, ${pos[1] + 14})`;
      })
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("fill", "#333")
      .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.25 ? d.data.count.toLocaleString() : "";
      });

    const legendEl = container.querySelector('.legend');
    legendEl.innerHTML = '';
    
    const legendTitle = document.createElement('div');
    legendTitle.style.width = '100%';
    legendTitle.style.textAlign = 'center';
    legendTitle.style.fontWeight = 'bold';
    legendTitle.style.marginBottom = '8px';
    legendTitle.textContent = drillData ? 'Lower Crime Areas' : 'Neighborhoods by Crime Count';
    legendEl.appendChild(legendTitle);
    
    data.forEach(d => {
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.margin = '3px 10px';
      item.style.padding = '2px 6px';
      item.style.borderRadius = '3px';
      item.style.cursor = 'pointer';
      item.style.transition = 'background-color 0.2s';
      
      const swatch = document.createElement('span');
      swatch.style.width = '12px';
      swatch.style.height = '12px';
      swatch.style.background = d.name === 'Other' ? otherColor : color(d.name);
      swatch.style.marginRight = '6px';
      swatch.style.borderRadius = '2px';
      
      const label = document.createElement('span');
      label.textContent = `${d.name}`;
      
      item.appendChild(swatch);
      item.appendChild(label);
      legendEl.appendChild(item);
      
      item.onmouseover = function() {
        if (d.name !== 'Other') {
          this.style.backgroundColor = '#f0f0f0';
          updateTrendLine(d.name);
        }
      };
      
      item.onmouseout = function() {
        this.style.backgroundColor = 'transparent';
        updateTrendLine();
      };
      
      if (d.name !== 'Other') {
        item.onclick = () => updateTrendLine(d.name);
      }
    });

    updateTrendLine();
    
    g.selectAll("path").on("click", (e, d) => {
      if (!drillData && d.data.name === "Other" && d.data.children) {
        drillData = d.data.children;
        backBtn.style.display = "";
        draw(index);
      }
    });
    
    title.textContent = drillData 
      ? `Lower Crime Areas - ${formatMonthPretty(parseDate(currentPeriod))}`
      : "LA Crime Rates by Neighborhood (2020-2023)";
  }

  slider.oninput = () => {
    drillData = null;
    backBtn.style.display = "none";
    draw(+slider.value);
  };

  draw(periods.length - 1);

  return container;
}


function _51(md){return(
md`#### Sub-Conclusion`
)}

function _52(md){return(
md`This visualization tracks how crime is distributed across Los Angeles neighborhoods over time. It highlights persistent hotspots—especially in the central region—as well as monthly and seasonal shifts in crime rankings. With dynamic filtering, drill-downs, and trendlines, the tool offers a clear view of which areas consistently report high crime and how neighborhood patterns evolve, helping inform geographically targeted strategies for law enforcement and community planning.`
)}

function _53(md){return(
md`### Question 6: How does crime trends change by time of day and day of the week?`
)}

function _54(md){return(
md`This radial visualization compares crime patterns by day of the week from 2020 to 2023. Each closed shape in the chart represents a year of crime data, where:
- The radial distance from the center corresponds to the number of crimes reported on a particular day.
- Each point around the circle represents a day of the week (Sunday through Saturday), going clockwise like a clock.
- The color-coded curves distinguish each year using a categorical color scheme.
- The concentric circles provide a scale reference for comparing incident counts.
- The interactive legend allows users to toggle individual years to isolate trends or compare multiple years side by side.

Key Observations:
- Crime numbers are consistently highest on weekends and Saturdays, suggesting that weekend crime has recurred over the past few years.
- Weekday crime levels remain relatively stable, with Tuesdays and Wednesdays typically seeing the lowest crime numbers.
- In 2020, overall crime numbers fell significantly, especially on weekends - likely reflecting the impact of lockdowns and reduced mobility.
- Weekend crime rebounded in post-pandemic years (2022 and 2023), suggesting that criminal behaviour patterns have returned to pre-pandemic levels.`
)}

function _55(md){return(
md`### Data Preprocessing`
)}

function _56(md){return(
md`Using same processed dataset as Question 4.`
)}

function _57(md){return(
md`### Design`
)}

function _58(md){return(
md`Rendering Components
- Radial Chart Construction
  - Clock-like Layout: Each day of the week is mapped to a fixed angle on a circle, simulating a position on a clock face.
  - Yearly Curves: Each year from 2020 to 2023 has a closed curve connecting the number of crimes reported on each weekday.
  - Color-coded Years: Each year is represented using a different color for easier comparison.
  - Data Points: Small circles are added to the radial position of each day, with tooltips showing the exact number of crimes for each day and year for enhanced interactivity.

- Visual Layout and Elements
  - Concentric Circles: These concentric circles serve as a scale reference to estimate the number of crimes at a glance. Tick marks show the exact value along the radius.
  - Date Labels: Located slightly outside the outermost circle to guide interpretation.

- Interactive Legend
  - Toggle Functionality: The legend on the right side of the chart allows users to selectively show or hide specific years.
  - Visual Feedback: When off, the year's color box fades and its label font becomes lighter, making the current year more prominent.
  - Click-toggle behavior: Prevents the user from deselecting the last visible year, ensuring the chart always remains blank.

Key Features
- Intuitive radial layout: The circular design makes it easy to compare crime patterns across different weekdays and spot rhythmic or cyclical behaviors.
- Clear year-over-year comparisons: Colors, curves, and labels make it easy to evaluate crime trends across multiple years side by side.
- Responsive tooltips: Hover over a data point to reveal detailed information about the number of crimes for a specific weekday and year.
- Legend-driven filtering: Users can filter for specific years to explore the impact of events like COVID-19 or compare recovery patterns.`
)}

function _59(Crime_data_from_2020_to_present,d3)
{
  const crimeData = Crime_data_from_2020_to_present;
  const years = [2020, 2021, 2022, 2023];
  const countsByYearAndDay = years.map(year => {
    const dayCounts = Array(7).fill(0);
    crimeData.forEach(row => {
      const dt = row["DATE OCC"];
      if (!(dt instanceof Date) || isNaN(+dt)) return;
      if (dt.getFullYear() === year) dayCounts[dt.getDay()]++;
    });
    return { year, counts: dayCounts };
  });
  const maxCount = d3.max(countsByYearAndDay, d => d3.max(d.counts));


  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayShort = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const width  = 900;
  const height = 700;
  const margin = { top: 100, right: 150, bottom: 50, left: 50 };

  const innerWidth  = width  - margin.left - margin.right;
  const innerHeight = height - margin.top  - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;

  const centerX = width  / 2;
  const centerY = height / 2 + 30;

  const angleScale = d3.scaleLinear()
    .domain([0, 7])
    .range([0, 2 * Math.PI]);

  const radiusScale = d3.scaleLinear()
    .domain([0, maxCount])
    .range([0, radius]);

  const colorScale = d3.scaleOrdinal()
    .domain(years)
    .range(d3.schemeCategory10);

  const activeYears = new Set(years);

  const LABEL_PAD_DEFAULT = 60;
  const LABEL_PAD_SUN     = 40;

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);

  const g = svg.append("g")
    .attr("transform", `translate(${centerX}, ${centerY})`);


  const tickCount = 5;
  const ticks = d3.range(1, tickCount + 1).map(i => Math.round(maxCount * i / tickCount));
  ticks.forEach(tick => {
    const r = radiusScale(tick);
    g.append("circle")
      .attr("r", r)
      .attr("fill", "none")
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1);
    g.append("text")
      .attr("x", 0)
      .attr("y", -r - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("fill", "#777")
      .text(tick.toLocaleString());
  });

  // spokes + day labels
  for (let day = 0; day < 7; day++) {
    const ang = angleScale(day);
    const x   = radius * Math.sin(ang);
    const y   = -radius * Math.cos(ang);

    g.append("line")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", x).attr("y2", y)
      .attr("stroke", "#ddd")
      .attr("stroke-width", 0.5);

    const pad = day === 0 ? LABEL_PAD_SUN : LABEL_PAD_DEFAULT;
    const lx  = (radius + pad) * Math.sin(ang);
    const ly  = -(radius + pad) * Math.cos(ang);

    g.append("text")
      .attr("x", lx)
      .attr("y", ly)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#555")
      .text(dayShort[day]);
  }


  const yearGroups = {};
  years.forEach(year => {
    yearGroups[year] = g.append("g").attr("class", `year-${year}`);
  });

  function updateChart() {
    years.forEach(year => {
      yearGroups[year].style("display", activeYears.has(year) ? null : "none");
    });
  }

  countsByYearAndDay.forEach(({ year, counts }) => {
    const grp = yearGroups[year];
    const pts = counts.map((c, d) => {
      const a = angleScale(d), r = radiusScale(c);
      return [r * Math.sin(a), -r * Math.cos(a)];
    });
    pts.push(pts[0]);

    grp.append("path")
      .datum(pts)
      .attr("d", d3.line().curve(d3.curveCardinalClosed.tension(0.5)))
      .attr("fill", "none")
      .attr("stroke", colorScale(year))
      .attr("stroke-width", 2.5)
      .attr("stroke-linejoin", "round");

    counts.forEach((c, d) => {
      const a = angleScale(d), r = radiusScale(c);
      grp.append("circle")
        .attr("cx", r * Math.sin(a))
        .attr("cy", -r * Math.cos(a))
        .attr("r", 4)
        .attr("fill", colorScale(year))
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .append("title")
          .text(`${dayNames[d]}, ${year}: ${c.toLocaleString()} incidents`);
    });
  });


  const legend = svg.append("g")
    .attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);

  years.forEach((year, i) => {
    const item = legend.append("g")
      .attr("transform", `translate(0, ${i * 30})`)
      .style("cursor", "pointer");

    const rect = item.append("rect")
      .attr("width", 15).attr("height", 15)
      .attr("fill", colorScale(year))
      .attr("stroke", colorScale(year))
      .attr("stroke-width", 1);

    const txt = item.append("text")
      .attr("x", 25).attr("y", 12)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(year);

    item.on("click", () => {
      if (activeYears.has(year)) {
        if (activeYears.size === 1) return;
        activeYears.delete(year);
        rect.attr("fill-opacity", 0.3);
        txt.attr("font-weight", "normal");
      } else {
        activeYears.add(year);
        rect.attr("fill-opacity", 1);
        txt.attr("font-weight", "bold");
      }
      updateChart();
    });
  });

  legend.append("text")
    .attr("transform", `translate(0, -15)`)
    .attr("font-size", "10px")
    .attr("fill", "#666")
    .text("Click to toggle years");


  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Crime Patterns by Day of Week (2020–2023)");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "#666")
    .text("Distance from center represents number of incidents");

  return svg.node();
}


function _60(md){return(
md`#### Sub-Conclusion`
)}

function _61(md){return(
md`This visualization highlights consistent weekly crime patterns in Los Angeles from 2020 to 2023, with weekends—especially Saturdays—showing the highest incident counts. While weekday crime remains steady, 2020 saw a notable drop due to pandemic restrictions. Crime on weekends rebounded in later years, suggesting a return to pre-pandemic behaviors. The circular layout and interactive features provide an intuitive way to detect cyclical trends and compare yearly variations effectively.`
)}

function _62(md){return(
md`### Question 7: How did reporting times differ between crimes?`
)}

function _63(md){return(
md`This boxplot shows how long it takes for different crimes to be reported after they occur. It includes the top 10 most common crimes in the dataset. The boxplots display the interquartile range (IQR) with lines marking the 25th, 50th, and 75th percentiles. A logarithmic scale is used on the vertical axis because reporting times vary widely across crimes, and a linear scale made it difficult to compare crimes that are usually reported quickly (often within 2 days).

Key Observations
- more than 75% of the Battery, Intimate Assault, and Aggravated Assault cases were reported the day they occured. Thus, Q1, Q2, Q3, and the IQR were all 0.
- Most incidents of theft and burglary were reported within 2 days.
- Identity theft had the largest range in reporting time likely because victims may not immediately realize that their identity has been stolen.`
)}

function _64(md){return(
md`### Data Preprocessing
- The data was filtered to include only the top 10 most frequent crime types.
- The difference in days between the report date and occurrence date was computed.
- In order to plot the values using the logarithmic scale, 0s in the data were replaced with 0.1.`
)}

function _65(md){return(
md`### Design
- The horizontal axis shows the top 10 most frequent crimes.
- The vertical axis shows reporting delay in days using a logarithmic scale. The axis was adjusted to only show integers.
- The boxes and wiskers give a concise summary of the distributions in reporting time by crime.`
)}

function _66(d3,top10Crimes,delays_by_crime,crimeLabelMap)
{
const margin = { top: 50, right: 10, bottom: 50, left: 50 };
const width = 1000 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;


// outliers making plot unreadable
const maxReportingTime = 100

const reportingTimeScale = d3.scaleLog()
  .domain([0.1, maxReportingTime])
  .nice()
  .range([height- margin.bottom, margin.top])

const crimeScaleBand = d3.scaleBand()
    .domain(top10Crimes)
    .range([margin.left, width - margin.right])
    .padding(0.2)

const xAxis = d3.axisBottom(crimeScaleBand)
const yTicks = [1, 2, 5, 10, 50, 100]; 
const yAxis = d3.axisLeft(reportingTimeScale)
  .tickValues(yTicks)
  .tickFormat(d3.format("~s")); 

const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height]);
  
// boxplot stats
const boxData = Array.from(delays_by_crime, ([crime, values]) => {
  const delays = values.map(d => Math.max(0.1, Math.min(d.delay, maxReportingTime))).sort(d3.ascending);
  const q1 = d3.quantile(delays, 0.25);
  const median = d3.quantile(delays, 0.5);
  const q3 = d3.quantile(delays, 0.75);
  const iqr = q3 - q1;
  const min = d3.max([d3.min(delays), q1 - 1.5 * iqr]);
  const max = d3.min([d3.max(delays), q3 + 1.5 * iqr]);
  return { crime, q1, median, q3, min, max };
});

// add box plot
const boxWidth = crimeScaleBand.bandwidth() * 0.6;

svg.append('g')
  .selectAll('g')
  .data(boxData)
  .join('g')
  .attr('transform', d => `translate(${crimeScaleBand(d.crime)},0)`)
  .each(function(d) {
    const g = d3.select(this);
    
  // Whiskers
  g.append('line')
    .attr('x1', boxWidth/2 + 13)
    .attr('x2', boxWidth/2 + 13)
    .attr('y1', reportingTimeScale(d.min))
    .attr('y2', reportingTimeScale(d.max))
    .attr('stroke', 'black');

  // Box
  g.append('rect')
    .attr('x', (crimeScaleBand.bandwidth() - boxWidth) / 2)
    .attr('width', boxWidth)
    .attr('y', reportingTimeScale(d.q3))
    .attr('height', reportingTimeScale(d.q1) - reportingTimeScale(d.q3))
    .attr('fill', 'steelblue')
    .attr("stroke", "black");

  // Median
  g.append('line')
    .attr('x1', (crimeScaleBand.bandwidth() - boxWidth) / 2)
    .attr('x2', (crimeScaleBand.bandwidth() + boxWidth) / 2)
    .attr('y1', reportingTimeScale(d.median))
    .attr('y2', reportingTimeScale(d.median))
    .attr('stroke', 'black');
});

// axes
svg.append('g')
    .attr('transform', `translate(${margin.left})`)
    .call(yAxis)
  .append('text')
    .attr('fill', 'black')
    .attr('font-family', 'sans-serif')
    .attr('x', -20)
    .attr('y', height / 2)
    .text("Days");

svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(crimeScaleBand)
  .tickFormat(d => crimeLabelMap.get(d) || d))
  .append('text')
    .attr('fill', 'black')
    .attr('font-family', 'sans-serif')
    .attr('x', width / 2)
    .attr('y', 40)
    .text("Crimes");

svg.append("text")
  .attr("x", width / 2)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .attr("font-size", "18px")
  .attr("font-weight", "bold")
  .text("Reporting Time by Crime");

svg.append("text")
  .attr("x", width / 2)
  .attr("y", 45)
  .attr("text-anchor", "middle")
  .attr("font-size", "14px")
  .text("Days between Crime and Report");

  return svg.node();
  
}


function _67(md){return(
md`#### conclusion`
)}

function _68(md){return(
md`Crimes like Battery and Assault were typically reported immediately, while thefts were usually reported within two days. Identity theft showed the widest delay range due to delayed awareness by victims. Overall, most crimes were reported quickly, but reporting times varied significantly by crime type.`
)}

function _69(md){return(
md`## Final Conclusion
`
)}

function _70(md){return(
md`Our analysis of crime trends in Los Angeles from 2020 to 2023 reveals clear shifts in crime types, timing, and geographic distribution. Serious crimes like car theft and identity fraud have increased, while weekend crime remains consistently high. Central neighborhoods emerged as persistent hotspots, and spatial patterns show a divide between urban and suburban areas. These insights, supported by interactive visualizations, offer a valuable tool for guiding data-driven decisions in public safety planning and resource allocation across the city.`
)}

function _71(md){return(
md`## Apendix`
)}

function _72(md){return(
md`### Dataset Preprocessing`
)}

async function _inflate(){return(
(await import("https://cdn.skypack.dev/pako@2.1.0")).inflate
)}

function _Crime_data_from_2020_to_present(FileAttachment,inflate,d3){return(
FileAttachment("crime_data_filtered.csv.gz").arrayBuffer().then(buffer => {
  const decompressed = inflate(new Uint8Array(buffer));
  const text = new TextDecoder().decode(decompressed);
  return d3.csvParse(text, d => {
    const [year, month, day] = d['DATE OCC'].slice(0, 10).split('-').map(Number);
    d['DATE OCC'] = new Date(year, month - 1, day); 
    return d;
  });
})
)}

function _76(Crime_data_from_2020_to_present){return(
Crime_data_from_2020_to_present.forEach(d => {
  d['DATE OCC'] = new Date(d['DATE OCC']); 
  d['Date Rptd'] = new Date(d['Date Rptd']);
  d.monthYear = new Date(d['DATE OCC'].getFullYear(), d['DATE OCC'].getMonth());
})
)}

function _77(md){return(
md`### Q1 Preprocessing`
)}

function _crimeByMonth(d3,Crime_data_from_2020_to_present){return(
d3.rollups(
Crime_data_from_2020_to_present.filter(d => d['DATE OCC'] < new Date('2021-01-01')).sort((a, b) => b.monthYear - a.monthYear),
  a => d3.count(a, d => d.DR_NO),
  d => d.monthYear)
)}

function _79(md){return(
md`### Q2 Preprocessing`
)}

function _top10Crimes(d3,Crime_data_from_2020_to_present){return(
d3.rollups(
  Crime_data_from_2020_to_present, 
  a=> d3.count(a, d => d.DR_NO), 
  d => d['Crm Cd Desc'])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .map(d => d[0])
)}

function _crimeLabelMap(){return(
new Map([
  ["INTIMATE PARTNER - SIMPLE ASSAULT", "Intimate Assault"],
  ["VEHICLE - STOLEN", "Stolen Vehicle"],
  ["THEFT PLAIN - PETTY ($950 & UNDER)", "Petty Theft"],
  ["VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)", "Felony Vandalism"],
  ["BURGLARY", "Burglary"],
  ["THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)", "Petty Car Theft"],
  ["BURGLARY FROM VEHICLE", "Car Burglary"],
  ["BATTERY - SIMPLE ASSAULT", "Battery"],
  ["THEFT OF IDENTITY", "ID Theft"],
  ["ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT", "Aggravated Assault"]
])
)}

function _crimeColor(d3,top10Crimes){return(
d3.scaleOrdinal()
.domain(top10Crimes)
.range(d3.schemeCategory10)
)}

function _time_crime_grouped(d3,Crime_data_from_2020_to_present,top10Crimes){return(
d3.rollups(
Crime_data_from_2020_to_present
  .filter(d => top10Crimes.includes(d['Crm Cd Desc'])).sort((a, b) => b.monthYear - a.monthYear),
  a => d3.count(a, d => d.DR_NO),
  d => d['Crm Cd Desc'],
  d => d.monthYear)
)}

function _84(md){return(
md`### Q3 Preprocessing`
)}

function _grouped(d3,Crime_data_from_2020_to_present){return(
d3.rollups(
Crime_data_from_2020_to_present.sort((a, b) => b.monthYear - a.monthYear),
  a => d3.count(a, d => d.DR_NO),
  d => d['Part 1-2'],
  d => d.monthYear)
)}

function _severityColor(d3,grouped){return(
d3.scaleOrdinal()
.domain(grouped)
.range(d3.schemeTableau10)
)}

function _87(md){return(
md`### Q4 Preprocessing
`
)}

function _preprocessData(d3){return(
function preprocessData(crimeData, geoData) {
  const crimesByDistrict = d3.rollups(
    crimeData,
    v => v.length,
    d => +d["Rpt Dist No"],
    d => d["Crm Cd Desc"]
  );
  const crimeStatsByDistrict = new Map();
  crimesByDistrict.forEach(([rd, counts]) => {
    const total = d3.sum(counts, ([, n]) => n);
    const top = counts.sort((a, b) => b[1] - a[1]).slice(0, 5)
                      .map(([type, n]) => ({ 
                        type, 
                        count: n, 
                        percentage: (n/total*100).toFixed(1) 
                      }));
    crimeStatsByDistrict.set(rd, { totalCrimes: total, topCrimes: top });
  });
  const topCrimeTypes = Array.from(
      d3.rollup(crimeData, v => v.length, d => d["Crm Cd Desc"])
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([type]) => type);
  const mergedGeoData = {
    type: geoData.type,
    features: geoData.features
      .filter(f => +f.properties?.REPDIST > 0)
      .map(f => {
        const rd = +f.properties.REPDIST;
        const stats = crimeStatsByDistrict.get(rd);
        return {
          ...f,
          properties: {
            ...f.properties,
            reportingDistrict: rd,
            totalCrimes: stats?.totalCrimes ?? 0,
            topCrimes:   stats?.topCrimes   ?? []
          }
        };
      })
      .sort((a, b) => d3.geoArea(b) - d3.geoArea(a))
  };
  return { mergedGeoData, topCrimeTypes, crimeStatsByDistrict };
}
)}

function _geoData(FileAttachment){return(
FileAttachment("LAPD_Reporting_District@1.geojson").json()
)}

function _preprocessed(preprocessData,Crime_data_from_2020_to_present,geoData){return(
preprocessData(Crime_data_from_2020_to_present, geoData)
)}

function _91(md){return(
md`### Q7 Preprocessing`
)}

function _reporting_time_points(Crime_data_from_2020_to_present,top10Crimes){return(
Crime_data_from_2020_to_present 
  .filter(d => top10Crimes.includes(d['Crm Cd Desc']))
  .map(d => ({
    crime: d['Crm Cd Desc'],
    delay: (d['Date Rptd'] - d['DATE OCC']) / (24 * 60 * 60 * 1000)
  }))
)}

function _delays_by_crime(d3,reporting_time_points){return(
d3.group(reporting_time_points, d => d.crime)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["LAPD_Reporting_District@1.geojson", {url: new URL("./files/707ab995c3453111238f08d616b115fc3c1293ebd52ddf6c822862ddee669890628dd37c03b96b2964552bf336b304ed9e0f7bf2e7587cf8c4b97456747e335f.geojson", import.meta.url), mimeType: "application/geo+json", toString}],
    ["crime_data_filtered.csv.gz", {url: new URL("./files/04b5a588e37c47aabd94f0365ddd96c4b593ae63d2b79f7f0db7487e19c349a6b7ce3973cd537dec2661acaa0926b5eb3a6a1184c902bcfa0bfa3cab691a6522.gz", import.meta.url), mimeType: "application/gzip", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["d3","crimeByMonth"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof selectedCrimes")).define("viewof selectedCrimes", ["Inputs","time_crime_grouped","crimeColor","crimeLabelMap","html"], _selectedCrimes);
  main.variable(observer("selectedCrimes")).define("selectedCrimes", ["Generators", "viewof selectedCrimes"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","Crime_data_from_2020_to_present","time_crime_grouped","selectedCrimes","crimeColor"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("viewof q3")).define("viewof q3", ["html","grouped","d3","ResizeObserver"], _q3);
  main.variable(observer("q3")).define("q3", ["Generators", "viewof q3"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer("viewof q4")).define("viewof q4", ["preprocessData","Crime_data_from_2020_to_present","geoData","d3"], _q4);
  main.variable(observer("q4")).define("q4", ["Generators", "viewof q4"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("viewof q5")).define("viewof q5", ["Crime_data_from_2020_to_present","d3","html"], _q5);
  main.variable(observer("q5")).define("q5", ["Generators", "viewof q5"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer()).define(["md"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer()).define(["md"], _57);
  main.variable(observer()).define(["md"], _58);
  main.variable(observer()).define(["Crime_data_from_2020_to_present","d3"], _59);
  main.variable(observer()).define(["md"], _60);
  main.variable(observer()).define(["md"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer()).define(["md"], _64);
  main.variable(observer()).define(["md"], _65);
  main.variable(observer()).define(["d3","top10Crimes","delays_by_crime","crimeLabelMap"], _66);
  main.variable(observer()).define(["md"], _67);
  main.variable(observer()).define(["md"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer()).define(["md"], _70);
  main.variable(observer()).define(["md"], _71);
  main.variable(observer()).define(["md"], _72);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.import("Swatches", child1);
  main.variable(observer("inflate")).define("inflate", _inflate);
  main.variable(observer("Crime_data_from_2020_to_present")).define("Crime_data_from_2020_to_present", ["FileAttachment","inflate","d3"], _Crime_data_from_2020_to_present);
  main.variable(observer()).define(["Crime_data_from_2020_to_present"], _76);
  main.variable(observer()).define(["md"], _77);
  main.variable(observer("crimeByMonth")).define("crimeByMonth", ["d3","Crime_data_from_2020_to_present"], _crimeByMonth);
  main.variable(observer()).define(["md"], _79);
  main.variable(observer("top10Crimes")).define("top10Crimes", ["d3","Crime_data_from_2020_to_present"], _top10Crimes);
  main.variable(observer("crimeLabelMap")).define("crimeLabelMap", _crimeLabelMap);
  main.variable(observer("crimeColor")).define("crimeColor", ["d3","top10Crimes"], _crimeColor);
  main.variable(observer("time_crime_grouped")).define("time_crime_grouped", ["d3","Crime_data_from_2020_to_present","top10Crimes"], _time_crime_grouped);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("grouped")).define("grouped", ["d3","Crime_data_from_2020_to_present"], _grouped);
  main.variable(observer("severityColor")).define("severityColor", ["d3","grouped"], _severityColor);
  main.variable(observer()).define(["md"], _87);
  main.variable(observer("preprocessData")).define("preprocessData", ["d3"], _preprocessData);
  main.variable(observer("geoData")).define("geoData", ["FileAttachment"], _geoData);
  main.variable(observer("preprocessed")).define("preprocessed", ["preprocessData","Crime_data_from_2020_to_present","geoData"], _preprocessed);
  main.variable(observer()).define(["md"], _91);
  main.variable(observer("reporting_time_points")).define("reporting_time_points", ["Crime_data_from_2020_to_present","top10Crimes"], _reporting_time_points);
  main.variable(observer("delays_by_crime")).define("delays_by_crime", ["d3","reporting_time_points"], _delays_by_crime);
  return main;
}
