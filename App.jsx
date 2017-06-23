import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'


class App extends React.Component {

   constructor(props) {
      super(props);

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
         success: false
       }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.clearInput = this.clearInput.bind(this);
      this.pushPlane = this.pushPlane.bind(this);
   };

   handleInputChange(event) {
     console.log('handleInputChange');
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if(name==="tail"){
      this.validateInput(value);
    }
   }

   clearInput(){
     console.log('clearing input');
     this.setState({tail:'', nose:'', mro: ''});
     this.state.success = false;
     this.forceUpdate();
     return;
     //ReactDOM.findDOMNode(this.refs.name).focus();
   }

   validateInput(value){
     console.log('validateInput');
     var tail = value;

     if(tail!=''){
       //tail
       if(tail.length===0){
         this.state.error.tail = false;
         return false;
       }

       if(tail.length < 2 || tail.length > 6){
         this.state.error.tail = true;
         this.state.error.tailmsg = 'The length of the tail number must be between 2 and 6.';
         return false;
       }
       else if (tail[0]!=null) {
         if(tail[0].toUpperCase()!='N'){
           this.state.error.tail = true;
           this.state.error.tailmsg = 'Tail number must begin with an N';
           return false;
         }
         else{
           this.state.error.tail = false;
         }
       }
       else{
         this.state.error.tail = false;
       }

       return true;
     }
     else{
       return false;
     }

   }

   validateRequired(event){
     console.log("validateRequired");
     var mro = this.state.mro;
     var tail = this.state.tail;
     var nose = this.state.nose;
     var success = true;

     this.state.error.tail = false;
     this.state.error.nose = false;
     this.state.error.mro = false;
     //tail
     if(tail===''){
       this.state.error.tail = true;
       success = false;
     }

     //nose
     if(nose===''){
       this.state.error.nose = true;
       success = false;
     }
     //mro
     if(mro===''){
       this.state.error.mro = true;
       success = false;
     }

     return success;
   }

   pushPlane(event){
     event.preventDefault();
     console.log("button clicked");
     if(this.validateInput(this.state.tail)){
       if(this.validateRequired(event)){
         var d = {tail:this.state.tail, nose:this.state.nose, mro:this.state.mro};
         this.state.list.push(d);
         this.clearInput();
         this.state.success = true;
         //console.log('pushPlane success set to: '+this.state.success);
         this.forceUpdate();
         return;
         //alert("Success!");
         //this.forceUpdate();
       }
       else{
         this.state.success = false;
         this.forceUpdate();
         return;
       }
     }
     else{
       this.state.success = false;
       this.forceUpdate();
       return;
     }

   }

   render() {


     const listItems = this.state.list.map((d) => <div className="panel panel-default history" key={d.tail}><div className="panel-heading">{d.tail}</div>
        <div className="panel-body">
           Tail: {d.tail} <br></br>
         Nose: {d.nose} <br></br>
           MRO: {d.mro}
         </div>
     </div>)
      return (
        <div className = "container-fluid col-xs-8">

          {this.state.success ?
            <div className="alert alert-success" role="alert">Successfully entered aircraft!</div> : ''}

          <form onSubmit={this.pushPlane}>
              <h3>Tail Number: {this.state.tail}</h3>
              <input name="tail" className = {this.state.error.tail ? 'form-control error' : 'form-control'} type = "text" value = {this.state.tail}
                onChange = {this.handleInputChange}></input>
              {this.state.error.tail ?
                  <span className="label label-danger">{this.state.error.tailmsg}</span> : ''}<br></br>

              <h3>Nose Number: {this.state.nose}</h3>
              <input name="nose" className = {this.state.error.nose ? 'form-control error' : 'form-control'} type = "text" value = {this.state.nose}
                onChange = {this.handleInputChange}></input>
              {this.state.error.nose ?
                  <span className="label label-danger">{this.state.error.nosemsg}</span> : ''}<br></br>

              <h3>MRO: {this.state.mro}</h3>
              <select name='mro' className = {this.state.error.mro ? 'form-control error' : 'form-control'} value={this.state.mro} onChange={this.handleInputChange}>
                <option value='' disabled>MRO</option>
                <option value="Wizard">Wizard</option>
                <option value="Trax">Trax</option>
                <option value="MTX">MTX</option>
              </select>
              {this.state.error.mro ?
                <span className="label label-danger">Select a MRO</span> : ''}<br></br><br></br>


            <div className = "btn-group" role="group">
                <button className = "btn btn-default btn-success" type="submit">Submit</button>
                <button className = "btn btn-default" onClick = {this.clearInput} type="button">Clear</button>
              </div>
           </form>
             <br></br><br></br>

            <button id="toggle" className = "btn btn-info active activeSometimes">Toggle History</button><br></br><br></br>
             {listItems}
             <br></br>

        </div>
      );
   }
}

export default App;
