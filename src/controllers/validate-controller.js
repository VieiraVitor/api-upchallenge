'use strict';
const validateTransactions = require('../helpers/validate-helper')

exports.validate = (req, res, next) => {
    const transactions = req.body;
    const result = validateTransactions(transactions);
    
    if (result.length !== 0 && result.length !== null && result.length !== undefined) {
        res.status(200).send(
            result
        );
    } else {
        res.status(400).json({
            message: 'A transação não foi enviada conforme o padrão esperado'
        })
    }
};