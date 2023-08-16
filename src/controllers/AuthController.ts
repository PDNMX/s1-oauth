import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import config from '../config';
import { ClientError } from '../exceptions/clientError';
import basicAuth, { BasicAuthResult } from 'basic-auth';
import { UnauthorizedError } from '../exceptions/unauthorizedError';
import { Token, RefreshToken, tokenSchema, refreshTokenSchema } from '../schemas/yup.token'

class AuthController {
    static createToken = async (req: Request, res: Response, next: NextFunction) => {

        // validar el tipo de token
        // console.log(req.body);
        res.type('json').send({ token: 'esto no es un token' });
        return;
        let { username, password } = req.body;
        //if (!(username && password)) throw new ClientError('Username and password are required');

        //const user = getUserByUsername(username);
        const user = { id: '', username: '', role: '' };

        // Check if the provided password matches our encrypted password.
        //if (!user || !(await isPasswordCorrect(user.id, password))) throw new UnauthorizedError("Username and password don't match");

        // Generate and sign a JWT that is valid for one hour.
        const token = sign({ userId: user.id, username: user.username, role: user.role }, config.jwt.secret!, {
            expiresIn: '1h',
            notBefore: '0', // Cannot use before now, can be configured to be deferred.
            algorithm: 'HS256',
            audience: config.jwt.audience,
            issuer: config.jwt.issuer
        });

        // Return the JWT in our response.
        res.type('json').send({ token: token });
    };

    static getHeaderData = (req: Request, res: Response, next: NextFunction) => {
        const { client_id, client_secret } = req.body;
        const { authorization } = req.headers;

        if (typeof authorization === 'string') {
            if (typeof client_id === 'undefined' || client_secret === 'undefined') {
                const client: BasicAuthResult | undefined = basicAuth.parse(authorization);
                req.body.client_id = client?.name;
                req.body.client_secret = client?.pass;
            }
        }

        return next();
    }

    static validationRequestToken = async (req: Request, res: Response, next: NextFunction) => {

    }


    static validationRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { grant_type } = req.body;

        if (typeof grant_type === 'undefined') throw new UnauthorizedError('e_4003', 'Informacion de autenticación incompleta o erronea', 'grant_type es requerido.');

        try {
            if (grant_type === 'password') {
                await tokenSchema.validate(req.body);
                return next();
            } else if (grant_type === 'refresh_token') {
                await refreshTokenSchema.validate(req.body);
                return next();
            }
        } catch (err: object | any) {
            throw new UnauthorizedError('e_4001', 'Informacion de autenticación incompleta o erronea', err.errors);
        }

        throw new UnauthorizedError('e_4003', 'Informacion de autenticación incompleta o erronea', `grant_type: ${grant_type} no soportado`);
    }
}

export default AuthController;
