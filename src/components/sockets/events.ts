import { socket } from './index';
export const socketEvents = ({ setValue }: {setValue: any}) => {
  socket.on('queueLength', ({ queueLength }) => {
    setValue((state: any) => { return { ...state, queueLength } });
  });
  socket.on('positionInLine', ({ positionInLine }) => {
    setValue((state: any) => { return { ...state, positionInLine } });
  });
};