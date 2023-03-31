import React from "react";
import { appWindow } from '@tauri-apps/api/window'
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

class TopBar extends React.Component<any, any> {
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
      <div className="TopBar">
        <div data-tauri-drag-region className="draggable">
          <p data-tauri-drag-region >one@atime</p>
        </div>
        <div className="Controls">
          <IconButton disableRipple aria-label="minimize" size="small" onClick={() => appWindow.minimize()}>
            <KeyboardArrowDownIcon fontSize="medium" />
          </IconButton>
          <IconButton disableRipple aria-label="close" size="small" onClick={() => appWindow.close()}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default TopBar;
