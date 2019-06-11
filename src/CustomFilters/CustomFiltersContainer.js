import React from "react";
import CustomFilter from './CustomFilter'
import { population_filter, over65_filter, under18_filter } from '../Filters'

const CustomFiltersContainer = (props) => {



  return (
    <div id="custom-filters-container">
      <CustomFilter filter={population_filter.ranges} name={population_filter.title}/>
      <CustomFilter filter={over65_filter.ranges} name={over65_filter.title}/>
      <CustomFilter filter={under18_filter.ranges} name={under18_filter.title}/>
    </div>
  )

}

export default CustomFiltersContainer
