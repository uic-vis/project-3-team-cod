d3.json("data/violations1.json").then(function(data_1){ 
    d3.json("data/violations2.json").then(function(data_2){ 
        const main = async () => {


            const jsonSpeedViolations_1 = data_1,
             jsonSpeedViolations_2 = data_2;

            const jsonSpeedViolationsData = jsonSpeedViolations_1.concat(jsonSpeedViolations_2);
        
            const addressWiseSummary = {};
            const addressResultSet = [];
        
            const yearWiseSummary = {};
            const yearResultSet = [];
        
            for (let record of jsonSpeedViolationsData) {
                if(record.YEAR !== 2014 && record.YEAR !== 2022) {
                    if (!(record.ADDRESS in addressWiseSummary)) {
                        addressWiseSummary[record.ADDRESS] = {
                          violations: 0,
                          latitude: record.LATITUDE,
                          longitude: record.LONGITUDE,
                        };
                    }
                  
                    addressWiseSummary[record.ADDRESS]["violations"] += record.VIOLATIONS;
        
                    if(!(record.YEAR in yearWiseSummary)) {
                        yearWiseSummary[record.YEAR] = {
                            violations: 0
                        };
                    }
                    
                    yearWiseSummary[record.YEAR]['violations'] += record.VIOLATIONS;
                }
            }
        
            for (let address in addressWiseSummary) {
                const tempObj = {
                  address: address,
                  violations: addressWiseSummary[address]["violations"],
                  latitude: addressWiseSummary[address]["latitude"],
                  longitude: addressWiseSummary[address]["longitude"],
                };
            
                addressResultSet.push(tempObj);
            }
        
            for (let year in yearWiseSummary) {
                const tempObj = {
                    year: year,
                    violations: yearWiseSummary[year]['violations']
                }
        
                yearResultSet.push(tempObj);
            }
        
            var width = window.innerWidth;
            var height  = width / 1.6;
        
            const map = createMap();
            var markerCluster = L.markerClusterGroup();
        
            let dataPoints = addressResultSet.map(h => [h.latitude, h.longitude, 0.1]);
        
            let markersLayer = L.geoJson(createGeoData(addressResultSet), {
                onEachFeature: function (feature, layer) {
        
                  const data = feature.properties;
        
                  const html = `<div class="popup"><h2>${data.address}</h2>` +
                        `<h1 style="font-weight: bold;">Violations: 
                        <span style="color: red;">${data.violations}</span></h1></div>`;
                  layer.bindPopup(html);
                  layer.bindTooltip(html, {sticky: true});
                  layer.on({
                    click: mouseClicked
                  });
                }
              });  
            markerCluster.addLayer(markersLayer);
            map.addLayer(markerCluster);  
        
            function createMap() {
                // create Stamen leaflet toner map with attributions
                const map = L.map('map').setView([41.85, -87.68], 10); // Chicago origins
                const mapTiles = '//stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
                const osmCPLink = '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
                const mapCPLink = '<a href="http://maps.stamen.com/toner">Stamen Design</a>';
                const tileLayer = L.tileLayer(mapTiles, {
                  attribution: `${osmCPLink} | ${mapCPLink}`,
                  detectRetina: false,
                  maxZoom: 18,
                  minZoom: 10,
                  noWrap: false,
                  subdomains: 'abc'
                }).addTo(map);
                return map;
            }
        
            function mouseClicked(e) {
                var layer = e.target;
                var clicked_data = layer.feature.properties;
        
                console.log("clicked_data", clicked_data.address, clicked_data.violations)
        
                const updated_yearWiseSummary = {};
                const updated_yearResultSet = [];
                for (let record of jsonSpeedViolationsData) {
                    if(record.YEAR !== 2014 && record.YEAR !== 2022 && record.ADDRESS === clicked_data.address) {
        
                        if(!(record.YEAR in updated_yearWiseSummary)) {
                            updated_yearWiseSummary[record.YEAR] = {
                                violations: 0
                            };
                        }
                        
                        updated_yearWiseSummary[record.YEAR]['violations'] += record.VIOLATIONS;
                    }
                }
        
                for (let year in updated_yearWiseSummary) {
                    const tempObj = {
                        year: year,
                        violations: updated_yearWiseSummary[year]['violations']
                    }
        
                    updated_yearResultSet.push(tempObj);
                }
        
                console.log("updated_yearWiseSummary", updated_yearResultSet)
                update_spatialBar(updated_yearResultSet);
            }
        
            document.getElementById("plot").offsetWidth
            var spatialBar_margin = {top: 30, right: 30, bottom: 200, left: 60},
            spatialBar_width = document.getElementById("plot").offsetWidth - spatialBar_margin.left - spatialBar_margin.right,
            spatialBar_height = document.getElementById("plot").offsetHeight - spatialBar_margin.top - spatialBar_margin.bottom;
        
            var spatialBar_svg = d3.select("#plot")
                        .append("svg")
                        .attr("width", spatialBar_width + spatialBar_margin.left + spatialBar_margin.right)
                        .attr("height", spatialBar_width + spatialBar_margin.top + spatialBar_margin.bottom)
                        .append("g")
                            .attr("transform", "translate(" + spatialBar_margin.left + "," + spatialBar_margin.top + ")");
        
            var spatialBar_x = d3.scaleBand()
                        .range([ 0, spatialBar_width ])
                        .padding(0.2);
        
            var spatialBar_xAxis = spatialBar_svg.append("g")
                            .attr("transform", "translate(0," + spatialBar_height + ")")
            
            // Initialize the Y axis
            var spatialBar_y = d3.scaleLinear()
                        .range([ spatialBar_height, 0]);
           
            var spatialBar_yAxis = spatialBar_svg.append("g")
                            .attr("class", "myYaxis");
        
            function update_spatialBar(updated_data) {
                // Update the X axis
                spatialBar_x.domain(updated_data.map(function(d) { return d.year; }));
        
                spatialBar_xAxis.call(d3.axisBottom(spatialBar_x).tickSizeOuter(0));
        
                var spatialBar_div = d3.select(".tooltip")
                            .style("opacity", 0);
                
                // Update the Y axis
                spatialBar_y.domain([0, d3.max(updated_data, function(d) { return d.violations })* 1.2 ]);
        
                spatialBar_yAxis.transition()
                                .duration(1000)
                                .call(d3.axisLeft(spatialBar_y)
                                        .tickSizeOuter(0));
                
                                        spatialBar_svg.append("text")
                                .attr("class", "label")
                                .attr("x", -(spatialBar_height - spatialBar_margin.bottom - spatialBar_margin.top) / 80)
                                .attr("y", spatialBar_margin.bottom / 150)
                                // .attr("transform", "rotate(-90)")
                                .attr("text-anchor", "middle")
                                .text("Violations ↑");
                // Create the u variable
                var spatialBar_u = spatialBar_svg.selectAll("rect")
                                        .data(updated_data);
                
                spatialBar_u.enter()
                    .append("rect") // Add a new rect for each new elements
                    .merge(spatialBar_u)
                    .on("mouseover", function(event,d) {
                        d3.select(this).style("fill", "HotPink")
                        .attr("width", spatialBar_x.bandwidth() - 5)
                        .style("opacity", 0.8);
        
                        spatialBar_div.transition()
                          .duration(200)
                          .style("opacity", 1);
        
                        spatialBar_div.html("Violations: <span style='color:red'>" + d.violations + "</span>")
                          .style("left", (event.pageX) + "px")
                          .style("top", (event.pageY - 28) + "px");
                        })
                      .on("mouseout", function(d) {
                        d3.select(this).style("fill", "#69b3a2")
                        .attr("width", spatialBar_x.bandwidth())
                        .style("opacity", 1);
        
                        spatialBar_div.transition()
                          .duration(500)
                          .style("opacity", 0);
                        }) // get the already existing elements as well
                    .transition() // and apply changes to all of them
                    .duration(1000)
                    .attr("x", function(d) { return spatialBar_x(d.year); })
                    .attr("y", function(d) { return spatialBar_y(d.violations); })
                    .attr("width", spatialBar_x.bandwidth())
                    .attr("height", function(d) { return spatialBar_height - spatialBar_y(d.violations); })
                    .attr("fill", "#69b3a2");
                    
                
                // If less group in the new dataset, I delete the ones not in use anymore
                spatialBar_u.exit()
                    .remove();
            }
                
            // Initialize the plot with the first dataset
            update_spatialBar(yearResultSet);
                          
        
            function createGeoData(addressResultSet) {
                const geoData = {
                  type: 'FeatureCollection',
                  crs: {type: 'name', properties: {name: 'urn:ogc:def:crs:OGC:1.3:CRS84'}},
                  features: []
                };
                addressResultSet.map(h => {
                  geoData.features.push({
                    type: 'Feature',
                    properties: {
                      address: h.address,
                      violations: h.violations,
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [h.longitude, h.latitude]
                    }
                  });
                });
                return geoData;
            }
        
        }
        
        main();
    });
});


  

