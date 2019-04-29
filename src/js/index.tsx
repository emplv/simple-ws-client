import * as React from "react";
import * as ReactDOM from "react-dom";
import Chat from "./Chat";
import Login from "./Login";

interface IAppState {
  connected: boolean;
  error?: string;
  username?: string;
}

/**
 * App.STATUS display:
 * 0 - WebSocket is null
 * 1 - connecting
 * 2 - connected
 * 3 - closed by user
 * 4 - closed by server
 */

class App extends React.Component<{}, IAppState> {
  ws: WebSocket;
  STATUS: number = 0;

  constructor(props) {
    super(props);
    this.state = {
      connected: false
    };
  }

  handleLogout = () => {
    this.STATUS = 3;
    this.ws.close();
  };

  handleLogin = (username: string, cb?) => {
    const ws = new WebSocket(`ws://localhost:3210?username=${username}`, [
      "json"
    ]);
    this.STATUS = 1;
    ws.addEventListener("open", () => {
      this.STATUS = 2;
      this.ws = ws;
      this.setState({
        connected: true,
        username: username
      });
    });
    ws.addEventListener("close", ev => {
      delete this.ws;
      const error =
        this.STATUS === 1
          ? `Failed to connect with username: ${username}`
          : this.STATUS === 3
          ? "Connection closed"
          : "Disconnected due to inactivity";
      this.setState(
        {
          connected: false,
          error
        },
        () => {
          if (this.STATUS === 1) {
            cb && cb(error);
          }
          this.STATUS = 0;
        }
      );
    });
  };

  render() {
    const { connected, error, username } = this.state;
    return (
      <div className="container">
        {connected ? (
          <Chat ws={this.ws} username={username} doLogout={this.handleLogout} />
        ) : (
          <Login onLogin={this.handleLogin} username={username} error={error} />
        )}
      </div>
    );
  }
}

const container = document.getElementById("app");
if (container) {
  ReactDOM.render(<App />, container);
}
