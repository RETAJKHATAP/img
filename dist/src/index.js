"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 8000;
app_1.app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
