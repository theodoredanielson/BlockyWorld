var VSHADER_SOURCE =
  'precision mediump float;\n' +
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_UV;\n' +
  'varying vec2 v_UV;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjectionMatrix;\n' +
  'uniform mat4 u_GlobalRotateMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;\n' +
  '  v_UV = a_UV;\n' +
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'varying vec2 v_UV;\n' +
  'uniform vec4 u_FragColor;\n' +
  'uniform sampler2D u_Sampler0;\n' +
  'uniform sampler2D u_Sampler1;\n' +
  'uniform sampler2D u_Sampler2;\n' +
  'uniform sampler2D u_Sampler3;\n' +
  'uniform sampler2D u_Sampler4;\n' +
  'uniform sampler2D u_Sampler5;\n' +
  'uniform int u_whichTexture;\n' +
  'void main() {\n' +
  '  if (u_whichTexture == -2) {\n' +
  '     gl_FragColor = u_FragColor;\n' +
  '  } else if (u_whichTexture == -1) {\n' +
  '     gl_FragColor = vec4(v_UV, 1.0, 1.0);\n' +
  '  } else if (u_whichTexture == 0) {\n' +
  '     gl_FragColor = texture2D(u_Sampler0, v_UV);\n' +
  '  } else if (u_whichTexture == 1) {\n' +
  '     gl_FragColor = texture2D(u_Sampler1, v_UV);\n' +
  '  } else if (u_whichTexture == 2) {\n' +
  '     gl_FragColor = texture2D(u_Sampler2, v_UV);\n' +
  '  } else if (u_whichTexture == 3) {\n' +
  '     gl_FragColor = texture2D(u_Sampler3, v_UV);\n' +
  '  } else if (u_whichTexture == 4) {\n' +
  '     gl_FragColor = texture2D(u_Sampler4, v_UV);\n' +
  '  } else if (u_whichTexture == 5) {\n' +
  '     gl_FragColor = texture2D(u_Sampler5, v_UV);\n' +
  '  } else { \n' +
  '     gl_FragColor = vec4(1.0, 0.2, 0.2, 1.0);\n' +
  '  }\n' +
  '}\n';

// global variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_whichTexture;
let u_GlobalRotateMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;
let a_UV;
let v_UV;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;
let viewMatrix = new Matrix4();
const camera = new Camera();
console.log(camera.eye.elements);
console.log(camera.at.elements);
console.log(camera.up.elements);

// setup webgl context
function setupWebGL() {
  canvas = document.getElementById('webgl');
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log('failed to get the rendering context for webgl');
    return;
  }
  gl.enable(gl.DEPTH_TEST);

  // Ensure pointer lock API works across all browsers
  canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock ||
    canvas.webkitRequestPointerLock;

  document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock ||
    document.webkitExitPointerLock;

  // When the user clicks the canvas, request pointer lock
  canvas.onclick = function () {
    canvas.requestPointerLock();
  };

  // Listen for pointer lock changes
  document.addEventListener("pointerlockchange", pointerLockChange, false);
  document.addEventListener("mozpointerlockchange", pointerLockChange, false);
  document.addEventListener("webkitpointerlockchange", pointerLockChange, false);

  function pointerLockChange() {
    if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas ||
      document.webkitPointerLockElement === canvas) {
      console.log("Pointer locked");
      document.addEventListener("mousemove", updateCameraFromMouse, false);
    } else {
      console.log("Pointer unlocked");
      document.removeEventListener("mousemove", updateCameraFromMouse, false);
    }
  }

  // Listen for "Tab" key to unlock pointer
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.exitPointerLock();
      e.preventDefault(); // Prevent default browser tab switching
    }
  });

}

// connect variables to glsl
function connectVariablesToGLSL() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('failed to initialize shaders.');
    return;
  }

  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('failed to get the storage location of a_Position');
    return;
  }

  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('failed to get the storage location of u_FragColor');
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('failed to get the storage location of u_whichTexture');
    return;
  }

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('failed to get the storage location of a_UV');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }

  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }

  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
  if (!u_Sampler4) {
    console.log('Failed to get the storage location of u_Sampler4');
    return false;
  }

  u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
  if (!u_Sampler5) {
    console.log('Failed to get the storage location of u_Sampler5');
    return false;
  }

  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

  // Initialize view matrix
  var viewMatrix = new Matrix4();

  // // Initialize projection matrix
  var projMatrix = new Matrix4();
}

// shape types
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
const RAINBOW = 3;

// global settings
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_globalAngle = 0;
let g_yellowAngle = 0;
let g_magAngle = 0;
let g_magAnimation = false;
let g_yellowAnimation = false;

