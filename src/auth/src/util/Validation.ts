import Util from './Util';

export default class Validation {

    static isValidHttpMethod(requestMethod: string): boolean {

        const arrayOfHttpMethods = [
            'GET',
            'PUT',
            'POST',
            'PATCH',
            'DELETE'
        ];

        return arrayOfHttpMethods.includes(requestMethod);
    }

    static requestRouteHandler(url: string, app: any) {

        let arrayOfRouteWithOutAuth = [
            '/api/auth/generate/user'
        ];

        let arrayOfRoute: string[] = [];


        function print(path: any, layer: any) {
            if (layer.route)
                layer.route.stack.forEach(print.bind(null, path.concat(Util.splitRoute(layer.route.path))));


            if (layer.name === 'router' && layer.handle.stack)
                layer.handle.stack.forEach(print.bind(null, path.concat(Util.splitRoute(layer.regexp))));


            if (layer.method)
                arrayOfRoute.push('/' + path.concat(Util.splitRoute(layer.regexp)).filter(Boolean).join('/'));
        }

        app._router.stack.forEach(print.bind(null, []));

        arrayOfRoute = arrayOfRoute.filter((el) => !arrayOfRouteWithOutAuth.includes(el));

        let isRouteWithoutAuth = arrayOfRouteWithOutAuth.includes(url);

        if (isRouteWithoutAuth)
            return '';

        let isRouteInAuthArr = arrayOfRoute.includes(url);

        if (isRouteInAuthArr)
            return 'AuthRoute';

        return 'NotFound';
    }

}