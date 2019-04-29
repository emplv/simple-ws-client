import * as React from "react";
interface ILoginProps {
    error?: string;
    onLogin(username: string, cb?: any): string | void;
    username?: string;
}
interface ILoginState {
    error?: string;
    loading?: boolean;
    username: string;
}
declare class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleEnterKey: (ev: any) => void;
    handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
export default Login;
