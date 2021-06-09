var map = new maplibregl.Map({
    container: 'map',
    style: 'omap_fr.json',
    center: [2.3,47],
    minZoom: 5,
    maxZoom:18,
    zoom: 5.7,
    hash:true
});

var scale = new maplibregl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
});
map.addControl(scale);



var nav = new maplibregl.NavigationControl();
map.addControl(nav, 'top-right');


var roadsLayers      = ["tunnel_motorway_casing", "aeroway-taxiway", "aeroway-runway-casing",  "aeroway-runway", "highway_minor", "highway_major_casing", "highway_major_inner","highway_motorway_casing", "highway_motorway_inner", "railway_transit", "railway_transit_dashline", "railway_service", "railway_service_dashline", "railway", "railway_dashline","highway_motorway_bridge_casing", "highway_motorway_bridge_inner",  "highway_name_other", "highway_name_motorway"]
var labelsLayers     = ["place_village","place_town","place_city","place_capital","place_city_large", "place_country_other","place_country_minor","place_country_major"]
var boundariesLayers = ["boundary_city","boundary_state"]


var mylayers = [
    {
      type: 'alpha',
      expression :  ['/',['to-number',['get','n_tuiles']],['to-number',['get', 'n_toits']]],
      col : "#ca6747",
      name:"tuiles",
      visibility:'visible',
      text:'Batiments couvert de tuiles (%)',
      format:function(d){return Math.round(d*100)},
      filter:["!=",['get', 'n_toits'],0],
      group:'toits'
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_ardoises']],['to-number',['get', 'n_toits']]],
      col : "#3d4f8b",
      name:"ardoises",
      visibility:'visible',
      text:"Batiments couvert d'ardoise (%)",
      format:function(d){return Math.round(d*100)},
      filter:["!=",['get', 'n_toits'],0],
      group:'toits'
    },
    {
      type: 'alpha',
      expression :  ['/',['-',['to-number',['get', 'n_toits']],['+',['to-number',['get','n_tuiles']],['to-number',['get','n_ardoises']]]],['to-number',['get', 'n_toits']]],
      col : "#66c2a5",
      name:"autres",
      visibility:'visible',
      text:'Batiments couvert autres (%)',
      format:function(d){return Math.round(d*100)},
      group:'toits',
      filter:["!=",['get', 'n_toits'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_pierres']],['to-number',['get', 'n_murs']]],
      col : "#7570b3",
      name:"pierres",
      visibility:'visible',
      text:"Batiments murs en pierres (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_briques']],['to-number',['get', 'n_murs']]],
      col : "#d95f02",
      name:"briques",
      visibility:'visible',
      text:"Batiments murs en briques (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_meulieres']],['to-number',['get', 'n_murs']]],
      col : "#1b9e77",
      name:"meulieres",
      visibility:'visible',
      text:"Batiments murs en meulieres (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_betons']],['to-number',['get', 'n_murs']]],
      col : "#e7298a",
      name:"betons",
      visibility:'visible',
      text:"Batiments murs en betons (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_agglo']],['to-number',['get', 'n_murs']]],
      col : "#e6ab02",
      name:"agglo",
      visibility:'visible',
      text:"Batiments murs en aggloméré (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['to-number',['get','n_bois']],['to-number',['get', 'n_murs']]],
      col : "#a6761d",
      name:"bois",
      visibility:'visible',
      text:"Batiments murs en bois (%)",
      format:function(d){return Math.round(d*100)},
      group:'murs',
      filter:["!=",['get', 'n_murs'],0],
    },
    {
      type:'alpha',
      expression :  ['/',['+',['to-number',['get','n_indus1']],['to-number',['get','n_indus2']]],['to-number',['get', 'n']]],
      col : "#984ea3",
      name:"indus",
      visibility:'visible',
      text:"Batiments à usage industriel (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },
    {
      type:'alpha',
      expression :  ['/',['+',['to-number',['get','n_agr1']],['to-number',['get','n_agr2']]],['to-number',['get', 'n']]],
      col : "#4daf4a",
      name:"agricol",
      visibility:'visible',
      text:"Batiments à usage agricole (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },

    {
      type:'alpha',
      expression :  ['/',['+',['to-number',['get','n_res1']],['to-number',['get','n_res2']]],['to-number',['get', 'n']]],
      col : "#377eb8",
      name:"resi",
      visibility:'visible',
      text:"Batiments à usage residentiel (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },
    {
      type:'alpha',
      expression :  ['/',['+',['to-number',['get','n_com1']],['to-number',['get','n_com2']]],['to-number',['get', 'n']]],
      col : "#e41a1c",
      name:"com",
      visibility:'visible',
      text:"Batiments à usage comercial (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },
    {
      type:'alpha',
      expression :  ['/',['+',['to-number',['get','n_rel1']],['to-number',['get','n_rel2']]],['to-number',['get', 'n']]],
      col : "#a65628",
      name:"rel",
      visibility:'visible',
      text:"Batiments à usage religieux (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },
    {
      type:'alpha',
      expression :  ['min',['/',['+',['to-number',['get','n_sport1']],['to-number',['get','n_sport2']]],['to-number',['get', 'n']]],1],
      col : "#ff7f00",
      name:"sport",
      visibility:'visible',
      text:"Batiments à usage sportif (%)",
      format:function(d){return Math.round(d*100)},
      group:'usages',
      filter:["!=",['get', 'n'],0]
    },
    {
      type:'step',
      expression :  ['/',['to-number',['get','s_datecrea']],['to-number',['get', 'n_datecrea']]],
      cols : ["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],
      steps : [1800,1850,1900,1920,1940,1960,1970,1980,1990,2000],
      alphaexp : ['/',['to-number',['get','n_datecrea']],['to-number',['get', 'n']]],
      name:"datecrea",
      visibility:'visible',
      text:"Date de construction moyennes des batiments",
      format:function(d){return Math.round(d)},
      filter:["!=",['get', 'n_datecrea'],0],
      group:'date'
    }
]


mylayers.forEach(function(l){
  ld = d3.select("#layers-controls").append("div")
  	.attr("class","form-check")
  	.attr("id",l.name+"-div")

  ld.append("input")
  	.attr("class","form-check-input")
  	.attr("type","checkbox")
  	.attr("value","")
  	.attr("id",l.name)
  	.attr("onchange","updateLayers()")
    .property('checked', true);

  ld.append("label")
  	.attr("class","form-check-label")
  	.attr("for",l.name)
  	.text(l.text)

  ld.append("div")
  	.attr("class","legend-group")
  	.attr("id",l.name+'-leg')
})


map.on('load', function () {

  map.addSource('bati_poly',{
      type: 'vector',
      url: '../../tileserver-php/tileserver.php?/bati_poly_z13.json'
  })

  map.addLayer({
            "id": "poly_toits",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color":["match",["get","materiaux_de_la_toiture"],
                  "1","#ca6747",
                  "01","#ca6747",
                  "10","#ca6747",
                  "2","#3d4f8b",
                  "02","#ca6747",
                  "20","#ca6747",
                  "#66c2a5"
                  ],
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["has","materiaux_de_la_toiture"],
  },'waterway');

  map.addLayer({
            "id": "poly_toits_missing",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color": "#666666",
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["!",["has","materiaux_de_la_toiture"]],
  },'waterway');

    map.addLayer({
            "id": "poly_murs",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color":["match",["get","materiaux_des_murs"],
                  "1","#7570b3" ,
                  "01","#7570b3" ,
                  "10","#7570b3" ,
                  "11","#7570b3" ,
                  "2","#1b9e77",
                  "02","#1b9e77",
                  "20","#1b9e77",
                  "22","#1b9e77",
                  "3","#e7298a",
                  "03","#e7298a",
                  "30","#e7298a",
                  "33","#e7298a",
                  "4","#d95f02" ,
                  "04","#d95f02" ,
                  "40","#d95f02" ,
                  "44","#d95f02" ,
                  "5","#e6ab02",
                  "05","#e6ab02",
                  "50","#e6ab02",
                  "55","#e6ab02",
                  "6","#a6761d",
                  "06","#a6761d",
                  "60","#a6761d",
                  "66","#a6761d",
                  "#666666"
                  ],
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["has","materiaux_des_murs"],
  },'waterway');

  map.addLayer({
            "id": "poly_murs_missing",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color": "#666666",
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["!",["has","materiaux_des_murs"]],
  },'waterway');



    map.addLayer({
            "id": "poly_usages",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color":["match",["get","usage_1"],
                  "Industriel","#984ea3",
                  "Agricole","#4daf4a",
                  "Résidentiel","#377eb8",
                  "Commercial et services","#e41a1c",
                  "Religieux","#a65628",
                  "Sportif","#ff7f00",
                  "#666666"
                  ],
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["has","usage_1"],
  },'waterway');

  map.addLayer({
            "id": "poly_usages_missing",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color": "#666666",
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["!",["has","usage_1"]],
  },'waterway');


      map.addLayer({
            "id": "poly_date",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color":["step",["get","datecrea"],"#9e0142",
                1800,"#d53e4f",
                1850,"#f46d43",
                1900,"#fdae61",
                1920,"#fee08b",
                1940,"#ffffbf",
                1960,"#e6f598",
                1970,"#abdda4",
                1980,"#66c2a5",
                1990,"#3288bd",
                2000,"#5e4fa2"],
                "fill-opacity": 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["has","datecrea"],
  },'waterway');

  map.addLayer({
            "id": "poly_date_missing",
            "type": "fill",
            "source": "bati_poly",
            "source-layer": "bati",
            "paint": {
                "fill-color": "#666666",
                'fill-opacity': 1,
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":["!",["has","datecrea"]],
  },'waterway');


  map.addSource('grid_bati',{
      type: 'vector',
      url: '../../tileserver-php/tileserver.php?/grid_bati.json'
  })


  mylayers.forEach(function(l){

      if(l.type=="alpha"){
        map.addLayer({
            "id": l.name,
            "type": "fill",
            "source": "grid_bati",
            "source-layer": "grid_bati",
            "paint": {
                "fill-color":l.col,
                'fill-opacity': ["interpolate", ["linear"], ["zoom"],1,l.expression,13,l.expression,14.5,0],
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":l.filter,
            "maxzoom":15
        },'waterway');

        nqt = [0,0.25,0.5,0.75,1]

        x=d3.scaleLinear().domain([0,1]).range([0,95])
        d3.select("#"+l.name+'-leg')
          .selectAll("div")
          .data(nqt)
          .enter().append("div")
          .attr("class","legend-div")
          .style("width",function(d,i){return i>0 ? (x(nqt[i])-x(nqt[i-1])) +"%" : 0 +"%"})
          .style("background-color",l.col)
          .style("opacity",function(d){return d})
          .style("color",function(d,i){return d3.hsl(l.col).l < 0.5 ? "#fff" : "#111";})
          .html(function(d,i){if(i==1 || i==nqt.length-1 || (x(nqt[i])-x(nqt[i-1]))>8){return l.format(d)}})


      }
      if(l.type=="step"){

      l.coloramp = ["step",l.expression]
      l.steps.forEach(function(q,i){l.coloramp.push(l.cols[i]); l.coloramp.push(q)})
      l.coloramp.push(l.cols[l.cols.length-1])

        map.addLayer({
            "id": l.name,
            "type": "fill",
            "source": "grid_bati",
            "source-layer": "grid_bati",
            "paint": {
                "fill-color":l.coloramp,
                'fill-opacity': ["interpolate", ["linear"], ["zoom"],1,1,13,1,14.5,0],
            },
            "layout": {
              "visibility": "visible"
            },
            "filter":l.filter,
            "maxzoom":15
        },'waterway');

        nqt = l.steps

        nqt.push(l.steps[l.steps.length-1]+(l.steps[l.steps.length-1]-l.steps[l.steps.length-2]))
        x=d3.scaleLinear().domain([nqt[0],nqt[nqt.length-1]]).range([0,95])
        d3.select("#"+l.name+'-leg')
          .selectAll("div")
          .data(nqt)
          .enter().append("div")
          .attr("class","legend-div")
          .style("width",function(d,i){return (95/12) +"%" })
          .style("background-color",function(d,i){return l.cols[i]})
          .style("color",function(d,i){return d3.hsl(l.cols[i]).l < 0.5 ? "#fff" : "#111";})
          .html(function(d,i){return i>0? l.format(nqt[i-1]) :"";})
      }



  })


$('#ogdate').prop('selected', true);
changeGroup("date")
updateLayers()

});



function updateLayers(){

mylayers.forEach(function(l){
if (document.getElementById(l.name).checked){
map.setLayoutProperty(l.name, 'visibility', 'visible');
l.visibility="visible";
}else{
map.setLayoutProperty(l.name, 'visibility', 'none');
l.visibility="none";
}
})



if (document.getElementById('roads').checked){
roadsLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'visible')});
}else{
roadsLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'none')});
}

if (document.getElementById('boundaries').checked){
boundariesLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'visible')});
}else{
boundariesLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'none')});
}

