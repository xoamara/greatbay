var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "pa$$word",
    database: "greatbay_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    inquirer.prompt([
        {
            type: "list",
            name: "bidOrList",
            message: "Do you want to bid or list an item?",
            choices: ["List Item", "Bid on an Item"]
        },
    ]).then(function (user) {
        console.log(user.bidOrList)
        if (user.bidOrList === "Bid on an Item") {
            console.log("bid!")
            // console.log(q);

            let q = connection.query("SELECT * FROM merchandise;", function (err, res) {
                if (err) throw err;
                console.table(res);

                inquirer.prompt([
                    {
                        type: "input",
                        name: "id",
                        message: "Enter the id number of the item you want to bid on..."
                    },
                ]).then(function (user) {
                    let bidItem = user.id;
                    console.log(bidItem);

                })
                connection.end();
            })


        }
        console.log("outside bid!")
    })
})
