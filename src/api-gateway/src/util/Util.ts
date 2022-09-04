export default class Util {

    static splitRoute(str: any) {
        if (typeof str === 'string')
            return str.split('/');

        if (str.fast_slash)
            return '';

        let isMatch = str.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);

        return isMatch[1].replace(/\\(.)/g, '$1').split('/');
    }

    static isDefined(data: any): boolean {
        return data !== null;
    }

}