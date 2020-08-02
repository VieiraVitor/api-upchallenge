const stateByDDD = require('./state-helper')

const resultTransaction = function validateTransaction(dataTransaction) {
    const customer = dataTransaction.customer
    let score = 0;

    // validar ip location da transação e state do customer
    if (customer.name !== dataTransaction.card_hold_name) {
        // TODO implementar lógica pra aumentar o score
        score += 115;
        console.log(score)
    }

    if (customer.state !== dataTransaction.ip_location) {
        // TODO implementar lógica pra aumentar o score
        score += 100;
        console.log(score)
    }

    if (!validateState(customer.phone, dataTransaction.ip_location)) {
        // TODO implementar lógica pra aumentar o score
        score += 25;
        console.log(score)
    }

    if (!validatePhone(customer.phone)) {
        // TODO implementar lógica pra aumentar o score
        score += 40;
        console.log(score)
    }

    if (!validatePayment(dataTransaction.paid_at)) {
        console.log("pagamento maior que data atual");
        score += 66;
    }

    return score;
}

// Comparar o DDD do phone do cliente com o UF do state da localização da transação
function validateState(phoneCustomer, locationTransaction) {

    const ddd = phoneCustomer.slice(0, 2)

    // descobrir state pelo ddd
    const state = findStateByDDD(ddd);

    //comparar state do ddd com state da transação
    if (state === locationTransaction) {
        return true
    } else {
        return false
    }
}

function findStateByDDD(ddd) {
    for (let state in stateByDDD) {
        stateByDDD.hasOwnProperty(state);
        {
            if (state === ddd) {
                stateByDDD[state] = stateByDDD[state] + '/BR';
                return stateByDDD[state];
            }
        }
    }
}

// Valida se o número do telefone é válido
function validatePhone(phoneCustomer) {
    if (/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}/g.test(phoneCustomer)) {
        console.log('valido')
        return true
    }
    else {
        console.log('invalido')
        return false
    }
}

// Valida se o pagamento não está em uma data futura
function validatePayment(paidAtTransaction) {
    let dateNow = new Date().toISOString();
    dateNow = dateNow.replace(/T/, ' ').replace(/\..+/, '');

    if (dateNow > paidAtTransaction) {
        return true;
    } else {
        return false;
    }
}

module.exports = resultTransaction;