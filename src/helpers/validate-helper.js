'use strict';
const scoreTransactions = require('../helpers/calculate-score-helper')

// Recebe as transações e inicia a validação
const resultTransactions = function validateTransactions(dataTransactions) {
    let results = [];
    let scoreTransaction = 0;
    let idTransaction = '';

    if (!Array.isArray(dataTransactions)){
        return false;
    }

    for (let transaction in dataTransactions) {
        scoreTransaction = scoreTransactions(dataTransactions[transaction]);
        idTransaction = dataTransactions[transaction].id;
        results.push({
            id: idTransaction,
            score: scoreTransaction
        })
    }
    
    return results;
}

module.exports = resultTransactions;