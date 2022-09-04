import Validation from '../util/Validation';
import Db from '../model/Db';

let tokenPayload: any;

export default class ApiPipeline {

    static isSetUserApiKey(key: string): boolean {
        return key !== undefined;
    }


    static isValidApiKey(apiKey: string, id: string, cb: Function) {

        Db.isValidUserApikey(id, apiKey).then(result => {
            cb(result);
        }).then(() => Db.close());

    }

    static tokenVerify(bearerHeader: string): boolean {

        let isSetUserToken = Validation.getSplitBearerJwt(bearerHeader);

        if (typeof isSetUserToken !== 'string')
            return false;

        (async () => {

            let token = await Validation.getJwtDecrypt(isSetUserToken);

            Validation.getJwtVerify(token, (decode: any) => {

                if (decode.type === 'rt' || 'at') {

                    (function (cb) {
                        if (typeof cb === 'function')
                            cb(decode)
                    })(tokenPayload);
                }

            });

        })();

        return true;
    }

    static getTokenPayLoad(cb: Function) {
        tokenPayload = ((data: any) => {
            cb(data);
        });
    }

}