import {IncomingMessage, ServerResponse} from 'http';
import { User } from '../models/user.model';
import { addUser } from '../services/user.service';
import { sendError, sendRes } from '../services/response.service';
import { getRequestBody } from '../services/request.service';

const validateBody = (body: User): {isValid: boolean; message?: string} => {
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

export const handlePostRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const [_, endpoint] = req.url?.split('/') || [];
    const body: User = await getRequestBody(req);

    switch (endpoint) {
        case 'users': {
            if (!body) {
                return sendError(res, 400,  'Invalid body!');
            }
            if (!validateBody(body).isValid) {
                sendError(res, 400, validateBody(body).message);
                return;
            }
            try {
                const user: User = addUser(body.username, body.age, body.hobbies);
                return sendRes(res, 201, {user});
            } catch (e: any) {
                return sendError(res, e?.name, e?.message);
            }
        }
        default: return sendError(res, 404, 'Invalid endpoint!');
    }
}