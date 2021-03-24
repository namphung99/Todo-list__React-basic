import React from 'react';
import {findIndex} from 'lodash';

export const ItemContext = React.createContext();

export class ItemProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isDisplayForm:false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sortBy:'name',
            sortValue: 1
        };
        this.onRender = this.onRender.bind(this);
        this.changeDisplayForm = this.changeDisplayForm.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        
    }

    // Hien thi danh sach

    onRender(){
        const tasks = [
            {
                id: this.generateID(),
                name:"eat lunch",
                status: true
            },
            {
                id: this.generateID(),
                name:"play game",
                status: false
            },
            {
                id: this.generateID(),
                name:"code ReactJS",
                status: true
            },
        ];

        this.setState({
            tasks: tasks,
        });

        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    // random ID
    Random(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID(){
        return 'NP'+ '-' + this.Random() + '-' + this.Random() + '-' + this.Random();
    }

    // set tasks tai localStorage vao task
    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')){
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            })
        }
    }

    // an hien form
    changeDisplayForm(){
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm: true,
                taskEditing:null,
            })
        }
        else{
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing:null,
            })
        }
    }

    // Create
    onHandleSubmit(task){
        const {tasks} = this.state;
        if(task.id === ''){
            task.id = this.generateID();
            tasks.push(task);
        }
        else{
            const id = task.id;
            const index = findIndex(tasks,(task)=>{
                return task.id === id;
            });
            console.log("index is: ", index);
            
            if(index !== -1 ){
                tasks[index] = task;
            }
        }
        this.setState({
            tasks: tasks,
            taskEditing:null,
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // update status
    onUpdateStatus(task){
        let {tasks} = this.state;
        const id = task.id
        const index = findIndex(tasks,(task)=>{
            return task.id === id;
        })
        if(index !== -1 ){
            tasks[index].status = !tasks[index].status;
            this.setState(state =>{
                return{
                    tasks: tasks
                }
            });
        }
        console.log(tasks);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    // Delete Item

    onDelete = (id) => {
        let {tasks} = this.state;
        const index = findIndex(tasks,(task)=>{
            return task.id === id;
        })
        if(index !== -1 ){
            tasks.splice(index, 1);
            this.setState(state =>{
                return{
                    tasks: tasks
                }
            });
        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
        this.changeDisplayForm();
    }

    // Update Item
    onUpdate = (task) =>{   
        this.onshowForm();
        this.setState({
            taskEditing: task
        });                
    }

    onshowForm = () =>{
        this.setState({
            isDisplayForm: true
        })
    }

    //filter name

    onFilter = (filterName,filterStatus) =>{
        
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter: {
                name : filterName,
                status : filterStatus
            }
        })
    }

    // Search

    onSearch = (keyword) =>{
        this.setState({
            keyword: keyword
        })
    }

    onSort = (sortBy, sortValue) =>{
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }

    render() {
        const {tasks} = this.state;
        return (
            <ItemContext.Provider
                value = {
                    {
                        onRender : this.onRender,
                        tasks:tasks,
                        isDisplayForm:this.state.isDisplayForm,
                        changeDisplayForm: this.changeDisplayForm,
                        onHandleSubmit: this.onHandleSubmit,
                        onUpdateStatus: this.onUpdateStatus,
                        onDelete:this.onDelete,
                        onUpdate: this.onUpdate,
                        taskEditing: this.state.taskEditing,
                        onFilter: this.onFilter,
                        filter: this.state.filter,
                        onSearch: this.onSearch,
                        keyword: this.state.keyword,
                        onSort: this.onSort,
                        sortBy: this.state.sortBy,
                        sortValue: this.state.sortValue
                    }
                }
            >
                {this.props.children}
            </ItemContext.Provider>
        )
    }
}