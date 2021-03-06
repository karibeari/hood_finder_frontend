const clear_filter = {
  id: 'noFilter',
  title: 'Clear All Filters'
}

const population_filter = {
  id: 'population',
  title: "Population",
  dataName: 'POPULATION_2010',
  colors: ["#b3cde3", "#8c96c6", "#8856a7", "#810f7c", "#810f7c", "#810f7c", "#810f7c", "#810f7c", "#810f7c", "#810f7c"],
  ranges: ["0-5000", "5001 - 10,000", "10,001 - 15,000", "over 15,000"],
  limits: [5000, 10000, 15000, 20000, 25000, 30000, 35000]
}

const over65_filter = {
  id: 'over65',
  title: "Percent Over 65",
  dataName: 'PCT_65_PLUS',
  colors: ["#b2e2e2", "#66c2a4", "#238b45", "#238b45", "#238b45", "#238b45", "#238b45", "#238b45", "#238b45", "#238b45"],
  ranges: ["0% - 10%", "11% - 20%", "over 20%"],
  limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

const under18_filter = {
  id: 'under18',
  title: "Percent Under 18",
  dataName: 'PCT_LESS_18',
  colors: ["#bae4bc", "#7bccc4", "#43a2ca", "#0868ac", "#0868ac", "#0868ac", "#0868ac", "#0868ac", "#0868ac", "#0868ac"],
  ranges: ["0% - 10%", "11% - 20%", "21% - 30%", "over 30%"],
  limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

const zestimate_filter = {
  id: 'zestimate',
  title: "Median Home Value",
  dataName: 'zestimate',
  colors: ["#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b", "#034e7b", "#034e7b", "#034e7b", "#034e7b", "#034e7b"],
  ranges: ["$0 - $300,000", "$300,001 - $400,000", "$400,001 - $500,000", "$500,001 - $600,000", "over $600,000"],
  limits: [300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000]
}

const custom_filter = {
  id: 'custom',
  title: "Your Match",
  dataName: 'match_score',
  colors: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#d9ef8b", "#a6d96a", "#66bd63","#1a9850", "#006837"],
  ranges: ["0% - 10%", "11% - 20%", "21% - 30%", "31% - 40%", "41% - 50%", "51% - 60%", "61% - 70%", "71% - 80%", "81% - 90%", "91% - 100%"],
  limits: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}

const filters = [clear_filter, population_filter, over65_filter, under18_filter, zestimate_filter]


export { clear_filter }
export { population_filter }
export { over65_filter }
export { under18_filter }
export { custom_filter }
export { zestimate_filter }
export { filters }
