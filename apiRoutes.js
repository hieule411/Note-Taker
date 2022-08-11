const fs = require("fs");
const { default: nodeTest } = require("node:test");

module.exports = function (app) {

router.get('/api/notes', (req, res) => {
        let results = nodeTest;
        if (req.query) {
          results = filterByQuery(req.query, results);
        }
        res.json(results);
      });
      
      router.get('/notes/:id', (req, res) => {
        const result = findById(req.params.id, newNote);
        if (result) {
          res.json(result);
        } else {
          res.send(404);
        }
      });

    //GET Request
    app.get("/api/notes", (request, response) => {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        response.json(data);
    });


    //POST Request
    app.post("/api/notes", (request, response) => {
        const newNote = request.body;
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        fs.writeFileSync('./db/db.json', JSON.stringify(data));
        response.json(data);
    });


    //DELETE request
    app.delete("/api/notes/:id", (request, response) => {
        let noteId = request.params.id.toString();
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        response.json(newData);
    });
};