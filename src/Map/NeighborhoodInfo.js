import React, { Component } from 'react'
import Swal from 'sweetalert2'

class NeighborhoodInfo extends Component {

  showInfo = () => {
    return Swal.fire({
      title: this.props.neighborhood.NBRHD_NAME
    })
  }

  render() {
    return (
      <div>
      { this.showInfo() }
      </div>
    )
  }
}

export default NeighborhoodInfo


// <SweetAlert title={props.neighborhood.NBRHD_NAME} onConfirm={props.hideInfo}/>
