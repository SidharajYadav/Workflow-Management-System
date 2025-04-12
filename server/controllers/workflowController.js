const Workflow = require("../models/Workflow");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllWorkflows = catchAsync(async (req, res, next) => {
  const workflows = await Workflow.find({ createdBy: req.user.id });

  res.status(200).json({
    status: "success",
    results: workflows.length,
    data: {
      workflows, 
    },
  });
});

exports.getWorkflow = catchAsync(async (req, res, next) => {
  const workflow = await Workflow.findOne({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!workflow) {
    return next(new AppError("No workflow found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      workflow,
    },
  });
});

exports.createWorkflow = catchAsync(async (req, res, next) => {
  const newWorkflow = await Workflow.create({
    name: req.body.name,
    description: req.body.description,
    steps: req.body.steps,
    createdBy: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      workflow: newWorkflow,
    },
  });
});

exports.updateWorkflow = catchAsync(async (req, res, next) => {
  const workflow = await Workflow.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user.id,
    },
    {
      name: req.body.name,
      description: req.body.description,
      steps: req.body.steps,
      lastEditedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!workflow) {
    return next(new AppError("No workflow found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      workflow,
    },
  });
});

exports.deleteWorkflow = catchAsync(async (req, res, next) => {
  const workflow = await Workflow.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.id,
  });

  if (!workflow) {
    return next(new AppError("No workflow found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
