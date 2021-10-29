const pg = require('pg');
const dbuRI = "postgres://rdselluzasoefs:5b297c4ef45fdcded853b8fcf335db20461eaf51e18e81b2ffa73dc0ea267978@ec2-63-33-14-215.eu-west-1.compute.amazonaws.com:5432/d1j4vrtpnt6m88";
const connstring = process.env.DATABASE_URL || dbuRI;
const pool = new pg.Pool({
	connectionString: connstring,
	ssl: { rejectUnauthorized: false}
});

//database methods--------------------------
let dbMethods = {} //create empty object

//-----------------------------------------
dbMethods.getAllBlogPosts = function() {
    let sql = "SELECT * FROM blogposts";
    return pool.query(sql); //return the promise
}

//--------------------------------
dbMethods.createBlogPost = function(heading, blogtext, userid) {
    let sql = "INSERT INTO blogposts (id, date, heading, blogtext, userid) VALUES(DEFAULT, $1,$2,$3) returning*";
    let values = [heading, blogtext, userid];
    return pool.query(sql, values); //return the promise
}

//-----------------------------------
dbMethods.deleteBlogPost = function(id) {
    let sql = "DELETE FROM blogposts WHERE id = $1 RETURNING*";
    let values = [id];
    return pool.query(sql, values); //return the promise
}

//export dbMethods--------------------------------
module.export = dbMethods;