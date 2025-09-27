import mongoose from "mongoose";
// Function to generate a random certificate ID
function generateCertificateId() {
  const prefix = "CERT";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit number
  return `${prefix}-${randomNum}`;
}

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    default: generateCertificateId,
    unique: true,
    required: true
  },
  issuedTo: {
    type: String,
    required: true,
    trim: true
  },
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  completedOn: {
    type: Date,
    required: true
  },
  issuanceDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // adds createdAt & updatedAt fields
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
