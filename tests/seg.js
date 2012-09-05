window.console.time('startup');

// create a new test_renderer
test_renderer = new X.renderer2D();
test_renderer.orientation = 'X';
test_renderer.init();

// load a .nrrd file
var volume = new X.volume();
volume.file = 'data/T1.nii';
volume.labelmap.file = 'data/aparc+aseg.nii';
volume.labelmap.colortable.file = 'data/freesurfer.txt';

// add the object
test_renderer.add(volume);

test_renderer.camera.position = [60, 40, 100];

// .. and render it
test_renderer.render();

test_renderer.onShowtime = function() {

  window.console.timeEnd('startup');
  
};
