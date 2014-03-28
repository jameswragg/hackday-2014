var feature; // eventually: all svg paths (countries) of the world,

var jsonx;
var toggle; // animation on/off control
var projection = d3.geo.azimuthal().scale(250).origin([-71.03, 42.37]).mode("orthographic").translate([200, 200]);
var currentstat = 0;
var oldfeature;
var mycollection;
var mystats;
var circle = d3.geo.greatCircle().origin(projection.origin());





function spinTo(countryCode) {
    stopAnimation();
    var origin = [0, 0];
    var animationsteps = 20;

    switch (countryCode) {
        case "GB":
            origin = [-7.064999999999742, 50.400000000000084];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "CA":
            origin = [-104.81499999999974, 57.775000000000084];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "US":
            origin = [-89.93999999999974, 40.275000000000084];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "HK":
            origin = [106.93500000000026, 27.400000000000084];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "DE":
            origin = [11.310000000000258, 49.77500000000009];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "DK":
            origin = [0.8100000000002581, 55.90000000000009];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "NG":
            origin = [8.560000000000258, 9.275000000000091];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "NO":
            origin = [9.310000000000258, 67.90000000000009];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "RO":
            origin = [24.310000000000258, 45.77500000000009];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "AU":
            origin = [136.18500000000026, -23.84999999999991];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;


        case "SE":
            origin = [-2.939999999999742, 61.52500000000009];
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;





        default:
            projection.scale(380);
            refresh();
            break;

    }

}









function quantize3(d) {
    //console.log(d);
    var x = mystats[currentstat][d.id];
    var min = mystats[currentstat]["Min"];
    var max = mystats[currentstat]["Max"];
    var bucket;
    if (x > 0)
        bucket = +Math.floor((x / max * 5) + 4);
    if (x < 0)
        bucket = Math.floor(6 - (x / min * 5));
    if (x != undefined)
    // console.log(d.id,x, bucket);
        return "q" + bucket + "-11";
    //d3.scale.quantile().domain([0, 15]).range(d3.range(9));
}



// TODO fix d3.geo.azimuthal to be consistent with scale
var scale = {
    orthographic: 380,
    stereographic: 380,
    gnomonic: 380,
    equidistant: 380 / Math.PI * 2,
    equalarea: 380 / Math.SQRT2
};

var path = d3.geo.path().projection(projection);

var svg = d3.select("#map").append("svg:svg").attr("width", '100%').attr("height", 400).on("mousedown", mousedown);

if (frameElement) frameElement.style.height = '400px';

feature = svg.append("g").attr("id", "countries").attr("class", "Spectral");
var countriesx = feature;

d3.json("global/price2.json", function(jsonx) {
    mystats = jsonx;
    d3.json("global/world-countries.json", function(collection) {
        mycollection = collection;

        oldfeature = feature;
        feature = feature.selectAll("path").attr("id", "countries").data(mycollection.features).enter().append("path").attr("class", jsonx[currentstat] ? quantize3 : null);

        feature.append("svg:title").text(function(d) {
            //console.log(jsonx[currentstat][d.id]);
            return "\n" + d.properties.name + ": " + (jsonx[currentstat][d.id] ? jsonx[currentstat][d.id] : "no data") + "q" + Math.min(8, ~~ (mystats[currentstat][d.id] ? (mystats[currentstat][d.id]) * 9 / 12 : null)) + "-11";
        });

    });

    function quantize(d) {
        return "q" + Math.min(8, ~~ (mystats[currentstat][d.id] * 9 / 12)) + "-9";
    }

});

var x = function() {
    d3.selectAll("svg").attr("class", "Purples");
};

startAnimation();


d3.select('#animate').on('click', function() {
    if (done) startAnimation();
    else stopAnimation();

});

function stopAnimation() {
    done = true;
    //d3.select('#animate').node().checked = false;
}

function startAnimation() {
    done = false;
    d3.timer(function() {
        var origin = projection.origin();

        origin = [origin[0] + .18, origin[1] + .06];
        projection.origin(origin);
        circle.origin(origin);
        refresh();
        return done;
    });
}

function animationState() {
    return 'animation: ' + (done ? 'off' : 'on');
}

d3.select(window).on("mousemove", mousemove).on("mouseup", mouseup);

d3.select("select").on("change", function() {
    //console.log(this);
    stopAnimation();
    projection.mode(this.value).scale(scale[this.value]);
    refresh(750);
});




