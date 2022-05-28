import React, { createContext } from "react"; 
const SocketContext = createContext({
  numberOfSOL: 0,
  numberOfUser: 0,  
  queueLength: 0,  
  positionInLine: 0,
});
export default SocketContext;