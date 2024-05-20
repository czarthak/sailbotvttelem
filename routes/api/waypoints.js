// routes/api/wp

const express = require('express');
const router = express.Router();
var size = 0;

let oneSize = 0;
let twoSize = 0;
MAX_SIZE = 20;

// Load Waypoint model
const Waypoint = require('../../models/Waypoints');
const Waypoints = require('../../models/Waypoints');

// @route   GET api/wp/test
// @desc    Tests route
// @access  Public
router.get('/test', (req, res) => res.send('waypoint route testing!'));



// @route   GET api/wp/one
// @desc    Gets latest entry of type 1 
// @access  Public
router.get('/one', (req, res) => {
  Waypoint.findOne({kind: 1}).sort({ createdAt: -1})
    .then(waypoints => res.json(waypoints))
    .catch(err => res.status(404).json({ error: 'No Waypoints found' }));
});

// @route   GET api/wp/two
// @desc    Gets latest entry of type 2 
// @access  Public
router.get('/two', (req, res) => {
  Waypoint.findOne({kind: 2}).sort({ createdAt: -1})
    .then(waypoints => res.json(waypoints))
    .catch(err => res.status(404).json({ error: 'No Waypoints found' }));
});

// @route   GET api/wp/one/all
// @desc    Gets all entries of type 1 
// @access  Public
router.get('/one/all', (req, res) => {
  Waypoint.find({kind: 1}).sort({ createdAt: -1})
    .then(waypoints => res.json(waypoints))
    .catch(err => res.status(404).json({ error: 'No Waypoints found' }));
});

// @route   GET api/wp/two/all
// @desc    Gets all entries of type 2 
// @access  Public
router.get('/two/all', (req, res) => {
  Waypoint.find({kind: 2}).sort({ createdAt: -1})
    .then(waypoints => res.json(waypoints))
    .catch(err => res.status(404).json({ error: 'No Waypoints found' }));
});


// @route   POST api/wp/one
// @desc    Add/save record
// @access  Public
router.post('/one', async (req, res) => {
  if (oneSize >= MAX_SIZE)
  {
    try 
    {
      const oldestOne = await Waypoint.findOne({ kind: 1}).sort({ createdAt: 1 });
      if (oldestOne)
      {
        await Waypoint.findByIdAndDelete(oldestOne._id);
        oneSize--;
      }
    }
    catch (err) 
    {
      return res.status(500).json({ message: 'Error removing oldest waypoint'});
    }
  }
  const waypoint = new Waypoint({
        w: req.body.w,
        kind: 1
    });

  try {
    const newWaypoint = waypoint.save();
    oneSize++;
    res.status(200).json({ message: 'Waypoint added successfully'});
  }
  catch (err) 
  {
    res.status(400).json({ message: 'Unable to add waypoint'});
  }
});

// @route   POST api/wp/two
// @desc    Add/save record
// @access  Public
router.post('/two', async (req, res) => {
  if (twoSize >= MAX_SIZE)
  {
    try 
    {
      const oldestOne = await Waypoint.findOne({ kind: 2}).sort({ createdAt: 1 });
      if (oldestOne)
      {
        await Waypoint.findByIdAndDelete(oldestOne._id);
        oneSize--;
      }
    }
    catch (err) 
    {
      return res.status(500).json({ message: 'Error removing oldest waypoint'});
    }
  }
  const waypoint = new Waypoint({
        w: req.body.w,
        kind: 2
    });

  try {
    const newWaypoint = waypoint.save();
    twoSize++;
    res.status(200).json({ message: 'Waypoint added successfully'});
  }
  catch (err) 
  {
    res.status(400).json({ message: 'Unable to add waypoint'});
  }
});

// @route   DELETE api/wp
// @desc    Delete all records
// @access  Public
router.delete('/deleteAll', (req, res) => {
  Waypoint.deleteMany({})
    .then(() => res.json({ msg: 'All waypoints of all types deleted successfully' }))
    .catch(err => res.status(500).json({ error: 'Unable to delete waypoints' }));
  size = 0;
});

module.exports = router;