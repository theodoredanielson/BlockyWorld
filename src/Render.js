var g_eye = new Vector3([0, 0, 2]);
var g_at = new Vector3([0, 0, -100]); 
var g_up = new Vector3([0, 1, 0]);
var g_map = [
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8'], // Row 0 (top perimeter)
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','%','%','%','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 1
  ['8','%','%','%','%','%','%','%','%','%','.','.','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // Row 2
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','%','.','.','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 3
  ['8','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','%','%','8'], // Row 4
  ['8','.','.','.','.','%','.','.','.','.','%','.','.','.','.','.','.','.','.','.','%','.','.','.','.','.','%','.','.','.','.','8'], // Row 5
  ['8','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // Row 6
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 7
  ['8','%','%','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','%','%','%','%','%','%','.','%','%','%','%','%','%','8'], // Row 8
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 9
  ['8','%','%','%','%','%','.','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','.','.','.','%','%','%','.','%','%','8'], // Row 10
  ['8','.','.','.','.','%','.','.','.','.','%','.','.','.','.','.','.','.','.','.','%','.','.','.','.','.','.','.','.','.','.','8'], // Row 11
  ['8','%','%','%','%','%','%','.','.','%','%','%','%','%','%','.','%','%','%','%','%','%','.','.','%','%','%','%','%','%','%','8'], // Row 12
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 13
  ['8','%','%','%','%','%','%','%','%','.','%','%','%','%','.','.','.','.','.','.','%','%','%','%','%','%','%','%','%','%','%','8'], // Row 14
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 15
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 16 (center start)
  ['8','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','.','.','.','.','%','%','%','%','%','%','%','%','%','%','%','8'], // Row 17
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 18
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 19
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 20
  ['8','%','%','%','%','.','.','%','%','%','%','%','%','%','%','%','.','.','%','%','%','%','%','.','.','%','%','%','%','.','.','8'], // Row 21
  ['8','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 22
  ['8','%','%','%','%','.','.','.','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','.','.','.','.','%','%','.','.','8'], // Row 23
  ['8','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','.','.','.','.','.','.','.','8'], // Row 24
  ['8','%','%','%','%','.','.','.','.','%','%','.','.','.','%','.','.','%','%','%','%','%','%','%','%','%','%','%','%','.','.','8'], // Row 25
  ['8','.','.','%','.','.','.','.','.','.','%','.','.','.','%','.','.','.','.','.','.','%','.','.','%','.','.','.','%','.','.','8'], // Row 26
  ['8','.','.','%','.','.','%','%','.','.','%','.','.','.','%','.','.','.','.','.','.','%','.','.','%','.','.','.','%','.','.','8'], // Row 27 (end room start)
  ['8','.','.','%','.','.','%','%','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','8'], // Row 28
  ['8','.','.','.','.','.','%','%','.','.','.','.','.','.','.','.','.','%','.','.','.','%','.','.','%','.','.','.','.','.','.','8'], // Row 29
  ['8','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','%','8'], // Row 30
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8']  // Row 31 (bottom perimeter)
];

var quit_map = [
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8'], // Row 0 (top perimeter)
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+','+','+','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 1
  ['8','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // Row 2
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 3
  ['8','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','8'], // Row 4
  ['8',' ',' ',' ',' ','+',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ',' ',' ','+',' ',' ',' ',' ','8'], // Row 5
  ['8','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // Row 6
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 7
  ['8','+','+','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+','+','+','+','+','+','+',' ','+','+','+','+','+','+','8'], // Row 8
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 9
  ['8','+','+','+','+','+',' ','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+',' ',' ',' ','+','+','+',' ','+','+','8'], // Row 10
  ['8',' ',' ',' ',' ','+',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 11
  ['8','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+',' ','+','+','+','+','+','+',' ',' ','+','+','+','+','+','+','+','8'], // Row 12
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 13
  ['8','+','+','+','+','+','+','+','+',' ','+','+','+','+',' ',' ',' ',' ',' ','S','+','+','+','+','+','+','+','+','+','+','+','8'], // Row 14
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','T',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 15
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','@','@','@','@','A',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 16 (center start)
  ['8','+','+','+','+','+','+','+','+','+','+','+','+','+',' ','@',' ',' ',' ','R','+','+','+','+','+','+','+','+','+','+','+','8'], // Row 17
  ['8',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','@',' ',' ',' ','T',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 18
  ['8',' ',' ',' ',' ',' ','@','@','@','@','@','@','@','@','@','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 19
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 20
  ['8','+','+','+','+',' ','@','+','+','+','+','+','+','+','+','+',' ',' ','+','+','+','+','+',' ',' ','+','+','+','+',' ',' ','8'], // Row 21
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 22
  ['8','+','+','+','+',' ','@',' ','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ',' ',' ','+','+',' ',' ','8'], // Row 23
  ['8',' ',' ',' ',' ',' ','@',' ',' ',' ','+',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','8'], // Row 24
  ['8','+','+','+','+',' ','@','@','@','+','+',' ',' ',' ','+',' ',' ','+','+','+','+','+','+','+','+','+','+','+','+',' ',' ','8'], // Row 25
  ['8',' ',' ','+',' ',' ',' ',' ','@',' ','+',' ',' ',' ','+',' ',' ',' ',' ',' ','E','+',' ',' ','+',' ',' ',' ','+',' ',' ','8'], // Row 26
  ['8',' ',' ','+',' ',' ','+','+','@','@','+',' ',' ',' ','+',' ','@','@','@','@','N','+',' ',' ','+',' ',' ',' ','+',' ',' ','8'], // Row 27 (end room start)
  ['8',' ',' ','+',' ',' ','+','+',' ','@','@','@','@','@','@','@','@','+',' ',' ','D','+',' ',' ','+',' ',' ',' ',' ',' ',' ','8'], // Row 28
  ['8',' ',' ',' ',' ',' ','+','+',' ',' ',' ',' ',' ',' ',' ',' ',' ','+',' ',' ',' ','+',' ',' ','+',' ',' ',' ',' ',' ',' ','8'], // Row 29
  ['8','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','+','8'], // Row 30
  ['8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8','8']  // Row 31 (bottom perimeter)
];

var quit2_map = Array.from({ length: 32 }, () => Array(32).fill(' ')); // Initialize a 32x32 array
for (let row = 0; row < quit_map.length; row++) {
  for (let i = 0; i < quit_map[row].length; i++) {
    quit2_map[i][quit_map.length - 1 - row] = quit_map[31-row][i]; // Rotate 90 degrees
  }
}

function renderAllShapes() {
    var startTime = performance.now();
  
    // set global rotation matrix
    globalRotMat.setIdentity();
   
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    var projMat = new Matrix4();
    projMat.setPerspective(60, canvas.width / canvas.height, 0.1, 100);
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

    viewMatrix.setLookAt(
      camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2],
      camera.at.elements[0], camera.at.elements[1], camera.at.elements[2],
      camera.up.elements[0], camera.up.elements[1], camera.up.elements[2]
    );
  
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  
    // clear buffers
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 


    const MAP_SIZE = 32;
    const BLOCK_SIZE = 1;  // Each block is 1x1x1
    const CENTER_OFFSET = Math.floor(MAP_SIZE / 2); // Ensures centering
    // Generate walls based on the map
    for (let x = 0; x < MAP_SIZE; x++) {
      for (let z = 0; z < MAP_SIZE; z++) {
        let height = g_map[x][z]; // Get height from the map
        w.color = [79/255,107/255,49/255, 1.0];
        if (typeof height === 'number') {
          height = height;
          w.textureNum = 4;
        } else if (height == '.') {
          height = 0;
        } else if (height == '%') {
          height = 2;
          w.textureNum = 2;
        } else if (height == '8') {
          height = 3;
          w.textureNum = 3;
        }

        for (let y = 0; y < height; y++) { // Stack cubes
          w.matrix.setTranslate(
            (x - CENTER_OFFSET) * BLOCK_SIZE, // Centering the map
            y * BLOCK_SIZE - 0.75, // Aligning with the ground
            (z - CENTER_OFFSET) * BLOCK_SIZE
          );
          w.matrix.scale(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
          w.renderfaster();
          walls.push(w);
        }
      }
    }
    ground.renderfaster();
    sky.renderfaster();
    horizon_1.renderfaster();
    horizon_2.renderfaster();
    horizon_3.renderfaster();
    horizon_4.renderfaster();
    
  
    // render body
    bodyCube.matrix.setIdentity();
    bodyCube.matrix.translate(11.75, -0.65, 3.0) // Lowered from 0 to -0.75, shifted up by 0.1
                   .rotate(5, 1, 0, 0)
                   .scale(0.5, 0.3, 0.5);
    bodyCube.color = [0.25, 0.15, 0.1, 1.0];
    bodyCube.textureNum = -2; // Added textureNum
    bodyCube.renderfaster();
  
    // render head
    headCube.matrix.setIdentity();
    headCube.matrix.translate(11.8, -0.625, -0.18+3) // Lowered from 0.025 to -0.725, shifted up by 0.1
                   .rotate(0, 1, 0, 0)
                   .scale(0.4, 0.2, 0.2);
    headCube.color = [0.4, 0.266666, 0.13333, 1.0];
    headCube.textureNum = -2; // Added textureNum
    headCube.renderfaster();
  
    // render mouth
    mouthCube.matrix.setIdentity();
    mouthCube.matrix.translate(-0.1+12, -0.6, -0.2+3) // Lowered from 0.05 to -0.7, shifted up by 0.1
                    .rotate(0, 1, 0, 0)
                    .scale(0.2, 0.02, 0.1);
    mouthCube.color = [0, 0, 0, 1.0];
    mouthCube.textureNum = -2; // Added textureNum
    mouthCube.renderfaster();
  
    // render antenna 1
    antenna1.matrix.setIdentity();
    antenna1.matrix.translate(11.9, -0.43, 2.9) // Lowered from 0.22 to -0.53, shifted up by 0.1
    if (g_animations.legSwing) {
      antenna1.matrix.rotate(waveVal, 0, 0, 1);
    }
    antenna1.matrix.scale(0.02, 0.45, 0.02);
    antenna1.color = [0.25, 0.18, 0.0, 1.0];
    antenna1.textureNum = -2; // Added textureNum
    antenna1.renderfaster();
  
    // render antenna 2
    antenna2.matrix.setIdentity();
    antenna2.matrix.translate(12.1, -0.43, 2.9) // Lowered from 0.22 to -0.53, shifted up by 0.1
    if (g_animations.legSwing) {
      antenna2.matrix.rotate(-waveVal, 0, 0, 1);
    }
    antenna2.matrix.scale(0.02, 0.45, 0.02);
    antenna2.color = [0.25, 0.18, 0.0, 1.0];
    antenna2.textureNum = -2; // Added textureNum
    antenna2.renderfaster();
  
    // render poke animation
    if (g_pokeAnimation && g_pokeFinal) {
      crissCube.matrix.setIdentity();
      crissCube.matrix.translate(12.1, 0.22, 2.81) // Shifted up by 0.1
                      .rotate(45, 0, 0, 1)
                      .scale(0.03, 0.075, 0.03);
      crissCube.color = [0, 0, 0, 1];
      crissCube.textureNum = -2; // Added textureNum
      crissCube.renderfaster();
  
      crossCube.matrix.setIdentity();
      crossCube.matrix.translate(12.045, 0.24, 2.81) // Shifted up by 0.1
                      .rotate(-45, 0, 0, 1)
                      .scale(0.03, 0.075, 0.03);
      crossCube.color = [0, 0, 0, 1];
      crossCube.textureNum = -2; // Added textureNum
      crossCube.renderfaster();
  
      crissCube2.matrix.setIdentity();
      crissCube2.matrix.translate(11.94, 0.22, 2.81) // Shifted up by 0.1
                       .rotate(45, 0, 0, 1)
                       .scale(0.03, 0.075, 0.03);
      crissCube2.color = [0, 0, 0, 1];
      crissCube2.textureNum = -2; // Added textureNum
      crissCube2.renderfaster();
  
      crossCube2.matrix.setIdentity();
      crossCube2.matrix.translate(11.885, 0.24, 2.81) // Shifted up by 0.1
                       .rotate(-45, 0, 0, 1)
                       .scale(0.03, 0.075, 0.03);
      crossCube2.color = [0, 0, 0, 1];
      crossCube2.textureNum = -2; // Added textureNum
      crossCube2.renderfaster();
  
      tongueCube.matrix.setIdentity();
      tongueCube.matrix.translate(12.04, 0.119, 2.81) // Shifted up by 0.1
                       .scale(0.03, 0.028, 0.03);
      tongueCube.color = [1, 0, 0, 1];
      tongueCube.textureNum = -2; // Added textureNum
      tongueCube.renderfaster();
    } else {
      // render eyes
      sphereMat1.setIdentity();
      sphereMat1.translate(11.9, -0.5, 2.81) // Shifted up by 0.1
                .scale(0.1, 0.1, 0.1);
      drawSphere(sphereMat1, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
  
      sphereMat2.setIdentity();
      sphereMat2.translate(12.1, -0.5, 2.81) // Shifted up by 0.1
                .scale(0.1, 0.1, 0.1);
      drawSphere(sphereMat2, [0.09, 0.09, 0.09, 1.0], 0.3, 10, 4);
    }
  
    const UL = 0.3;
    const LL = 0.3;
    const FL = 0.2;
    const legWidth = 0.05;
  
    // render left front leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.05) // Shifted up by 0.1
                    .rotate(-g_upperLegAngle, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    upperLeg.color = [0.3, 0.2, 0.13, 1.0];
    upperLeg.textureNum = -2; // Added textureNum
    upperLeg.renderfaster();
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLeg.textureNum = -2; // Added textureNum
    lowerLeg.renderfaster();
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    foot.color = [0.3, 0.2, 0.13, 1.0];
    foot.textureNum = -2; // Added textureNum
    foot.renderfaster();
  
    // render left middle leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.17333) // Shifted up by 0.1
                    .rotate(-g_upperLegAngle_2, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    upperLeg.color = [0.3, 0.2, 0.13, 1.0];
    upperLeg.textureNum = -2; // Added textureNum
    upperLeg.renderfaster();
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLeg.textureNum = -2; // Added textureNum
    lowerLeg.renderfaster();
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    foot.color = [0.3, 0.2, 0.13, 1.0];
    foot.textureNum = -2; // Added textureNum
    foot.renderfaster();
  
    // render left back leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.2966666) // Shifted up by 0.1
                    .rotate(-g_upperLegAngle, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    upperLeg.color = [0.3, 0.2, 0.13, 1.0];
    upperLeg.textureNum = -2; // Added textureNum
    upperLeg.renderfaster();
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLeg.textureNum = -2; // Added textureNum
    lowerLeg.renderfaster();
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    foot.color = [0.3, 0.2, 0.13, 1.0];
    foot.textureNum = -2; // Added textureNum
    foot.renderfaster();
  
    // render left backmost leg
    upperLeg.matrix.setIdentity();
    upperLeg.matrix.setTranslate(11.8, -0.59, 3.42) // Shifted up by 0.1
                    .rotate(-g_upperLegAngle_2, 0, 0, 1);
    kneeJoint.set(upperLeg.matrix);
    upperLeg.matrix.scale(legWidth, UL, legWidth);
    upperLeg.color = [0.3, 0.2, 0.13, 1.0];
    upperLeg.textureNum = -2; // Added textureNum
    upperLeg.renderfaster();
  
    lowerLeg.matrix.setIdentity();
    lowerLeg.matrix.set(kneeJoint);
    lowerLeg.matrix.translate(0, UL, 0.001)
                    .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                    .scale(legWidth, LL, legWidth);
    lowerLeg.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLeg.textureNum = -2; // Added textureNum
    lowerLeg.renderfaster();
  
    foot.matrix.setIdentity();
    foot.matrix.set(kneeJoint);
    foot.matrix.translate(0, UL, 0.001)
                .rotate(-g_lowerLegAngle_2, 0, 0, 1)
                .translate(0, LL, 0)
                .rotate(g_lowerLegAngle_2 + g_ankleAngle, 0, 0, 1)
                .scale(legWidth, FL, legWidth);
    foot.color = [0.3, 0.2, 0.13, 1.0];
    foot.textureNum = -2; // Added textureNum
    foot.renderfaster();
  
    // render right front leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.05) // Shifted up by 0.1
                     .rotate(g_upperLegAngle, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    upperLegR.color = [0.3, 0.2, 0.13, 1.0];
    upperLegR.textureNum = -2; // Added textureNum
    upperLegR.renderfaster();
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLegR.textureNum = -2; // Added textureNum
    lowerLegR.renderfaster();
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    footR.color = [0.3, 0.2, 0.13, 1.0];
    footR.textureNum = -2; // Added textureNum
    footR.renderfaster();
  
    // render right middle leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.17333) // Shifted up by 0.1
                     .rotate(g_upperLegAngle_2, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    upperLegR.color = [0.3, 0.2, 0.13, 1.0];
    upperLegR.textureNum = -2; // Added textureNum
    upperLegR.renderfaster();
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle_2, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLegR.textureNum = -2; // Added textureNum
    lowerLegR.renderfaster();
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle_2, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    footR.color = [0.3, 0.2, 0.13, 1.0];
    footR.textureNum = -2; // Added textureNum
    footR.renderfaster();
  
    // render right back leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.2966666) // Shifted up by 0.1
                     .rotate(g_upperLegAngle, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    upperLegR.color = [0.3, 0.2, 0.13, 1.0];
    upperLegR.textureNum = -2; // Added textureNum
    upperLegR.renderfaster();
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLegR.textureNum = -2; // Added textureNum
    lowerLegR.renderfaster();
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    footR.color = [0.3, 0.2, 0.13, 1.0];
    footR.textureNum = -2; // Added textureNum
    footR.renderfaster();
  
    // render right backmost leg
    upperLegR.matrix.setIdentity();
    upperLegR.matrix.setTranslate(12.2, -0.55, 3.42) // Shifted up by 0.1
                     .rotate(g_upperLegAngle_2, 0, 0, 1);
    kneeJointR.set(upperLegR.matrix);
    upperLegR.matrix.scale(legWidth, UL, legWidth);
    upperLegR.color = [0.3, 0.2, 0.13, 1.0];
    upperLegR.textureNum = -2; // Added textureNum
    upperLegR.renderfaster();
  
    lowerLegR.matrix.setIdentity();
    lowerLegR.matrix.set(kneeJointR);
    lowerLegR.matrix.translate(0, UL, 0)
                     .rotate(g_lowerLegAngle_2, 0, 0, 1)
                     .scale(legWidth, LL, legWidth);
    lowerLegR.color = [0.4, 0.266666, 0.13333, 1.0];
    lowerLegR.textureNum = -2; // Added textureNum
    lowerLegR.renderfaster();
  
    footR.matrix.setIdentity();
    footR.matrix.set(kneeJointR);
    footR.matrix.translate(0, UL, 0)
                  .rotate(g_lowerLegAngle_2, 0, 0, 1)
                  .translate(0, LL, 0)
                  .rotate(-g_lowerLegAngle_2 - g_ankleAngle, 0, 0, 1)
                  .scale(legWidth, FL, legWidth);
    footR.color = [0.3, 0.2, 0.13, 1.0];
    footR.textureNum = -2; // Added textureNum
    footR.renderfaster();
  
    // calculate performance
    var endTime = performance.now();
    var duration = endTime - startTime;
    var fps = 1000 / duration;
    updatePerformanceInfo(duration, fps);
}
