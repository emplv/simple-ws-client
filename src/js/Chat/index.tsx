import * as React from "react";
import ChatMessage, { IMessage } from "./Message";

interface IChatProps {
  doLogout(): void;
  username: string;
  ws: WebSocket;
}
interface IChatState {
  messages: IMessage[];
  text: string;
}

class Chat extends React.Component<IChatProps, IChatState> {
  containerRef: HTMLDivElement;

  constructor(props: IChatProps) {
    super(props);
    this.state = {
      messages: [],
      text: ""
    };
    props.ws.addEventListener("message", this.handleMessage);
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleEnterKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEnterKey);
  }

  handleEnterKey = ev => {
    if (ev.keyCode === 13 && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey) {
      this.handleSend(ev);
    }
  };

  handleContainerRef = (ref: HTMLDivElement) => {
    this.containerRef = ref;
  };

  handleMessage = (ev: MessageEvent) => {
    const data: IMessage = JSON.parse(ev.data);
    this.addNewMessage(data);
  };

  handleSendMessage = (data: IMessage) => {
    this.props.ws.send(JSON.stringify(data.message));
    this.addNewMessage(data);
  };

  addNewMessage(data: IMessage) {
    const date = new Date();
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    data.date = `${hours}:${minutes}`;
    this.setState(
      {
        messages: [...this.state.messages, data]
      },
      () => {
        this.scrollToNewMessage();
      }
    );
  }

  scrollToNewMessage = () => {
    if (this.containerRef) {
      const { scrollHeight, clientHeight, scrollTop } = this.containerRef;
      if (scrollHeight - clientHeight - scrollTop < 30) {
        this.containerRef.scrollTop = scrollHeight - clientHeight;
      }
    }
  };

  handleInputChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = ev.target;
    this.setState({
      text: value
    });
  };

  handleSend = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev && ev.preventDefault();
    ev && ev.stopPropagation();
    const text = this.state.text.trim();
    if (!text) {
      return;
    }
    const message: IMessage = {
      from: this.props.username,
      message: text
    };
    this.setState(
      {
        text: ""
      },
      () => {
        this.handleSendMessage(message);
      }
    );
  };

  render() {
    const { username } = this.props;
    const { messages, text } = this.state;
    return (
      <div className="chatWindow grayBox">
        <div className="chatWindow-topbar">
          Simple Web Chat
          <div className="close" onClick={this.props.doLogout} />
        </div>
        <div className="chatWindow-container">
          <div className="chatWindow-messages" ref={this.handleContainerRef}>
            {messages.map((message, index) => {
              return (
                <ChatMessage data={message} username={username} key={index} />
              );
            })}
          </div>
        </div>
        <div className="chatWindow-form">
          <div className="chatWindow-username">
            Logged in as: <span>{username}</span>
          </div>
          <form>
            <textarea onChange={this.handleInputChange} value={text} />
            <button
              className={text ? "" : "disabled"}
              onClick={this.handleSend}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat;
