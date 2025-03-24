// config code
const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/events.model");

// middleware
app.use(express.json());
initializeDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// create events
async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    throw error;
  }
}

app.post("/events", async (req, res) => {
  try {
    const event = await createEvent(req.body);
    if (event) {
      res.json(event);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add event." });
  }
});

async function readAllEvents() {
  try {
    const allEvents = await Event.find();
    return allEvents;
  } catch (error) {
    throw error;
  }
}

app.get("/events", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events) {
      res.json(events);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// server code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});
