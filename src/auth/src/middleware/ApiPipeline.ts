export default class ApiPipeline {

    static isSetUserApiKey(key: string): boolean {
        return key !== undefined;
    }


    static isValidApiKey(key: string, phone: string, cb: Function) {

        // getApiKey(phone, result => {
        //
        //     if (result !== key) {
        //         return cb(false);
        //     }
        //
        //     cb(true);
        // });

    }

}