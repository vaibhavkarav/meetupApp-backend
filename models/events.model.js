const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  hostedBy: { type: String, required: true },
  dayAndDate: { type: String, required: true },
  peopleAttending: { type: Number, required: true },
  isFree: { type: Boolean, required: true },
  eventThumbnailUrl: { type: String, required: true },
  isOnline: { type: Boolean, required: true },
  details: String,
  speakerDetails: [{ name: String, position: String, imageUrl: String }],
  address: String,
  city: String,
  state: String,
  startTime: String,
  endTime: String,
  eventTags: [String],
  eventPosterUrl: String,
});

const Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
