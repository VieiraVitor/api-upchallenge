const stateByDDD = require('./state-helper')

const resultTransaction = function validateTransaction(dataTransaction) {
    const customer = dataTransaction.customer
    let score = 0;

    if (customer.name !== dataTransaction.card_hold_name) {
        // TODO implementar lógica pra aumentar o score
        score += 20;
        console.log(score)
    }

    // Validar ip location da transação e state do customer
    if (customer.state !== dataTransaction.ip_location) {
        // TODO implementar lógica pra aumentar o score
        score += 15;
        console.log(score)
    }

    // Valida o DDD do customer com o UF do ip_location da transação
    if (!validateState(customer.phone, dataTransaction.ip_location)) {
        // TODO implementar lógica pra aumentar o score
        score += 10;
        console.log(score)
    }

    // Valida o DDD do customer com o UF do state do próprio customer
    if (!validateState(customer.phone, customer.state)) {
        // TODO implementar lógica pra aumentar o score
        score += 15;
        console.log(score)
    }

    if (!validatePhone(customer.phone)) {
        // TODO implementar lógica pra aumentar o score
        score += 15;
        console.log(score)
    }

    if (!validatePayment(dataTransaction.paid_at)) {
        console.log("data de pagamento maior que data atual");
        score += 20;
    }

    // Verificar se valor da transação é maior que zero

    // Verifica se o cliente é maior de idade
    if (!validateBirthDate(customer.birth_date)) {
        console.log('menor que 18 anos');
        score += 5;
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

function validateBirthDate(birthDateCustomer) {
    const ageCustomer = calcAge(birthDateCustomer);

    if (ageCustomer >= 18) {
        return true
    } else {
        return false
    }
}

calcAge = (dateString) => {
    let birthday = +new Date(dateString);
    let age = ((Date.now() - birthday) / (31557600000));
    console.log(age);
    return age;
}
  
module.exports = resultTransaction;