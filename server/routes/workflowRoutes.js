
const express = require("express");
const workflowController = require("../controllers/workflowController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(workflowController.getAllWorkflows) 
  .post(workflowController.createWorkflow);

router
  .route("/:id")
  .get(workflowController.getWorkflow)
  .patch(workflowController.updateWorkflow)
  .delete(workflowController.deleteWorkflow);
 
module.exports = router;
