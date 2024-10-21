import { createServer, IncomingMessage, ServerResponse } from 'http';
import * as dotenv from 'dotenv';
import { handleGetRequest } from './src/handlers/get.handler';
import { handlePostRequest } from './src/handlers/post.handler';
import { handlePutRequest } from './src/handlers/put.handler';
import { handleDeleteRequest } from './src/handlers/delete.handler';
import { sendError } from './src/services/response.service';

dotenv.config();

const PORT = process.env.PORT || 4000;

const sendResponse = (res: ServerResponse, statusCode: number, message: string | object) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    try {
        switch (req.method) {
            case 'GET': {
                return handleGetRequest(req, res);
            }
            case 'POST': {
                return handlePostRequest(req, res);
            }
            case 'PUT': {
                return handlePutRequest(req, res);
            }
            case 'DELETE': {
                return handleDeleteRequest(req, res);
            }
        }
    } catch (err) {
        sendError(res, 500, 'Internal Server Error');
    }
});

export {server};

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});