let g_upperLegAngle = -90;
let g_lowerLegAngle = -30;
let g_upperLegAngle_2 = -90;
let g_lowerLegAngle_2 = -30;
let g_ankleAngle = 0;
let g_bodyAngle = 0;

let g_upperLegBaseAngle = 0;
let g_lowerLegBaseAngle = 30;
let g_upperLegAnimOffset = 0;
let g_lowerLegAnimOffset = 0;
let g_animations = {
  legSwing: false
};
let g_isDragging = false;
let g_mouseXAngle = 180;  // Reset to 0
let g_mouseYAngle = 0;
let g_lastMouseX = 0;
let g_lastMouseY = 0;

let g_pokeAnimation = false;
let g_pokeFinal = false;
let g_pokeStartTime = 0;
const pokeGlobalDuration = 1.0;
const pokeLegDuration = 2.0;

let g_startMouseXAngle = 0;
let g_startMouseYAngle = 0;
let g_start_upperLegAngle = 0;
let g_start_lowerLegAngle = 0;
let g_start_upperLegAngle_2 = 0;
let g_start_lowerLegAngle_2 = 0;

function initTextures() {
  const texturePaths = [
    'sky.jpg',
    'cartoonSky.jpg',
    'cobbleStone.jpg',
    'grass.jpg',
    'dirt.jpg',
    'cartoonSky.jpg'
  ];

  texturePaths.forEach((path, index) => {
    const image = new Image();
    if (!image) {
      console.log('Failed to create image');
      return false;
    }
    image.onload = function () { sendTextureToTEXTURE(image, index); }
    image.onerror = function () {
      console.error(`Failed to load texture: ${path}`);
    };
    image.src = path;
  });

  return true;
}

function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

function sendTextureToTEXTURE(image, index) {
  const texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.activeTexture(gl[`TEXTURE${index}`]);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Check if the image has power-of-two dimensions
  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Enable mipmapping and set wrap mode to REPEAT
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    // For non power-of-two images, use CLAMP_TO_EDGE and no mipmapping
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  }

  gl.uniform1i(gl.getUniformLocation(gl.program, `u_Sampler${index}`), index);
  console.log(`Finished loading texture ${index}`);
}


// add actions for html ui
function addActionsForHtmlUI() {
  canvas.addEventListener("mousedown", function (event) {
    // Prevent the browser's default context menu
    event.preventDefault();

    // Check if shift is pressed
    if (event.shiftKey) {
      // Call your block placement function; pass true to add a block.
      placeBlock(true);
    } else if (event.ctrlKey) {
      placeBlock(false);
    }
  });


  canvas.addEventListener('mousedown', function (ev) {
    g_isDragging = true;
    g_lastMouseX = ev.clientX;
    g_lastMouseY = ev.clientY;
  });

  canvas.addEventListener('mouseup', function (ev) {
    g_isDragging = false;
  });

  canvas.addEventListener('mousemove', function (ev) {
    if (!g_isDragging) return;

    const dx = ev.clientX - g_lastMouseX;
    const dy = ev.clientY - g_lastMouseY;

    g_lastMouseX = ev.clientX;
    g_lastMouseY = ev.clientY;

    // Camera rotation logic
    const rotationSpeed = 0.3;

    // Horizontal drag => pan
    if (dx !== 0) {
      const angle = dx * rotationSpeed;
      if (angle > 0) {
        camera.panRight(angle);
      } else {
        camera.panLeft(-angle);
      }
    }

    // Vertical drag => pitch
    if (dy !== 0) {
      const angle = dy * rotationSpeed;
      if (angle > 0) {
        camera.pitchDown(angle);
      } else {
        camera.pitchUp(-angle);
      }
    }

  });

}

// main function
function main() {
  setupWebGL();
  if (!gl) {
    console.error('Failed to get WebGL context');
    return;
  }

  connectVariablesToGLSL();
  if (!gl.program) {
    console.error('Failed to initialize shaders');
    return;
  }

  initStaticTransforms();

  addActionsForHtmlUI();

  document.onkeydown = keydown;

  gl.enable(gl.DEPTH_TEST);
  initTextures();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  requestAnimationFrame(tick);
}

function checkWinCondition() {
  const winRadius = 3;
  const headX = 10; // Set the actual x-coordinate of the roach head block
  const headZ = 4; // Set the actual z-coordinate of the roach head block

  let distX = camera.eye.elements[0] - headX;
  let distZ = camera.eye.elements[2] - headZ;
  let distance = Math.sqrt(distX * distX + distZ * distZ);

  if (distance < winRadius) {
    // console.log("YOU WIN!");
    g_animations.legSwing = true; // Start animation
    disableMovement();
    displayWinMessage();
  }
}

