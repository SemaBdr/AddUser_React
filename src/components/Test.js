import React, { Component } from 'react'

 class Test extends Component {
    constructor(props){
        super(props); //must
        this.state={
            a:10
        }
        console.log("Constructor");
    }
    
    componentDidMount = () => {
      console.log("componentDidMount");
      //Api Istek
      this.setState({
        a:20
      })
    }
    componentDidUpdate = (prevProps, prevState) => {
      console.log("ComponentDidUpdate");
    }
    
    shouldComponentUpdate(){
        console.log("ShouldComponentUpdate");
        return true;
    }
  render() {
    console.log("Render");
    
    return (
      <div>
        
      </div>
    )
  }
}
export default Test;