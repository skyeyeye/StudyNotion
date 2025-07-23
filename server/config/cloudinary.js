// // import { v2 as cloudinary } from "cloudinary"; //! Cloudinary is being required
// const cloudinary = require("cloudinary").v2;

// export function cloudinaryConnect() {
// 	try {
// 		cloudinary.config({
// 			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
// 			cloud_name: process.env.CLOUD_NAME,
// 			api_key: process.env.API_KEY,
// 			api_secret: process.env.API_SECRET,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// }
const cloudinary = require("cloudinary").v2;

function cloudinaryConnect() {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("Cloudinary connected");
	} catch (error) {
		console.error("Cloudinary connection failed:", error);
	}
}

module.exports = { cloudinaryConnect };
