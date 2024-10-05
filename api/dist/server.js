"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const categories_1 = __importDefault(require("./routes/categories"));
const businesses_1 = __importDefault(require("./routes/businesses"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const auth_1 = __importDefault(require("./routes/auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Swagger documentation setup
const swaggerFile = fs_1.default.readFileSync('./swagger.json', 'utf8'); // Read the JSON file
const swaggerDocs = JSON.parse(swaggerFile); // Parse the JSON content
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Routes
app.use('/api/categories', categories_1.default);
app.use('/api/businesses', businesses_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/auth', auth_1.default);
// Error handling middleware
app.use(errorHandler_1.default);
// Start the server
(0, db_1.connectToDb)()
    .then(() => {
    app.listen(db_1.PORT, () => console.log(`Server running on port ${db_1.PORT}`));
})
    .catch((err) => {
    console.error('Failed to connect to the database', err);
});
