// let map = L.map("map").setView([4.621948, -74.076221], 13);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {

//   maxZoom: 19,

//   attribution:

//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

// }).addTo(map);



const map = L.map('map').setView([50, -120], 4);



const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

    maxZoom: 19,

    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'

}).addTo(map);



fetch('data/data.geojson').then(resp => resp.json()).then(earthquakeData => {



    // https://www.patrick-wied.at/static/heatmapjs/plugin-leaflet-layer.html



    let maxMag = 0;

    earthquakeData.features.forEach(feature => {

        if (feature.properties.mag > maxMag) {

            maxMag = feature.properties.mag;

        }

    })



    const changedDataFormat = {

        max: maxMag,

        data: earthquakeData.features.map(feature => {

            return {

                lat: feature.geometry.coordinates[1],

                lng: feature.geometry.coordinates[0],

                mag: feature.properties.mag,

                count: 1

            }

        })

    }



    var cfg = {

        // radius should be small ONLY if scaleRadius is true (or small radius is intended)

        // if scaleRadius is false it will be the constant radius used in pixels

        "radius": 0.5,

        "maxOpacity": .8,

        // scales the radius based on map zoom

        "scaleRadius": true,

        // if set to false the heatmap uses the global maximum for colorization

        // if activated: uses the data maximum within the current map boundaries

        //   (there will always be a red spot with useLocalExtremas true)

        "useLocalExtrema": false,

        // which field name in your data represents the latitude - default "lat"

        latField: 'lat',

        // which field name in your data represents the longitude - default "lng"

        lngField: 'lng',

        // which field name in your data represents the data value - default "value"

        valueField: 'mag'

    };



    var heatmapLayer = new HeatmapOverlay(cfg);

    heatmapLayer.setData(changedDataFormat)



    map.addLayer(heatmapLayer)



});