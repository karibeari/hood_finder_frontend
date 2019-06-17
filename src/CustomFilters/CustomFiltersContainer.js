import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { population_filter, over65_filter, under18_filter } from '../Filters'
import RangeSlider from './RangeSlider'

import FindMatchButton from './FindMatchButton'
import './CustomFilters.css'

import _ from 'lodash'

const allFilters = [population_filter, over65_filter, under18_filter]

const getItems = () =>
  Array.from(allFilters, filter => filter).map((filter, index) => ({
    id: filter.title.toLowerCase().split(' ').join('_'),
    content: filter.title,
    ranges: filter.ranges,
    title: filter.title,
    max: _.takeRight(filter.limits)
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid / 2,
  margin: `0 0 ${grid}px 0`,
  borderRadius: '10px',
  border: '2px solid #3866a3',
  color: '#14396a',
	fontFamily: 'Arial',
	fontSize: '15px',
	fontWeight: 'bold',
  background: isDragging ? "grey" : "#44A1A0",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#D9DCDD",
  padding: "5%"
})

export default class CustomFiltersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems()
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({ items })

    this.props.setPriority(items)
  }

  displayRangeSliders = (allFilters) => {
    allFilters.map(filter => <RangeSlider
        filter={filter.ranges}
        name={filter.title}
        setCustomFilters={ this.props.setCustomFilters }
        max={ _.takeRight(filter.limits) }
      />)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <h3 className="filter-header">{item.content}</h3>
                      <RangeSlider
                        filter={item.ranges}
                        name={item.title}
                        setCustomFilters={ this.props.setCustomFilters }
                        max={ item.max }/>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <FindMatchButton
                customFilters={ this.props.customFilters }
                showCustomFilterView={ this.props.showCustomFilterView }
                getNeighborhoodMatches={ this.props.getNeighborhoodMatches }
              />
            </div>
          )}
        </Droppable>

      </DragDropContext>
    );
  }
}
