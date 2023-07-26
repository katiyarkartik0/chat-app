import { io } from 'socket.io-client';
import { ENDPOINT } from './constants';

const URL = process.env.NODE_ENV === 'production' ? undefined : ENDPOINT;

export const socket = io(URL)