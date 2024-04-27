
const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const studentrouter= require("./api_students.js")
//const normalizeCss= require("normalize.css")
//const process = require('node:process')
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

//API
const fs = require("fs")

app.set('views', './views'); app.set('view engine', 'ejs')
// middleware
const basicAuth = require('express-basic-auth')
app.use(cookieParser())

app.use(basicAuth({
    users: { [process.env.ADMIN_USERNAME] : process.env.ADMIN_PASSWORD },
    challenge: true,
    authorizer: myAsyncAuthorizer,
    authorizeAsync: true,
}))


function myAsyncAuthorizer(username, password, cb) {   
  fs.readFile("/home/maria/epfbook3/users.csv", "utf8", (err, data) => {   
      if (err) {
        console.error("Erreur de lecture du fichier :", err);      
       return cb(err);
     }
     const rows = data.trim().split("\n");const contentRows = rows.slice(1); for (let row of contentRows) {     
        const [username1, password1] = row.split(";");  
          if (username === username1) {
            bcrypt.compare(password, password1, cb);
	//	if (res) {
	//	 return cb(null, true);
//}
	//	 return cb(null, false);
//});
		return ;
        }
     }
   return cb(null, false);   
 });
 }

//    if (username.startsWith('maria') & password.startsWith('superstar'))
  //      return cb(null, true)
   // else
     //   return cb(null, false)
//}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())
app.use("/api",studentrouter)
//app.use("/normalize.css",express.static(path.join(__dirname, 'node_modules/normalize.css')));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get("/students/create",(req, res) => {
   res.render("create-student")
   //res.redirect("/students/create?created=1");
});

app.post("/students/create",(req, res) => {
console.log(req.body);
  const csvLine = `\n${req.body.name};${req.body.school}`;
  console.log(csvLine);
  const stream = fs.writeFile(
    "/home/maria/epfbook3/n_s.csv",
    csvLine,
    {flag: "a" },
    (err) => {
      res.send("Ok");
      console.log("Student created my dear Maria a Mimi")
    }
   );
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/students",(req, res) => {
  const rowSeparator = "\n";
const cellSeparator = ";";
fs.readFile("/home/maria/epfbook3/n_s.csv", "utf8", (err, data) => {
const rows = data.split(rowSeparator);
const [headerRow, ...contentRows] = rows;
const header = headerRow.split(cellSeparator);
const students = contentRows.map((row) => {
const cells = row.split(cellSeparator);
const student = { name: cells[0], school: cells[1],
};
return student;
});
console.log(students)
res.render("students", { students: students});
}); 
})

app.post("/api/login", (req, res) =>{
const token = "FOOBAR";
const tokenCookie = {
path: "/",
httpOnly: true,
expires: new Date(Date.now() + 60 * 60 * 1000),
};
res.cookie("auth-token", token, tokenCookie);
});
