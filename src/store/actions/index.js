import io from 'socket.io-client';

export const url = 'https://audiocomms-podcast-platform.herokuapp.com';
export let socket = io('https://audiocomms-podcast-platform.herokuapp.com', {
    auth: {
      token: JSON.parse(localStorage.getItem('user-token'))
    }
});