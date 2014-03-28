(function() {

    this['Widgets'] = this['Widgets'] || {};

    // Utility functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // SparkLine
    function SparkLine(node) {
        var me = this;
        me.node = node;
        me.widgetName = 'SparkLine';
        me.templateName = 'sparkLine';
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

    SparkLine.prototype.update = function() {
        var me = this;

        me.data.thisCounter = getRandomInt(0, 500);
        me.data.lastCounter = getRandomInt(0, 500);
        me.data.percentageDiff = Math.floor(100 - (me.data.thisCounter / me.data.lastCounter * 100)) + '%';

        if (me.data.thisCounter > me.data.lastCounter) {
            me.data.direction = 'up';
        } else {
            me.data.direction = 'down';
        }

        _.extend(me.data, {
            enabled: me.enabled
        });

        this.node.innerHTML = this.template(me.data);
    };

    SparkLine.prototype.stop = function() {
        var me = this;
        clearInterval(me.timer);
        me.data.counter = 0;

        me.enabled = false;
        me.update();
    };

    SparkLine.prototype.start = function() {
        var me = this;

        me.timer = setInterval(function() {
            // me.update();
        }, me.updateInt);

        me.enabled = true;
        me.update();
    };

    SparkLine.prototype.init = function(country) {
        var me = this;

        clearInterval(me.timer);

        if (!country) {
            log('No country passed to ' + me.contructor.name);
            return;
        }

        if (!me.widgetOptions.property) {
            console.log('No property for sparkline', me);
            return;
        }

        me.data.country = country;

        console.log('Init', me.constructor.name);

        var url = "http://btncla-axdv7p.local:3000/usage/week/2014-03-21/?countrycode=" + me.data.country.countryCode;

        console.log('Requesting', url);

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


    Widgets['SparkLine'] = SparkLine;

})();