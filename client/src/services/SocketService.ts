import {EventEmitter} from "events";
const HOST_ENDPOINT = "ws://localhost:12345/ws";
export class SocketService {
    private socket: WebSocket = new WebSocket(HOST_ENDPOINT);
    private listener: EventEmitter = new EventEmitter();

    public constructor() {
        this.socket.onopen = event => {
            console.log(`Connection made!, event: ${JSON.stringify(event)}`)
            // @ts-ignore
            this.listener.emit("open", {"data": event});
        }
        this.socket.onclose = event => {
            console.log(`Connection closed!, event: ${JSON.stringify(event)}`)
            // @ts-ignore
            this.listener.emit( "close", {"data": event});
        }
        this.socket.onmessage = event => {
            console.log(`Message received!, event: ${JSON.stringify(event.data)}`)
            // @ts-ignore
            this.listener.emit("message",{ "data": JSON.parse(event.data)});
        }
    }
    public send(data: string){
        this.socket.send(data);
    }
    public close() {
        this.socket.close();
    }
    public getEventListener() {
        return this.listener;
    }
}
