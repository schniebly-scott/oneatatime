import React from "react";

class Todo extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      testState: false
    };
  }

  statusCheck() {
    const { testState } = this.state
    if(testState) {
      console.log('test')
    }
  }

  render() {
    return (
      <div className="Todo">
        <p>Test</p>
      </div>
    );
  }
}

export default Todo;
