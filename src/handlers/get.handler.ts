import {IncomingMessage, ServerResponse} from 'http';
import { validate as isUuid } from 'uuid';

import { sendError, sendRes } from '../services/response.service';
import {getAllUsers, getUserById} from '../services/user.service';
export const getAllExistingUsers = (res: ServerResponse) => {
    try {
        const result = getAllUsers();
        return sendRes(res, 200, result);
    } catch (e: any) {
        return sendError(res, e?.name, e?.message);
    }

}

export const getUser = (id: string, res: ServerResponse) => {
    try {
        const user = getUserById(id);
        if (user) {
            return sendRes(res, 200, user);
        } else {
            return sendError(res, 404, 'User not found');
        }
    } catch (e: any) {
        return sendError(res, e?.name, e?.message);
    }
}

export const handleGetRequest = (req: IncomingMessage, res: ServerResponse): void => {

    const [_, endpoint, id] = req.url?.split('/') || [];

    switch (endpoint) {
        case 'users': {
            if (id) {
                if (!isUuid(id)) {
                    return sendError(res, 400, 'Invalid ID format');
                }
                return getUser(id, res);
            } else {
                return getAllExistingUsers(res);
            }
        }
        default: return sendError(res, 404, 'Invalid endpoint!');
    }
}