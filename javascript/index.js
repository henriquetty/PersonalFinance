//index

if (window.document.querySelector('#buttonIndex button')){
    //eventlistener on index.html button
    window.document.querySelector('#buttonIndex button').addEventListener('click', createFinance);
}

class Finance {
    constructor(year, month, day, activity, description, totSpent){
        this.year = year;
        this.month = month;
        this.day = day;
        this.activity = activity;
        this.description = description;
        this.totSpent = totSpent;
    }

    dataValidation(){
        for(let i in this) { //this = attrs
            if (this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        } return true
    }
}

class PersistLocalStorage {
    constructor(){
        let id = localStorage.getItem('id');
        if (id === null){
            localStorage.setItem('id', 0);
        }
    }

    getNextId(){
        let nextId = localStorage.getItem('id');
        return Number.parseInt(nextId) + 1;
    }

    persist(items){
        this.id = this.getNextId();
        localStorage.setItem(this.id, JSON.stringify(items));
        localStorage.setItem('id', this.id);
    }

    //show finances on page load

    getFinances(){
        let array_finances = [];
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){
            let fin = JSON.parse(localStorage.getItem(i));
            if (fin === null) {
                continue // if value null, skip.
            }
            array_finances.push(fin);
        }

        return array_finances;
    }

    //search finance

    searchFinance(finance){
        let financesFiltered = [];

        financesFiltered = this.getFinances()
        // console.log(financesFiltered)
        // console.log(finance)

        // year, month, day, activity, description

        if (finance.year != ''){
            console.log('filtro de ano')
            financesFiltered = financesFiltered.filter(y => y.year == finance.year);
        }

        if (finance.month != ''){
            console.log('filtro de mÊs')
            financesFiltered = financesFiltered.filter(m => m.month == finance.month);
        }

        if (finance.day != ''){
            console.log('filtro de dia')
            financesFiltered = financesFiltered.filter(d => d.day == finance.day);
        }

        if (finance.activity != ''){
            console.log('filtro de activity')
            financesFiltered = financesFiltered.filter(a => a.activity == finance.activity);
        }

        return financesFiltered;
    }
}

let persistLocalStorage = new PersistLocalStorage();

//output successfully added/error

function hideShowSpan(r){
    r ? r = 'Finance successfully added! ✅' : r = '❌ Error, all fields are required!';

    let span = window.document.querySelector('div#output span');
    span.classList.remove('hide');
    span.classList.add('show');
    span.innerHTML = r;
    setTimeout(() => {
        span.classList.add('hide');
    }, 2000);
}


//start of everything

function createFinance(){
    let inputs = { //get inputs from HTML
        year: window.document.querySelector('#main-area .year select').value,
        month: window.document.querySelector('#main-area .month select').value,
        day: window.document.querySelector('#main-area .day input').value,
        activity: window.document.querySelector('#main-area .activity select').value,
        description: window.document.querySelector('#main-area .description input').value,
        totSpent: window.document.querySelector('#main-area .price input').value
    };

    let = { year, month, day, activity, description, totSpent } = inputs; //destructuring  

    let finance = new Finance( //parameters to class Finance
        year,
        month,
        day,
        activity,
        description,
        totSpent
    );

    //form validation class Finance
    if (finance.dataValidation()){ //returns true/false
        persistLocalStorage.persist(finance); //true persist data to localstorage
        hideShowSpan(true);
        year = ''
    } else {
        hideShowSpan(false);
    }
}

//------------
// Finances page

if(window.document.getElementById('finances-body')){
    window.document.getElementById('finances-body').onload = showFinances();
}

function showFinances(finances_array = [], filter = false) { //default []
    if(finances_array.length == 0 && filter == false) {
        finances_array = persistLocalStorage.getFinances();
    } 

    let domTbody = window.document.getElementById('finances-show');
    domTbody.innerHTML = '';

    finances_array.forEach((item) => {
        //insert tr to tbody
        let row = domTbody.insertRow();
        //insert tr to row
        row.insertCell(0).innerHTML = `${item.day}/${item.month}/${item.year}`
        
        //switch case for the activity
        switch (Number.parseInt(item.activity)) {
            case 1: item.activity = 'Food';
                break
            case 2: item.activity = 'Education';
                break
            case 3: item.activity = 'Health';
                break
            case 4: item.activity = 'Transportation';
                break
            case 5: item.activity = 'Vehicle';
                break
            case 6: item.activity = 'Fun';
                break
            case 7: item.activity = 'Travel';
                break
            case 8: item.activity = 'Other';
                break
        }

        row.insertCell(1).innerHTML = `${item.activity}`
        row.insertCell(2).innerHTML = `${item.description}`
        row.insertCell(3).innerHTML = `${item.totSpent}`
    })
}

// search finance

if (window.document.getElementById('buttonCheck')){
    window.document.getElementById('buttonCheck').addEventListener('click', searchFinance);
}

function searchFinance() {
    let inputsSearch = { //get inputs from HTML
        year: window.document.querySelector('#main-area-check .year select').value,
        month: window.document.querySelector('#main-area-check .month select').value,
        day: window.document.querySelector('#main-area-check .day input').value,
        activity: window.document.querySelector('#main-area-check .activity select').value,
        description: window.document.querySelector('#main-area-check .description input').value,
        totSpent: window.document.querySelector('#main-area-check .price input').value
    };

    let = { year, month, day, activity, description, totSpent } = inputsSearch;
    
    let searchFinance = new Finance(year, month, day, activity, description, totSpent);

    let returnFinanceSearch = persistLocalStorage.searchFinance(searchFinance);

    showFinances(returnFinanceSearch, true);
}