import React ,{ Component} from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 // all -1, active 1, disabled 0
        }
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName,
                            name === 'filterStatus' ? value : this.state.filterStatus
                        )
    }

  render() {
    const {filterName, filterStatus} = this.state
    return (
        <table className="table mt-4">
            <thead className="thead-dark">
            <tr>
                <th className = "column" scope="col">STT</th>
                <th className = "column" scope="col">Tên</th>
                <th className = "column" scope="col">Trạng thái</th>
                <th className = "column" scope="col">Hành động</th>
            </tr>
            </thead>
            <tbody>
            <tr className = "grey-light">
                <th className = "column">#</th>
                <td className = "column">
                    <input type="text" 
                        className="input-search-in-table" 
                        name = "filterName"
                        value = {filterName}
                        onChange = {this.onChange}
                    />
                </td>
                <td className = "column">
                    <div className="form-group">
                    <select 
                        className="form-control" 
                        name ="filterStatus"
                        onChange = {this.onChange}
                        value = {filterStatus}
                    >
                        <option value = {-1}>Tất cả</option>
                        <option value = {0}>Ẩn</option>
                        <option value ={1}>Kích hoạt</option>
                    </select>
                    </div>
                </td>
                <td className = "column"></td>
            </tr>
            <TaskItem 
                onUpdateStatus = {this.props.onUpdateStatus} 
                onDelete = {this.props.onDelete}
                onUpdate = {this.props.onUpdate}
            />
            </tbody>
        </table>  
    );
  }
}

export default TaskList;
