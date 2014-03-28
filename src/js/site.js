var pageWidgets = [],
    countryCodes,
    currCountryCode = 0,
    countryCycleTimer,
    countryCycleInterval = 7000;

if (window['Swag'] && window['Handlebars']) {
    Swag.registerHelpers(Handlebars);
};


function findWidgets() {

    _.each(document.querySelectorAll('[data-widget-name]'), function(node) {

        var name = node.getAttribute('data-widget-name');

        if (name !== '' && name in Widgets) {
            pageWidgets.push(new Widgets[name](node));
        }

    });

    startUpdating();

}

function updateWidgets() {
    var country;

    if (currCountryCode >= countryCodes.length) {
        currCountryCode = 0;
    }

    country = countryCodes[currCountryCode];

    console.log('Cycle widgets with country: ', country.countryName);
    $('.flag').removeClass().addClass('flag ' + country.countryCode.toLowerCase());
    $('.country-name').html(country.countryName);

    // spin world to location
    spinTo(country.countryCode);

    _.each(pageWidgets, function(w) {
        w.init(country);
    });

    currCountryCode++;
}

function startUpdating() {
    console.log('Widgets loaded: ' + pageWidgets.length);

    countryCycleTimer = setInterval(updateWidgets, countryCycleInterval);

    updateWidgets();
}

// console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))

$(function() {
    console.log('Trying to fetch countrycodes');
    $.getJSON('http://btncla-axdv7p.local:3000/codes/countries/active', function(data) {

        console.log('Loaded countrycodes');
        countryCodes = data;

    }).fail(function() {

        log('Unable to load the countryCodes');

        // fallback to local list...
        $.getJSON('/countryCodes.html', function(data) {
            countryCodes = data;
            findWidgets();
        });

    }).done(findWidgets);

});