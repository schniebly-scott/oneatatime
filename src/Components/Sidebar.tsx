import React from "react";

class Sidebar extends React.Component<any, any> {
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
      <div className="Sidebar">
        <p>Test</p>
      </div>
    );
  }
}

export default Sidebar;
