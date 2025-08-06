"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const votedSectors_controller_1 = require("../controllers/votedSectors.controller");
const votedSectorsRouter = (0, express_1.Router)();
votedSectorsRouter.get('/', votedSectors_controller_1.getDemandingSectors);
votedSectorsRouter.get('/:email', votedSectors_controller_1.getUserSectorVote);
votedSectorsRouter.post('/', votedSectors_controller_1.submitSectorVote);
exports.default = votedSectorsRouter;
