'use strict';

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

function validateTransaction(dataTransaction) {
    const customer = dataTransaction.customer
    let score = 0;

    // validar ip location da transação e state do customer
    console.log(customer.state)
    console.log(dataTransaction.ip_location)
    if (customer.state !== dataTransaction.ip_location) {
        // TODO implementar logica pra aumentar o score
        score += 100;
        console.log(score)
    }

    if (customer.name !== dataTransaction.card_hold_name) {
        // TODO implementar logica pra aumentar o score
        score += 115;
        console.log(score)
    }

    if (!validateState(customer.phone, dataTransaction.ip_location)) {
        score += 25;
        console.log(score)
    }

    return score;
}


