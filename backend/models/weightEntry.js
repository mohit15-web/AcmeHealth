import mongoose from "mongoose";

const weightEntrySchema = mongoose.Schema({
    patientId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    date: { type: Date, default: Date.now },
    weight:{type: Number, required: true},
    height:{type:Number}
})

export default mongoose.model("WeightEntry", weightEntrySchema);