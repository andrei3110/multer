const express = require('express')
const path = require('path');
const multer = require('multer');
const app = express();

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/img');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
let upload = multer({ storage: storage });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', upload.single('file'), (req, res, next) => {
	const file = req.file;
	console.log(file);

	if (!file) {
		res.send(file);
	}

	res.redirect('/');
});
