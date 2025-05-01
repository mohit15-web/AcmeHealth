import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const signup = async (req, res) => {
  const { email, password, patientName } = req.body;
  if (!email || !password || !patientName) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      patientName,
    });

    const token = jwt.sign(
      { id: newUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({
      token,
      user: { email: newUser.email, patientName: newUser.patientName },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("user", user);
    
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({
        token,
        user: { email: user.email, patientName: user.patientName },
      });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.status(200).json({ email: user.email });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
