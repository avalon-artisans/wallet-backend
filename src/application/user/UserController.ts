import {Request, Response} from 'express';

export class UserController {

    getUser (req: Request, res: Response) {
        try {
            res.status(200).json(['Sample response']);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
