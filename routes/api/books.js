// routes/api

const express = require('express');
const router = express.Router();

// Load Sensor model
const Sensor = require('../../models/Books');

// @route   GET api/test
// @desc    Tests route
// @access  Public
router.get('/test', (req, res) => res.send('sensor route testing!'));

// @route   GET api
// @desc    Get all 
// @access  Public
router.get('/', (req, res) => {
  Sensor.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Records found' }));
});

// @route   GET api/:id
// @desc    Get single record by id
// @access  Public
router.get('/:id', (req, res) => {
  Sensor.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ nobookfound: 'No Records found' }));
});

// @route   POST api
// @desc    Add/save record
// @access  Public
router.post('/', (req, res) => {
  Sensor.create(req.body)
    .then(book => res.json({ msg: 'Record added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this record' }));
});



// @route   DELETE api/:id
// @desc    Delete record by id
// @access  Public
router.delete('/delete/:id', (req, res) => {
  Sensor.findByIdAndDelete(req.params.id)
    .then(book => res.json({ mgs: 'Sensor Record deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such record found' }));
});

// @route   DELETE api
// @desc    Delete all records
// @access  Public
router.delete('/deleteAll', (req, res) => {
  Sensor.deleteMany({})
    .then(() => res.json({ msg: 'All records deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'Unable to delete records' }));
});

module.exports = router;