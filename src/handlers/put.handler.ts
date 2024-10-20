import {IncomingMessage, ServerResponse} from 'http';
import { User } from '../models/user.model';
import { validate as isUuid } from 'uuid';

import { sendError, sendRes } from '../services/response.service';
import { updateUser} from '../services/user.service';
import { getRequestBody, validateBody } from '../services/request.service';

export const handlePutRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {

    const [_, endpoint, id] = req.url?.split('/') || [];
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
            if (id) {
                if (!isUuid(id)) {
                    return sendError(res, 400, 'Invalid ID format');
                }
                const user: User | undefined = updateUser(id, body.username, body.age, body.hobbies);
                return user
                    ? sendRes(res, 200, user)
                    : sendError(res, 404, 'User not found!');
            }
            return sendError(res, 400, 'Invalid ID format!');
        }
        default: return sendError(res, 404, 'Invalid endpoint!');
    }
}