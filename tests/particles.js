window.console.time('startup');

function test() {

  // create a new test_renderer
  test_renderer = new X.renderer3D();
  test_renderer.init();
  
  obj = new X.object();
  obj.points = new X.triplets(24000000);
  obj.normals = new X.triplets(24000000);
  obj.colors = new X.triplets(24000000);
  
  obj.type = 'POINTS';
  
  for ( var x = 0; x < 200; x++) {
    for ( var y = 0; y < 200; y++) {
      for ( var z = 0; z < 200; z++) {
        
        obj.points.add(x, y, z);
        obj.normals.add(1, 1, 1);
        obj.colors.add(x, y, z);
        
      }
      
    }
    
  }
  
  test_renderer.add(obj);
  
  // .. and render it
  test_renderer.camera.position = [-400, -400, -1000];
  
  test_renderer.render();
}

test();
