import { createServer, IncomingMessage, ServerResponse } from 'http';
import { handleGetRequest } from './src/handlers/get.handler';
import * as dotenv from 'dotenv';
import { handlePostRequest } from './src/handlers/post.handler';
import { handlePutRequest } from './src/handlers/put.handler';
import { handleDeleteRequest } from './src/handlers/delete.handler';

dotenv.config();

const PORT = process.env.PORT || 4000;

const sendResponse = (res: ServerResponse, statusCode: number, message: string | object) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
/*    const [_, resource, userId] = req.url?.split('/') || [];

    console.log('VALUE', )

    if (resource !== 'api' || userId !== 'users') {
        sendResponse(res, 404, { message: 'Endpoint not found' });
        return;
    }*/
    console.log('VALUE', req.method)
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

        /*        default: {
                    return sendNotFound(res);
                }*/
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});