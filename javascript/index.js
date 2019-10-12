if (window.document.querySelector('#buttonIndex button')){ //check if button exist on index.html
    //add eventlistener to button on index.html
    window.document.querySelector('#buttonIndex button').addEventListener('click', createFinance);
}

class Finance { //form validation index.html

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


class LocalStorageManagment { //class to manage the local storage

    constructor() { //if localstorage is empty, it adds the first id which is 0, will automatically run once financex.html loads
        let id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getNextId(){ //get next id from local storage
        let nextId = localStorage.getItem('id');
        return Number.parseInt(nextId) + 1;
    }

    persist(items){ //persist inputs to local storage
        this.id = this.getNextId();
        localStorage.setItem(this.id, JSON.stringify(items));
        localStorage.setItem('id', this.id);
    }

    getFinances(){ //show finances on page load
        let array_finances = [];
        let id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++){ //i = 1 as the default id is 0
            let findItem = JSON.parse(localStorage.getItem(i));
            if (findItem === null) {
                continue // if value null, skip.
            }

            findItem.id = i //id for each item
            array_finances.push(findItem);
        }

        return array_finances; //return multiple objects inside an array to searchFinance
    }

    searchFinance(finance){ //search for specific finances
        let financesFiltered = [];

        financesFiltered = this.getFinances()

        // year, month, day, activity, description

        if (finance.year != ''){
            financesFiltered = financesFiltered.filter(y => y.year == finance.year);
        }

        if (finance.month != ''){
            financesFiltered = financesFiltered.filter(m => m.month == finance.month);
        }

        if (finance.day != ''){
            financesFiltered = financesFiltered.filter(d => d.day == finance.day);
        }

        if (finance.activity != ''){
            financesFiltered = financesFiltered.filter(a => a.activity == finance.activity);
        }

        return financesFiltered;
    }

    destroyRow(id){ //remove item from localstorage
        localStorage.removeItem(id);
    }
}

let localStorageManagment = new LocalStorageManagment(); //runs once page loads

function hideShowSpan(r){ //output successfully added/error on index.html
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
    let inputs = { //get inputs from index.html
        year: window.document.querySelector('#main-area .year select').value,
        month: window.document.querySelector('#main-area .month select').value,
        day: window.document.querySelector('#main-area .day input').value,
        activity: window.document.querySelector('#main-area .activity select').value,
        description: window.document.querySelector('#main-area .description input').value,
        totSpent: window.document.querySelector('#main-area .price input').value
    };

    let = { year, month, day, activity, description, totSpent } = inputs; //destructuring  

    let finance = new Finance( //parameters to class Finance aka form validation
        year,
        month,
        day,
        activity,
        description,
        totSpent
    );

    //form validation class Finance
    if (finance.dataValidation()){ //returns true/false
        localStorageManagment.persist(finance); //true persist data to localstorage
        hideShowSpan(true); //true = will show a success span 
        year = '' //i have no idea what's this
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
        finances_array = localStorageManagment.getFinances();
    } 

    let domTbody = window.document.getElementById('finances-show');
    domTbody.innerHTML = '';

    finances_array.forEach((item) => {

        //insert tr to tbody
        let row = domTbody.insertRow();

        //insert td to tr
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

        let btn = window.document.createElement('button');
        btn.className = 'btn-del';
        btn.innerHTML = '<i class="fas fa-times"</i>';
        btn.id = `btn_id${item.id}`;
        btn.onclick = function(){
            let id = this.id.replace('btn_id', '');
            localStorageManagment.destroyRow(id);
            window.location.reload()
        }

        row.insertCell(4).append(btn);

        console.log(item)
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
    };

    let = { year, month, day, activity } = inputsSearch;
    
    let searchFinance = new Finance(year, month, day, activity);

    let returnFinanceSearch = localStorageManagment.searchFinance(searchFinance);

    showFinances(returnFinanceSearch, true);
}