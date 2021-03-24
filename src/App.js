import React ,{ Component} from 'react';
import {ItemProvider} from '../src/contexts/ItemProvider';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
          faPlus,
        } 
from '@fortawesome/free-solid-svg-icons';

import TaskForm from './components/taskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

import {ItemContext }from '../src/contexts/ItemProvider';



class App extends Component {
  render() {
    return (
      <ItemProvider>
        <ItemContext.Consumer>
          {({onRender,isDisplayForm, 
            changeDisplayForm,
            onHandleSubmit,
            onUpdateStatus,
            onDelete, onUpdate,
            taskEditing,onFilter,sortBy, sortValue
          }) => (
              <div className="app">
              <div className="header mt-5">
                <span className= "header_title">QUẢN LÝ CÔNG VIỆC</span>
              </div>
    
              <div className="container mt-4">
                <div className="row">
                  <div className="col-md-4 col-lg-4">
    
                    {/* form todo list : handle add and update */}
                    { isDisplayForm ? 
                      <TaskForm 
                        onSubmit = {onHandleSubmit}
                        task = {taskEditing}
                      /> 
                      : '' 
                    }
                  </div>
    
                  <div className={isDisplayForm? 'col-md-8 col-lg-8' : 'col-md-12 col-lg-12'}>
    
                    {/* list render */}
                    <div className="list-todo-list">
                      <div className="add-todo">
                        <button 
                          type="button" 
                          className="btn btn-primary mr-2"
                          onClick = {()=> changeDisplayForm()}
                        >
                          <FontAwesomeIcon icon={faPlus} className = "btn-icon" />
                          Thêm công việc  
                        </button>

                        <button type="button" className="btn btn-info" onClick={onRender}>
                          <FontAwesomeIcon icon={faPlus} className = "btn-icon" />
                          Generate data  
                        </button>
          
                      </div>
    
                      <div className="row">
                        <div className={isDisplayForm? 'col-md-10 col-lg-10' : 'col-md-12 col-lg-12'}>
                          <Control />
                        </div>
                      </div>
    
                      <TaskList 
                        onUpdateStatus = {onUpdateStatus}
                        onDelete = {onDelete}
                        onUpdate = {onUpdate}
                        onFilter = {onFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }
        </ItemContext.Consumer>
      </ItemProvider>
    );
  }
}

export default App;
