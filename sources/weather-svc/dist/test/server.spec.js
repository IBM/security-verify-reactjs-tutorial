"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = require("../src/server");
describe('server', () => {
    test('canary verifies test infrastructure', () => {
        expect(true).toEqual(true);
    });
    describe('given ApiServer', () => {
        describe('given constructor', () => {
            const apiContext = '/api';
            let apiServer;
            beforeEach(() => {
                apiServer = buildApiServer(apiContext);
            });
            context('when apiContext provided', () => {
                test('then pass apiContext to use()', () => {
                    const useMock = apiServer.getApp().use;
                    expect(useMock.mock.calls[3][0]).toEqual(apiContext);
                });
            });
        });
        describe('given start()', () => {
            let apiServer;
            beforeEach(() => {
                apiServer = buildApiServer();
            });
            context('when address is "::"', () => {
                test('then display localhost', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    const server = {
                        address: jest.fn(),
                    };
                    apiServer.getApp().listen.mockImplementation((port, callback) => {
                        setTimeout(() => {
                            callback();
                        }, 2);
                        return server;
                    });
                    server.address.mockReturnValue({
                        address: '::', port: 1234
                    });
                    expect(yield apiServer.start()).toBe(apiServer);
                }));
            });
        });
        describe('given stop()', () => {
            let apiServer;
            beforeEach(() => {
                apiServer = buildApiServer();
            });
            context('when called if server is not started', () => {
                test('then return immediately', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    const apiServer = new server_1.ApiServer();
                    expect(yield apiServer.stop()).toEqual(false);
                }));
            });
            context('when called after server is started', () => {
                test('then close the server', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    const server = {
                        close: jest.fn(),
                        address: jest.fn(),
                    };
                    apiServer.getApp().listen.mockImplementation((port, callback) => {
                        setTimeout(() => {
                            callback();
                        }, 2);
                        return server;
                    });
                    server.address.mockReturnValue({
                        address: 'localhost', port: 1234
                    });
                    server.close.mockImplementation((callback) => {
                        callback();
                    });
                    yield apiServer.start();
                    expect(yield apiServer.stop()).toEqual(true);
                    expect(server.close).toHaveBeenCalled();
                }));
            });
        });
    });
});
function buildApiServer(apiContext) {
    const app = {
        use: jest.fn(),
        listen: jest.fn(),
    };
    return new server_1.ApiServer(app, apiContext);
}
