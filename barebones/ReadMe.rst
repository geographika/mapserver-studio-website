Template engine: https://github.com/pantor/inja

- can be run locally with no external requests - useful for Intranet systems
- uses OpenLayers
- Light and Dark themes

mapserver.conf file:

ENV
    OGCAPI_HTML_TEMPLATE_DIRECTORY "/usr/share/mapserver/ogcapi/templates/html-plain/"
END


https://github.com/camptocamp/docker-mapserver/blob/ed259e36ddba379e4da5b810327a82ee29a4f500/Dockerfile#L113

COPY --from=builder /src/share/ogcapi/templates/html-bootstrap4 /usr/local/share/mapserver/ogcapi/templates/html-bootstrap4/

Some files (CSS and JS) need to be accessible from an external web server so that they can be accessed by the web browser



Custom Parameters
-----------------

    WEB
        METADATA
            "oga_html_tags"      "debug,sample,html_root"
            "oga_tag_html_root" "http://localhost"
        END
    END

Then accessed using:

{{ template.tags.html_root }}

Without adding to the tags list will get the following error:

"Template rendering error. [inja.exception.render_error] (at 11:23) variable 'template.tags.html_root' not found



Debugging a Template
--------------------

    # debug is used in the bootstrap template for the debug.html page
    # if set to true debug details are available at the bottom of each page

Other Notes
-----------

            # can also set values via the querystring e.g. &myparam=myvalue
            # e.g. {{ template.params.myparam }}
            # cookie values are also part of the params collection
            # you can check these in the debug settings

            "oga_html_template_directory" "D:/GitHub/barebones/" # requires DefaultAppPool access, and must have final slash

Errors
------

{"code":"ConfigError","description":"Template rendering error. [inja.exception.render_error] (at 6:57) variable 'response.collection.id' not found (collections.html)."}
collection.id is only available in the collection.html template


http://localhost/mapserver2/geography/ogcapi/collections/Lakes/items?f=html
{"code":"NotFound","description":"Collection items query failed."}

Data clause was set to: DATA "ne_10m_lakes.fgdb" and should have been DATA "ne_10m_lakes"

Testing Locally
---------------

http://localhost/mapserver2/geography/ogcapi

If layers are missing from the collection - they require a TEMPLATE to be set!


Pages and Links
---------------

landing.html: http://localhost/mapserver2/geography/ogcapi?f=html - the homepage
conformance.html: http://localhost/mapserver2/geography/ogcapi/conformance?f=html - conformance links
collections.html: http://localhost/mapserver2/geography/ogcapi/collections?f=html - table of all collections in the map. no mapping.
collection.html: http://localhost/mapserver2/geography/ogcapi/collections/ne_10m_parks_and_protected_lands_area?f=html - details about a single collection. map of bbox of collection
collection-items.html: http://localhost/mapserver2/geography/ogcapi/collections/ne_10m_parks_and_protected_lands_area/items?f=html - map and table of items in the collection
collection-item.html: http://localhost/mapserver2/geography/ogcapi/collections/ne_10m_admin_0_antarctic_claims/items/Norway?f=html - an individual item in a collection, with map of feature


Partials - included on every page:

header.html
footer.html

debug.html



Example site: https://demo.mapserver.org/cgi-bin/mapserv/localdemo/ogcapi/collections?f=html
