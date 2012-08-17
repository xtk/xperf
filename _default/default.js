/**
 * From
 * http://www.nczonline.net/blog/2009/07/28/the-best-way-to-load-external-javascript/
 */
function loadScript(url, callback) {

  var script = document.createElement("script")
  script.type = "text/javascript";
  
  if (script.readyState) { // IE
    script.onreadystatechange = function() {

      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { // Others
    script.onload = function() {

      callback();
    };
  }
  
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// check the arguments
console.log('xperf - XTK performance tests on real data');
console.log('==========================================');
var _tests = {
  
  'trk': ['fibers'],
  'vtk': ['mesh'],
  'nrrd': ['volume'],
  'nii': ['volume'],
  'nii.gz': ['volume'],
  'mgh': ['volume'],
  'mgz': ['volume'],
  'fsm': ['mesh'],
  'stl': ['mesh'],
  'bin.stl': ['mesh'],
  'colortable': [null],
  'label': [null],
  'curvature': [null]

};

console.log('valid tests: ', Object.keys(_tests));

var _X_repo = 'X';
var _test = 'nii';

if (location.href.match(/(\?)(\w*,*\w*)*/)) {
  
  //
  var _values = location.href.match(/(\?)(\w*,*.*\w*)*/)[0].split(',');
  
  _test = _values[0];
  _test = _test.replace('?', '').replace('/', ''); // replace any ? or /
  if (_values.length > 1) {
    _X_repo = _values[1];
    _X_repo = _X_repo.replace('?', '').replace('/', ''); // replace any ? or /
  }
  
}

console.log('Testing against XTK repository: ../' + _X_repo);
console.log('Running test: ' + _test);
console.log('==========================================');

goog.require('X.renderer3D');
goog.require('X.mesh');
goog.require('X.volume');
goog.require('X.fibers');

// callback when google closure was loaded
window.onload = function() {

  console.log('Closure loaded.');
  console.log('XTK loaded.');
  
  run_test();
  
};


// callback when xtk was loaded
function run_test() {

  // just include everything
  

  // check if this is a simple test
  var _test_type = _tests[_test][0];
  if (_test_type) {
    
    console.log('loading..');
    
    // yes it is
    window.console.time('startup');
    
    // create a new test_renderer
    test_renderer = new X.renderer3D();
    test_renderer.init();
    
    // load a .vtk file
    eval('var o = new X.' + _test_type);
    o.file = 'data/daniel.' + _test;
    o.color = [0, 0, 1];
    
    // add the object
    test_renderer.add(o);
    
    // .. and render it
    test_renderer.render();
    
    test_renderer.onShowtime = function() {

      window.console.timeEnd('startup');
      
    };
    
  } else {
    
    console.log('Loading ' + _test + '.js');
    loadScript('tests/' + _test + '.js');
    
  }
  

}
