import {Response} from "express";

let res: Response;

type ResponseObject = {
    code: number,
    message: string
}

export default class Json {

    static builder(obj: ResponseObject, data?: any, option?: any): any {
        if (typeof res !== 'undefined') {
            let jsonContent = this.jsonObject(obj, data, option);
            res.status(obj.code).send(jsonContent);
            return true;
        }
        return this.jsonObject(obj, data, option);
    }


    static initializationRes(response: Response): void {
        res = response;
    }

    static jsonObject(obj: ResponseObject, data?: any, option?: any): any {
        if (typeof option !== 'undefined')
            return (data != null) ? {
                code: `${obj.code}`,
                message: `${obj.message}`,
                data: data,
                option: option
            } : obj;

        return (typeof data != 'undefined') ? {
            code: `${obj.code}`,
            message: `${obj.message}`,
            data: data
        } : obj;
    }

}