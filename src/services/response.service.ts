import { ServerResponse } from 'http';

export const sendRes = (res: ServerResponse, statusCode: number, message: string | object) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

export const sendError = (res: ServerResponse, statusCode: number, message: string | undefined) => {
    sendRes(res, statusCode, { error: message || 'Something went wrong' });
};