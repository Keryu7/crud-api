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

export const validateBody = (body: User): {isValid: boolean; message?: string} => {
    const { username, age, hobbies } = body;

    if (typeof username !== 'string' || username.trim().length === 0) {
        return { isValid: false, message: 'Invalid or missing "username"' };
    }
    if (typeof age !== 'number' || age < 0) {
        return { isValid: false, message: 'Invalid or missing "age"' };
    }
    if (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')) {
        return { isValid: false, message: 'Invalid or missing "hobbies"' };
    }
    return { isValid: true };
}