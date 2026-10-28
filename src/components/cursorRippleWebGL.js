const vertexSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const simulationSource = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_texel;
  uniform vec2 u_points[4];
  uniform float u_strengths[4];
  uniform float u_damping;
  uniform float u_radius;
  uniform float u_aspect;

  void main() {
    vec2 state = texture2D(u_state, v_uv).rg;
    float height = (state.r - 0.5) * 2.0;
    float velocity = (state.g - 0.5) * 2.0;
    float left = (texture2D(u_state, v_uv - vec2(u_texel.x, 0.0)).r - 0.5) * 2.0;
    float right = (texture2D(u_state, v_uv + vec2(u_texel.x, 0.0)).r - 0.5) * 2.0;
    float down = (texture2D(u_state, v_uv - vec2(0.0, u_texel.y)).r - 0.5) * 2.0;
    float up = (texture2D(u_state, v_uv + vec2(0.0, u_texel.y)).r - 0.5) * 2.0;
    float impulse = 0.0;

    for (int i = 0; i < 4; i++) {
      vec2 delta = (v_uv - u_points[i]) * vec2(u_aspect, 1.0);
      float distanceToPoint = length(delta);
      impulse += u_strengths[i] * exp(-distanceToPoint * distanceToPoint / (u_radius * u_radius));
    }

    float nextVelocity = (velocity + (left + right + down + up - 4.0 * height) * 0.22 + impulse) * u_damping;
    float nextHeight = clamp(height + nextVelocity, -1.0, 1.0);
    gl_FragColor = vec4(nextHeight * 0.5 + 0.5, nextVelocity * 0.5 + 0.5, 0.5, 1.0);
  }
