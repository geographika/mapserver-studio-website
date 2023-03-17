function createMap(vectorLayer) {

    // fit map to extent of features
    let extent = vectorLayer.getSource().getExtent();
    //console.log(extent);

    if (Number.isFinite(extent[0]) === false) {
        // handle infinite extents
        // [Infinity, Infinity, -Infinity, -Infinity]
        extent = [-20037508.34, -20048966.1, 20037508.34, 20048966.1];
    }

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            vectorLayer,
        ],
        target: 'map',
        view: new ol.View({
            center: ol.extent.getCenter(extent),
            zoom: 8,
            //extent: extent, // this would constrain the view to the extent
            showFullExtent: true
        }),
    });

    map.getView().fit(extent, {
        constrainResolution: false,
        padding: [50, 50, 50, 50], // optional padding around the extent
    });
    return map;
}

/**
 * Create a new layer containing the bbox of the extent of the collection
 * @param {any} bbox
 */
function addCollectionExtentToMap(bbox) {

    // unsure why the extent in response.extent.spatial.bbox is nested
    if (Array.isArray(bbox[0])) {
        bbox = bbox[0];
    }

    var polygon = ol.geom.Polygon.fromExtent(bbox).transform('EPSG:4326', 'EPSG:3857');

    const feat = new ol.Feature({
        geometry: polygon
    });

    const vectorSource = new ol.source.Vector({
        features: [feat]
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,

    });

    createMap(vectorLayer);
}

function addGeoJsonToMap(geojson) {

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