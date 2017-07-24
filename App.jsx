import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from './Table.jsx';
import {Router, Route, Link, browserHistory, IndexRoute} from 'react-router'

//Test

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor");

        var tempElements = props.elements;

        this.state = {
            tail: '',
            nose: '',
            mro: '',
            list: [],
            error: {
                tail: false,
                nose: false,
                nosemsg: 'This field is required',
                tailmsg: 'This field is required',
                mro: false
            },
            success: false,
            successMsg: "Successfully entered aircraft!",
            mroTable: '',
            filterText: '',
            found: true,
            alreadyExists: false,
            currentPage: 1,
            acPerPage: 20,
            //Dummy data
            elements: []
        }

        for (var i = 0; i < tempElements.length; i++) {
            this.state.elements.push(tempElements[i]);
        }

        this.saveSelection = this.saveSelection.bind(this);
        this.handleInputChangeTableSelect = this.handleInputChangeTableSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleAcPerPageChange = this.handleAcPerPageChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.pushPlane = this.pushPlane.bind(this);
        this.test = Table.testFunc;
        this.handleInputChangeTableTail = this.handleInputChangeTableTail.bind(this);
        this.handleInputChangeTableNose = this.handleInputChangeTableNose.bind(this);
    };

    //Triggered when a user changes input data in the form
    handleInputChange(event) {
        console.log('handleInputChange');
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

        //Run the tail number on the validator and check existing aircraft mappings
        if (name === "tail") {
            this.validateInput(value);
            this.checkIfExists(value, this.state.nose);
        }
        else if(name=== "nose"){
            this.checkIfExists(this.state.tail, value);
        }
    }

    handleInputChangeTableTail(event){
      console.log("handleInputChangeTableTail");
      const value = event.target.value;
      var reg = /[^A-Za-z0-9 ]/;
      for(var i = 0; i<this.state.elements.length; i++){
        if(this.state.elements[i].ID == event.target.getAttribute("id").slice(1)){
          var tailElement = document.getElementById('T'+i.toString());
          var submitButton = document.getElementById(i.toString());
          //validate the new tail number
          if(value.length < 2 || value.length > 6 || value.length==0 || reg.test(value) || value[0].toUpperCase()!='N'){
            submitButton.setAttribute("disabled", "disabled");
            tailElement.className += " error";
          }
          else{
            //Validated
            submitButton.removeAttribute("disabled");
            tailElement.className = "form-control";
          }

          this.state.elements[i].Tail = value.toUpperCase();
        }
      }

      this.forceUpdate();
    }

    handleInputChangeTableNose(event){
      console.log("handleInputChangeTableNose");
      const value = event.target.value;
      for(var i = 0; i<this.state.elements.length; i++){
        if(this.state.elements[i].ID == event.target.getAttribute("id").slice(1)){
          this.state.elements[i].Nose = value;
        }
      }
      this.forceUpdate();
    }

    handleInputChangeTableSelect(event) {
        console.log('handleInputChangeTableSelect');
        const value = event.target.value;
        for(var i = 0; i<this.state.elements.length; i++){
          if(this.state.elements[i].ID == event.target.getAttribute("id").slice(3)){
            this.state.elements[i].MRO = value;
          }
        }
        this.forceUpdate();
    }

    //Reset the form data, errors, and submit button
    clearInput() {
        console.log('clearing input');
        this.setState({tail: '', nose: '', mro: ''});
        this.state.success = false;
        this.state.error.tail = false;
        this.state.error.nose = false;
        this.state.error.mro = false;
        this.state.alreadyExists = false;
        this.forceUpdate();
        return;
    }

    validateInput(value) {
        console.log('validateInput');
        var tail = value;
        var reg = /[^A-Za-z0-9 ]/;

        if (reg.test(tail)) {
            this.state.error.tail = true;
            this.state.error.tailmsg = 'The tail number must only contain alpha-numeric characters (a-n, 0-9)';
            return false;
        }

        if (tail != '') {
            //tail
            if (tail.length === 0) {
                this.state.error.tail = false;
                return false;
            }

            if (tail.length < 2 || tail.length > 6) {
                this.state.error.tail = true;
                this.state.error.tailmsg = 'The length of the tail number must be between 2 and 6 characters.';
                return false;
            } else if (tail[0] != null) {
                if (tail[0].toUpperCase() != 'N') {
                    this.state.error.tail = true;
                    this.state.error.tailmsg = 'Tail number must begin with an N';
                    return false;
                } else {
                    this.state.error.tail = false;
                }
            } else {
                this.state.error.tail = false;
            }

            return true;
        } else {
            return false;
        }
    }

    validateNose(value) {
        console.log('validateNose');
        var nose = value;
        var reg = /[^A-Za-z0-9 ]/;

        if (reg.test(nose)) {
            this.state.error.nose = true;
            this.state.error.nosemsg = 'The nose number must only contain alpha-numeric characters (a-n, 0-9)';
            return false;
        } else {
            this.state.error.tail = false;
        }
        return true;
    }

    validateRequired(event) {
        console.log("validateRequired");
        var mro = this.state.mro;
        var tail = this.state.tail;
        var nose = this.state.nose;
        var success = true;

        this.state.error.tail = false;
        this.state.error.nose = false;
        this.state.error.mro = false;
        //tail
        if (tail === '') {
            this.state.error.tail = true;
            success = false;
        }

        //nose
        if (nose === '') {
            this.state.error.nose = true;
            success = false;
        }
        //mro
        if (mro === '') {
            this.state.error.mro = true;
            success = false;
        }

        return success;
    }

    checkIfExists(tailNumber, noseNumber) {
        console.log("checkIfExists");
        var mro = this.state.mro;
        tailNumber = tailNumber.toUpperCase();
        noseNumber = noseNumber.toUpperCase();

        for (var i = 0; i < this.state.elements.length; i++) {
            if (this.state.elements[i].Tail == tailNumber) {
                //Aircraft found in list
                var selectElement = document.getElementById('submitButton');
                //Check if the nose number matches
                if(this.state.elements[i].Nose != noseNumber){
                  //Tail and nose number DO NOT match
                  this.state.error.nosemsg = "Nose number does not match tail number already in database";
                  this.state.error.nose = true;
                  selectElement.setAttribute("disabled", "disabled");

                }
                else{
                  //Tail and nose number match
                  this.state.error.nose = false;
                  selectElement.removeAttribute("disabled");
                }

                this.state.alreadyExists = true;
                return this.state.elements[i].ID;
            }
        }
        this.state.alreadyExists = false;
        return -1;
    }

    pushPlane(event) {
        event.preventDefault();
        console.log("pushPlane");
        if (this.validateInput(this.state.tail)) {
            if (this.validateNose(this.state.nose)) {
                if (this.validateRequired(event)) {
                    var matchedElement = this.checkIfExists(this.state.tail, this.state.nose);
                    if (!this.state.alreadyExists) {
                        var d = {
                            ID: this.state.elements.length,
                            Tail: this.state.tail,
                            Nose: this.state.nose,
                            MRO: this.state.mro
                        };
                        this.state.list.unshift(d);
                        this.state.elements.unshift(d);
                        this.clearInput();
                        this.state.successMsg = "Successfully entered aircraft!";
                        this.state.success = true;
                        //console.log('pushPlane success set to: '+this.state.success);
                        this.forceUpdate();
                        return;
                        //alert("Success!");
                        //this.forceUpdate();
                    } else {
                        console.log("Updating: " + this.state.mro + " of element: " + matchedElement);
                        this.state.elements[matchedElement].MRO = this.state.mro;
                        this.clearInput();
                        this.state.successMsg = "Updated existing aircraft!";
                        this.state.success = true;
                        this.forceUpdate();
                        console.log("updated");
                    }
                } else {
                    this.state.success = false;
                    this.forceUpdate();
                    return;
                }
            } else {
                console.log("Nose is not valid");
                this.state.success = false;
                this.forceUpdate();
                return;
            }
        } else {
            this.state.success = false;
            this.forceUpdate();
            return;
        }

    }

    handleEdit(event) {
        console.log("handleEdit");
        var selectElement = document.getElementById("MRO" + event.target.getAttribute("id"));
        var tailElement = document.getElementById("T" + event.target.getAttribute("id"));
        var noseElement = document.getElementById("N" + event.target.getAttribute("id"));

        if (selectElement.hasAttribute("disabled")) {
            //Change edit button to save button
            event.target.textContent = "Save";
            event.target.className += " btn-success";
            selectElement.removeAttribute("disabled");
            tailElement.removeAttribute("disabled");
            noseElement.removeAttribute("disabled");
        } else {
            //Change Save button to edit button
            this.saveSelection(event);
            event.target.textContent = "Edit";
            event.target.className = "btn btn-default edit";
            selectElement.setAttribute("disabled", "disabled");
            tailElement.setAttribute("disabled", "disabled");
            noseElement.setAttribute("disabled", "disabled");
        }
    }

    saveSelection(event) {
        console.log('saveSelection');
        console.log(event.target);
        console.log("Value: " + event.target.getAttribute("value"));
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(this.state.mroTable);
    }

    handleSearchChange(event) {
        console.log('handleSearchChange');
        this.state.filterText = event.target.value;
        this.state.currentPage = 1;
        console.log(this.state.filterText);
        this.forceUpdate();
    }

    handlePageChange(event) {
        console.log('handlePageChange');
        this.state.currentPage = Number(event.target.getAttribute("value"));
        this.forceUpdate();
    }

    handleAcPerPageChange(event) {
        console.log('handleAcPerPageChange');
        this.state.acPerPage = event.target.value;
        this.forceUpdate();
    }

    render() {

        var filteredElements = [];

        //Filter the elements based on tail number
        for (var i = 0; i < this.state.elements.length; i++) {
            if ((this.state.elements[i].Tail.toUpperCase().includes(this.state.filterText.toUpperCase())) || (this.state.elements[i].MRO.toUpperCase().includes(this.state.filterText.toUpperCase()))) {
                filteredElements.push(this.state.elements[i]);
            }
        }

        //Calulate number of pages needed
        var numPages = Math.ceil(filteredElements.length / this.state.acPerPage);

        //Generate the HTML elements for pagination
        var pages = [];
        for (var i = 0; i < numPages; i++) {
            pages.push(
                <li className= {this.state.currentPage-1 == i ? 'page-item active' : 'page-item'} key={i + 1}>
                    <a className="page-link" onClick={this.handlePageChange} value={i + 1}>{i + 1}</a>
                </li>
            );
        }

        //Check to make sure there are results, if not display an error
        if (filteredElements.length === 0) {
            this.state.found = false;
        } else {
            this.state.found = true;
        }

        const listItemsTable = filteredElements.map((e) => <tr key={e.ID}>
            <td><input id={"T" + e.ID} className = "form-control" type="text" value={e.Tail} onChange={this.handleInputChangeTableTail} disabled></input></td>
            <td><input id={"N" + e.ID} className = "form-control" type="text" value={e.Nose} onChange={this.handleInputChangeTableNose} disabled></input></td>
            <td>
                <select id={"MRO" + e.ID} value={e.MRO} name='mro' className='form-control editable' onChange={this.handleInputChangeTableSelect} disabled>
                    <option value='' disabled>MRO</option>
                    <option value="Wizard">Wizard</option>
                    <option value="Trax">Trax</option>
                    <option value="MTX">MTX</option>
                </select>
            </td>
            <td className="td-edit-save">
                <button id={e.ID} className="btn btn-default edit" type="submit" onClick={this.handleEdit} value="Edit">Edit</button>
            </td>

        </tr>)

        // Logic for displaying current aircraft
        const indexOfLastAC = this.state.currentPage * this.state.acPerPage;
        const indexOfFirstAC = indexOfLastAC - this.state.acPerPage;
        const currentACs = listItemsTable.slice(indexOfFirstAC, indexOfLastAC);

        return (
            <div className="container-fluid col-sm-8 col-xs-12 center-block">

                {this.state.success
                    ? <div className="alert alert-success" role="alert">{this.state.successMsg}</div>
                    : ''}

                <form onSubmit={this.pushPlane}>
                    <h3>Tail Number:
                    </h3>
                    <input name="tail" className={this.state.error.tail
                        ? 'form-control error'
                        : 'form-control'} type="text" value={this.state.tail} onChange={this.handleInputChange}></input>
                    {this.state.error.tail
                        ? <span className="label label-danger">{this.state.error.tailmsg}</span>
                        : ''}<br></br>

                    <h3>Nose Number:
                    </h3>
                    <input name="nose" className={this.state.error.nose
                        ? 'form-control error'
                        : 'form-control'} type="text" value={this.state.nose} onChange={this.handleInputChange}></input>
                    {this.state.error.nose
                        ? <span className="label label-danger">{this.state.error.nosemsg}</span>
                        : ''}<br></br>

                    <h3>MRO:
                    </h3>
                    <select name='mro' className={this.state.error.mro
                        ? 'form-control error'
                        : 'form-control'} value={this.state.mro} onChange={this.handleInputChange}>
                        <option value='' disabled>--</option>
                        <option value="Wizard">Wizard</option>
                        <option value="Trax">Trax</option>
                        <option value="MTX">MTX</option>
                    </select>
                    {this.state.error.mro
                        ? <span className="label label-danger">Select a MRO</span>
                        : ''}<br></br>
                    <br></br>

                    <div className="btn-group" role="group">
                        <button id="submitButton" className={this.state.alreadyExists
                            ? 'btn btn-default btn-success'
                            : 'btn btn-default btn-info'} type="submit">{this.state.alreadyExists
                                ? 'Save Existing'
                                : 'Submit'}</button>
                        <button className="btn btn-default" onClick={this.clearInput} type="button">Clear</button>
                    </div>
                </form>
                <br></br>
                <br></br>

                <form className="form-inline">

                    <div className="input-group col-xs-6">
                        <div className="input-group-addon">Search</div>
                        <input className="form-control" type="text" placeholder="Search by tail number or MRO" value={this.props.filterText} ref="filterTextInput" onChange={this.handleSearchChange}></input>
                    </div>

                    <div className="form-group col-xs-6 rightAlign">
                        <label htmlFor="resultsPerPage">Results Per Page:
                        </label>
                        <select id='resultsPerPage' name='resultsPerPage' className='form-control' value={this.state.acPerPage} onChange={this.handleAcPerPageChange}>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='50'>50</option>
                        </select>
                    </div>
                </form>

                <table className="table table-hover table-condensed">
                    <thead>
                        <tr>
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
                {!this.state.found
                    ? <div className="alert alert-warning" role="alert">No results found.</div>
                    : ''}

                <ul className="pagination">
                    {pages}
                </ul>

            </div>

        );
    }
}

export default App;