`;

const displaySource = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_state;
  uniform vec2 u_texel;
  uniform vec2 u_mouse;
  uniform vec3 u_color;
  uniform float u_aspect;
  uniform float u_hover;
  uniform float u_intensity;

  void main() {
    float height = (texture2D(u_state, v_uv).r - 0.5) * 2.0;
    float left = (texture2D(u_state, v_uv - vec2(u_texel.x, 0.0)).r - 0.5) * 2.0;
    float right = (texture2D(u_state, v_uv + vec2(u_texel.x, 0.0)).r - 0.5) * 2.0;
    float down = (texture2D(u_state, v_uv - vec2(0.0, u_texel.y)).r - 0.5) * 2.0;
    float up = (texture2D(u_state, v_uv + vec2(0.0, u_texel.y)).r - 0.5) * 2.0;
    vec2 slope = vec2(right - left, up - down);
    vec3 normal = normalize(vec3(-slope * 5.0, 1.0));
    vec3 lightDirection = normalize(vec3(-0.4, 0.7, 0.8));
    float specular = pow(max(dot(normal, lightDirection), 0.0), 24.0);
    float ripple = clamp(length(slope) * 0.75 + abs(height) * 0.08, 0.0, 0.34);
    vec3 tint = mix(u_color, vec3(0.22, 0.74, 0.97), clamp(specular * 1.8, 0.0, 0.85));
    vec2 cursorDelta = (v_uv - u_mouse) * vec2(u_aspect, 1.0);
    float cursorDistance = length(cursorDelta);
    float haloRadius = mix(0.035, 0.052, u_hover);
    float halo = exp(-cursorDistance * cursorDistance / (haloRadius * haloRadius)) * 0.13;
    float dotGlow = exp(-cursorDistance * cursorDistance / 0.000003) * 0.72;
    float alpha = max(ripple * 0.72, max(halo, dotGlow)) * u_intensity;
    vec3 color = mix(tint, vec3(0.72, 0.83, 1.0), dotGlow);
    gl_FragColor = vec4(color, alpha);
  }
`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("[CursorRipple] WebGL shader compilation failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader);
    if (fragmentShader) gl.deleteShader(fragmentShader);
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("[CursorRipple] WebGL program linking failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function createRippleRenderer(canvas, config) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const simulationProgram = createProgram(gl, simulationSource);
  const displayProgram = createProgram(gl, displaySource);
  const buffer = gl.createBuffer();
  if (!simulationProgram || !displayProgram || !buffer) {
    if (simulationProgram) gl.deleteProgram(simulationProgram);
    if (displayProgram) gl.deleteProgram(displayProgram);
    if (buffer) gl.deleteBuffer(buffer);
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const simulationLocations = {
    position: gl.getAttribLocation(simulationProgram, "a_position"),
    state: gl.getUniformLocation(simulationProgram, "u_state"),
    texel: gl.getUniformLocation(simulationProgram, "u_texel"),
    points: gl.getUniformLocation(simulationProgram, "u_points[0]"),
    strengths: gl.getUniformLocation(simulationProgram, "u_strengths[0]"),
    damping: gl.getUniformLocation(simulationProgram, "u_damping"),
    radius: gl.getUniformLocation(simulationProgram, "u_radius"),
    aspect: gl.getUniformLocation(simulationProgram, "u_aspect"),
  };
  const displayLocations = {
    position: gl.getAttribLocation(displayProgram, "a_position"),
    state: gl.getUniformLocation(displayProgram, "u_state"),
    texel: gl.getUniformLocation(displayProgram, "u_texel"),
    mouse: gl.getUniformLocation(displayProgram, "u_mouse"),
    color: gl.getUniformLocation(displayProgram, "u_color"),
    aspect: gl.getUniformLocation(displayProgram, "u_aspect"),
    hover: gl.getUniformLocation(displayProgram, "u_hover"),
    intensity: gl.getUniformLocation(displayProgram, "u_intensity"),
  };

  const textures = [];
  const framebuffers = [];
  let currentIndex = 0;
  let simulationWidth = 0;
  let simulationHeight = 0;
  let pixelRatio = 1;
  let disposed = false;
  const colorHex = config.color.replace("#", "");
  const color = [
    parseInt(colorHex.slice(0, 2), 16) / 255,
    parseInt(colorHex.slice(2, 4), 16) / 255,
    parseInt(colorHex.slice(4, 6), 16) / 255,
  ];

  const configureTexture = (texture) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      simulationWidth,
      simulationHeight,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null,
    );
  };

  const resize = () => {
    if (disposed) return;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(window.innerWidth * pixelRatio);
    canvas.height = Math.round(window.innerHeight * pixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    simulationWidth = Math.max(1, Math.ceil(canvas.width / 2));
    simulationHeight = Math.max(1, Math.ceil(canvas.height / 2));

    textures.forEach((texture) => gl.deleteTexture(texture));
    framebuffers.forEach((framebuffer) => gl.deleteFramebuffer(framebuffer));
    textures.length = 0;
    framebuffers.length = 0;

    for (let index = 0; index < 2; index += 1) {
      const texture = gl.createTexture();
      const framebuffer = gl.createFramebuffer();
      if (!texture || !framebuffer) continue;
      textures.push(texture);
      framebuffers.push(framebuffer);
      configureTexture(texture);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, simulationWidth, simulationHeight);
      gl.clearColor(0.5, 0.5, 0.5, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) return false;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    return textures.length === 2 && framebuffers.length === 2;
  };

  const resizeSucceeded = resize();
  if (!resizeSucceeded) {
    textures.forEach((texture) => gl.deleteTexture(texture));
    framebuffers.forEach((framebuffer) => gl.deleteFramebuffer(framebuffer));
    gl.deleteProgram(simulationProgram);
    gl.deleteProgram(displayProgram);
    gl.deleteBuffer(buffer);
    return null;
  }

  const prepareDraw = (program, positionLocation) => {
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  };

  return {
    resize() {
      return resize();
    },
    clear() {
      if (disposed) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },
    render({ pointer, hovering, impulses }) {
      if (disposed) return;
      const targetIndex = 1 - currentIndex;
      const points = new Float32Array(8);
      const strengths = new Float32Array(4);
      for (let index = 0; index < Math.min(impulses.length, 4); index += 1) {
        points[index * 2] = impulses[index].x;
        points[index * 2 + 1] = 1 - impulses[index].y;
        strengths[index] = impulses[index].strength * 0.18;
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[targetIndex]);
      gl.viewport(0, 0, simulationWidth, simulationHeight);
      prepareDraw(simulationProgram, simulationLocations.position);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[currentIndex]);
      gl.uniform1i(simulationLocations.state, 0);
      gl.uniform2f(simulationLocations.texel, 1 / simulationWidth, 1 / simulationHeight);
      gl.uniform2fv(simulationLocations.points, points);
      gl.uniform1fv(simulationLocations.strengths, strengths);
      gl.uniform1f(simulationLocations.damping, config.damping);
      gl.uniform1f(simulationLocations.radius, config.radius / Math.min(window.innerWidth, window.innerHeight));
      gl.uniform1f(simulationLocations.aspect, window.innerWidth / window.innerHeight);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      currentIndex = targetIndex;

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      prepareDraw(displayProgram, displayLocations.position);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[currentIndex]);
      gl.uniform1i(displayLocations.state, 0);
      gl.uniform2f(displayLocations.texel, 1 / simulationWidth, 1 / simulationHeight);
      gl.uniform2f(displayLocations.mouse, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
      gl.uniform3fv(displayLocations.color, color);
      gl.uniform1f(displayLocations.aspect, window.innerWidth / window.innerHeight);
      gl.uniform1f(displayLocations.hover, hovering ? 1 : 0);
      gl.uniform1f(displayLocations.intensity, config.intensity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disable(gl.BLEND);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      textures.forEach((texture) => gl.deleteTexture(texture));
      framebuffers.forEach((framebuffer) => gl.deleteFramebuffer(framebuffer));
      gl.deleteProgram(simulationProgram);
      gl.deleteProgram(displayProgram);
      gl.deleteBuffer(buffer);
    },
  };
}
