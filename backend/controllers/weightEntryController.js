import weightEntry from "../models/weightEntry.js";

export const addWeightEntry = async (req, res) => {
  try {
    const { weight, height, date } = req.body;
    const entry = new weightEntry({
      patientId: req.user.id,
      weight,
      height,
      date: date || Date.now(),
    });
    await entry.save();
    res.status(201).json({ entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWeightEntries = async (req, res) => {
  try {
    const entries = await weightEntry
      .find({ patientId: req.user.id })
      .sort({ date: 1 });
    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWeightEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, date } = req.body;

    const updated = await weightEntry.findByIdAndUpdate(
      id,
      { weight, date },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update weight entry" });
  }
};

// ❌ Delete weight entry
export const deleteWeightEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await weightEntry.findOneAndDelete({
      _id: id,
      patientId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete weight entry" });
  }
};
