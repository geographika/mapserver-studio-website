function createMap(vectorLayer) {
    return new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            vectorLayer,
        ],
        target: 'map',
        view: new ol.View({
            center: [0, 0],
            zoom: 2,
        }),
    });
}

function addCollectionMapping(bbox) {

    const feat = new ol.Feature({
        geometry: new ol.geom.Polygon(bbox)
    });

    // features are always returned in EPSG:4326 by MapServer OGC API features
    const vectorSource = new ol.source.Vector({
        features: [feat],
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });

    createMap(vectorLayer);
}

function addCollectionItemsMapping(geojson) {

    // features are always returned in EPSG:4326 by MapServer OGC API features
    const vectorSource = new ol.source.Vector({
        features: (new ol.format.GeoJSON({
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        })).readFeatures(geojson),
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
    });

    createMap(vectorLayer);

}