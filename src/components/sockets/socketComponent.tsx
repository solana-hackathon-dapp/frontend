import { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketComponent = () => {
    const socketRound  = io("http://localhost:4000/round");
    const [stateRound, setStateRound] = useState<Array<any>>([]);
    useEffect(() => {
        socketRound.on("connection", () => console.log(socketRound.id));
        socketRound.on("send-round", (round) => {
            setStateRound((prevState) => [...prevState, round]);
        })
    }, [])
    
    return (
        <div>
            <div>this websocket</div>
            <div>
            {stateRound.map((element: any) => {return <>{element}</>})}
            </div>
        </div> 
    )
}

export default SocketComponent;