d3.select("#statchooser").on("change", function() {
    currentstat = this.value;
    // you my little query now.
    countriesx.selectAll("path").transition().ease("bounce").attr("background-col", mystats[currentstat] ? quantize3 : null);
    //console.log(currentstat);
});



// you my little query now.


/// section geo navigate



d3.select("#geochooser").on("change", function() {
    stopAnimation();
    // you my little query now.
    var origin = [0, 0];
    var animationsteps = 20;
    switch (this.value) {
        case "1":
            origin = [-90, 12];
            originTransition(projection, origin, animationsteps, 380);
            //projection.scale(380);
            refresh();
            break;

        case "10": /// North America
            origin = [250, 49];
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(580);
            refresh();
            break;

        case "11": // South America
            origin = [299.625, -21.75];
            //    projection.origin(origin);
            //      circle.origin(origin);
            //        projection.scale(1080);
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;





        case "2": // EMEA
            origin = [28, 12];
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(430);
            refresh();
            break;
        case "20": //Europe
            origin = [18, 50];
            //    projection.origin(origin);
            //      circle.origin(origin);
            //        projection.scale(1080);
            originTransition(projection, origin, animationsteps, 380);
            refresh();
            break;

        case "21": // Middle East
            origin = [-309.75, 27.375];
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(580);
            refresh();
            break;



        case "22": // Africa
            origin = [-340.625, 0.375]
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(580);
            refresh();
            break;


        case "3":
            origin = [-257, 16];
            // projection.origin(origin);
            //        circle.origin(origin);
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(380);
            refresh();
            break;

        case "30": // china
            origin = [-273.375, 32.875];
            // projection.origin(origin);
            //        circle.origin(origin);
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(380);
            refresh();
            break;


        case "31": // India
            origin = [-292.375, 17.25];
            // projection.origin(origin);
            //        circle.origin(origin);
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(380);
            refresh();
            break;


        case "32": // Oceana
            origin = [-241.875, -18.125];
            // projection.origin(origin);
            //        circle.origin(origin);
            originTransition(projection, origin, animationsteps, 380);
            //        projection.scale(380);
            refresh();
            break;




        default:
            projection.scale(380);
            refresh();
            break;
    }


    //d3.geo.azimuthal().scale(380).origin([15, 48]).mode("orthographic").translate([0, 0]);
    //refresh(); 

});



function originTransition(projection, targetOrigin, steps, zoom) {
    //console.log("in ot", projection, targetOrigin, steps);
    var originalOrigin = [projection.origin()[0],
        projection.origin()[1]
    ];
    var originalZoom = projection.scale();
    var stepstaken = 0;
    takestep();

    function takestep() {
        done = false;
        d3.timer(function() {
            // console.log("timer", stepstaken, (steps - stepstaken - 1), (stepstaken + 1));

            var long = (steps - stepstaken - 1) / steps * originalOrigin[0] + (stepstaken + 1) / steps * targetOrigin[0];
            var lat = (steps - stepstaken - 1) / steps * originalOrigin[1] + (stepstaken + 1) / steps * targetOrigin[1];
            var myscale = projection.scale() + (zoom - projection.scale()) / 10; //distance
            //       projection.scale(myscale;
            //console.log(long, lat, targetOrigin, myscale, zoom);
            projection.origin([long, lat]);
            projection.scale(myscale);
            circle.origin([long, lat]);
            refresh();
            stepstaken++;
            if (stepstaken === steps) {
                done = true;
            };
            return done;
        });


    };




};

/// end geonavigate


var m0, o0, done;

function mousedown() {
    stopAnimation();
    m0 = [d3.event.pageX, d3.event.pageY];
    o0 = projection.origin();
    d3.event.preventDefault();
}

function mousemove() {
    if (m0) {
        var m1 = [d3.event.pageX, d3.event.pageY],
            o1 = [o0[0] + (m0[0] - m1[0]) / 8, o0[1] + (m1[1] - m0[1]) / 8];
        projection.origin(o1);
        circle.origin(o1);
        refresh();
    }
}

function mouseup() {
    if (m0) {
        mousemove();
        m0 = null;
    }
}

function refresh(duration) {


    (duration ? feature.transition().duration(duration) : feature).attr("d", clip);
}

function clip(d) {
    //console.log("clip",d);  
    return path(circle.clip(d));
}

function reframe(css) {
    for (var name in css)
        frameElement.style[name] = css[name] + 'px';
}