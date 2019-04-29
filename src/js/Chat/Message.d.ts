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
declare class ChatMessage extends React.Component<IChatMessageProps> {
    render(): JSX.Element;
}
export default ChatMessage;
