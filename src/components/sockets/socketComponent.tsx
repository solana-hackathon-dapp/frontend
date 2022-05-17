import { useState } from "react";
import io from "socket.io-client";

const SocketComponent = () => {
    const socketRound  = io("http://localhost:4000/round");
    socketRound.on("connection", () => console.log(socketRound.id));
    const [stateRound, setStateRound] : any[]= useState(null);

    socketRound.on("send-round", (round) => {
        setStateRound(round);
    });
    
    setInterval(() => {socketRound.emit("update-round", "ping")}, 60000);
    socketRound.on("send-update-round", (newRound) => {
        let oldState = stateRound;
        console.log(stateRound);
        let round: any = []
        round.concat(oldState);
        round.push(newRound);
        setStateRound(round);
    })
    return (
        <div>
            <div>this websocket</div>
            <div>
            {stateRound}
            {/* {stateRound.map((element: any) => {
                return (
                    <div>
                        {element}
                    </div>
                )
            })} */}
            </div>
        </div> 
    )
} 

export default SocketComponent;