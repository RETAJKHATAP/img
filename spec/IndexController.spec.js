"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../src/app");
const supertest_1 = __importDefault(require("supertest"));
describe('GET / endpoint test', () => {
    it('Should return status code 200', async () => {
        const result = await (0, supertest_1.default)(app_1.app).get('/').send();
        expect(result.status).toBe(200);
    });
});
