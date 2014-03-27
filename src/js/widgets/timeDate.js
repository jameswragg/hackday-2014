(function() {

    this['Widgets'] = this['Widgets'] || {};

    // Utility functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // HelloWorld
    function TimeDate(node) {
        var me = this;
        me.node = node;
        me.widgetName = 'TimeDate';
        me.templateName = 'timeDate';
        me.counter = 0;
        me.enabled = true;
        me.updateInt = 1000;

        me.data = {
            enabled: me.enabled,
            name: me.widgetName
        };

        me.template = MyApp.Templates[me.templateName];

        return this;
    }

    TimeDate.prototype.update = function() {
        var me = this;

        _.extend(me.data, {
            enabled: me.enabled,
            time: moment().format('HH:mm'),
            day: moment().format('dddd'),
            date: moment().format('Do MMM YYYY')
        });

        this.node.innerHTML = this.template(this.data);
    };

    TimeDate.prototype.stop = function() {
        var me = this;
        clearInterval(me.timer);
        me.data.counter = 0;

        me.enabled = false;
        me.update();
    };

    TimeDate.prototype.start = function() {
        var me = this;

        me.timer = setInterval(function() {
            me.update();
        }, me.updateInt);

        me.enabled = true;
        me.update();
    };

    TimeDate.prototype.init = function() {
        var me = this;

        console.log('Init', me);
        me.node.innerHTML = me.template();
        me.start();

        me.node.addEventListener('click', function() {
            console.log('clicked', me, me.node);

            if (me.enabled === true) {
                me.stop();
            } else {
                me.start();
            }

        });
    };


    Widgets['TimeDate'] = TimeDate;

})();