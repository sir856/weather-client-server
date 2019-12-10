const express = require('express');
const router = express.Router();
const data = require('../utils/data');
const model = require('../model/city');

/* GET home page. */
router.route('/')
    .get((request, response) => {
        model.get((err, res) => {
            if (res) {
                response.send(res)
            } else {
                console.error(err);
                response.status(500)
            }
        });
    })
    .post((request, response) => {
        let name = request.query.city;
        data.getByName(name, (res) => {
            if (res) {
                if (res.status !== 404) {
                    model.addCity(name, (err, ans) => {
                        if (err) {
                            if (err.code === "ER_DUP_ENTRY") {
                                response.status(400);
                                response.send();
                            } else {
                                response.status(500);
                                response.send();
                            }
                        } else {
                            if (res.status) {
                                response.status(res.status);
                                response.send();
                            }
                            else {
                                response.send(res)
                            }
                        }
                    });
                } else {
                    response.status(404);
                    response.send();
                }
            } else {
                response.status(504);
                response.send();
            }
        });

    })
    .delete((req, res) => {
        model.deleteCity(req.query.city, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500)
            } else {
                res.send()
            }
        })
    });

module.exports = router;