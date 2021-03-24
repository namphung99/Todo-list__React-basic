import React ,{ Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
          faTrash,faPencilAlt
        } 
from '@fortawesome/free-solid-svg-icons';
import {ItemContext} from '../contexts/ItemProvider';

class TaskItem extends Component {

  onUpdateStatus(task){
    this.props.onUpdateStatus(task);
  }

  onDelete(task){
    this.props.onDelete(task.id);
  }

  onUpdate(task){
    this.props.onUpdate(task);
  }
  render() {
    return (
        <ItemContext.Consumer>
          {({tasks, filter, keyword,sortBy, sortValue}) =>{
            if(filter){
              console.log(filter)
              if(filter.name){
                tasks = tasks.filter((task)=>{
                  return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
                })
              }
              tasks = tasks.filter((task) => {
                if(filter.status === -1){ // get all
                  return task
                }
                else {
                  return task.status === (filter.status === 1 ? true : false)
                }
              })
            }
            if(keyword){
              tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
              })
            }
            if(sortBy === 'name'){
              tasks.sort((a,b) => {
                if(a.name.toLowerCase() > b.name.toLowerCase()) return sortValue;
                else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sortValue;
                else return 0;
              })
            }
            else{
              tasks.sort((a,b) => {
                if(a.status >b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
              })
            }
            return tasks.map((task,index) => 
              <tr key={index}>
                <th className = "column">{index + 1}</th>
                <td className = "column">{task.name}</td>
                <td className = "column">
                  <button type="button" 
                    className={task.status?"btn btn-success":"btn btn-disable"}
                    onClick={() => this.onUpdateStatus(task)}
                  >
                    {task.status?'Kích hoạt': 'Ẩn'}
                  </button> 
                </td>
                <td className = "column">
                <button 
                  type="button" 
                  className="btn btn-danger mr-2"
                  onClick = {() => this.onDelete(task)}
                >
                    <FontAwesomeIcon icon={faTrash} className = "btn-icon" />
                    Xóa
                </button>
                <button 
                  type="button" 
                  className="btn btn-warning"
                  onClick = {() => this.onUpdate(task)}
                >
                    <FontAwesomeIcon icon={faPencilAlt} className = "btn-icon" />
                    Sửa
                </button>
                </td>
              </tr>
            )
          }}
        </ItemContext.Consumer>
            
    );
  }
}

export default TaskItem;
