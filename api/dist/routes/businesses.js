"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const businesses_1 = require("../controllers/businesses");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
// GET /businesses
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.getAllBusinesses)(req, res);
}));
// GET /businesses/category/:category
router.get('/category/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.getBusinessesByCategory)(req, res);
}));
// GET /businesses/:id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.getBusinessById)(req, res);
}));
// POST /businesses
router.post('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.createBusiness)(req, res);
}));
// PUT /businesses/:id
router.put('/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.updateBusiness)(req, res);
}));
// GET /businesses/:businessId/bookings/date/:date
router.get('/:businessId/bookings/date/:date', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, businesses_1.getBookingsByBusinessAndDate)(req, res);
}));
// Export the router
exports.default = router;
