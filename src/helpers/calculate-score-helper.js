'use strict';
const stateByDDD = require('../../assets/js/states');

// Verifica cada transação recebida e atribui o score
const scoreTransactions = function scoreTransaction(dataTransaction) {
    const customer = dataTransaction.customer
    let score = 0;
    
    if (customer.name !== dataTransaction.card_hold_name) {
        score += 22;
    }

    if (customer.state !== dataTransaction.ip_location) {
        score += 13;
    }

    if (!validateState(customer.phone, dataTransaction.ip_location)) {
        score += 10;
    }

    if (!validateState(customer.phone, customer.state)) {
        score += 15;
    }

    if (!validatePhone(customer.phone)) {
        score += 15;
    }

    if (!validatePayment(dataTransaction.paid_at)) {
        score += 20;
    }

    if (!validateBirthDate(customer.birth_date)) {
        score += 5;
    }

    score > 100 ? score = 100 : score = score

    return score;
}

// Valida o estado do customer ou localização da transação, de acordo com o DDD
function validateState(phoneCustomer, state) {
    const ddd = phoneCustomer.slice(0, 2);

    const uf = findStateByDDD(ddd);

    if (uf === state) {
        return true;
    } else {
        return false;
    }
}

//  Retorna o estado(UF) de acordo com o DDD
function findStateByDDD(ddd) {
    for (let state in stateByDDD) {
        stateByDDD.hasOwnProperty(state);
        {
            if (state === ddd) {
                return stateByDDD[state] + '/BR';
            }
        }
    }
}

// Verifica se o telefone é válido
function validatePhone(phoneCustomer) {
    if (/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}/g.test(phoneCustomer)) {
        return true;
    }
    else {
        return false;
    }
}

// Verifica se o pagamento não está com data futura
function validatePayment(paidAtTransaction) {
    let dateNow = new Date().toISOString();
    dateNow = dateNow.replace(/T/, ' ').replace(/\..+/, '');

    if (dateNow > paidAtTransaction) {
        return true;
    } else {
        return false;
    }
}

// Verifica a idade
function validateBirthDate(birthDateCustomer) {
    const ageCustomer = calcAge(birthDateCustomer);

    if (ageCustomer >= 18) {
        return true;
    } else {
        return false;
    }
}

// Retorna a idade de acordo com a data de aniversário
function calcAge(dateString) {
    let birthday = +new Date(dateString);
    let age = ((Date.now() - birthday) / (31557600000));
    return age;
}

module.exports = scoreTransactions;