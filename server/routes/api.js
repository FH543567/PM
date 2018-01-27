const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const HttpStatus = require('http-status-codes');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'mfj123',
	database: 'pm'
});

//connection.connect();
connection.connect(function () {
	console.log("Database connected");
});


// Error handling
const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err;
	res.status(501).json(response);
};

// Response handling
let response = {
	status: 200,
	data: [],
	message: null
};

///////////
// EPICS //
///////////
//----------------------------------------------------------------------
// GET /epics
//----------------------------------------------------------------------
router.get('/epics', (req, res) => {

	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM epic', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /epics/:id
//----------------------------------------------------------------------
router.get('/epics/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');

	connection.query('SELECT * FROM epic WHERE EpicID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /epics
//----------------------------------------------------------------------
router.post('/epics', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

	connection.query('INSERT INTO epic SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /epics
//----------------------------------------------------------------------
router.put('/epics', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

	connection.query('REPLACE INTO epic SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /epics/:id
//----------------------------------------------------------------------
router.delete('/epics/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

	connection.query('DELETE FROM epic WHERE EpicID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});






/////////////
// Stories //
/////////////
//----------------------------------------------------------------------
// GET /stories
//----------------------------------------------------------------------
router.get('/stories', (req, res) => {

	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM story', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /stories/:id
//----------------------------------------------------------------------
router.get('/stories/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');

	connection.query('SELECT * FROM story WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /stories/byEpic/:id
//----------------------------------------------------------------------
router.get('/stories/byEpic/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Stories with EpicID = ', req.params.id + ' requested');

	connection.query('SELECT * FROM story WHERE EpicID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /stories
//----------------------------------------------------------------------
router.post('/stories', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

	connection.query('INSERT INTO story SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /stories
//----------------------------------------------------------------------
router.put('/stories', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

	connection.query('REPLACE INTO story SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /stories/:id
//----------------------------------------------------------------------
router.delete('/stories/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

	connection.query('DELETE FROM story WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});




///////////
// Tasks //
///////////
//----------------------------------------------------------------------
// GET /tasks
//----------------------------------------------------------------------
router.get('/tasks', (req, res) => {

	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM task', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /tasks/:id
//----------------------------------------------------------------------
router.get('/tasks/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');

	connection.query('SELECT * FROM task WHERE TaskID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /tasks/byStory/:id
//----------------------------------------------------------------------
router.get('/tasks/byStory/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Tasks with StoryID = ', req.params.id + ' requested');

	connection.query('SELECT * FROM task WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /tasks
//----------------------------------------------------------------------
router.post('/tasks', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

	connection.query('INSERT INTO task SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /tasks
//----------------------------------------------------------------------
router.put('/tasks', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

	connection.query('REPLACE INTO task SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /tasks/:id
//----------------------------------------------------------------------
router.delete('/tasks/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

	connection.query('DELETE FROM task WHERE TaskID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});






/////////////
// Sprints //
/////////////
//----------------------------------------------------------------------
// GET /sprints
//----------------------------------------------------------------------
router.get('/sprints', (req, res) => {

	console.log('Express: got HTTP-Get from client. All Objects requested');

	connection.query('SELECT * FROM sprint', function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// GET /sprints/:id
//----------------------------------------------------------------------
router.get('/sprints/:id', (req, res) => {

	console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');

	connection.query('SELECT * FROM sprint WHERE SprintID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// POST /sprints
//----------------------------------------------------------------------
router.post('/sprints', (req, res) => {

	console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

	connection.query('INSERT INTO sprint SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// PUT /sprints
//----------------------------------------------------------------------
router.put('/sprints', (req, res) => {

	console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

	connection.query('REPLACE INTO sprint SET ?', req.body, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});

//----------------------------------------------------------------------
// DELETE /sprints/:id
//----------------------------------------------------------------------
router.delete('/sprints/:id', (req, res) => {

	console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

	connection.query('DELETE FROM sprint WHERE SprintID = ?', req.params.id, function (err, rows, fields) {
		if (err) {
			console.error("Error occured on Express-Server: " + err.message)
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
			//throw err;
		} else {
		res.send(rows);
		}
	});
});
module.exports = router;
