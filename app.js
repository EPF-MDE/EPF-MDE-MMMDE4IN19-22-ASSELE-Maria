
const express = require('express')
const app = express()
const port = 3000
const path = require("path")

//API
const fs = require("fs")

//app.get('/', (req, res) => {
 // res.send('Hello World!')
//})

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "./views/home.html"))
});

app.get('/students',(req, res) => {
  res.send([{ name: "Maria ASSELE", school: "EPF" }, { name: "Mn Mangala", school: "Polytech"}])
})

app.get('/students-csv',(req, res) => {
  const rowSeparator = "\n";
  const cellSeparator = ";";
  fs.readFile("/home/maria/epfbook3/n_s.csv", "utf8", (err, data) => {
   const rows = data.split(rowSeparator);
   console.log(rows.length)
   const [headerRow, ...contentRows] = rows;
   const header = headerRow.split(cellSeparator);

   const students = contentRows.map((row) => {
     const cells = row.trim().split(cellSeparator);
     const student = {
       [header[0]]: cells[0],
       [header[1]]: cells[1],
       };
       return student;
   });
   res.send(students);

   //res.send(data)
   console.log("Contenu du fichier CSV :", data);
  });

});


app.get("/students/create",(req, res) => {
//	res.render("create-students");
	res.send("I am in the Gt coucou")
});

app.use(express.json())
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

