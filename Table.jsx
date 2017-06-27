import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


class Table extends React.Component {

   constructor(props) {
      super(props);
      this.state= {
        mro: ''
      }
      this.saveSelection = this.saveSelection.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
   };

   saveSelection(event){
      console.log('saveSelection');
      const target = event.target;
      const value =  target.value;
      const name = target.name;
      console.log(this.state.mro);
   }

   handleInputChange(event) {
      console.log('handleInputChange');
      const target = event.target;
      const value =  target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
   }

   render() {
      return (
        <div className = "container-fluid col-sm-8 col-xs-12">
        <table className="table table-hover table-condensed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tail</th>
              <th>Nose</th>
              <th>MRO</th>
              <th>Edit</th>
              <th>Save</th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                  <td>N1</td>
                  <td>123</td>
                  <td>
                    <select name='mro' className = 'form-control editable' onChange={this.handleInputChange} disabled>
                      <option value='' disabled>MRO</option>
                      <option value="Wizard">Wizard</option>
                      <option value="Trax">Trax</option>
                      <option value="MTX">MTX</option>
                    </select>
                  </td>
                  <td className="td-edit-save"><button className="btn btn-default edit" type="submit">Edit</button></td>
                  <td className="td-edit-save"><button className="btn btn-default btn-success save" type="submit" onClick = {this.saveSelection}>Save</button></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                  <td>N2</td>
                  <td>456</td>
                  <td>
                    <select name='mro' className = 'form-control editable' onChange={this.handleInputChange} disabled>
                      <option value='' disabled>MRO</option>
                      <option value="Wizard">Wizard</option>
                      <option value="Trax">Trax</option>
                      <option value="MTX">MTX</option>
                    </select>
                  </td>
                  <td className="td-edit-save"><button className="btn btn-default edit" type="submit">Edit</button></td>
                  <td className="td-edit-save"><button className="btn btn-default btn-success save" type="submit" onClick = {this.saveSelection}>Save</button></td>
              </tr>

            </tbody>
        </table>
      </div>
      );
   }
}

export default Table;
