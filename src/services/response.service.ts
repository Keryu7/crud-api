import { ServerResponse } from 'http';

export const sendRes = (res: ServerResponse, statusCode: number, message: string | object) => {
    console.log('VALUE_1a65300d-5d73-4c5a-9084-5cbd4b01bf02', message)
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

export const sendError = (res: ServerResponse, statusCode: number, message: string | undefined) => {
    sendRes(res, statusCode, { error: message || 'Something went wrong' });
};