import weightEntry from "../models/weightEntry";


export const addWeightEntry = async(req, res) => {
    try {
        const {weight, height, date} = req.body;
        const entry = new weightEntry({
            patientId: req.user.id,
            weight,
            height,
            date: date || Date.now()
        })
        await entry.save();
        res.status(201).json({entry});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getWeightEntries = async(req, res) => {
    try {
        const entries = await weightEntry.find({patientId: req.user.id}).sort({date: 1});
        res.status(200).json({entries});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}