import crypto from 'crypto';
import {config} from 'dotenv';
import {JWE, JWK} from 'node-jose';
import * as jwt from 'jsonwebtoken';

config();

export default class Util {

    static isDefined(data: any): boolean {
        return data !== null;
    }

    static isUndefined(data: any): boolean {
        return data === undefined || typeof data === 'undefined';
    }

    static getApiKey(): string {
        const ARRAY_OF_RANDOM_NUMBER = crypto.randomBytes(50);

        let formatValidString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            chars = formatValidString.repeat(5),
            str = '';

        for (let i = 0; i < ARRAY_OF_RANDOM_NUMBER.length; i++) {
            let decimal = ARRAY_OF_RANDOM_NUMBER[i];
            str += chars[decimal];
        }

        return str.trim();
    }

    static getHashData(data: string, salt: string): string {
        let hash = crypto.pbkdf2Sync(data, salt,
            1000, 64, `sha512`).toString(`hex`);

        return hash.trim();
    }

    static getJwtSign(payload: any, subject: string) {
        const SIGN_OPTIONS = {
            subject: `${subject}`,
            expiresIn: payload.expiresIn,
            algorithm: 'RS256'
        };

        // @ts-ignore
        return jwt.sign(payload, process.env.PRAIVATE_KEY, SIGN_OPTIONS);
    }

    static async getJwtEncrypt(raw: any) {
        let publicKey = await JWK.asKey(process.env.JWT_PUBLIC_KEY, 'pem');
        const buffer = Buffer.from(JSON.stringify(raw));

        return await JWE.createEncrypt(
            {format: 'compact', contentAlg: 'A256GCM', fields: {alg: 'RSA-OAEP'}}, publicKey)
            .update(buffer).final();
    }

}