function disableMovement() {
  document.onkeydown = null; // Disable keyboard input
}


function placeBlock(add = true) {
  // How far ahead to place the block (in world units)
  const placementDistance = 2.0;

  // Compute forward direction (from camera.eye to camera.at)
  let forward = new Vector3();
  forward.set(camera.at);
  forward.sub(camera.eye);
  forward.normalize();

  // Compute candidate placement position:
  // placementPos = camera.eye + forward * placementDistance
  let placementPos = new Vector3(camera.eye.elements);
  let offset = new Vector3(forward.elements);
  offset.mul(placementDistance);
  placementPos.add(offset);

  // Convert candidate world coordinates (x,z) to grid indices.
  // Our grid is 32×32 with an offset of 16 (so world x=0 maps to grid index 16).
  // Convert candidate placement to grid coordinates:
  let gridX = Math.floor(placementPos.elements[0] + 16);
  let gridZ = Math.floor(placementPos.elements[2] + 16);

  // Define the camera's footprint in grid space. 
  // For example, if the camera's effective radius is 0.5 grid units:
  const cameraFootprint = 0.02;

  // Convert camera's world position to grid coordinates (as a float):
  let camGridX = camera.eye.elements[0] + 16;
  let camGridZ = camera.eye.elements[2] + 16;

  // Compute the grid bounds occupied by the camera:
  let camMinX = Math.floor(camGridX - cameraFootprint);
  let camMaxX = Math.ceil(camGridX + cameraFootprint);
  let camMinZ = Math.floor(camGridZ - cameraFootprint);
  let camMaxZ = Math.ceil(camGridZ + cameraFootprint);

  // Do not allow placement if the candidate cell falls within the camera's footprint:
  if (gridX >= camMinX && gridX <= camMaxX && gridZ >= camMinZ && gridZ <= camMaxZ) {
    console.log("Cannot place block here: Overlaps camera footprint!");
    return;
  }




  // Check that we're within bounds:
  if (gridX < 0 || gridX >= 32 || gridZ < 0 || gridZ >= 32) {
    console.log("Placement is out of bounds!");
    return;
  }

  // Retrieve current cell value.
  let cellValue = g_map[gridX][gridZ];
  let currentHeight;

  // Original walls use '%' or '8'; do not allow changes there.
  if (cellValue === '%' || cellValue === '8') {
    console.log("Cannot modify an existing wall!");
    return;
  }

  // If empty ('.'), treat height as 0; otherwise parse the user-placed block height.
  if (cellValue === '.') {
    currentHeight = 0;
  } else {
    currentHeight = parseInt(cellValue, 10) || 0;
  }

  // Modify the height: if adding, increase by one; if deleting, decrease (but not below 0)
  if (add) {
    currentHeight += 1;
  } else {
    currentHeight = Math.max(0, currentHeight - 1);
  }

  // Update the grid cell (store as a string) for user-placed blocks.
  g_map[gridX][gridZ] = currentHeight;
  console.log("Updated cell (" + camera.eye.elements[0] + "," + camera.eye.elements[2] + ") to height " + currentHeight);

  renderAllShapes();
}



// animation timing
var g_startTime = performance.now() / 1000;
var g_seconds = performance.now() / 1000 - g_startTime;

function showGameOverMessage() {
  let message = document.createElement("p");
  message.innerText = "NO CHEATING! PEAKING OVER WALLS IS AGAINST THE RULES. REFRESH TO START AGAIN";

  // Style the text
  message.style.color = "red";
  message.style.fontSize = "20px";
  message.style.fontWeight = "bold";
  message.style.textAlign = "center";

  // Style the background for readability
  message.style.backgroundColor = "black";
  message.style.padding = "10px 20px";
  message.style.borderRadius = "5px";

  // Positioning
  message.style.position = "absolute";
  message.style.top = "10px";
  message.style.left = "50%";
  message.style.transform = "translateX(-50%)";

  // Ensure it's visible
  message.style.display = "block";

  // Add to the document
  document.body.appendChild(message);
}

function displayWinMessage() {
  let message = document.createElement("p");
  if (quit) {
    message.innerText = "I saw you quit....WHATEVER, WE'LL COUNT THAT AS A WIN! REFRESH TO PLAY AGAIN";
  } else {
    message.innerText = "YOU WIN! REFRESH TO PLAY AGAIN";
  }

  // Style the text
  message.style.color = "green";
  message.style.fontSize = "20px";
  message.style.fontWeight = "bold";
  message.style.textAlign = "center";

  // Style the background for readability
  message.style.backgroundColor = "black";
  message.style.padding = "10px 20px";
  message.style.borderRadius = "5px";

  // Positioning
  message.style.position = "absolute";
  message.style.top = "10px";
  message.style.left = "50%";
  message.style.transform = "translateX(-50%)";

  // Ensure it's visible
  message.style.display = "block";

  // Add to the document
  document.body.appendChild(message);
}



