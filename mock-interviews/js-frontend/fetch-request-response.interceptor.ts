/**
 * Add a request and response interceptor method to fetch that can be used to monitor each request and response.
 */

type RequestInterceptorResponse = [
    string | URL | Request,
    RequestInit | undefined,
];
type RequestInterceptor = (
    input: string | URL | Request,
    init?: RequestInit
) => RequestInterceptorResponse;

type ResponseInterceptor = (response: Response) => Response;

class CustomFetchService {
    private requestInterceptors: RequestInterceptor[] = [];
    private responseInterceptors: ResponseInterceptor[] = [];

    public registerRequestInterceptor(interceptor: RequestInterceptor) {
        this.requestInterceptors.push(interceptor);
    }

    public registerResponseInterceptor(interceptor: ResponseInterceptor) {
        this.responseInterceptors.push(interceptor);
    }

    public async fetch(
        input: string | URL | Request,
        init?: RequestInit
    ): Promise<Response> {
        [input, init] = this.executeRequestInterceptors([input, init]);

        const response = await fetch(input, init);

        return this.executeResponseInterceptors(response);
    }

    private executeRequestInterceptors(
        args: RequestInterceptorResponse
    ): RequestInterceptorResponse {
        return this.requestInterceptors.reduce((acc, interceptor) => {
            return interceptor(...acc);
        }, args);
    }

    private executeResponseInterceptors(response: Response): Response {
        return this.responseInterceptors.reduce((acc, interceptor) => {
            return interceptor(acc);
        }, response);
    }
}

const runCode = async () => {
    const customFetch = new CustomFetchService();

    customFetch.registerRequestInterceptor(
        (...args: RequestInterceptorResponse) => {
            console.log('Request Initiated for ', args[0]);
            return args;
        }
    );

    customFetch.registerRequestInterceptor(
        (...args: RequestInterceptorResponse) => {
            console.log('Updating headers for', args[0]);
            args[1] = args[1] || {};
            args[1].headers = [['custom_header', 'custom_header_value']];
            return args;
        }
    );

    customFetch.registerRequestInterceptor(
        (...args: RequestInterceptorResponse) => {
            console.log(
                'Transformed Request ',
                args[0],
                JSON.stringify(args[1], null, 2)
            );
            return args;
        }
    );

    customFetch.registerResponseInterceptor((response: Response) => {
        console.log('Response interceptor called');
        return response;
    });

    const resp = await customFetch.fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
    );
    const json = await resp.json();
    console.log('run test', json);
};

runCode();
