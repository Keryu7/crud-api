import {IncomingMessage, ServerResponse} from 'http';
import { validate as isUuid } from 'uuid';
import { sendError, sendRes } from '../services/response.service';
import { deleteUser } from '../services/user.service';

export const handleDeleteRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {

    const [_, endpoint, id] = req.url?.split('/') || [];

    switch (endpoint) {
        case 'users': {
            if (id) {
                if (!isUuid(id)) {
                    return sendError(res, 400, 'Invalid ID format');
                }
                return deleteUser(id)
                    ? sendRes(res, 204, 'User deleted!')
                    : sendError(res, 404, 'User not found!');
            }
            return sendError(res, 400, 'Invalid ID format!');
        }
        default: return sendError(res, 404, 'Invalid endpoint!');
    }
}