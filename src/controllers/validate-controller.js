'use strict';
const validateTransaction = require('../helpers/validate-helper')

exports.validate = (req, res, next) => {
    const transaction = req.body;
    const idTransaction = req.body.id
    
    const scoreTransaction = validateTransaction(transaction)
    res.status(200).send(
        {
            id: idTransaction,
            score: scoreTransaction
        }
    );
};