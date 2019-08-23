import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { population_filter, over65_filter, under18_filter, zestimate_filter } from '../Filters'
import CheckboxContainer from './CheckboxContainer'
import FindMatchButton from './FindMatchButton'
import _ from 'lodash'
import './UserPrefs.css'

const allFilters = [population_filter, over65_filter, under18_filter, zestimate_filter]

const getItems = () =>
  Array.from(allFilters, filter => filter).map((filter, index) => ({
    id: filter.title.toLowerCase().split(' ').join('_'),
    content: filter.title,
    ranges: filter.ranges,
    title: filter.title,
    max: _.takeRight(filter.limits)[0]
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
  width: '100%',
  background: isDragging ? "grey" : "#44A1A0",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  backgroundImage: "linear-gradient(#6CAAD1, #FF9585)",
  padding: "5%",
  overflow: "auto"
})

export default class UserPrefsContainer extends Component {
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
            <p>Drag and drop each filter in order of highest to lowest priority.  Then, select your preferrable ranges.</p>
            <h1>Higher Priority</h1>
              {this.state.items.map((item, index) => (
                <div className="priority" key={item.id}>
                <Draggable draggableId={item.id} index={index}>
                <Draggable  draggableId={item.id} index={index}>
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
                      <CheckboxContainer
                        name={item.id}
                        max={item.max}
                        filter={item}
                        setCustomFilters={ this.props.setCustomFilters }
                        clearCustomFilters={ this.props.clearCustomFilters }
                      />
                    </div>
                  )}
                </Draggable>
              </div>
              ))}
              <h1>Lower Priority</h1>
              {provided.placeholder}
              <FindMatchButton
                userPrefs={ this.props.userPrefs }
                setActiveFilter={ this.props.setActiveFilter }
                getNeighborhoodMatches={ this.props.getNeighborhoodMatches }
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