// animation loop
function tick() {
  if (camera.eye.elements[1] > 2.1) {
    // gameOver = true;
    disableMovement();
    showGameOverMessage();
    // return;
  }

  g_seconds = performance.now() / 1000 - g_startTime;
  checkWinCondition();
  updateAnimationAngles();
  renderAllShapes();
  requestAnimationFrame(tick);
}

// convert mouse event to gl coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX;
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
}



function keydown(ev) {
  if (ev.keyCode === 39 || ev.keyCode === 68) {
    camera.right();
  } else if (ev.keyCode === 37 || ev.keyCode === 65) {
    camera.left();
  } else if (ev.keyCode === 40 || ev.keyCode === 83) {
    camera.back();
  } else if (ev.keyCode === 38 || ev.keyCode === 87) {
    camera.forward();
  } else if (ev.keyCode === 81) { // Q key
    camera.panLeft(); // Adjust the global angle matrix for left rotation
  } else if (ev.keyCode === 69) { // E key
    camera.panRight(); // Adjust the global angle matrix for right rotation
  }

  renderAllShapes();
  console.log(ev.keyCode);
  console.log(camera.eye.elements[0]);
  console.log(viewMatrix.elements[0]);
}

// list of shapes
var g_shapesList = [];
let lastLegSwingUpdate = 0;
let waveVal = 0;

// update animation angles
function updateAnimationAngles() {
  if (g_pokeAnimation) {
    let currentTime = performance.now() / 1000;
    let elapsed = currentTime - g_pokeStartTime;

    if (elapsed < pokeGlobalDuration) {
      let t = elapsed / pokeGlobalDuration;
      g_mouseXAngle = g_startMouseXAngle + t * (0 - g_startMouseXAngle);
      g_mouseYAngle = g_startMouseYAngle + t * (-180 - g_startMouseYAngle);
    } else if (elapsed < pokeGlobalDuration + pokeLegDuration) {
      g_animations.legSwing = false;
      let t = (elapsed - pokeGlobalDuration) / pokeLegDuration;
      g_upperLegAngle = g_start_upperLegAngle + t * (-100 - g_start_upperLegAngle);
      g_lowerLegAngle = g_start_lowerLegAngle + t * (-60 - g_start_lowerLegAngle);
      g_upperLegAngle_2 = g_start_upperLegAngle_2 + t * (-130 - g_start_upperLegAngle_2);
      g_lowerLegAngle_2 = g_start_lowerLegAngle_2 + t * (-75 - g_start_lowerLegAngle_2);
    } else {
      g_pokeFinal = true;
    }
  }
  if (g_animations.legSwing) {
    const now = performance.now();
    // Update at most every 16ms (about 60 updates per second)
    if (now - lastLegSwingUpdate < 16) return;
    lastLegSwingUpdate = now;

    let period = (2 * Math.PI) / 25;
    let phase = (g_seconds % period) / period;
    waveVal = phase < 0.5 ? 4 * phase - 1 : 3 - 4 * phase;
    waveVal = .5 * waveVal;
    g_upperLegAngle = -8 * waveVal - 90;
    g_lowerLegAngle = -18 * waveVal - 10;
    g_upperLegAngle_2 = -5 * -waveVal - 90;
    g_lowerLegAngle_2 = -15 * -waveVal - 10;
  } else {
    g_upperLegAnimOffset = 0;
    g_lowerLegAnimOffset = 0;
  }
}

var lastPerfUpdateTime = 0;
// update performance info
function updatePerformanceInfo(duration, fps) {
  const now = performance.now();
  if (now - lastPerfUpdateTime > 250) { // update only every 500 ms
    sendTextToHTML("MS: " + Math.floor(duration) + " || FPS: " + Math.floor(fps), "numdot");
    lastPerfUpdateTime = now;
  }
}

let quit = false;

// send text to html element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("failed to get " + htmlID + "from html");
    return;
  }
  htmlElm.innerHTML = text;

  document.getElementById("quitButton").addEventListener("click", function () {
    quit = true;
    let mapString = "";
    for (let row of quit2_map) {
      mapString += row.join(" ") + "\n";  // Convert each row to a string
    }

    document.getElementById("mapOutput").textContent = mapString; // Display the map
  });
}