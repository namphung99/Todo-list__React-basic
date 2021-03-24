import React ,{ Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
           faSort, faCheck
        } 
from '@fortawesome/free-solid-svg-icons';



class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort:{
        by: 'name',
        value: 1
      }
    }
  }

  onClick = (sortBy, sortValue) =>{
    this.setState(state => {
        return{
          sort: {
            by: sortBy,
            value: sortValue,
          }
        }
    });
    this.props.onSort(sortBy, sortValue);
  }
  render() {
    const {sort} = this.state;
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <FontAwesomeIcon icon={faSort} className = "btn-icon" />
                Sắp xếp
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item sort_selected" 
                  role= "button"
                  onClick = {() => this.onClick('name',1)}
                >
                  A - Z 
                  {(sort.by === 'name' && sort.value === 1) ?
                  <FontAwesomeIcon icon={faCheck} className = "btn-icon ml-2" />
                  : ''}</a>
                <a className="dropdown-item sort_selected" 
                  role= "button"
                  onClick = {() => this.onClick('name',-1)}
                >
                  Z - A 
                  {(sort.by === 'name' && sort.value === -1) ?
                  <FontAwesomeIcon icon={faCheck} className = "btn-icon ml-2" />
                  : ''}</a>
                <a className="dropdown-item sort_selected" 
                  role= "button"
                  onClick = {() => this.onClick('status',-1)}
                >
                  Trạng thái ẩn 
                  {(sort.by === 'status' && sort.value === -1) ?
                  <FontAwesomeIcon icon={faCheck} className = "btn-icon ml-2" />
                  : ''}</a>
                <a className="dropdown-item sort_selected" 
                  role= "button"
                  onClick = {() => this.onClick('status',1)}
                >
                  Trạng thái kích hoạt 
                  {(sort.by === 'status' && sort.value === 1) ?
                  <FontAwesomeIcon icon={faCheck} className = "btn-icon ml-2" />
                  : ''}</a>
            </div>
        </div>
    );
  }
}

export default Sort;
