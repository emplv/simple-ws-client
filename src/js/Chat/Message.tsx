import * as React from "react";

export interface IMessage {
  from?: string;
  date?: string;
  message: string;
}
interface IChatMessageProps {
  data: IMessage;
  username?: string;
}

class ChatMessage extends React.Component<IChatMessageProps> {
  render() {
    const { data, username } = this.props;
    const fromServer = !data.from;
    const own = data.from === username;
    return (
      <div className="chatWindow-messages-item">
        <div className="date">[{data.date}]</div>
        <div className={`message ${fromServer ? "server" : ""}`}>
          {fromServer && "* "}
          <span className={`username ${own ? "own" : ""}`}>{data.from}</span>
          {!fromServer && ": "} {data.message}
          {fromServer && " *"}
        </div>
      </div>
    );
  }
}

export default ChatMessage;
