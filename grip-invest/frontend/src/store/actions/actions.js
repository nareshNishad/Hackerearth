import * as actionTypes from './actionsTypes';

const calculateInterest = (amount, interestRate, tenure) => {
    
    const principal = parseFloat(amount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(tenure) * 12;

    let totalPayment;
    let monthlyPayment;
    let totalInterest;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    
    if(isFinite(monthly)) {
        monthlyPayment = monthly.toFixed(0);
        totalPayment = (monthly * calculatedPayments).toFixed(0);    
        totalInterest = (totalPayment - principal).toFixed(0);
      }
    
    return { 
        totalPayment, 
        monthlyPayment,
        totalInterest
    }
};


export const saveResults = (emiMonthly, emiAmount, emiExtra) => {
    return {
        type: actionTypes.GET_RESULTS,
        emiMonthly,
        emiAmount,
        emiExtra
    }
}



export const calculateResults = (amount, interest, tenure) => {
    return (dispatch) => {
        if (amount && interest && tenure) {
            const results = calculateInterest(amount, interest, tenure);
            const totalPayment = results.totalPayment;
            const monthlyPayment = results.monthlyPayment;
            const totalInterest = results.totalInterest;

            if (totalPayment && totalPayment) {
                dispatch(saveResults(monthlyPayment, totalPayment, totalInterest))
            }

        }
    }
}

