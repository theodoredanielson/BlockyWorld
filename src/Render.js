// define global eye position
var g_eye = new Vector3([0, 0, 2]);
// define global look-at position
var g_at = new Vector3([0, 0, -100]); 
// define global up vector
var g_up = new Vector3([0, 1, 0]);
// define the game map layout
var g_map = [
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8'], // row 0 (top perimeter)
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','%','%','%','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 1
  ['8','%','%','%','%','%','%','%','%','%','.','.','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // row 2
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','%','.','.','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 3
  ['8','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','%','%','8'], // row 4
  ['8','.','.','.','.','%','.','.','.','.','%','.','.','.','.','.','.','.','.','.','%','.','.','.','.','.','%','.','.','.','.','8'], // row 5
  ['8','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // row 6
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 7
  ['8','%','%','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','8'], // row 8
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 9
  ['8','%','%','%','%','%','.','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','.','.','.','%','%','%','.','%','%','8'], // row 10
  ['8','.','.','.','.','%','.','.','.','.','%','.','.','.','.','.','.','.','.','.','%','.','.','.','.','.','.','.','.','.','.','8'], // row 11
  ['8','%','%','%','%','%','%','.','.','%','%','%','%','%','%','.','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','8'], // row 12
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 13
  ['8','%','%','%','%','%','%','%','%','.','%','%','%','%','.','.','.','.','.','.','%','%','%','%','%','%','%','%','%','%','%','8'], // row 14
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 15
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 16 (center start)
  ['8','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','.','.','.','.','%','%','%','%','%','%','%','%','%','%','%','8'], // row 17
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 18
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 19
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 20
  ['8','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','%','.','.','%','%','%','%','.','.','8'], // row 21
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 22
  ['8','%','%','%','%','.','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','.','.','%','%','.','.','8'], // row 23
  ['8','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // row 24
  ['8','%','%','%','%','.','.','.','.','%','%','.','.','.','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','.','.','8'], // row 25
  ['8','.','.','%','.','.','.','.','.','.','%','.','.','.','%','.','.','.','.','.','.','%','.','.','%','.','.','.','%','.','.','8'], // row 26
  ['8','.','.','%','.','.','%','%','.','.','%','.','.','.','%','.','.','.','.','.','.','%','.','.','%','.','.','.','%','.','.','8'], // row 27 (end room start)
  ['8','.','.','%','.','.','%','%','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','8'], // row 28
  ['8','.','.','.','.','.','%','%','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','8'], // row 29
  ['8','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // row 30
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8']  // row 31 (bottom perimeter)
];

// define the quit map layout
var quit_map = [
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8'], // row 0 (top perimeter)
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+','+','+','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 1
  ['8','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // row 2
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 3
  ['8','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','8'], // row 4
  ['8',' ',' ',' ',' ','+',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ',' ',' ','+',' ',' ',' ',' ','8'], // row 5
  ['8','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // row 6
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 7
  ['8','+','+','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+','8'], // row 8
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 9
  ['8','+','+','+','+','+',' ','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+',' ',' ',' ','+','+','+',' ','+','+','8'], // row 10
  ['8',' ',' ',' ',' ','+',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 11
  ['8','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+',' ','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','8'], // row 12
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 13
  ['8','+','+','+','+','+','+','+','+',' ','+','+','+','+',' ',' ',' ',' ',' ','S','+','+','+','+','+','+','+','+','+','+','+','8'], // row 14
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','T',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 15
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','@','@','@','@','A',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 16 (center start)
  ['8','+','+','+','+','+','+','+','+','+','+','+','+','+',' ','@',' ',' ',' ','R','+','+','+','+','+','+','+','+','+','+','+','8'], // row 17
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','@',' ',' ',' ','T',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 18
  ['8',' ',' ',' ',' ',' ','@','@','@','@','@','@','@','@','@','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 19
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 20
  ['8','+','+','+','+',' ','@','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+','+',' ',' ','+','+','+','+',' ',' ','8'], // row 21
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 22
  ['8','+','+','+','+',' ','@',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ',' ',' ','+','+',' ',' ','8'], // row 23
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ','+',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // row 24
  ['8','+','+','+','+',' ','@','@','@','+','+',' ',' ',' ','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ','8'], // row 25
  ['8',' ',' ','+',' ',' ',' ',' ','@',' ','+',' ',' ',' ','+',' ',' ',' ',' ',' ','E','+',' ',' ','+',' ',' ',' ','+',' ',' ','8'], // row 26
  ['8',' ',' ','+',' ',' ','+','+','@','@','+',' ',' ',' ','+',' ','@','@','@','@','N','+',' ',' ','+',' ',' ',' ','+',' ',' ','8'], // row 27 (end room start)
  ['8',' ',' ','+',' ',' ','+','+',' ','@','@','@','@','@','@','@','@','+',' ',' ','D','+',' ',' ','+',' ',' ',' ',' ',' ',' ','8'], // row 28
  ['8',' ',' ',' ',' ',' ','+','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ','8'], // row 29
  ['8','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // row 30
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8']  // row 31 (bottom perimeter)
];

// initialize a 32x32 array for the quit map
var quit2_map = Array.from({ length: 32 }, () => Array(32).fill(' ')); 
// rotate the quit map 90 degrees
for (let row = 0; row < quit_map.length; row++) {
  for (let i = 0; i < quit_map[row].length; i++) {
    quit2_map[i][quit_map.length - 1 - row] = quit_map[31-row][i]; 
  }
}

// function to render all shapes
function renderAllShapes() {
    // start performance timer
    var startTime = performance.now();
  
    // set global rotation matrix to identity
    globalRotMat.setIdentity();
   
    // upload global rotation matrix to shader
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // create projection matrix
    var projMat = new Matrix4();
    projMat.setPerspective(60, canvas.width / canvas.height, 0.1, 100);
    // upload projection matrix to shader
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    // set view matrix based on camera position
    viewMatrix.setLookAt(
      camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2],
      camera.at.elements[0], camera.at.elements[1], camera.at.elements[2],
      camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]
    );
  
    // upload view matrix to shader
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  
    // clear color and depth buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

    // define constants for map size and block size
    const MAP_SIZE = 32;
    const BLOCK_SIZE = 1;  // each block is 1x1x1
    const CENTER_OFFSET = Math.floor(MAP_SIZE / 2); // ensures centering

    // generate walls based on the map
    for (let x = 0; x < MAP_SIZE; x++) {
      for (let z = 0; z < MAP_SIZE; z++) {
        let height = g_map[x][z]; // get height from the map
        w.color = [79/255,107/255,49/255, 1.0];
        if (typeof height === 'number') {
          height = height;
          w.textureNum = 4; // set texture number for solid blocks
        } else if (height == '.') {
          height = 0; // set height to 0 for empty spaces
        } else if (height == '%') {
          height = 2; // set height for special blocks
          w.textureNum = 2; // set texture number for special blocks
        } else if (height == '8') {
          height = 3; // set height for wall blocks
          w.textureNum = 3; // set texture number for wall blocks
        }

        // stack cubes to create walls
        for (let y = 0; y < height; y++) { 
          w.matrix.setTranslate(
            (x - CENTER_OFFSET) * BLOCK_SIZE, // center the map
            y * BLOCK_SIZE - 0.75, // align with the ground
            (z - CENTER_OFFSET) * BLOCK_SIZE
          );
          w.matrix.scale(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          w.renderfaster(); // render the wall
          walls.push(w); // add wall to the walls array
        }
      }
    }
    // render ground and sky
    ground.renderfaster();
    sky.renderfaster();
    horizon_1.renderfaster();
    horizon_2.renderfaster();
    horizon_3.renderfaster();
    horizon_4.renderfaster();
    
    // render body
    bodyCube.matrix.setIdentity();
    bodyCube.matrix.translate(11.75, -0.65, 3.0) // position body cube
                   .rotate(5, 1, 0, 0) // rotate body cube
                   .scale(0.5, 0.3, 0.5); // scale body cube
    bodyCube.color = [0.25, 0.15, 0.1, 1.0]; // set body color
    bodyCube.textureNum = -2; // set texture number for body
    bodyCube.renderfaster(); // render body cube
  
    // render head
    headCube.matrix.setIdentity();
    headCube.matrix.translate(11.8, -0.625, -0.18+3) // position head cube
                   .rotate(0, 1, 0, 0) // rotate head cube
                   .scale(0.4, 0.2, 0.2); // scale head cube
    headCube.color = [0.4, 0.266666, 0.13333, 1.0]; // set head color
    headCube.textureNum = -2; // set texture number for head
    headCube.renderfaster(); // render head cube
  
    // render mouth
    mouthCube.matrix.setIdentity();
    mouthCube.matrix.translate(-0.1+12, -0.6, -0.2+3) // position mouth cube
                    .rotate(0, 1, 0, 0) // rotate mouth cube
                    .scale(0.2, 0.02, 0.1); // scale mouth cube
    mouthCube.color = [0, 0, 0, 1.0]; // set mouth color
    mouthCube.textureNum = -2; // set texture number for mouth
    mouthCube.renderfaster(); // render mouth cube
  
    // render antenna 1
    antenna1.matrix.setIdentity();
    antenna1.matrix.translate(11.9, -0.43, 2.9) // position antenna 1
    if (g_animations.legSwing) {
      antenna1.matrix.rotate(waveVal, 0, 0, 1); // apply rotation if leg is swinging
    }
    antenna1.matrix.scale(0.02, 0.45, 0.02); // scale antenna 1
    antenna1.color = [0.25, 0.18, 0.0, 1.0]; // set antenna 1 color
    antenna1.textureNum = -2; // set texture number for antenna 1
    antenna1.renderfaster(); // render antenna 1
  
    // render antenna 2
    antenna2.matrix.setIdentity();
    antenna2.matrix.translate(12.1, -0.43, 2.9) // position antenna 2
    if (g_animations.legSwing) {
      antenna2.matrix.rotate(-waveVal, 0, 0, 1); // apply rotation if leg is swinging
    }
    antenna2.matrix.scale(0.02, 0.45, 0.02); // scale antenna 2
    antenna2.color = [0.25, 0.18, 0.0, 1.0]; // set antenna 2 color
    antenna2.textureNum = -2; // set texture number for antenna 2
    antenna2.renderfaster(); // render antenna 2
  
    // render poke animation
    if (g_pokeAnimation && g_pokeFinal) {
      crissCube.matrix.setIdentity();
      crissCube.matrix.translate(12.1, 0.22, 2.81) // position criss cube
                      .rotate(45, 0, 0, 1) // rotate criss cube
                      .scale(0.03, 0.075, 0.03); // scale criss cube
      crissCube.color = [0, 0, 0, 1]; // set criss cube color
      crissCube.textureNum = -2; // set texture number for criss cube
      crissCube.renderfaster(); // render criss cube
  
      crossCube.matrix.setIdentity();
      crossCube.matrix.translate(12.045, 0.24, 2.81) // position cross cube
                      .rotate(-45, 0, 0, 1) // rotate cross cube
                      .scale(0.03, 0.075, 0.03); // scale cross cube
      crossCube.color = [0, 0, 0, 1]; // set cross cube color
      crossCube.textureNum = -2; // set texture number for cross cube
      crossCube.renderfaster(); // render cross cube
  
      crissCube2.matrix.setIdentity();
      crissCube2.matrix.translate(11.94, 0.22, 2.81) // position criss cube 2
                       .rotate(45, 0, 0, 1) // rotate criss cube 2
                       .scale(0.03, 0.075, 0.03); // scale criss cube 2
      crissCube2.color = [0, 0, 0, 1]; // set criss cube 2 color
      crissCube2.textureNum = -2; // set texture number for criss cube 2
      crissCube2.renderfaster(); // render criss cube 2
  
      crossCube2.matrix.setIdentity();
      crossCube2.matrix.translate(11.885, 0.24, 2.81) // position cross cube 2
                       .rotate(-45, 0, 0, 1) // rotate cross cube 2
                       .scale(0.03, 0.075, 0.03); // scale cross cube 2
      crossCube2.color = [0, 0, 0, 1]; // set cross cube 2 color
      crossCube2.textureNum = -2; // set texture number for cross cube 2
      crossCube2.renderfaster(); // render cross cube 2
  
      tongueCube.matrix.setIdentity();
      tongueCube.matrix.translate(12.04, 0.119, 2.81) // position tongue cube
                       .scale(0.03, 0.028, 0.03); // scale tongue cube
      tongueCube.color = [1, 0, 0, 1]; // set tongue cube color
      tongueCube.textureNum = -2; // set texture number for tongue cube
      tongueCube.renderfaster(); // render tongue cube
    } else {
      // render eyes
      sphereMat1.setIdentity();
      sphereMat1.translate(11.9, -0.5, 2.81) // position left eye sphere
                .scale(0.1, 0.1, 0.1); // scale left eye sphere
      drawSphere(sphereMat1, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
  
      sphereMat2.setIdentity();
      sphereMat2.translate(12.1, -0.5, 2.81) // position right eye sphere
                .scale(0.1, 0.1, 0.1); // scale right eye sphere
      drawSphere(sphereMat2, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
    }
  
    // define leg dimensions
    const UL = 0.3; // upper leg length
    const LL = 0.3; // lower leg length
    const FL = 0.2; // foot length
    const legWidth = 0.05; // leg width
  
    // render left front leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.05) // position left front upper leg
                    .rotate(-g_upperLegAngle, 0, 0, 1); // rotate left front upper leg
    kneeJoint.set(upperLeg.matrix); // set knee joint position
    upperLeg.matrix.scale(legWidth, UL, legWidth); // scale left front upper leg
    upperLeg.color = [0.3, 0.2, 0.13, 1.0]; // set left front upper leg color
    upperLeg.textureNum = -2; // set texture number for left front upper leg
    upperLeg.renderfaster(); // render left front upper leg
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint); // set lower leg position based on knee joint
    lowerLeg.matrix.translate(0, UL, 0.001) // position lower leg
                    .rotate(-g_lowerLegAngle, 0, 0, 1) // rotate lower leg
                    .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLeg.textureNum = -2; // set texture number for lower leg
    lowerLeg.renderfaster(); // render lower leg
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint); // set foot position based on knee joint
    foot.matrix.translate(0, UL, 0.001) // position foot
                .rotate(-g_lowerLegAngle, 0, 0, 1) // rotate foot
                .translate(0, LL, 0) // translate foot
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                .scale(legWidth, FL, legWidth); // scale foot
    foot.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    foot.textureNum = -2; // set texture number for foot
    foot.renderfaster(); // render foot
  
    // render left middle leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.17333) // position left middle upper leg
                    .rotate(-g_upperLegAngle_2, 0, 0, 1); // rotate left middle upper leg
    kneeJoint.set(upperLeg.matrix); // set knee joint position
    upperLeg.matrix.scale(legWidth, UL, legWidth); // scale left middle upper leg
    upperLeg.color = [0.3, 0.2, 0.13, 1.0]; // set left middle upper leg color
    upperLeg.textureNum = -2; // set texture number for left middle upper leg
    upperLeg.renderfaster(); // render left middle upper leg
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint); // set lower leg position based on knee joint
    lowerLeg.matrix.translate(0, UL, 0.001) // position lower leg
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1) // rotate lower leg
                    .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLeg.textureNum = -2; // set texture number for lower leg
    lowerLeg.renderfaster(); // render lower leg
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint); // set foot position based on knee joint
    foot.matrix.translate(0, UL, 0.001) // position foot
                .rotate(-g_lowerLegAngle_2, 0, 0, 1) // rotate foot
                .translate(0, LL, 0) // translate foot
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                .scale(legWidth, FL, legWidth); // scale foot
    foot.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    foot.textureNum = -2; // set texture number for foot
    foot.renderfaster(); // render foot
  
    // render left back leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.2966666) // position left back upper leg
                    .rotate(-g_upperLegAngle, 0, 0, 1); // rotate left back upper leg
    kneeJoint.set(upperLeg.matrix); // set knee joint position
    upperLeg.matrix.scale(legWidth, UL, legWidth); // scale left back upper leg
    upperLeg.color = [0.3, 0.2, 0.13, 1.0]; // set left back upper leg color
    upperLeg.textureNum = -2; // set texture number for left back upper leg
    upperLeg.renderfaster(); // render left back upper leg
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint); // set lower leg position based on knee joint
    lowerLeg.matrix.translate(0, UL, 0.001) // position lower leg
                    .rotate(-g_lowerLegAngle, 0, 0, 1) // rotate lower leg
                    .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLeg.textureNum = -2; // set texture number for lower leg
    lowerLeg.renderfaster(); // render lower leg
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint); // set foot position based on knee joint
    foot.matrix.translate(0, UL, 0.001) // position foot
                .rotate(-g_lowerLegAngle, 0, 0, 1) // rotate foot
                .translate(0, LL, 0) // translate foot
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                .scale(legWidth, FL, legWidth); // scale foot
    foot.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    foot.textureNum = -2; // set texture number for foot
    foot.renderfaster(); // render foot
  
    // render left backmost leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.42) // position left backmost upper leg
                    .rotate(-g_upperLegAngle_2, 0, 0, 1); // rotate left backmost upper leg
    kneeJoint.set(upperLeg.matrix); // set knee joint position
    upperLeg.matrix.scale(legWidth, UL, legWidth); // scale left backmost upper leg
    upperLeg.color = [0.3, 0.2, 0.13, 1.0]; // set left backmost upper leg color
    upperLeg.textureNum = -2; // set texture number for left backmost upper leg
    upperLeg.renderfaster(); // render left backmost upper leg
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint); // set lower leg position based on knee joint
    lowerLeg.matrix.translate(0, UL, 0.001) // position lower leg
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1) // rotate lower leg
                    .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLeg.textureNum = -2; // set texture number for lower leg
    lowerLeg.renderfaster(); // render lower leg
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint); // set foot position based on knee joint
    foot.matrix.translate(0, UL, 0.001) // position foot
                .rotate(-g_lowerLegAngle_2, 0, 0, 1) // rotate foot
                .translate(0, LL, 0) // translate foot
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                .scale(legWidth, FL, legWidth); // scale foot
    foot.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    foot.textureNum = -2; // set texture number for foot
    foot.renderfaster(); // render foot
  
    // render right front leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.05) // position right front upper leg
                     .rotate(g_upperLegAngle, 0, 0, 1); // rotate right front upper leg
    kneeJointR.set(upperLegR.matrix); // set knee joint position
    upperLegR.matrix.scale(legWidth, UL, legWidth); // scale right front upper leg
    upperLegR.color = [0.3, 0.2, 0.13, 1.0]; // set right front upper leg color
    upperLegR.textureNum = -2; // set texture number for right front upper leg
    upperLegR.renderfaster(); // render right front upper leg
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR); // set lower leg position based on knee joint
    lowerLegR.matrix.translate(0, UL, 0) // position lower leg
                     .rotate(g_lowerLegAngle, 0, 0, 1) // rotate lower leg
                     .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLegR.textureNum = -2; // set texture number for lower leg
    lowerLegR.renderfaster(); // render lower leg
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR); // set foot position based on knee joint
    footR.matrix.translate(0, UL, 0) // position foot
                  .rotate(g_lowerLegAngle, 0, 0, 1) // rotate foot
                  .translate(0, LL, 0) // translate foot
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                  .scale(legWidth, FL, legWidth); // scale foot
    footR.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    footR.textureNum = -2; // set texture number for foot
    footR.renderfaster(); // render foot
  
    // render right middle leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.17333) // position right middle upper leg
                     .rotate(g_upperLegAngle_2, 0, 0, 1); // rotate right middle upper leg
    kneeJointR.set(upperLegR.matrix); // set knee joint position
    upperLegR.matrix.scale(legWidth, UL, legWidth); // scale right middle upper leg
    upperLegR.color = [0.3, 0.2, 0.13, 1.0]; // set right middle upper leg color
    upperLegR.textureNum = -2; // set texture number for right middle upper leg
    upperLegR.renderfaster(); // render right middle upper leg
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR); // set lower leg position based on knee joint
    lowerLegR.matrix.translate(0, UL, 0) // position lower leg
                     .rotate(g_lowerLegAngle_2, 0, 0, 1) // rotate lower leg
                     .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLegR.textureNum = -2; // set texture number for lower leg
    lowerLegR.renderfaster(); // render lower leg
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR); // set foot position based on knee joint
    footR.matrix.translate(0, UL, 0) // position foot
                  .rotate(g_lowerLegAngle_2, 0, 0, 1) // rotate foot
                  .translate(0, LL, 0) // translate foot
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                  .scale(legWidth, FL, legWidth); // scale foot
    footR.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    footR.textureNum = -2; // set texture number for foot
    footR.renderfaster(); // render foot
  
    // render right back leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.2966666) // position right back upper leg
                     .rotate(g_upperLegAngle, 0, 0, 1); // rotate right back upper leg
    kneeJointR.set(upperLegR.matrix); // set knee joint position
    upperLegR.matrix.scale(legWidth, UL, legWidth); // scale right back upper leg
    upperLegR.color = [0.3, 0.2, 0.13, 1.0]; // set right back upper leg color
    upperLegR.textureNum = -2; // set texture number for right back upper leg
    upperLegR.renderfaster(); // render right back upper leg
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR); // set lower leg position based on knee joint
    lowerLegR.matrix.translate(0, UL, 0) // position lower leg
                     .rotate(g_lowerLegAngle, 0, 0, 1) // rotate lower leg
                     .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLegR.textureNum = -2; // set texture number for lower leg
    lowerLegR.renderfaster(); // render lower leg
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR); // set foot position based on knee joint
    footR.matrix.translate(0, UL, 0) // position foot
                  .rotate(g_lowerLegAngle, 0, 0, 1) // rotate foot
                  .translate(0, LL, 0) // translate foot
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                  .scale(legWidth, FL, legWidth); // scale foot
    footR.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    footR.textureNum = -2; // set texture number for foot
    footR.renderfaster(); // render foot
  
    // render right backmost leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.42) // position right backmost upper leg
                     .rotate(g_upperLegAngle_2, 0, 0, 1); // rotate right backmost upper leg
    kneeJointR.set(upperLegR.matrix); // set knee joint position
    upperLegR.matrix.scale(legWidth, UL, legWidth); // scale right backmost upper leg
    upperLegR.color = [0.3, 0.2, 0.13, 1.0]; // set right backmost upper leg color
    upperLegR.textureNum = -2; // set texture number for right backmost upper leg
    upperLegR.renderfaster(); // render right backmost upper leg
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR); // set lower leg position based on knee joint
    lowerLegR.matrix.translate(0, UL, 0) // position lower leg
                     .rotate(g_lowerLegAngle_2, 0, 0, 1) // rotate lower leg
                     .scale(legWidth, LL, legWidth); // scale lower leg
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0]; // set lower leg color
    lowerLegR.textureNum = -2; // set texture number for lower leg
    lowerLegR.renderfaster(); // render lower leg
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR); // set foot position based on knee joint
    footR.matrix.translate(0, UL, 0) // position foot
                  .rotate(g_lowerLegAngle_2, 0, 0, 1) // rotate foot
                  .translate(0, LL, 0) // translate foot
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1) // rotate foot based on angles
                  .scale(legWidth, FL, legWidth); // scale foot
    footR.color = [0.3, 0.2, 0.13, 1.0]; // set foot color
    footR.textureNum = -2; // set texture number for foot
    footR.renderfaster(); // render foot
  
    // calculate performance
    var endTime = performance.now();
    var duration = endTime - startTime; // calculate duration
    var fps = 1000 / duration; // calculate frames per second
    updatePerformanceInfo(duration, fps); // update performance info
}
