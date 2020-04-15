
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from '@progress/kendo-react-conversational-ui';
class App extends React.Component {
    constructor(props) {
      
        super(props);
        this.user = {
            id: 1
        };
        this.bot = { 
          id: 0,
          avatarUrl: "https://via.placeholder.com/24/008000/008000.png"
        };

        this.state = {
            messages: [
                {
                    author: this.bot,
                    suggestedActions: [
                        {
                            type: 'reply',
                            value: 'Oh, really?'
                        }, {
                            type: 'reply',
                            value: 'Reed is awesome'
                        }
                    ],
                    timestamp: new Date(),
                    text: "Hi Alison! I'm Jessie, an AI-guide here to help you begin the process of preparing for your time off of work."
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
            <div class="unum-conversation-wrapper">
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    placeholder={"Type or ask me something"}
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

