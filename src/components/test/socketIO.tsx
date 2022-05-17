import React, {useEffect, useState} from "react";
import io from "socket.io-client";

const SocketIO = () => {
    const [socket, setSocket] = useState(null);
    

    return (
        <div className="App">
            <header className="app-header">
                React Chat
            </header>
        </div>
    )
}

export default SocketIO;