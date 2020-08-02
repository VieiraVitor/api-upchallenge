'use strict';
const validateTransactions = require('../helpers/validate-helper')

exports.validate = (req, res, next) => {
    const transactions = req.body;
    const result = validateTransactions(transactions)
    res.status(200).send(
        result
    );
};