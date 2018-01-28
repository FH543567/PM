const express = require('express');
const router = express.Router();
var mysql = require('mysql');
const HttpStatus = require('http-status-codes');
require('dotenv').config()

const DBHost = process.env.DATABASE_URL || 'localhost';

var pool = mysql.createPool({
	//'mysql://bd10f96685d9c8:8203766d@eu-cdbr-west-02.cleardb.net/heroku_57b74cfd3c406d8'

  /*
	//HEROKU
	host: 'eu-cdbr-west-02.cleardb.net',
	user: 'bd10f96685d9c8',
	password: '8203766d',
	database: 'heroku_57b74cfd3c406d8'
  */

	// LOKAL
	host: 'localhost',
	user: 'root',
	password: 'mfj123',
	database: 'pm'

	/*
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATA
	*/

});

/*
connection.connect(function () {
	console.log("Database connected");
});
*/


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

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /epics/:id
//----------------------------------------------------------------------
router.get('/epics/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /epics
//----------------------------------------------------------------------
router.post('/epics', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /epics
//----------------------------------------------------------------------
router.put('/epics', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /epics/:id
//----------------------------------------------------------------------
router.delete('/epics/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});






/////////////
// Stories //
/////////////
//----------------------------------------------------------------------
// GET /stories
//----------------------------------------------------------------------
router.get('/stories', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /stories/:id
//----------------------------------------------------------------------
router.get('/stories/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /stories/byEpic/:id
//----------------------------------------------------------------------
router.get('/stories/byEpic/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /stories
//----------------------------------------------------------------------
router.post('/stories', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /stories
//----------------------------------------------------------------------
router.put('/stories', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /stories/:id
//----------------------------------------------------------------------
router.delete('/stories/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Delete from client. story with id=', req.params.id + ' gets deleted');

		connection.query('DELETE FROM story WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});




///////////
// Tasks //
///////////
//----------------------------------------------------------------------
// GET /tasks
//----------------------------------------------------------------------
router.get('/tasks', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Tasks requested');

		connection.query('SELECT * FROM task', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /tasks/:id
//----------------------------------------------------------------------
router.get('/tasks/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Task with id = ', req.params.id + ' requested');

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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /tasks/byStory/:id
//----------------------------------------------------------------------
router.get('/tasks/byStory/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /tasks/bySprint/:id
//----------------------------------------------------------------------
router.get('/tasks/bySprint/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Tasks with SprintID = ', req.params.id + ' requested');

		connection.query('SELECT * FROM task WHERE SprintID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /tasks
//----------------------------------------------------------------------
router.post('/tasks', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /tasks
//----------------------------------------------------------------------
router.put('/tasks', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

		connection.query('REPLACE INTO task SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				connection.query('SELECT * FROM task WHERE TaskID = ?', req.body.TaskID, function (err, rows, fields) {
					if (err) {
						console.error("Error occured on Express-Server: " + err.message)
						res.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.send({ error: err, message: err.message });
						//throw err;
					} else {
						res.send(rows);
					}
				})
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /tasks/:id
//----------------------------------------------------------------------
router.delete('/tasks/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});






/////////////
// Sprints //
/////////////
//----------------------------------------------------------------------
// GET /sprints
//----------------------------------------------------------------------
router.get('/sprints', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /sprints/:id
//----------------------------------------------------------------------
router.get('/sprints/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /sprints
//----------------------------------------------------------------------
router.post('/sprints', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /sprints
//----------------------------------------------------------------------
router.put('/sprints', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /sprints/:id
//----------------------------------------------------------------------
router.delete('/sprints/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
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
		connection.release();
		if (err) console.log(err.message);
	});
});

////////////////////
// Sprint-History //
////////////////////
//----------------------------------------------------------------------
// GET /history
//----------------------------------------------------------------------
router.get('/history', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Objects requested');

		connection.query('SELECT * FROM history ORDER BY Date ASC', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});







///////////
// USERS //
///////////
//----------------------------------------------------------------------
// GET /users
//----------------------------------------------------------------------
router.get('/users', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Objects requested');

		connection.query('SELECT * FROM user', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /users/:id
//----------------------------------------------------------------------
router.get('/users/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Object with id = ', req.params.id + ' requested');

		connection.query('SELECT * FROM user WHERE UserID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /users/username/:uname
//----------------------------------------------------------------------
router.get('/users/username/:uname', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. User with uname = ', req.params.uname + ' requested');

		connection.query('SELECT * FROM user WHERE Username = ?', req.params.uname, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /users
//----------------------------------------------------------------------
router.post('/users', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

		connection.query('INSERT INTO user SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				connection.query('SELECT * FROM user WHERE Username = ? AND Password = ?', [req.body.Username, req.body.Password], function (err, rows, fields) {
					if (err) {
						console.error("Error occured on Express-Server: " + err.message)
						res.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.send({ error: err, message: err.message });
						//throw err;
					} else {
						res.send(rows);
					}
				});
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /users
//----------------------------------------------------------------------
router.put('/users', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

		connection.query('REPLACE INTO user SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /users/:id
//----------------------------------------------------------------------
router.delete('/users/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

		connection.query('DELETE FROM user WHERE UserID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});





////////////////////
// Poker-Planning //
////////////////////


////////////
// Pokers //
////////////
//----------------------------------------------------------------------
// GET /pokers
//----------------------------------------------------------------------
router.get('/pokers', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Pokers requested');

		connection.query('SELECT * FROM poker', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /pokers/:id
//----------------------------------------------------------------------
router.get('/pokers/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Poker with id = ', req.params.id + ' requested');

		connection.query('SELECT * FROM poker WHERE PokerID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /pokers
//----------------------------------------------------------------------
router.post('/pokers', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

		connection.query('INSERT INTO poker SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /pokers
//----------------------------------------------------------------------
router.put('/pokers', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

		connection.query('REPLACE INTO poker SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				connection.query('SELECT * FROM poker WHERE PokerID = ?', req.body.PokerID, function (err, rows, fields) {
					if (err) {
						console.error("Error occured on Express-Server: " + err.message)
						res.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.send({ error: err, message: err.message });
						//throw err;
					} else {
						res.send(rows);
					}
				})
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /pokers/:id
//----------------------------------------------------------------------
router.delete('/pokers/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

		connection.query('DELETE FROM poker WHERE PokerID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});








//////////////
// Messages //
//////////////
//----------------------------------------------------------------------
// GET /messages
//----------------------------------------------------------------------
router.get('/messages', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Messages requested');

		connection.query('SELECT * FROM message', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /messages/:id
//----------------------------------------------------------------------
router.get('/messages/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Message with id = ', req.params.id + ' requested');

		connection.query('SELECT * FROM message WHERE MessageID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /messages/byStory/:id
//----------------------------------------------------------------------
router.get('/messages/byStory/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Messages with StoryID = ', req.params.id + ' requested');

		connection.query('SELECT * FROM message WHERE StoryID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /messages
//----------------------------------------------------------------------
router.post('/messages', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

		connection.query('INSERT INTO message SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /messages
//----------------------------------------------------------------------
router.put('/messages', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

		connection.query('REPLACE INTO message SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				connection.query('SELECT * FROM message WHERE MessageID = ?', req.body.MessageID, function (err, rows, fields) {
					if (err) {
						console.error("Error occured on Express-Server: " + err.message)
						res.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.send({ error: err, message: err.message });
						//throw err;
					} else {
						res.send(rows);
					}
				})
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /messages/:id
//----------------------------------------------------------------------
router.delete('/messages/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

		connection.query('DELETE FROM message WHERE MessageID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.message)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});






//////////////
// Rounds //
//////////////
//----------------------------------------------------------------------
// GET /rounds
//----------------------------------------------------------------------
router.get('/rounds', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. All Rounds requested');

		connection.query('SELECT * FROM round', function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.round)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, round: err.round });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// GET /rounds/:id
//----------------------------------------------------------------------
router.get('/rounds/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Get from client. Round with id = ', req.params.id + ' requested');

		connection.query('SELECT * FROM round WHERE RoundID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.round)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.send({ error: err, round: err.round });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// POST /rounds
//----------------------------------------------------------------------
router.post('/rounds', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Post from client. ', req.body + ' gets created');

		connection.query('INSERT INTO round SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.round)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, round: err.round });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// PUT /rounds
//----------------------------------------------------------------------
router.put('/rounds', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Put from client. ', req + ' gets updated');

		connection.query('REPLACE INTO round SET ?', req.body, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.round)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, round: err.round });
				//throw err;
			} else {
				connection.query('SELECT * FROM round WHERE RoundID = ?', req.body.RoundID, function (err, rows, fields) {
					if (err) {
						console.error("Error occured on Express-Server: " + err.round)
						res.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.send({ error: err, round: err.round });
						//throw err;
					} else {
						res.send(rows);
					}
				})
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});

//----------------------------------------------------------------------
// DELETE /rounds/:id
//----------------------------------------------------------------------
router.delete('/rounds/:id', (req, res) => {

	pool.getConnection(function (err, connection) {
		console.log('Express: got HTTP-Delete from client. Object with id=', req.params.id + ' gets deleted');

		connection.query('DELETE FROM round WHERE RoundID = ?', req.params.id, function (err, rows, fields) {
			if (err) {
				console.error("Error occured on Express-Server: " + err.round)
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, round: err.round });
				//throw err;
			} else {
				res.send(rows);
			}
		});
		connection.release();
		if (err) console.log(err.message);
	});
});
module.exports = router;


