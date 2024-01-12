import { io } from "socket.io-client";
const socket = io("http://localhost:5008");

export default socket;
