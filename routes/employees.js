const express = require('express');
const { employeeValidationRules, validate } = require('../validator.js');

const router = express.Router();

const employeesController = require('../controllers/employees');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);
router.post('/', employeeValidationRules(), validate, employeesController.createEmployee);
router.put('/:id', employeeValidationRules(), validate, employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;