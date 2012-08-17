window.console.time('startup');

// create a new test_renderer
test_renderer = new X.renderer3D();
test_renderer.init();

// load a .nrrd file
var m = new X.mesh();
m.file = 'data/daniel.fsm';
m.scalars.file = 'data/daniel.label';

// add the object
test_renderer.add(m);

test_renderer.camera.position = [60, 40, 100];

// .. and render it
test_renderer.render();

test_renderer.onShowtime = function() {

  window.console.timeEnd('startup');
  
};
