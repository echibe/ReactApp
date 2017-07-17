import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'

export class Table extends React.Component {

   constructor(props) {
      super(props);
      this.state= {
        mro: '',
        filterText: '',
        found: true,
        currentPage: 1,
        acPerPage: 10,
        elements: [
          {ID: 0, Tail: 'N123', Nose: '123', MRO: 'Wizard'},
          {ID: 1, Tail: 'N456', Nose: '456', MRO: 'Trax'},
          {ID: 2, Tail: 'N789', Nose: '123', MRO: 'MTX'},
          {ID: 3, Tail: 'N1234', Nose: '1234', MRO: 'Wizard'},
          {ID: 4, Tail: 'N5678', Nose: '5678', MRO: 'Trax'},
          {ID: 5, Tail: 'N9123', Nose: '9123', MRO: 'MTX'},
          {ID: 6, Tail: 'N78678', Nose: '123', MRO: 'Wizard'},
          {ID: 7, Tail: 'N25235', Nose: '456', MRO: 'Trax'},
          {ID: 8, Tail: 'N4754', Nose: '123', MRO: 'MTX'},
          {ID: 9, Tail: 'N2958', Nose: '1234', MRO: 'Wizard'},
          {ID: 10, Tail: 'N19792', Nose: '5678', MRO: 'Trax'},
          {ID: 11, Tail: 'N32200', Nose: '9123', MRO: 'MTX'},
          {ID: 12, Tail: 'N12353', Nose: '123', MRO: 'Wizard'},
          {ID: 13, Tail: 'N44356', Nose: '456', MRO: 'Trax'},
          {ID: 14, Tail: 'N7849', Nose: '123', MRO: 'MTX'},
          {ID: 15, Tail: 'N1334', Nose: '1234', MRO: 'Wizard'},
          {ID: 16, Tail: 'N2842', Nose: '5678', MRO: 'Trax'},
          {ID: 17, Tail: 'N9372', Nose: '9123', MRO: 'MTX'},
          {ID: 18, Tail: 'N3521', Nose: '123', MRO: 'Wizard'},
          {ID: 19, Tail: 'N26322', Nose: '456', MRO: 'Trax'},
          {ID: 20, Tail: 'N57574', Nose: '123', MRO: 'MTX'},
          {ID: 21, Tail: 'N292', Nose: '1234', MRO: 'Wizard'},
          {ID: 22, Tail: 'N197', Nose: '5678', MRO: 'Trax'},
          {ID: 23, Tail: 'N3225', Nose: '9123', MRO: 'MTX'},
          {ID: 24, Tail: 'N19792', Nose: '5678', MRO: 'Trax'},
          {ID: 25, Tail: 'N32200', Nose: '9123', MRO: 'MTX'},
          {ID: 26, Tail: 'N12353', Nose: '123', MRO: 'Wizard'},
          {ID: 27, Tail: 'N44356', Nose: '456', MRO: 'Trax'},
          {ID: 28, Tail: 'N7849', Nose: '123', MRO: 'MTX'},
          {ID: 29, Tail: 'N1334', Nose: '1234', MRO: 'Wizard'},
          {ID: 30, Tail: 'N2842', Nose: '5678', MRO: 'Trax'},
          {ID: 31, Tail: 'N9372', Nose: '9123', MRO: 'MTX'},
          {ID: 32, Tail: 'N3521', Nose: '123', MRO: 'Wizard'},
          {ID: 33, Tail: 'N26322', Nose: '456', MRO: 'Trax'},
          {ID: 34, Tail: 'N57574', Nose: '123', MRO: 'MTX'},
          {ID: 35, Tail: 'N292', Nose: '1234', MRO: 'Wizard'},
          {ID: 36, Tail: 'N197', Nose: '5678', MRO: 'Trax'},
          {ID: 37, Tail: 'N3225', Nose: '9123', MRO: 'MTX'},
        ]
      }
      this.saveSelection = this.saveSelection.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
   };

