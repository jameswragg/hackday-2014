window.addEventListener('load', function() {

    _.each(document.querySelectorAll('[data-widget-name]'), function(node) {

        var name = node.getAttribute('data-widget-name');

        if (name !== '' && Widgets[name] !== null) {
            var w = new Widgets[name](node);
            w.init();
        }

    });

}, false);