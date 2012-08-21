window.console.time('startup');

// create a new test_renderer
test_renderer = new X.renderer3D();
test_renderer.init();

var _dicoms = [ 53322875, 53322907, 53322939, 53322971, 53323003, 53323035, 53323067,
                53322891, 53322923, 53322955, 53322987, 53323019, 53323051, 53323083 ];


// load a .nrrd file
var v = new X.volume();
v.file = _dicoms.map(function(v) { return 'data/dicom/'+v; });

// add the object
test_renderer.add(v);

// .. and render it
test_renderer.render();

test_renderer.onShowtime = function() {

  window.console.timeEnd('startup');

};
