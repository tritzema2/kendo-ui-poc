
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
import * as marked from 'marked';

function MessageTemplate(props) {
    let message = props.item;
    let parser = marked.setOptions({});
    let parsedMessage = parser.parse(message.text);
    let htmlToinsert = { __html: parsedMessage };
    return (
        <div className="k-bubble">
            <div dangerouslySetInnerHTML={htmlToinsert} />
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
      
        super(props); 
        this.user = {
            id: 1
        };
        this.bot = { 
          id: 0,
          avatarUrl: "https://hosted-machinelogic-io.s3.amazonaws.com/phoenix-poc/chat-unum-logo%402x.png"
        };

        this.state = {
            messages: [
                {
                    author: this.bot,
                    timestamp: new Date(),
                    text: "Hi Alison! I'm Jessie, an AI-guide here to help you begin the process of preparing for your time off of work.\n\nIf you ask me something I don't know, I'll connect you with one of my human coworkers. **You can also type a message below** at any time."
                },
                {
                  author: this.bot,
                  timestamp: new Date(),
                  text: "Let’s get started. **What brings you here today?**",
                    suggestedActions: [
                        {
                            type: 'reply',
                            value: 'I\'m planning to take time off'
                        }, {
                            type: 'reply',
                            value: 'I\'m already out of work'
                        }, {
                            type: 'reply',
                            value: 'Review my benefits'
                        }, {
                            type: 'reply',
                            value: 'What are other options?'
                        }
                    ],
                }
            ]
        };
    }

    addNewMessage = (event) => {
        let botResponce = Object.assign({}, event.message);
        botResponce.text = this.countReplayLength(event.message.text);
        botResponce.author = this.bot;
        this.setState((prevState) => ({
            messages: [
                ...prevState.messages,
                event.message
            ]
        }));
        setTimeout(() => {
            this.setState(prevState => ({
                messages: [
                    ...prevState.messages,
                    botResponce
                ]
            }));
        }, 1000);
    };

    countReplayLength = (question) => {
        let length = question.length;
        let answer = question + " contains exactly " + length + " symbols.";
        return answer;
    }

    render() {
        return (
            <div className="unum-conversation-wrapper">
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type or ask me something"}
                    messageTemplate={MessageTemplate}
                    width={400}>
                </Chat>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);

