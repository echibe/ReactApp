import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


class App extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         name: '',
         age: '',
         location: '',
         list: []
       }


      this.updateName = this.updateName.bind(this);
      this.updateAge = this.updateAge.bind(this);
      this.updateLocation = this.updateLocation.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.addPerson = this.addPerson.bind(this);
   };

   updateName(e) {
      this.setState({name: e.target.value});
   }
   updateAge(e) {
      this.setState({age: e.target.value});
   }
   updateLocation(e) {
      this.setState({location: e.target.value});
   }
   clearInput(){
     console.log(this.state.list);
     this.setState({name:'', age: '', location: ''});
     //ReactDOM.findDOMNode(this.refs.name).focus();
   }
   addPerson(a, b, c){
     console.log("button clicked")
     var d = {name:a.value, age:b.value, location:c.value};

     this.state.list.push(d);
     console.log(this.state.list);
     this.clearInput();
     this.forceUpdate();
   }

   render() {
      return (
         <div>
            <Content
               nameProp = {this.state.name}
               ageProp = {this.state.age}
               locationProp = {this.state.location}
               listProp = {this.state.list}
               updateNameProp = {this.updateName}
               updateAgeProp = {this.updateAge}
               updateLocationProp = {this.updateLocation}
               clearInputProp = {this.clearInput}
               addPersonProp = {this.addPerson}
               ></Content>
         </div>
      );
   }
}

class Content extends React.Component {
//w
   render() {
     const listItems = this.props.listProp.map((d) => <li className="list-group-item" key={d.name}>{d.name} - {d.age} - {d.location}</li>)
      return (
         <div className = "container-fluid col-xs-8">
           <form onSubmit={this.handleSubmit}>
             <h3>Name: {this.props.nameProp}</h3>
             <input className = "form-control" type = "text" value = {this.props.nameProp}
               onChange = {this.props.updateNameProp} ref= "name"></input>
             <br></br><br></br>

             <h3>Age: {this.props.ageProp}</h3>
             <input className = "form-control" type = "text" value = {this.props.ageProp}
               onChange = {this.props.updateAgeProp} ref="age"></input>
             <br></br><br></br>

             <h3>Location: {this.props.locationProp}</h3>
             <input className = "form-control" type = "text" value = {this.props.locationProp}
               onChange = {this.props.updateLocationProp} ref="location"></input>
             <br></br><br></br>
            <div className = "btn-group">
             <button className = "btn btn-default" id = "btnSearch" onClick = {() => {this.props.addPersonProp(this.refs.name, this.refs.age, this.refs.location)}}>Submit Data</button>
             <button className = "btn btn-default" onClick = {this.props.clearInputProp}>Clear</button>
             <input type="submit" value="Submit"/>
            </div>
            <br></br><br></br>
            <ul className="list-group">
              {listItems}
              <br></br>
            </ul>
            </form>
         </div>
      );
   }
}
export default App;
