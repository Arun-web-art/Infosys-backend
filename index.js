import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
import cors from "cors";
app.use(cors());


import Certificate from "./Model/certificate.js";


app.get("/", (req, res) => {
    const certificate = {
        isuedOn: new Date(),
        issuedTo: "John Doe",
        courseName: "Full Stack Development",
        completedOn: new Date("2023-12-31"),
    }
    
   Certificate.create(certificate)
   .then(doc => {
    res.json(doc);
   })
   .catch(err => {
    res.status(500).send("Error creating certificate");
   });

});

app.get("verify/:id", async (req, res) => {
    const {id} = req.params;
    const certificate  = await mongoose.model("Certificate").findOne({certificateId: id});
    if(!certificate) {
        return res.status(404).send("Certificate not found");
    }
    res.json(certificate); 
});

// ✅ Proper MongoDB connection
mongoose.connect("mongodb+srv://Aaron2405:Playstore8050@arun.spq1bw3.mongodb.net/Infosys", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch(err => {
  console.error("❌ Error connecting to MongoDB:", err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
