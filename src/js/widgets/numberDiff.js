(function() {

    this['Widgets'] = this['Widgets'] || {};

    // Utility functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // NumberDiff
    function NumberDiff(node) {
        var me = this;
        me.node = node;
        me.widgetName = 'NumberDiff';
        me.templateName = 'numberDiff';
        me.widgetOptions = {};
        me.counter = 0;
        me.enabled = true;
        me.updateInt = 3000;

        if (me.node.getAttribute('data-widget-data')) {
            var optionsJSON = me.node.getAttribute('data-widget-data');
            try {
                me.widgetOptions = JSON.parse(optionsJSON.replace(/\'/g, '"'));
            } catch (e) {
                log('Unable to parse widget options: ' + optionsJSON);
            }
        }

        me.data = {
            country: '',
            name: me.widgetName,
            enabled: me.enabled,
            thisCounter: 0,
            lastCounter: 0,
            options: me.widgetOptions
        };

        if (!MyApp.Templates[me.templateName]) {
            console.log('Template not found:', me.templateName, me);
            return;
        } else {
            me.template = MyApp.Templates[me.templateName];
        }

        return this;
    }

    NumberDiff.prototype.update = function() {
        var me = this;

        // me.data.thisCounter = getRandomInt(0, 500);
        // me.data.lastCounter = getRandomInt(0, 500);

        // current value
        // last 6 days added together / 6 = average

        var data = me.data.csvValues.split(','),
            average = 0;

        me.data.thisCounter = parseInt(data.shift(1));
        me.data.displayCounter = me.data.thisCounter.toLocaleString();

        _.each(data, function(i) {
            average = average + parseInt(i);
        });

        me.data.lastCounter = average / data.length;
        me.data.displayLastCounter = Math.round(me.data.lastCounter).toLocaleString();

        if (me.data.thisCounter && me.data.lastCounter) {
            me.data.percentageDiff = Math.floor(100 - (me.data.lastCounter / me.data.thisCounter * 100));
        } else {
            me.data.percentageDiff = 0;
        }

        if (me.data.percentageDiff > 0) {
            me.data.direction = 'up';
        } else if (me.data.percentageDiff < 0) {
            me.data.direction = 'down';
        } else {
            me.data.direction = 'same';
        }

        _.extend(me.data, {
            enabled: me.enabled
        });

        this.node.innerHTML = this.template(me.data);
    };

    NumberDiff.prototype.stop = function() {
        var me = this;
        clearInterval(me.timer);
        me.data.counter = 0;

        me.enabled = false;
        me.update();
    };

    NumberDiff.prototype.start = function() {
        var me = this;

        me.timer = setInterval(function() {
            // me.update();
        }, me.updateInt);

        me.enabled = true;
        me.update();
    };

    NumberDiff.prototype.init = function(country) {
        var me = this;

        clearInterval(me.timer);

        if (!country) {
            log('No country passed to ' + me.contructor.name);
            return;
        }

        if (!me.widgetOptions.property) {
            console.log('No property for numberDiff', me);
            return;
        }

        me.data.country = country;

        console.log('Init', me.constructor.name);

        var url = "http://btncla-axdv7p.local:3000/usage/week/2014-03-21/?countrycode=" + me.data.country.countryCode;
        // var url = "http://btncla-axdv7p.local:3000/usage/week/2014-03-21/?countrycode=NG";

        console.log('Requesting', url, me.node);

        // $.getJSON('/gb7days.html', function(data) {
        $.getJSON(url, function(data) {
            var values = [];
            _.each(data.days, function(day) {
                values.push(day.data[me.widgetOptions.property]);
            });

            me.data.csvValues = values.join(',');

        }).done(function() {
            me.start();
        });


        me.node.addEventListener('click', function() {
            console.log('clicked', me, me.node);

            if (me.enabled === true) {
                me.stop();
            } else {
                me.start();
            }

        });
    };


    Widgets['NumberDiff'] = NumberDiff;

})();