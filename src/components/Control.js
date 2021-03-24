import React ,{ Component} from 'react';

import Search from "./Search";
import Sort from "./Sort";
import {ItemContext} from "../contexts/ItemProvider";


class Control extends Component {
  render() {
    return (
        <ItemContext.Consumer>
          {({onSearch,onSort}) => 
            <div className="control-todo">
              <Search onSearch = {onSearch}/>
              <Sort onSort = {onSort}/>
            </div>}
        </ItemContext.Consumer>
                 

    );
  }
}

export default Control;
