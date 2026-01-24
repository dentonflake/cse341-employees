const express = require('express');
const { employeeValidationRules, validate } = require('../validator.js');

const router = express.Router();

const employeesController = require('../controllers/employees');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);
router.post('/', isAuthenticated, employeeValidationRules(), validate, employeesController.createEmployee);
router.put('/:id', isAuthenticated, employeeValidationRules(), validate, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports = router;
