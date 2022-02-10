const { getJSONorReject, fetchData } = require('../src/requests');

global.console = {
    error: jest.fn(),
    log: console.log
};

global.fetch = jest.fn();



describe('requests tests', () => {
    describe('getJSONorReject test', () => {
        test('should return null if response is not ok', () => {
            const response = {ok: false};
            expect(getJSONorReject(response)).toBe(null);
        })
        test('should return JSON object if response is ok', () => {
            const response = {
                ok: true,
                json: () => {return {data: 'some data'}}
            };
            expect(getJSONorReject(response)).toStrictEqual({'data': 'some data'});
        })
    })

    describe('fetchData test', () => {

        beforeEach(() => fetch.mockClear());

        test('should print error in console if no network connection', () => {
            fetch.mockImplementationOnce(() => Promise.resolve(new Error('Network error')));

            return fetchData('url', {})
                        .catch((err) => {
                            expect(err).toBe("Error: Network error");
                            expect(console.error).toHaveBeenCalled();
                        })
        });

        test('should resolve null if response is not ok', () => {
            fetch.mockImplementationOnce(() => Promise.resolve({ok: false, json: 'no data'}));

            return expect(fetchData('url', {})).resolves.toBe(null);
        });

        test('should resolve JSON object if response is ok', () => {
            fetch.mockImplementationOnce(() => Promise.resolve(
                {ok: true, 
                json: () => {return {data: 'some data'}}}
                ));

            return expect(fetchData('url', {})).resolves.toStrictEqual({"data": 'some data'});
        })
    })
})