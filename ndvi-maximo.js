function getNDVI (image){
  
  var nir = image.select('B5');
  var red = image.select('B4');  
  
  return nir.subtract(red).divide(nir.add(red)).rename('NDVI')
}

var collection = ee.ImageCollection("LANDSAT/LC8_L1T_TOA")
.filterDate(new Date(2000,1,1),new Date(2017,1,1))

collection = collection.map(getNDVI);

var maxNDVI = collection.max()

var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];

maxNDVI = maxNDVI.clip(geometry)  
Map.addLayer(maxNDVI,{min:-1,max:1,palette:palette})