   handleEdit(event){
     console.log("handleEdit");
     var selectElement = document.getElementById("MRO"+event.target.getAttribute("id"));

     if(selectElement.hasAttribute("disabled")){
       //Change edit button to save button
       event.target.textContent = "Save";
       event.target.className += " btn-success";
       selectElement.removeAttribute("disabled");
     }
     else{
       //Change Save button to edit button
       this.saveSelection(event);
       event.target.textContent = "Edit";
       event.target.className = "btn btn-default edit";
       selectElement.setAttribute("disabled", "disabled");
     }
   }

   saveSelection(event){
      console.log('saveSelection');
      console.log(event.target);
      console.log("Value: " + event.target.getAttribute("value"));
      const target = event.target;
      const value =  target.value;
      const name = target.name;
      console.log(this.state.mro);
   }

   handleInputChange(event) {
      console.log('handleInputChange');
      const value =  event.target.value;
      this.state.elements[event.target.getAttribute("id").slice(3)].MRO = value;
      this.setState({
        [name]: value
      });
   }

   handleSearchChange(event) {
      console.log('handleSearchChange');
      this.state.filterText = event.target.value;
      console.log(this.state.filterText);
      this.forceUpdate();
   }

   handlePageChange(event){
     console.log('handlePageChange');
     this.state.currentPage = Number(event.target.getAttribute("value"));
     this.forceUpdate();
   }

   render() {
     var filteredElements = [];


     //Filter the elements based on tail number
     for(var i = 0; i<this.state.elements.length; i++){
       if((this.state.elements[i].Tail.toUpperCase().includes(this.state.filterText.toUpperCase())) || (this.state.elements[i].MRO.toUpperCase().includes(this.state.filterText.toUpperCase()))){
         filteredElements.push(this.state.elements[i]);
       }
     }

     //Calulate number of pages needed
     var numPages = Math.ceil(filteredElements.length / this.state.acPerPage);

     //Generate the HTML elements for pagination
     var pages = [];
     for(var i = 0; i < numPages; i++){
       pages.push(<li className="page-item" key={i+1} ><a className="page-link" onClick={this.handlePageChange} value = {i+1}>{i+1}</a></li>);
     }

     //Check to make sure there are results, if not display an error
     if(filteredElements.length === 0){
       this.state.found=false;
     }
     else{
       this.state.found=true;
     }

     const listItems = filteredElements
                      .map((e) => <tr key={e.ID}>
                        <th scope="row">{e.ID}</th>
                          <td>{e.Tail}</td>
                          <td>{e.Nose}</td>
                          <td>
                            <select id = {"MRO"+e.ID} value={e.MRO} name='mro' className = 'form-control editable' onChange={this.handleInputChange} disabled>
                              <option value='' disabled>MRO</option>
                              <option value="Wizard">Wizard</option>
                              <option value="Trax">Trax</option>
                              <option value="MTX">MTX</option>
                            </select>
                          </td>
                          <td className="td-edit-save">
                            <button id = {e.ID} className="btn btn-default edit" type="submit" onClick = {this.handleEdit} value="Edit">Edit</button>
                          </td>

                      </tr>
                    )

      // Logic for displaying current aircraft
         const indexOfLastAC = this.state.currentPage * this.state.acPerPage;
         const indexOfFirstAC = indexOfLastAC - this.state.acPerPage;
         const currentACs = listItems.slice(indexOfFirstAC, indexOfLastAC);

      return (
        <div className = "container-fluid col-sm-8 col-xs-12">
            <div className="col-xs-10 input-group ">
                <div className="input-group-addon">Search</div>
                <input className="form-control" type="text" placeholder="Search by tail number or MRO" value={this.props.filterText} ref="filterTextInput" onChange={this.handleSearchChange}></input>
            </div>

          <table className="table table-hover table-condensed">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tail</th>
                <th>Nose</th>
                <th>MRO</th>
                <th>Edit</th>
              </tr>
            </thead>
              <tbody>
                {currentACs}
              </tbody>
          </table>
          {!this.state.found ?
            <div className="alert alert-warning" role="alert">No results found.</div> : ''}

            <ul className="pagination">
              {pages}
            </ul>

        </div>
      );
   }
}

export default Table;
