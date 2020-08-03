'use strict';

const stateByDDD = require('../../assets/js/states');

const resultTransactions = function validateTransactions(dataTransactions) {
    let results = [];
    let scoreTransaction = 0;
    let idTransaction = '';

    for (let transaction in dataTransactions) {
        scoreTransaction = validateTransaction(dataTransactions[transaction]);
        idTransaction = dataTransactions[transaction].id;
        results.push({
            id: idTransaction,
            score: scoreTransaction
        })
    }
    
    return results;
}

function validateTransaction(dataTransaction) {
    const customer = dataTransaction.customer
    let score = 0;
    
    if (customer.name !== dataTransaction.card_hold_name) {
        console.log("nome diferente do cartão");
        score += 22;
    }

    // Validar ip location da transação e state do customer
    if (customer.state !== dataTransaction.ip_location) {
        console.log("state do customer diferente da localização da transação");
        score += 13;
    }

    // Valida o DDD do customer com o UF do ip_location da transação
    if (!validateState(customer.phone, dataTransaction.ip_location)) {
        console.log("ddd do customer diferente do ddd referente a UF da localização da transação");
        score += 10;
    }

    // Valida o DDD do customer com o UF do state do próprio customer
    if (!validateState(customer.phone, customer.state)) {
        console.log("ddd do customer diferente do ddd referente a UF do próprio customer");
        score += 15;
    }

    if (!validatePhone(customer.phone)) {
        console.log("telefone invalido");
        score += 15;
    }

    if (!validatePayment(dataTransaction.paid_at)) {
        console.log("data de pagamento maior que data atual");
        score += 20;
    }

    // Verifica se o cliente é maior de idade
    if (!validateBirthDate(customer.birth_date)) {
        console.log('menor que 18 anos');
        score += 5;
    }

    score > 100 ? score = 100 : score = score

    return score;
}

// Comparar o DDD do phone do cliente com o UF do state da localização da transação
function validateState(phoneCustomer, state) {
    const ddd = phoneCustomer.slice(0, 2);

    // descobrir state pelo ddd
    const uf = findStateByDDD(ddd);

    // comparar state do ddd com state da transação
    if (uf === state) {
        return true;
    } else {
        return false;
    }
}

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

// Valida se o número do telefone é válido
function validatePhone(phoneCustomer) {
    if (/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}/g.test(phoneCustomer)) {
        return true;
    }
    else {
        return false;
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

function validateBirthDate(birthDateCustomer) {
    const ageCustomer = calcAge(birthDateCustomer);

    if (ageCustomer >= 18) {
        return true;
    } else {
        return false;
    }
}

function calcAge(dateString) {
    let birthday = +new Date(dateString);
    let age = ((Date.now() - birthday) / (31557600000));
    return age;
}

module.exports = resultTransactions;