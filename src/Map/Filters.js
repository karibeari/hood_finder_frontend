const population_filter = {
  title: "Population",
  colors: ["#b3cde3", "#8c96c6", "#8856a7", "#810f7c"],
  ranges: ["0-5000", "5001 - 10,000", "10,001 - 15,000", "over 15,000"],
  limits: [5000, 10000, 15000]
}

const over65_filter = {
  title: "Percent Over 65",
  colors: ["#b2e2e2", "#66c2a4", "#238b45"],
  ranges: ["0% - 10%", "11% - 20%", "over 20%"],
  limits: [10, 20]
}

const under18_filter = {
  title: "Percent Under 18",
  colors: ["#bae4bc", "#7bccc4", "#43a2ca", "#0868ac"],
  ranges: ["0% - 10%", "11% - 20%", "21% - 30%", "over 30%"],
  limits: [10, 20, 30]
}


export { population_filter }
export { over65_filter }
export { under18_filter }
