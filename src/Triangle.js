class Triangle {
  constructor() {
    this.type = 'triangle';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
    this.rotation = 0;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
    const angle = this.rotation;

    // set color and size
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniform1f(u_Size, size);

    var d = this.size / 200.0;
    // draw triangle
    drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d], xy, angle);
  }
}

function drawTriangle(vertices) {
  var n = 3;

  // rotate vertices
  const cosTheta = Math.cos(angle);
  const sinTheta = Math.sin(angle);
  for (let i = 0; i < vertices.length; i += 2) {
    const x = vertices[i] - center[0];
    const y = vertices[i + 1] - center[1];

    const rotatedX = x * cosTheta - y * sinTheta;
    const rotatedY = x * sinTheta + y * cosTheta;

    vertices[i] = rotatedX + center[0];
    vertices[i + 1] = rotatedY + center[1];
  }

  // create buffer
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('failed to create the buffer object');
    return -1;
  }

  // bind buffer and set data
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // draw triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  return n;
}


var g_vertexBuffer = null;
function initTriangleBuffers() {
  g_vertexBuffer = gl.createBuffer();
  if (!g_vertexBuffer) {
    console.error('Failed to create vertex buffer');
    return -1;
  }

  // bind buffer and set data
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  const bufferStatus = gl.getError();
  if (bufferStatus !== gl.NO_ERROR) {
    console.error('WebGL error after buffer operations:', bufferStatus);
    return -1;
  }

  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  const attribStatus = gl.getError();
  if (attribStatus !== gl.NO_ERROR) {
    console.error('WebGL error after attribute setup:', attribStatus);
    return -1;
  }
}

function drawTriangle3D(vertices) {
  var n = vertices.length / 3;

  if (g_vertexBuffer == null) {
    initTriangleBuffers();
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // draw triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  const drawStatus = gl.getError();
  if (drawStatus !== gl.NO_ERROR) {
    console.error('WebGL error after drawing:', drawStatus);
    return -1;
  }

  // return n;
}

// Global buffers
var g_vertexBufferUV = null;
var g_uvBuffer = null;

function initTriangleBuffersUV() {
  // Create vertex buffer if not already initialized
  if (!g_vertexBufferUV) {
    g_vertexBufferUV = gl.createBuffer();
    if (!g_vertexBufferUV) {
      console.error("Failed to create vertex buffer");
      return -1;
    }
  }

  // Create UV buffer if not already initialized
  if (!g_uvBuffer) {
    g_uvBuffer = gl.createBuffer();
    if (!g_uvBuffer) {
      console.error("Failed to create UV buffer");
      return -1;
    }
  }

  return 0;
}

function drawTriangle3DUV(vertices, uv) {
  var n = vertices.length / 3;

  // Initialize buffers if not done already
  if (!g_vertexBufferUV || !g_uvBuffer) {
    initTriangleBuffersUV();
  }

  // Bind vertex buffer and update data
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBufferUV);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  // Bind UV buffer and update data
  gl.bindBuffer(gl.ARRAY_BUFFER, g_uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_UV);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);

  // Cleanup: Disable attributes but do NOT delete buffers (reuse them)
  gl.disableVertexAttribArray(a_Position);
  gl.disableVertexAttribArray(a_UV);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;
}
