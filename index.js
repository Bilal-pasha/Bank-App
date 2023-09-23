let account1 = {
    owner: 'Bilal Pasha',
    movements: [27100, 450, -400, 3000, -650, -130, 70, 13500],
    intrestRate: 1.2,
    pin: 1111
}

let account2 = {
    owner: 'Salman Pasha',
    movements: [10480, 850, -7500, 9110, -500, 7200, -6400, 2080, 9110],
    intrestRate: 1.5,
    pin: 2222
}

let account3 = {
    owner: 'Faizan Pasha',
    movements: [15000, 850, -4000, 20010, -500, 85100, -6400, 2040, -9110],
    intrestRate: 1.8,
    pin: 3333
}

let account4 = {
    owner: 'Atiq Pasha',
    movements: [10340, 85100, -7500, 92110, -5000, 7200, -6400, 200, 9110],
    intrestRate: 2.0,
    pin: 4444
}

let accounts = [account1, account2, account3, account4]
let containerMovements = document.querySelector('.movements')


const euroToUsd = 1.1;
const movementUSD = account1.movements.map((value) => {
    return value * euroToUsd;
})

let movementsDescription = account1.movements.map((value, index) => {
    return `Movement ${index + 1} : You ${value > 0 ? 'deposit' : 'withdrawal'} ${Math.abs(value)}`
})
// console.log(movementsDescription)


let displayMovements = function (movements) {
    containerMovements.innerHTML = ''
    movements.forEach((value, index) => {
        let type = value > 0 ? 'deposite' : 'withdrawal';
        const html = `
        <div class="movements-row">
            <div class="movements-row-row">
            <div class="movements-row-text">
                <button class="movements-type-${type}">${index + 1} ${type}</button>
                
            </div>
            <div class="dollar">
                <h2>${value}</h2>
            </div>
            </div>
        </div>`
        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
}
// displayMovements(account1.movements)

let calDisplayBalance = function (acc) {
    if (acc.movements.length > 0) {
        acc.balance = acc.movements.reduce((acc, value) => {
            return +acc + value
        })
    } else {
        return acc.balance = acc.movements
    }
    document.querySelector('.label-balance').textContent = `${acc.balance} $`
}
// calDisplayBalance(account1.movements)



const caldisplaySummary = function (acc) {
    let incomes;
    if (acc.movements.length > 0) {
        incomes = acc.movements.filter((value) => {
            return value > 0
        }).reduce((acc, value) => {
            return +acc + value
        })
    } else {
        return incomes = Number(acc.movements)
    }
    document.querySelector('.incomes').textContent = `${incomes} $`
    let out;
    if (acc.movements.length > 0) {
        out = acc.movements.filter((value) => {
            return value < 0
        }).reduce((acc, value) => {
            return acc + value
        })
    } else {
        return out = '0000'
    }
    document.querySelector('.out').textContent = `${Math.abs(out)} $`
    let intrest;
    if (acc.movements.length > 0) {
        intrest = acc.movements.filter((value) => {
            return value > 0
        }).map((value) => {
            return value * acc.intrestRate / 100
        }).reduce((acc, value) => {
            return Math.floor(acc + value)

        })
    } else {
        return intrest = acc.movements[0] * acc.intrestRate / 100
    }
    document.querySelector('.Interest').textContent = `${intrest} $`
}
// caldisplaySummary(account1.movements)

const updateUI = function (acc) {
    displayMovements(acc.movements)

    calDisplayBalance(acc)

    caldisplaySummary(acc)
}

const dateHello = function () {
    let date = new Date
    if (date.getHours() > 12) {
        return `Good Evening . !`
    } else {
        return `Good Morning . !`
    }
}


let container = document.querySelector('.main-section')
let btn = document.getElementById('btn')
let inputUserName = document.getElementById('username')
let inputPin = document.getElementById('password')
let welcome = document.getElementById('label-Welcome')
let DateAndTime = document.getElementById('dateAndTime')
let currentAccount;







let date = new Date
let formInput = document.querySelector('.d-flex')
let containerNavbar = document.getElementById('Navbar-container')
let section1Div = document.querySelector('.section-1-div');
let Current = document.querySelector('.Current-balance')

btn.addEventListener('click', (event) => {
    event.preventDefault()
    let logout = document.getElementById('logout')
    formInput.style.opacity = 0
    containerNavbar.style.justifyContent = "center";
    DateAndTime.textContent = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    currentAccount = accounts.find((value) => {
        return value.owner === inputUserName.value
        // console.log(currentAccount)
    })
    if (currentAccount?.pin == inputPin.value) {
        welcome.textContent = `${dateHello()} ${currentAccount.owner}`
        welcome.style.fontSize = '30px'
        container.style.opacity = 100
        if (container.style.opacity = 100) {
            logout.style.display = 'block'
            signup.style.display = 'none'
            containerSection1.style.display = 'block'
            containerSection2.style.display = 'none'
            section1Div.style.padding = '5px'
            Current.style.padding = '25px'

        }
        updateUI(currentAccount)

        inputUserName.value = inputPin.value = "";
    } else {
        welcome.textContent = 'Your id or Password is incorrect'
    }

})

let tranferID = document.getElementById('transfer-id')
let tranferAmount = document.getElementById('transfer-amount')
let tranferBTN = document.getElementById('transfer-btn-submit')

tranferBTN.addEventListener('click', () => {
    const amount = Number(tranferAmount.value);
    const recieverAcc = accounts.find((value) => {
        return value.owner === tranferID.value
    })
    tranferID.value = tranferAmount.value = "";

    if (amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc.owner !== currentAccount.owner) {
        alert(`Do you want to transfer ${amount}$ to ${recieverAcc.owner}'s Account?`)
        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);
        updateUI(currentAccount)
    }
})



let closeID = document.getElementById('close-id')
let closePIN = document.getElementById('close-pin')
let closeBTN = document.getElementById('close-btn')
let signup = document.getElementById('signup');


closeBTN.addEventListener('click', (event) => {
    event.preventDefault()
    const DeletedAcc = accounts.find((value) => {
        return value.owner === closeID.value
        // console.log( closeID.value,value.owner)
    })
    // console.log(DeletedAcc)
    if (closeID.value === DeletedAcc.owner && Number(closePIN.value) === DeletedAcc.pin) {
        const index = accounts.findIndex((value) => {
            return value.owner === DeletedAcc.owner
        })
        // console.log('account is deleted')
        accounts.splice(index, 1)
        confirm('Are you Sure you Want to delete this account forever?', '')
        alert(`${DeletedAcc.owner} Account is deleted`)
        closeID.value = closePIN.value = ''
        welcome.textContent = 'Login to get Started'
        container.style.opacity = 0
        logout.style.display = 'none'
        formInput.style.opacity = 100
        containerNavbar.style.justifyContent = "space-around";
    }
})


let LoanAmount = document.getElementById('request-loan-input');
let LoanBtn = document.getElementById('request-loan-btn')

LoanBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const amount = Number(LoanAmount.value)

    if (amount > 0 && currentAccount.movements.some((value) => {
        return value >= amount * 0.1
    })) {
        alert('Your Request Loan is Granted')
        currentAccount.movements.push(amount)
        updateUI(currentAccount)
        LoanAmount.value = '';
    } else {
        alert('Your Request is against the Rule of Bank')
    }
})

