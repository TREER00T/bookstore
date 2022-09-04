export default class Response {
    static HTTP_CONTINUE = {
        code: 100,
        message: 'Continue'
    }
    static HTTP_SWITCHING_PROTOCOLS = {
        code: 101,
        message: 'Switching Protocols'
    }
    static HTTP_PROCESSING = {
        code: 102,
        message: 'Processing'
    }
    static HTTP_EARLY_HINTS = {
        code: 103,
        message: 'Early Hints'
    }
    static HTTP_OK = {
        code: 200,
        message: 'OK'
    }
    static HTTP_CREATED = {
        code: 201,
        message: 'Created'
    }
    static HTTP_ACCEPTED = {
        code: 202,
        message: 'Accepted'
    }
    static HTTP_NON_AUTHORITATIVE_INFORMATION = {
        code: 203,
        message: 'Non-Authoritative Information'
    }
    static HTTP_NO_CONTENT = {
        code: 204,
        message: 'No Content'
    }
    static HTTP_RESET_CONTENT = {
        code: 205,
        message: 'Reset Content'
    }
    static HTTP_PARTIAL_CONTENT = {
        code: 206,
        message: 'Partial Content'
    }
    static HTTP_MULTI_STATUS = {
        code: 207,
        message: 'Multi-Status'
    }
    static HTTP_ALREADY_REPORTED = {
        code: 208,
        message: 'Already Reported'
    }
    static HTTP_OK_BUT_TWO_STEP_VERIFICATION = {
        code: 209,
        message: 'OK , But you need to two step verification'
    }
    static HTTP_IM_USED = {
        code: 226,
        message: 'IM Used'
    }
    static HTTP_MULTIPLE_CHOICES = {
        code: 300,
        message: 'Multiple Choices'
    }
    static HTTP_MOVED_PERMANENTLY = {
        code: 301,
        message: 'Moved Permanently'
    }
    static HTTP_FOUND = {
        code: 302,
        message: 'Found'
    }
    static HTTP_SEE_OTHER = {
        code: 303,
        message: 'See Other'
    }
    static HTTP_NOT_MODIFIED = {
        code: 304,
        message: 'Not Modified'
    }
    static HTTP_USE_PROXY = {
        code: 305,
        message: 'Use Proxy'
    }
    static HTTP_TEMPORARY_REDIRECT = {
        code: 307,
        message: 'Temporary Redirect'
    }
    static HTTP_PERMANENTLY_REDIRECT = {
        code: 308,
        message: 'Permanent Redirect'
    }
    static HTTP_BAD_REQUEST = {
        code: 400,
        message: 'Bad Request'
    }
    static HTTP_UNAUTHORIZED = {
        code: 401,
        message: 'Unauthorized'
    }
    static HTTP_PAYMENT_REQUIRED = {
        code: 402,
        message: 'Payment Required'
    }
    static HTTP_FORBIDDEN = {
        code: 403,
        message: 'Forbidden'
    }
    static HTTP_NOT_FOUND = {
        code: 404,
        message: 'Not Found'
    }
    static HTTP_METHOD_NOT_ALLOWED = {
        code: 405,
        message: 'Method Not Allowed'
    }
    static HTTP_NOT_ACCEPTABLE = {
        code: 406,
        message: 'Not Acceptable'
    }
    static HTTP_PROXY_AUTHENTICATION_REQUIRED = {
        code: 407,
        message: 'Proxy Authentication Required'
    }
    static HTTP_REQUEST_TIMEOUT = {
        code: 408,
        message: 'Request Timeout'
    }
    static HTTP_CONFLICT = {
        code: 409,
        message: 'Conflict'
    }
    static HTTP_GONE = {
        code: 410,
        message: 'Gone'
    }
    static HTTP_LENGTH_REQUIRED = {
        code: 411,
        message: 'Length Required'
    }
    static HTTP_PRECONDITION_FAILED = {
        code: 412,
        message: 'Precondition Failed'
    }
    static HTTP_REQUEST_ENTITY_TOO_LARGE = {
        code: 413,
        message: 'Content Too Large'
    }
    static HTTP_REQUEST_URI_TOO_LONG = {
        code: 414,
        message: 'URI Too Long'
    }
    static HTTP_UNSUPPORTED_MEDIA_TYPE = {
        code: 415,
        message: 'Unsupported Media Type'
    }
    static HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = {
        code: 416,
        message: 'Range Not Satisfiable'
    }
    static HTTP_EXPECTATION_FAILED = {
        code: 417,
        message: 'Expectation Failed'
    }
    static HTTP_I_AM_A_TEAPOT = {
        code: 418,
        message: 'I\'m a teapot'
    }
    static HTTP_MISDIRECTED_REQUEST = {
        code: 421,
        message: 'Misdirected Request'
    }
    static HTTP_UNPROCESSABLE_ENTITY = {
        code: 422,
        message: 'Unprocessable Content'
    }
    static HTTP_LOCKED = {
        code: 423,
        message: 'Locked'
    }
    static HTTP_FAILED_DEPENDENCY = {
        code: 424,
        message: 'Failed Dependency'
    }
    static HTTP_TOO_EARLY = {
        code: 425,
        message: 'Too Early'
    }
    static HTTP_UPGRADE_REQUIRED = {
        code: 426,
        message: 'Upgrade Required'
    }
    static HTTP_PRECONDITION_REQUIRED = {
        code: 428,
        message: 'Precondition Required'
    }
    static HTTP_TOO_MANY_REQUESTS = {
        code: 429,
        message: 'Too Many Requests'
    }
    static HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = {
        code: 431,
        message: 'Request Header Fields Too Large'
    }
    static HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = {
        code: 451,
        message: 'Unavailable For Legal Reasons'
    }
    static HTTP_INTERNAL_SERVER_ERROR = {
        code: 500,
        message: 'Internal Server Error'
    }
    static HTTP_NOT_IMPLEMENTED = {
        code: 501,
        message: 'Not Implemented'
    }
    static HTTP_BAD_GATEWAY = {
        code: 502,
        message: 'Bad Gateway'
    }
    static HTTP_SERVICE_UNAVAILABLE = {
        code: 503,
        message: 'Service Unavailable'
    }
    static HTTP_GATEWAY_TIMEOUT = {
        code: 504,
        message: 'Gateway Timeout'
    }
    static HTTP_VERSION_NOT_SUPPORTED = {
        code: 505,
        message: 'HTTP Version Not Supported'
    }
    static HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = {
        code: 506,
        message: 'Variant Also Negotiates'
    }
    static HTTP_INSUFFICIENT_STORAGE = {
        code: 507,
        message: 'Insufficient Storage'
    }
    static HTTP_LOOP_DETECTED = {
        code: 508,
        message: 'Loop Detected'
    }
    static HTTP_NOT_EXTENDED = {
        code: 510,
        message: 'Not Extended'
    }
    static HTTP_NETWORK_AUTHENTICATION_REQUIRED = {
        code: 511,
        message: 'Network Authentication Required'
    }
    static HTTP_UNAUTHORIZED_TOKEN_EXP = {
        code: 519,
        message: 'Unauthorized! Token was expired'
    }
    static HTTP_UNAUTHORIZED_INVALID_TOKEN = {
        code: 800,
        message: 'Unauthorized! Token was invalid'
    }
    static HTTP_TOKEN_OR_API_KEY_WAS_NOT_FOUND = {
        code: 801,
        message: 'Token Or Api-Key was not found!'
    }
    static HTTP_INVALID_JSON_OBJECT_KEY = {
        code: 802,
        message: 'In valid json object key'
    }
    static HTTP_USER_NOT_FOUND = {
        code: 803,
        message: 'User Not Found'
    }
    static HTTP_UNAUTHORIZED_INVALID_API_KEY = {
        code: 804,
        message: 'Unauthorized! Invalid Api Key'
    }
}
