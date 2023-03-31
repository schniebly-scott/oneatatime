import React, { useEffect, useState } from "react";

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
        return <DoubleButton setState={setConnected} />
      case 1:
        //selected no calendar
        return <WaitingRoom />;
      case 2:
        //signed in and ready
        return <Events />;
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

interface MethodProps {
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const DoubleButton = ({ setState }: MethodProps) => {
  function handleSignIn(): void {
  }

  function handleCredentialResponse(response: { credential: string; }) {
    console.log("Encoded JWT ID token: " + response.credential);
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "212061092710-00a3iamutj4kodq42fpo6e5is2mbfpq3.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  });

  return (
    <div>
      
      <div id="buttonDiv"></div>
    </div>
  );
}


export default Calendar;
