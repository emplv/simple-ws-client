import * as React from "react";
import { IMessage } from "./Message";
interface IChatProps {
    doLogout(): void;
    username: string;
    ws: WebSocket;
}
interface IChatState {
    messages: IMessage[];
    text: string;
}
declare class Chat extends React.Component<IChatProps, IChatState> {
    containerRef: HTMLDivElement;
    constructor(props: IChatProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleEnterKey: (ev: any) => void;
    handleContainerRef: (ref: HTMLDivElement) => void;
    handleMessage: (ev: MessageEvent) => void;
    handleSendMessage: (data: IMessage) => void;
    addNewMessage(data: IMessage): void;
    scrollToNewMessage: () => void;
    handleInputChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSend: (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    render(): JSX.Element;
}
export default Chat;
