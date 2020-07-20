import React from "react";
import ReactDOM from "react-dom";
import { Chat } from "@progress/kendo-react-conversational-ui";
import * as marked from "marked";

// An override of the message renderer to allow markdown and other content styling
function MessageTemplate(props) {
  let message = props.item;
  console.log(message);

  // parse markdown language
  let parser = marked.setOptions({});
  let parsedMessage = parser.parse(message.text);
  let htmlToinsert = { __html: parsedMessage };

  const messageType = message.type + "";
  switch (messageType) {
    case "timeline":
      return (
        <div className="k-bubble timeline" data-plan-id="123">
          <img height="600" width="auto"
            alt="timeline view"
            src="https://hosted-machinelogic-io.s3.amazonaws.com/phoenix-poc/timeline.png"
          />
          <button className="timeline-button">Edit plan 123</button>
        </div>
      );

      break;

    case "site-intercept":

      return (
        <div className="k-bubble timeline">
          <div id='ZN_3WPvrIDP1PZHzDv'></div>
        </div>
      );

      break;

    default:
      return (
        <div className="k-bubble">
          <div dangerouslySetInnerHTML={htmlToinsert} />
        </div>
      );
      break;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.user = {
      id: 1
    };
    this.bot = {
      id: 0,
      avatarUrl:
        "https://hosted-machinelogic-io.s3.amazonaws.com/phoenix-poc/chat-unum-logo%402x.png"
    };

    this.state = {
      messages: [
        {
          author: this.bot,
          timestamp: new Date(),
          text:
            "Hi Alison! I'm Jessie, an AI-guide here to help you begin the process of preparing for your time off of work.\n\nIf you ask me something I don't know, I'll connect you with one of my human coworkers. **You can also type a message below** at any time."
        },
        {
          author: this.bot,
          text: "Let’s get started. **What brings you here today?**",
          suggestedActions: [
            {
              type: "reply",
              value: "I'm planning to take time off"
            },
            {
              type: "reply",
              value: "Custom Timeline Object"
            },
            {
              type: "reply",
              value: "Various Markdown Examples"
            },
            {
              type: "reply",
              value: "Site Intercept Demo"
            },
            {
              type: "reply",
              value: "What are other options?"
            }
          ]
        }
      ]
    };
  }

  addNewMessage = event => {
    console.log(event);

    const responseText = event.message.text.toLowerCase();

    this.setState(prevState => ({
      messages: [...prevState.messages, event.message]
    }));

    let botResponse = Object.assign({}, event.message);
    botResponse.author = this.bot;

    switch (responseText) {

      case "site intercept demo":
        botResponse.type = "site-intercept";
        botResponse.text =
          "This is a site intercept flow";
        break;

      case "i'm planning to take time off":
        botResponse.text =
          "**Can you tell me why you're taking time off work?**\n\nJust start typing below and I'll help you find the right category.";
        botResponse.suggestedActions = [
          {
            type: "reply",
            value: "Maternity Leave"
          },
          {
            type: "reply",
            value: "Paternity Leave"
          },
          {
            type: "reply",
            value: "Surgery"
          }
        ];

        break;

      case "maternity leave":
      case "paternity leave":
      case "surgery":
        botResponse.text =
          "Great. In order to help you set your **" +
          responseText +
          "**, please call our claim setup hotline at:\n\n**(800) 555-1234**";
        break;

      case "custom timeline object":
        botResponse.type = "timeline";
        botResponse.text =
          "Based on your due date, this is an initial plan for your time off of work:";
        break;

      case "various markdown examples":
        let markdownExamples = "";

        markdownExamples += "# Heading 1\n";
        markdownExamples += "## Heading 2\n";
        markdownExamples += "### Heading 3\n";

        markdownExamples +=
          "1. Here is\n2. an ordered list\n3. example for you\n";

        markdownExamples += "\n[Link Example](/)\n";

        markdownExamples +=
          "\n![Grace is awesome](https://images.squarespace-cdn.com/content/v1/539b1cb7e4b0e992a7f83f4a/1499534766339-GI67JG9WBE6LGDZOANEO/ke17ZwdGBToddI8pDm48kOE8poCFVA3SVCnFcSJDvpV7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0ktJPZ5nzlpAQ9l-HYKRq6WtA6I_x4pFpYoHyCJt8m9Rfz8_hgRs6Rf3qd8DGa1PDg/Intropg.jpg)";

        botResponse.text = markdownExamples;
        break;

      case "start over":
        location.href = location.href;
        break;

      default:
        botResponse.text = this.countReplayLength(event.message.text);
    }

    setTimeout(() => {
      this.setState(prevState => ({
        messages: [...prevState.messages, botResponse]
      }));
    }, 1000);
  };

  countReplayLength = question => {
    let length = question.length;
    let answer =
      '**This is the default response.**\n\nYour message of "' +
      question +
      '" contains exactly ' +
      length +
      " characters!";
    return answer;
  };

  render() {
    return (
      <div className="unum-conversation-wrapper">
        <Chat
          user={this.user}
          messages={this.state.messages}
          onMessageSend={this.addNewMessage}
          placeholder={"Type or ask me something"}
          messageTemplate={MessageTemplate}
          width={400}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("my-app"));
