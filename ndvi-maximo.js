function getNDVI (image){
  
  var nir = image.select('B5');
  var red = image.select('B4');  
  
  return nir.subtract(red).divide(nir.add(red)).rename('NDVI')
}

var year = 2016;

var collection = ee.ImageCollection("LANDSAT/LC8_L1T_TOA")
//.filterDate(new Date(year,10,1),new Date(year+1,3,1))
.filterDate(new Date(2000,1,1),new Date(2017,1,1))
.filterBounds(geometry)

collection = collection.map(getNDVI);

var maxNDVI = collection.max()

var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];

maxNDVI = maxNDVI.clip(geometry)
print(maxNDVI)
Map.addLayer(maxNDVI,{min:.5,max:1,palette:palette})