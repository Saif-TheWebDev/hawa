/* HAWA v5 — Three.js sticky-scroll scene (white edition)
   A tall section (.sticky-stage) pins a full-viewport canvas (.sticky-view)
   while scroll progress drives the 3D camera + floating ingredients. */
import * as THREE from "./three.module.min.js";

(function () {
  "use strict";
  var stage = document.querySelector(".sticky-stage");
  var canvas = document.getElementById("sceneCanvas");
  if (!stage || !canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var view = stage.querySelector(".sticky-view");
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // soft studio lighting on white
  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  var key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(4, 6, 8);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xffd9c4, 0.8);
  rim.position.set(-6, -3, -4);
  scene.add(rim);

  var INK = 0x17120b, BLAZE = 0xff4d00, ACID = 0xa8c81e, CREAM = 0xf3e9d2, GREEN = 0x35d07f;

  function mat(color, rough) {
    return new THREE.MeshStandardMaterial({ color: color, roughness: rough == null ? 0.35 : rough, metalness: 0.05 });
  }

  var group = new THREE.Group();
  scene.add(group);

  // hero "biryani pot" — cylinder + domed lid
  var pot = new THREE.Group();
  var potBody = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.95, 1.5, 28), mat(BLAZE, 0.4));
  potBody.position.y = -0.4;
  var lid = new THREE.Mesh(new THREE.SphereGeometry(1.05, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2), mat(INK, 0.3));
  lid.position.y = 0.35;
  var knob = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), mat(ACID, 0.3));
  knob.position.y = 1.45;
  pot.add(potBody, lid, knob);
  pot.position.set(-2.6, 0.2, 0);
  group.add(pot);

  // floating ingredients
  var shapes = [];
  function addShape(geo, color, pos, spin) {
    var m = new THREE.Mesh(geo, mat(color, 0.45));
    m.position.set(pos[0], pos[1], pos[2]);
    m.userData.spin = spin;
    m.userData.baseY = pos[1];
    group.add(m);
    shapes.push(m);
    return m;
  }
  addShape(new THREE.TorusKnotGeometry(0.55, 0.18, 90, 12), ACID, [2.7, 1.1, -1], [0.008, 0.012, 0.004]);
  addShape(new THREE.IcosahedronGeometry(0.6, 0), GREEN, [2.2, -1.2, -0.5], [0.01, 0.006, 0.008]);
  addShape(new THREE.ConeGeometry(0.5, 1.1, 20), BLAZE, [0.4, 1.7, -1.5], [0.006, 0.01, 0.005]);
  addShape(new THREE.SphereGeometry(0.42, 24, 18), CREAM, [-0.5, -1.6, -1], [0.012, 0.008, 0.01]);
  addShape(new THREE.TorusGeometry(0.5, 0.16, 16, 40), INK, [-1.2, 1.5, -2], [0.008, 0.01, 0.006]);
  addShape(new THREE.OctahedronGeometry(0.45, 0), BLAZE, [1.2, -1.9, -2.2], [0.01, 0.014, 0.006]);

  // plate under the pot
  var plate = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.1, 0.12, 40), mat(CREAM, 0.6));
  plate.position.set(-2.6, -1.25, 0);
  group.add(plate);

  function resize() {
    var w = view.clientWidth, h = view.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function progress() {
    var total = stage.offsetHeight - window.innerHeight;
    var scrolled = Math.min(Math.max(-stage.getBoundingClientRect().top, 0), Math.max(total, 1));
    return total > 0 ? scrolled / total : 0;
  }

  // captions cross-fade with scroll phases
  var caps = stage.querySelectorAll(".stage-caption");

  function tick() {
    var t = clock.getElapsedTime();
    var p = reduce ? 0.35 : progress();

    // camera glides forward as you scroll (the "sticky scroll" move)
    camera.position.z = 9 - p * 4.2;
    camera.position.y = Math.sin(p * Math.PI * 2) * 0.35;
    camera.lookAt(0, 0, 0);

    group.rotation.y = p * Math.PI * 1.5;
    pot.rotation.y = t * 0.4 + p * 2;
    pot.position.y = 0.2 + Math.sin(t * 1.2) * 0.08;

    shapes.forEach(function (m, i) {
      m.rotation.x += m.userData.spin[0];
      m.rotation.y += m.userData.spin[1];
      m.rotation.z += m.userData.spin[2];
      m.position.y = m.userData.baseY + Math.sin(t * 1.4 + i * 1.7) * 0.22;
    });

    function clamp01(x) { return Math.min(Math.max(x, 0), 1); }
    caps.forEach(function (c) {
      var from = parseFloat(c.dataset.from || 0), to = parseFloat(c.dataset.to || 1);
      var fin = from <= 0 ? 1 : clamp01((p - from) / 0.1);
      var fout = to >= 1 ? 1 : clamp01((to - p) / 0.1);
      var op = Math.min(fin, fout);
      c.style.opacity = String(op);
      c.style.transform = "translateY(" + ((1 - op) * 24) + "px)";
    });

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
})();