if (document.getElementById('labels').checked){
labelsLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'visible')});
}else{
labelsLayers.forEach(function(l){map.setLayoutProperty(l, 'visibility', 'none')});
}

}



function changeGroup(g){
  console.log(g)
  map.setLayoutProperty('poly_toits', 'visibility','none');
  map.setLayoutProperty('poly_toits_missing','visibility', 'none');

  map.setLayoutProperty('poly_murs','visibility', 'none');
  map.setLayoutProperty('poly_murs_missing','visibility', 'none');

  map.setLayoutProperty( 'poly_usages','visibility', 'none');
  map.setLayoutProperty( 'poly_usages_missing','visibility', 'none');

  map.setLayoutProperty( 'poly_date','visibility', 'none');
  map.setLayoutProperty( 'poly_date_missing','visibility', 'none');

  if(g=="toits"){
    map.setLayoutProperty( 'poly_toits','visibility', 'visible');
    map.setLayoutProperty( 'poly_toits_missing', 'visibility','visible');
  }

  if(g=="murs"){
    map.setLayoutProperty( 'poly_murs', 'visibility','visible');
    map.setLayoutProperty( 'poly_murs_missing', 'visibility','visible');
  }

  if(g=="usages"){
    map.setLayoutProperty( 'poly_usages', 'visibility','visible');
    map.setLayoutProperty( 'poly_usages_missing', 'visibility','visible');
  }

  if(g=="date"){
    map.setLayoutProperty( 'poly_date','visibility', 'visible');
    map.setLayoutProperty( 'poly_date_missing', 'visibility','visible');
  }
  mylayers.forEach(function(l){
    if (l.group==g){
      $('#'+l.name).prop('checked', true);
      map.setLayoutProperty(l.name, 'visibility', 'visible');
      l.visibility="visible";
      $('#'+l.name+'-div').css('display', "block");
    }else{
      $('#'+l.name).prop('checked', false);
      map.setLayoutProperty(l.name, 'visibility', 'none');
      l.visibility="none";
      $('#'+l.name+'-div').css('display', "none");
    }
})
}
