import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
   constructor() {
      super();
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
      this.state = {
         data: []
      }

      this.setStateHandler = this.setStateHandler.bind(this);
   };

   setStateHandler() {
      var item = "setState..."
      var myArray = this.state.data;
      myArray.push(item)
      this.setState({data: myArray})
   };

   forceUpdateHandler(){
     this.forceUpdate();
   }

   findDomNodeHandler() {
      var myDiv = document.getElementById('myDiv');
      ReactDOM.findDOMNode(myDiv).style.color = 'green';
   }

   render() {
      return (
         <div>
            <button onClick = {this.setStateHandler}>SET STATE</button>
            <h4>State Array: {this.state.data}</h4>

          <button onClick = {this.forceUpdateHandler}> Force Update</button>
          <h4>Random Number: {Math.random()}</h4>

            <button onClick = {this.findDomNodeHandler}>FIND DOME NODE</button>
                <div id = "myDiv">NODE</div>
         </div>
      );
   }
}

export default App;
