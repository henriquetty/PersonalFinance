//index

let btnIndex = window.document.querySelector('#buttonIndex button').addEventListener('click', createFinance);

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
        for(let i in this) { //this = attrs, return index of attributes this[i]
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
}

let persistLocalStorage = new PersistLocalStorage();

function createFinance(){
    let inputs = {
        year: window.document.querySelector('#main-area .year select').value,
        month: window.document.querySelector('#main-area .month select').value,
        day: window.document.querySelector('#main-area .day input').value,
        activity: window.document.querySelector('#main-area .activity select').value,
        description: window.document.querySelector('#main-area .description input').value,
        totSpent: window.document.querySelector('#main-area .price input').value
    };

    let = { year, month, day, activity, description, totSpent } = inputs;

    let finance = new Finance( //parameters to class Finance
        year,
        month,
        day,
        activity,
        description,
        totSpent
    );

    if (finance.dataValidation()){ //returns true/false
        persistLocalStorage.persist(finance); //parameters to class PersistLocalStorage
    } else {
        window.alert('Invalid');
    }
}