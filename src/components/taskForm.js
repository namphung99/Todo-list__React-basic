import React ,{ Component} from 'react';
import {ItemContext} from '../contexts/ItemProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimesCircle, faPlus, faWindowClose,
  } 
from '@fortawesome/free-solid-svg-icons';



class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            status: true,
        };
        this.onHandleChange= this.onHandleChange.bind(this);
        this.onHandleSubmit= this.onHandleSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    onHandleChange(e){
        const target = e.target;
        const name = target.name;
        let value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }

        this.setState({
            [name]: value
        })
    }

    onHandleSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state);
        // clear form
        this.onClear();
    }

    onClear(){
        this.setState({
            name: '',
            status: false,
        })
    }

    // Editting
    componentWillMount(){
        const {task} = this.props;
        if(task){
            this.setState({
                id: task.id,
                name: task.name,
                status: task.status,
    
            })
        }
    }

    // edit sau khi mo addItem
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
    
            })
        }
        else if(!nextProps.task){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

  render() {
    return ( 
        
                <div className="task-form">

                    <div className="task-form_header">
                        <span>
                            {this.state.id ? 'Sửa công việc':'Thêm công việc' }
                        </span>
                        {
                            <ItemContext.Consumer>
                            {({changeDisplayForm}) => (
                                <div className="close-todo-list">
                                    <FontAwesomeIcon 
                                        icon={faTimesCircle} 
                                        className = "close-todo-list-icon" 
                                        onClick={() => changeDisplayForm() } 
                                    />
                                </div>
                            )}
                            </ItemContext.Consumer>
                        }

                        
                    </div>
        
                    <div className="task-form_body">
                        <form onSubmit = {this.onHandleSubmit}>
                            <div className="form-group">
                            <label htmlFor="name">Tên:</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name = "name" 
                                value = {this.state.name}
                                onChange={this.onHandleChange}
                            />
                            </div>
                            <div className="form-group">
                                <label>Trạng thái:</label>
                                <select 
                                    className="form-control" 
                                    name = 'status'
                                    onChange = {this.onHandleChange}
                                    value = {this.state.status}
                                >
                                    <option value = {false}>Ẩn</option>
                                    <option value = {true}>Kích hoạt</option>
                                </select>
                            </div>
                            <div className="button-side">
                                <button 
                                    onClick ={this.onHandleSubmit} 
                                    type="submit" 
                                    className="btn btn-info button-side-btn"
                                >
                                    <FontAwesomeIcon icon={faPlus} className = "btn-icon" />
                                    Lưu lại
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger button-side-btn"
                                    onClick={this.onClear}
                                >
                                    <FontAwesomeIcon icon={faWindowClose} className = "btn-icon" />
                                    Hủy bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    
    );
  }
}

export default TaskForm;
