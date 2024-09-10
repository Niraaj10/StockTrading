import { io } from 'socket.io-client';

const socket = io('http://localhost:5001');

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
  console.log('Received data:', event.data);
};

socket.onerror = (error) => {
  console.log('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

