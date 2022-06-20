import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureClientAuth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: 'Missing token',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { sub } = verify(token, '1232193129sadasbvhj431b31j') as IPayload;

        request.id_client = sub;

        return next();
    } catch (error) {
        return response.status(401).json({
            message: 'Invalid token',
        });
    }
}