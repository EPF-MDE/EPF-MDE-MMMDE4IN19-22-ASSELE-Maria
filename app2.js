
const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const studentrouter= require("./api_students.js")
//const normalizeCss= require("normalize.css")

//API
const fs = require("fs")

app.set('views', './views'); app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())
app.use("/api",studentrouter)
//app.use("/normalize.css",express.static(path.join(__dirname, 'node_modules/normalize.css')));


//app.get('/', (req, res) => {
 // res.send('Hello World!')
//})

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "./views/home.html"))
});


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

