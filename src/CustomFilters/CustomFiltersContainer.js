import React from "react";
import _ from 'lodash'
import CustomFilter from './CustomFilter'
import FindMatchButton from './FindMatchButton'
import DraggableFiltersContainer from './DraggableFiltersContainer'
import './CustomFilters.css'
import { population_filter, over65_filter, under18_filter } from '../Filters'
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


const CustomFiltersContainer = (props) => {

  return (
    <div id="custom-filters-container">
      <DraggableFiltersContainer setPriority={ props.setPriority }/>
    </div>
  )

}

export default CustomFiltersContainer


// <CustomFilter filter={population_filter.ranges} name={population_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(population_filter.limits) }/>
// <CustomFilter filter={over65_filter.ranges} name={over65_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(over65_filter.limits) } />
// <CustomFilter filter={under18_filter.ranges} name={under18_filter.title} setCustomFilters={ props.setCustomFilters } max={ _.takeRight(under18_filter.limits) } />
// <FindMatchButton customFilters={ props.customFilters } showCustomFilterView={ props.showCustomFilterView } customNeighborhoods={ props.customNeighborhoods }/>
