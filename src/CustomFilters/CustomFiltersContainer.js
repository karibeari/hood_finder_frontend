import React from "react";
import _ from 'lodash'
import CustomFilter from './CustomFilter'
import FindMatchButton from './FindMatchButton'
import { population_filter, over65_filter, under18_filter } from '../Filters'


const CustomFiltersContainer = (props) => {

  return (
    <div id="custom-filters-container">
      <CustomFilter filter={population_filter.ranges} name={population_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(population_filter.limits) }/>
      <CustomFilter filter={over65_filter.ranges} name={over65_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(over65_filter.limits) } />
      <CustomFilter filter={under18_filter.ranges} name={under18_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(under18_filter.limits) } />
      <FindMatchButton customFilters={ props.customFilters } showCustomFilterView={ props.showCustomFilterView } customNeighborhoods={ props.customNeighborhoods }/>
    </div>
  )

}

export default CustomFiltersContainer
