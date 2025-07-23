// Importing necessary modules and packages

const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path=require("path");
// const __dirname = path.resolve();

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// const _dirname=path.resolve();
// Middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: [ "https://study-notion-frontend-beige-delta.vercel.app","http://localhost:3000"],
//     credentials: true,
//   })
// );
// const cors = require("cors")

const allowedOrigins = [
  "http://localhost:3000",
  "https://study-notion-frontend-beige-delta.vercel.app",
  "https://study-notion-frontend-ayush-sahas-projects-7fac14ec.vercel.app", // ⬅️ add this
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
require("dotenv").config();



// app.use(express.static(path.join(_dirname,"/client/build")));
// app.get("*",(req,res)=>{
// 	res.sendFile(path.resolve(_dirname,"client","build","index.html"));
// });

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});
console.log("🔥 Backend started - this should show on every restart");

// End of code.
