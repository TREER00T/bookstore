import crypto from "crypto";

export default class Util {

    static isDefined(data: any): boolean {
        return data !== null;
    }

    static isUndefined(data: any): boolean {
        if (typeof data === 'number' || typeof data === 'boolean' || typeof data === 'bigint')
            return true;
        return data === undefined || data === null || typeof data === 'undefined' || data?.length < 1;
    }

    static formatBytes(realSize: number): string {

        const DECIMAL_LENGTH = 2,
            PACKET_SIZE = 1024;

        let formatTypeOfFileSize = Math.floor(Math.log(realSize) / Math.log(PACKET_SIZE));

        return 0 === realSize ?
            '0 Byte' :
            parseFloat((realSize / Math.pow(PACKET_SIZE, formatTypeOfFileSize))
                .toFixed(Math.max(0, DECIMAL_LENGTH))) + ' ' +
            ['Bytes', 'KB', 'MB', 'GB'][formatTypeOfFileSize];
    }

    static getFileHashName(): string {
        const ARRAY_OF_RANDOM_NUMBER = crypto.randomBytes(30);

        let formatValidString = '0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
            chars = formatValidString.repeat(5),
            str = '';

        for (let i = 0; i < ARRAY_OF_RANDOM_NUMBER.length; i++) {
            let decimal = ARRAY_OF_RANDOM_NUMBER[i];
            str += chars[decimal];
        }

        return str.trim();
    }

}