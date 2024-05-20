// models/Waypoint.js

const { integer } = require('mongodb');
const mongoose = require('mongoose');

const WaypointSchema = new mongoose.Schema({
  w: {
    type: String,
    required: false
  },
  kind: {
    type: Number,
    required: false
  }
}, {timestamps : true});

module.exports = Waypoint = mongoose.model('waypoint', WaypointSchema);