const User = require('../models/userModel');
const catchAsyncError = require('../middleware/CatchAsyncErrors');

// Upsert a user by email. If exists, update profile and lastLogin; otherwise create.
exports.upsertUser = catchAsyncError(async (req, res, next) => {
  const { name, email, photoURL, role, createdAt, lastLogin } = req.body;

  if (!email || !name) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const update = {
    name,
    photoURL: photoURL || '',
    role: role || 'patient',
    // Prefer provided timestamps if sent from client for consistency
    lastLogin: lastLogin ? new Date(lastLogin) : new Date(),
  };

  const options = { new: true, upsert: true, setDefaultsOnInsert: true };

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: update, $setOnInsert: { createdAt: createdAt ? new Date(createdAt) : new Date() } },
    options
  );

  res.status(200).json({ success: true, data: user });
});


