import io from 'socket.io-client';
import { url } from './config';
export let socket = io(`${url}`, {
    auth: {
      token: JSON.parse(localStorage.getItem('user-token'))
    }
});