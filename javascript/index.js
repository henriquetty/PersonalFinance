window.addEventListener('DOMContentLoaded', function() {

    let inputs = {
        year: document.querySelector('.year select'),
        month: document.querySelector('.month select'),
        activity: document.querySelector('.activity select'),
        day: document.querySelector('.day input'),
        description: document.querySelector('.description input'),
        price: document.querySelector('.price input')
    };

    let activities = [];

    const generateActivity = (values) => {
        let container = document.createElement('div');

        let activity = document.createElement('p');
        activity.innerText = values.activity || 'No activity.';

        let description = document.createElement('p');
        description.innerText = values.description || 'No description.';

        let price = document.createElement('span');
        price.innerText = values.price || 'No price.';

        let timestamp = document.createElement('span');
        timestamp.innerText = `${values.day || 1}/${values.month || 1}/${values.year || 1900}`

        container.append(timestamp);
        container.append(activity);
        container.append(description);
        container.append(price);

        document.querySelector('.activities').append(container);

        activities.push(values)
    }
    

    document.querySelector('#buttonIndex button').addEventListener('click', () => {
        let input_values = {};

        Object.keys(inputs).map(e => input_values[e] = inputs[e].value );

        generateActivity(input_values);
    })

});