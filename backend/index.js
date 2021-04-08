const fs = require('fs');
const AWS = require('aws-sdk');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 4000;
const multer = require('multer');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
app.use(cors());
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/upload', upload.single('file'), function (req, res) {
	const file = req.file;
	const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

	//Where you want to store your file
	console.log('file', req.file);
	var params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: file.originalname,
		Body: file.buffer,
		ContentType: file.mimetype,
		ACL: 'public-read',
	};

	s3.upload(params, function (err, data) {
		if (err) {
			console.log(err);
			res.status(500).json({ error: true, Message: err });
		} else {
			res.status(200);
			res.send({ Message: 'Uploaded Successfully' });
		}
	});
});

// app.get('/list', function (req, res) {
// 	let bucketParams = {
// 		Bucket: process.env.AWS_BUCKET_NAME,
// 	};
// 	s3.listObjects(bucketParams, function (err, data) {
// 		if (err) {
// 			console.log('Error', err);
// 		} else {
// 			console.log('Success', data);
// 			let fileData = {};
// 			let i = 0;
// 			while (i < data.Contents.length) {
// 				var params = { ...bucketParams, Key: data.Contents[i].Key };

// 				s3.getObject(params)
// 					.createReadStream()
// 					.on('error', function (err) {
// 						res.status(500).json({ error: 'Error -> ' + err });
// 					})
// 					.pipe(res)

// 					.on('end', (data) => {
// 						res.status(200).json({ data: data });
// 					});
// 					i++
// 			}

// 			// console.log(res.body)
// 		}
// 	});
// });

app.get('/list', function (req, res) {
	let bucketParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
	};
	s3.listObjects(bucketParams, async function (err, data) {
		if (err) {
			console.log('Error', err);
			res.status(500).json({ error: true, Message: err });
		} else {
			console.log('Success', data.Contents);
			let files = [];
			for (let i = 0; i < data.Contents.length; i++) {
				var params = { ...bucketParams, Key: data.Contents[i].Key };
				s3.getSignedUrl('getObject', params, function (err, url) {
					files.push({ url: url, name: data.Contents[i].Key,id:data.Contents[i].ETag });
					if (files.length == data.Contents.length) {
						res.status(200).json({ files });
					}
				});
			}
		}
	});
});
downloadedFiles = (data) => {};
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
