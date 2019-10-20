class Autogen {
    constructor() { //runs once page is loaded
        this.yearSelect = window.document.querySelector('div .year select');
        this.monthSelect = window.document.querySelector('div .month select');
        this.activitiesSelect = window.document.querySelector('div .activity select');
        this.year();
        this.month();
        this.activities();
    }

    year() {
        let minYear = new Date().getFullYear() - 5;
        let maxYear = minYear + 10;

        for (let i = minYear; i < maxYear; i++) {
            let option = window.document.createElement('option')
            option.setAttribute('value', i);
            option.innerHTML = i;
            this.yearSelect.appendChild(option);
        }
    }

    month() {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'];

        for (let i = 0; i < months.length; i++) {
            let option = window.document.createElement('option');
            option.setAttribute('value', i + 1)
            option.innerHTML = months[i];
            this.monthSelect.appendChild(option);
        }
    }

    activities() {
        let activities = ['Food', 'Education', 'Health', 'Transportation', 'Vehicle', 'Fun', 'Travel', 'Other'];

        for (let i = 0; i < activities.length; i++) {
            let option = window.document.createElement('option');
            option.setAttribute('value', i + 1);
            option.innerHTML = activities[i];
            this.activitiesSelect.appendChild(option);
        }
    }
}

new Autogen();