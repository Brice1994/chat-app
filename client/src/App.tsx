import React, {Component} from 'react';
import './App.css';
import {SocketService} from "./services/SocketService";

class App extends Component{
  state = {
    messages: [],
    chatBox: ""
  }
  private socket: SocketService = new SocketService();

  public constructor(props: any) {
    super(props);
    this.state = {
      messages: [],
      chatBox: ""
    };
    this.socket.getEventListener().on("message", (message) => {
      let data = message.data;
      console.log(`In APP event listener with: ${data.content}`)
      let newMessages = [...this.state.messages];
      // @ts-ignore
      newMessages.push(data.content);
      this.setState({
        messages: newMessages
      })
    })
    this.socket.getEventListener().on("open", () => {
      let m = [...this.state.messages];
      // @ts-ignore
      m.push("/The socket connection has been established")
      this.setState({
        messages: m
      })
    })
    this.socket.getEventListener().on("close", () => {
      let m = [...this.state.messages];
      // @ts-ignore
      m.push("/The socket connection has been closed")
      this.setState({
        messages: m
      })
    })
  }

  private handleSubmit(e: any){
    e.preventDefault();
    if(!e.target[0].value){
      return;
    }
    this.socket.send(e.target[0].value);
    const chatBox = document.getElementById("chatBox");
    // @ts-ignore
    chatBox!.reset();
  }
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <ul id="messages">
              {this.state.messages.map((message) => <li>{message}</li>)}
            </ul>
            <form id="chatBox" onSubmit={(e) => this.handleSubmit(e)}>
              <input autoComplete="off"/>
              <button>Send</button>
            </form>
          </header>
        </div>
    );
  }
}

export default App;
