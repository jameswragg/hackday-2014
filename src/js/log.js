(function() {

    var $log = $('.log'),
        timer,
        timeout = 3000;

    function createTimer() {
        timer = setTimeout(function() {
            $log.removeClass('show');
        }, timeout);
    }

    window.log = function(str) {
        console.error('Log:', str);

        $log.html(str);

        if ($log.hasClass('show')) {
            clearTimeout(timer);
        } else {
            $log.addClass('show')
        }

        createTimer();
    }

})();