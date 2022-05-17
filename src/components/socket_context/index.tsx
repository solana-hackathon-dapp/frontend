import React, { useState, useEffect } from "react";
import SocketContext from "./context";
import { initSockets } from "../sockets";
const SocketProvider = (props: any) => {
    const [value, setValue] = useState({
        numberOfSOL: 0,
        numberOfUser: 0,
        queueLength: 0,
        positionInLine: 0,
    });
    useEffect(() => initSockets({ setValue }), [initSockets]);
    return(
        <SocketContext.Provider value={ value }>
            { props.children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;