(function() {

    this['Widgets'] = this['Widgets'] || {};

    // Utility functions
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // HelloWorld
    function HelloWorld(node) {
        var me = this;
        me.node = node;
        me.widgetName = 'HelloWorld';
        me.templateName = 'helloWorld';
        me.counter = 0;
        me.enabled = true;
        me.updateInt = 3000;

        me.data = {
            name: me.widgetName,
            enabled: me.enabled,
            thisCounter: 0,
            lastCounter: 0
        };

        if (!MyApp.Templates[me.templateName]) {
            console.log('Template not found:', me.templateName, me);
            return;
        } else {
            me.template = MyApp.Templates[me.templateName];
        }

        return this;
    }

    HelloWorld.prototype.update = function() {
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

    HelloWorld.prototype.stop = function() {
        var me = this;
        clearInterval(me.timer);
        me.data.counter = 0;

        me.enabled = false;
        me.update();
    };

    HelloWorld.prototype.start = function() {
        var me = this;

        me.timer = setInterval(function() {
            me.update();
        }, me.updateInt);

        me.enabled = true;
        me.update();
    };

    HelloWorld.prototype.init = function() {
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


    Widgets['HelloWorld'] = HelloWorld;

})();