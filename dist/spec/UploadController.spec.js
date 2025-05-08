"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
const path_1 = __importDefault(require("path"));
describe('GET /upload', () => {
    it('يجب أن يعيد رمز حالة 200', async () => {
        const result = await (0, supertest_1.default)(app_1.app).get('/upload');
        expect(result.status).toBe(200);
    });
});
describe('POST /upload', () => {
    it('يجب أن يعيد رمز حالة 200 عند رفع صورة صحيحة', async () => {
        const filePath = path_1.default.join(__dirname, '../../images/full/test.jpg'); // تأكد من أن الملف موجود هنا
        const response = await (0, supertest_1.default)(app_1.app)
            .post('/upload')
            .attach('image', filePath);
        expect(response.status).toBe(200);
        expect(response.body.path).toBeDefined(); // تأكد من أن المسار موجود في الاستجابة
    });
    it('يجب أن يعيد رمز حالة 400 إذا لم يتم رفع ملف', async () => {
        const response = await (0, supertest_1.default)(app_1.app).post('/upload');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No file uploaded');
    });
});
