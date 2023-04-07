import React, { useEffect, useState } from "react";
import useScript from "./Utils/Gapi";

import error from '../Assets/Error-Messages/error1.png';
import { CssBaseline } from "@mui/material";

const Calendar: React.FC<any> = () => {
  const [isConnected, setConnected] = useState<number>(0);

  //isConnected can be [0, 1, or 2]
  //  0: Not connected and no action has been taken
  //  1: has chosen not to connect to gapi
  //  2: is connected
  const content = (c: number) => {
    switch (c) {
      case 0:
        //waiting for selection
        return <GoogleButton setState={setConnected} />
      case 1:
        //selected no calendar
        return <WaitingRoom />;
      case 2:
        //signed in and ready
        return <Events />;
      case 3:
        //no internet or script didin't load
        return <NoInternet />;
      default:
        console.log("ERROR: Invalid number passed to isConnected");
    }
  }

  return (
    <div className="Calendar">
      {content(isConnected)}
    </div>
  );
}

class Events extends React.Component<any, any> {
  render(): React.ReactNode {
    return (
      <p>it works!</p>
    );
  }
}

class WaitingRoom extends React.Component<any, any> {
  render(): React.ReactNode {
    return (
      <p>it works2!</p>
    );
  }
}

const NoInternet = () => {
  return (
      <img src={error} width={400} height={400}></img>
  );
}

interface MethodProps {
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const { client_secret, client_id, redirect_uris } = require('./client_id.json').web;

const GoogleButton = ({ setState }: MethodProps) => {

  function handleCredentialResponse(response: { credential: string; }) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  function onload() {
    google.accounts.id.initialize({
      client_id: client_id,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  };

  const onfail = () => {
    setState(3);
  }

  return (
    <div>
      {useScript("https://accounts.google.com/gsi/client", onload, onfail)}
      <div id="buttonDiv"></div>
    </div>
  );
}


export default Calendar;
