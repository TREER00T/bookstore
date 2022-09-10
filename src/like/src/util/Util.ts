export default class Util {

    static isDefined(data: any): boolean {
        return data !== null;
    }

    static isUndefined(data: any): boolean {
        if (typeof data === 'number' || typeof data === 'boolean' || typeof data === 'bigint')
            return true;
        return data === undefined || data === null || typeof data === 'undefined' || data?.length < 1;
    }

}