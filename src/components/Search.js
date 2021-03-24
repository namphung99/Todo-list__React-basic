import React ,{ Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
            faSearch,
        } 
from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword:''
    }
  }

  onChange= (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword)
  }

  render() {
    const {keyword} = this.state;
    return (
        <form>
            <input type="text" 
              className="input-search" 
              name = "todo-name" 
              placeholder="Nhập từ khóa..." 
              name ='keyword'
              value = {keyword}
              onChange={this.onChange}
            />
            <button 
              type="button" 
              className="btn btn-primary search-btn"
              onClick={this.onSearch}
              
            >
                <FontAwesomeIcon icon={faSearch} className = "btn-icon" />
                Search
            </button>
        </form>     
    );
  }
}

export default Search;
