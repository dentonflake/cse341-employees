
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllEmployees = async (req, res) => {

  // #swagger.tags=['Employees']

  try {

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('employees')
      .find();
    
    const employees = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(employees);

  } catch (err) {

    res
      .status(500)
      .send({
        message:
          err.message || 'Some error occurred while getting all employees.',
      });
  }
}

const getEmployeeById = async (req, res) => {

  // #swagger.tags=['Employees']

  try {

    const _id = new ObjectId(req.params.id)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('employees')
      .find({ _id });
    
    const employees = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(employees[0]);
      
  } catch (err) {

    res
      .status(500)
      .send({
        message:
          err.message || 'Some error occurred while getting the employee by id.',
      });
  }
}

const createEmployee = async (req, res) => {

  // #swagger.tags=['Employees']

  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    jobTitle: req.body.jobTitle,
    salary: req.body.salary,
    hireDate: req.body.hireDate
  }

  const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while creating the employee.')
  }
}

const updateEmployee = async (req, res) => {

  // #swagger.tags=['Employees']

  const employeeId = new ObjectId(req.params.id);

  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    jobTitle: req.body.jobTitle,
    salary: req.body.salary,
    hireDate: req.body.hireDate
  }

  const response = await mongodb.getDatabase().db().collection('employees').replaceOne(
    { _id: employeeId },
    employee
  );

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while updating the employee.')
  }
}

const deleteEmployee = async (req, res) => {

  // #swagger.tags=['Employees']
  
  const employeeId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while deleting the employee.')
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
}