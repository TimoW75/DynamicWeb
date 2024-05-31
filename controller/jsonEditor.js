const fs = require('fs');

const addNewColumn = async (req, res) => {

    const newRow = `
    {
        "rows": 
            ${JSON.stringify(req.body, null, 4)}   
    }
    `
    fs.writeFile('../front-end/src/static/data/rows.json', newRow, (err) => {
        if (err) {
            console.log(err);
            return;
          }
          res.json({message: "success"});
    });
}

const addNewRow = async (req, res) => {
    const newElement = `
    {
        "elements": 
            ${JSON.stringify(req.body, null, 4)}
    }
    `
    fs.writeFile('../front-end/src/static/data/elements.json', newElement, (err) => {
        if (err) {
            console.log(err);
            return;
          }
          res.json({message: "success"});
    });
}


module.exports = {
    addNewColumn: addNewColumn,
    addNewRow: addNewRow
};