let logout = document.getElementById('logout')
// let hellomsg = getElementById('label-Welcome')

logout.addEventListener('click', () => {
    container.style.opacity = 0
    logout.style.display = 'none'
    welcome.textContent = 'Login to get Started'
    formInput.style.opacity = 100
    containerNavbar.style.justifyContent = "space-around";
    signup.style.display = 'block'
    welcome.style.fontSize = '20px'
})


let signupname = document.getElementById('exampleInputname')
let signupAge = document.getElementById('exampleInputage')
let signupEmail = document.getElementById('exampleInputEmail')
let signupDeposite = document.getElementById('exampleDeposite')
let signupDeposite2 = document.getElementById('exampleDeposite2')
let signupInterestRate = document.getElementById('exampleInterestRate')
let signupPin = document.getElementById('exampleInputpin')
let signupBtn = document.getElementById('signup')
let btnCreateNewAccount = document.getElementById('create-new-account')
let containerSection1 = document.getElementById('section1')
let containerSection2 = document.getElementById('main')



signupBtn.addEventListener('click', () => {
    containerSection1.style.display = 'none'
    containerSection2.style.display = 'block'
})

btnCreateNewAccount.addEventListener('click', (event) => {
    event.preventDefault()
    let account = {}
    account.owner = signupname.value
    account.Age = signupAge.value
    account.Email = signupEmail.value
    account.movements = [signupDeposite.value]
    // account.movements = [Number(signupDeposite.value),Number(signupDeposite2.value)]
    account.intrestRate = signupInterestRate.value
    account.pin = signupPin.value
    accounts.push(account)
    containerSection2.style.display = 'none'
    alert(`${account.owner} Account has been Created`)
    // console.log(accounts)
})

// signupBtn.addEventListener('click', (event)=>{
//     event.preventDefault()
//     console.log(accounts)
//     accounts.push(signupname.value)

// })

// let newform = function (signupname) {
//     return 
// }

// console.log(newform (signupname))



const deposit = account1.movements.filter((value) => {
    return value > 0
})
// console.log(deposit)

const withdrawal = account1.movements.filter((value) => {
    return value < 0
})
// console.log(withdrawal)

const balance = account1.movements.reduce((acc, value) => {
    return acc + value
})
// console.log(balance)



