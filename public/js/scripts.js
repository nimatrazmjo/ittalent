var isPause = false;

function  downloadData() {
    $.ajax({url: "http://localhost:8000/service/api", success: function(result){
        var json = result;

        var i = 0;
        while(i < json.length)
        {
            var long = json[i].longitude;
            var lat = json[i].latitude;
            var latlng = {"lat": parseFloat(lat), "lng": parseFloat(long)};
            //console.log(latlng);
            var address =   "<b>Country</b>: " + json[i].country + "  <b>Store</b>:" + json[i].store +" <b>Serial</b>: " + json[i].serial;
            if(isPause == false)
                createMarker(latlng, address);

            i++;
        }


    }});
}

var map = new google.maps.Map(document.getElementById('someMeaningfulId'), {
    center: {lat: 52, lng: 10},
    scrollwheel: false,
    zoom: 5
});

function  startTimer() {
    myvar = setTimeout(function(){ downloadData(); startTimer(); }, 1000);
}

function togglePause() {
  clearTimeout(myvar);
}

var image = {
    url: '/favicon.png',
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
};

var image_dollar = {
    url: '/dollar_1.png',
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32),

};

var image_dollar2 = {
    url: '/dollar_2.png',
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 32)
};

var markers = [];

function createMarker(myLatLng, address) {

    var infowindow = new google.maps.InfoWindow({
        content: address
    });


    var marker = new google.maps.Marker({
        position: myLatLng,
        map: null,
        icon: (Math.random() < 0.5 ? image_dollar : image_dollar2),
        title: 'Me'
    });



    marker.addListener('mouseover', function() {
        infowindow.open(marker, this);
    });

    marker.addListener('mouseout', function() {
        infowindow.close();
    });

    markers.push(marker);

    setTimeout(function(){

        if(isPause == false)
            marker.setMap(map);

        marker.setAnimation(google.maps.Animation.BOUNCE);

        setTimeout(function()
        {
            if(isPause == false)
                marker.setMap(null);

        }, Math.random() * 300 * sliderValue);
    }, Math.random() * 2000);
}

var sliderValue = 1;

$(document).ready(function () {
    $('#ex1').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    }).on('slide', function (val) {
        sliderValue = val.value;
    });

    startTimer();
});

$(document).on('click','.continue',function () {
    console.log("reached")
    startTimer();
    $("#pauseBtn").removeClass('continue');
    $("#pauseBtn").addClass('pause');
    $("#pauseBtn").prop('value', 'Pause');
});

$(document).on('click','.pause',function () {
    togglePause();
    $("#pauseBtn").removeClass('pause');
    $("#pauseBtn").addClass('continue');
    $("#pauseBtn").prop('value', 'Continue');
});

