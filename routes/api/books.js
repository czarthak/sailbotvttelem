// routes/api

const express = require('express');
const router = express.Router();
var size = 0;
const MAX_SIZE = 1;
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
    .catch(err => res.status(404).json({ error: 'No Records found' }));
});

// @route   GET api/five
// @desc    Get five newest entries 
// @access  Public
router.get('/five', (req, res) => {
  Sensor.find().sort({ createdAt: -1 }).limit(5)
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ error: 'No Records found' }));
});

// @route   GET api/latest
// @desc    Get the latest entry
// @access  Public
router.get('/latest', (req, res) => {
  Sensor.findOne().sort({ createdAt: -1 })
    .then(book => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'No Records found' });
      }
    })
    .catch(err => res.status(404).json({ error: 'Unable to find the record' }));
});

// @route   GET api/:id
// @desc    Get single record by id
// @access  Public
router.get('/:id', (req, res) => {
  Sensor.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ error: 'No Records found' }));
});

// @route   POST api
// @desc    Add/save record
// @access  Public
router.post('/', (req, res) => {
  if (size >= MAX_SIZE)
  {
    for (let i = 0; i < 5; i++)
    {
      Sensor.deleteOne().then().catch(err => res.status(404).json({error:'Failed to delete a record'}));
      size -= 1;
    }
  }
  Sensor.create(req.body)
    .then(book => res.json({ msg: 'Record added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this record' }));
  size += 1;
});



// @route   DELETE api/:id
// @desc    Delete record by id
// @access  Public
router.delete('/delete/:id', (req, res) => {
  Sensor.findByIdAndDelete(req.params.id)
    .then(book => res.json({ mgs: 'Sensor Record deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such record found' }));
  size -= 1;
});

// @route   DELETE api
// @desc    Delete all records
// @access  Public
router.delete('/deleteAll', (req, res) => {
  Sensor.deleteMany({})
    .then(() => res.json({ msg: 'All records deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'Unable to delete records' }));
  size = 0;
});

module.exports = router;