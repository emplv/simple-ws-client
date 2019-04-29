import * as React from "react";

interface ILoginProps {
  error?: string;
  onLogin(username: string, cb?): string | void;
  username?: string;
}
interface ILoginState {
  error?: string;
  loading?: boolean;
  username: string;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      username: props.username || "",
      error: props.error || null
    };
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleEnterKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEnterKey);
  }

  handleEnterKey = ev => {
    if (ev.keyCode === 13 && !ev.ctrlKey && !ev.shiftKey && !ev.metaKey) {
      this.handleLogin(ev);
    }
  };

  handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    this.setState({
      username: value,
      error: null
    });
  };

  handleLogin = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev && ev.preventDefault();
    ev && ev.stopPropagation();
    this.setState(
      {
        loading: true,
        error: null
      },
      () => {
        this.props.onLogin(this.state.username, error => {
          if (error) {
            this.setState({
              loading: false,
              error
            });
          }
        });
      }
    );
  };

  render() {
    const { error, loading, username } = this.state;
    return (
      <div className="loginBox grayBox">
        <form className={`loginBox-form ${loading ? "disabled" : ""}`}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={username}
            placeholder="Enter username"
          />
          <button
            className={username ? "" : "disabled"}
            onClick={this.handleLogin}
          >
            Connect
          </button>
        </form>
        {!!error && <div className="loginBox-error">{error}</div>}
      </div>
    );
  }
}

export default Login;
