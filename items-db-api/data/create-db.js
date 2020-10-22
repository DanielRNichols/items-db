// Node.js + Express server backend
// use SQLite (https://www.sqlite.org/index.html) as a database
//

// run this once to create the initial database file
//   node create_database.js

// to clear the database, simply delete the database file:

const sqlite3 = require('sqlite3');
const dbName = 'items.db';
const db = new sqlite3.Database(dbName);

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database tables:
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY, className TEXT, tag TEXT, description TEXT, properties TEXT)");

  let valve = {
    className: "valve",
    tag: "V-100",
    desc: 'Gate Valve',
    props: { manufacturer: "ABC", length: 50, weight: 100 },
  };

  let pump = {
    className: "pump",
    tag: "P-100",
    desc:"Centrifugal Pump", 
    props: {manufacturer: "ABC",},
  };

  let tank = {
    className: "tank",
    tag: "T-100",
    desc:"Horizontal Tank", 
    props: {manufacturer: "XYZ",},
  };

  let sql = `INSERT INTO items (className, tag, description, properties)  VALUES 
    ('${valve.className}', '${valve.tag}', '${valve.desc}', '${JSON.stringify(valve.props)}'),
    ('${pump.className}', '${pump.tag}', '${pump.desc}', '${JSON.stringify(pump.props)}'),
    ('${tank.className}', '${tank.tag}', '${tank.desc}', '${JSON.stringify(tank.props)}')
  `;

  console.log (sql);
  // insert data into items table:
  db.run(sql);
         
  console.log(`successfully added items to the items table in ${dbName}`);

  
  // print them out to confirm their contents:
  db.each("SELECT * FROM items", (err, row) => {
    let item = {
      className: row.className,
      tag: row.tag,
      description: row.description,
      properties: row.properties ? JSON.parse(row.properties) : []
    };
      console.log(`className=${item.className}, tag=${item.tag}, 
                  description=${item.description},
                  properties=${JSON.stringify(item.properties)} 
                  `);

  });

});

db.close();