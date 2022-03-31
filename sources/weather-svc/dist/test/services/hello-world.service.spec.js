"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_ioc_1 = require("typescript-ioc");
const services_1 = require("../../src/services");
const helper_1 = require("../helper");
describe('Hello World service', () => {
    let app;
    let service;
    beforeAll(() => {
        app = (0, helper_1.buildApiServer)();
        service = typescript_ioc_1.Container.get(services_1.HelloWorldService);
    });
    test('canary test verifies test infrastructure', () => {
        expect(service).not.toBeUndefined();
    });
    describe('Given greeting()', () => {
        context('when "Juan" provided', () => {
            const name = 'Juan';
            test('then return "Hello, Juan!"', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                expect(yield service.greeting(name)).toEqual(`Hello, ${name}!`);
            }));
        });
        context('when no name provided', () => {
            test('then return "Hello, World!"', () => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                expect(yield service.greeting()).toEqual('Hello, World!');
            }));
        });
    });
});
