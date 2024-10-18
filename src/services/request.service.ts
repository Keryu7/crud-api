import { IncomingMessage } from 'http';
import { User } from '../models/user.model';

export const getRequestBody = async (req: IncomingMessage): Promise<User> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body ? JSON.parse(body) : undefined);
        });
        req.on('error', error => {
            reject(error);
        });
    });
}