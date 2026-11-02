/* Actual 3D table and ceramic serving ware. The food remains a DOM photograph.
   One on-demand renderer; no perpetual render loop, no food model/orbit claim. */
const canvas = document.getElementById("tableScene");
if (
  canvas &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !new URLSearchParams(location.search).has("no3d")
) {
  try {
    // Load the table engine only when the visitor begins the story. The food is immediate.
    await new Promise((resolve) => {
      if (scrollY > 60) {
        resolve();
        return;
      }
      const begin = () => {
        if (scrollY > 60) {
          removeEventListener("scroll", begin);
          resolve();
        }
      };
      addEventListener("scroll", begin, { passive: true });
    });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      throw new Error("Still scene requested");
    const THREE = await import("./three.module.min.js");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(
      Math.min(devicePixelRatio, innerWidth < 760 ? 1.25 : 1.5),
    );
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(
        38,
        innerWidth / innerHeight,
        0.1,
        80,
      );
    scene.add(new THREE.HemisphereLight(0xffefd0, 0x16372a, 1.8));
    const key = new THREE.DirectionalLight(0xffe5bf, 1.8);
    key.position.set(-3, 7, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(512, 512);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.bias = -0.002;
    scene.add(key);
    const group = new THREE.Group();
    scene.add(group);
    const table = new THREE.Mesh(
      new THREE.CylinderGeometry(4.8, 4.8, 0.18, 64),
      new THREE.MeshStandardMaterial({
        color: 0x62462e,
        roughness: 0.85,
        metalness: 0.05,
      }),
    );
    table.material.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying vec3 woodPosition;",
        )
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nwoodPosition = position;",
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying vec3 woodPosition;",
        )
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
 float grain=sin(woodPosition.x*85.0+sin(woodPosition.z*1.6)*7.0+sin(woodPosition.x*7.0)*2.0);
 float fine=sin(woodPosition.x*270.0+woodPosition.z*8.0);
 diffuseColor.rgb *= 0.87+grain*0.065+fine*0.025;`,
        );
    };
    table.scale.z = 0.7;
    table.receiveShadow = true;
    table.position.y = -0.15;
    group.add(table);
    const linen = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 7),
      new THREE.MeshStandardMaterial({
        color: 0xb1a984,
        roughness: 1,
        side: THREE.DoubleSide,
      }),
    );
    linen.rotation.x = -Math.PI / 2;
    linen.rotation.z = 0.13;
    linen.position.y = -0.05;
    linen.receiveShadow = true;
    group.add(linen);
    const ceramic = new THREE.MeshStandardMaterial({
      color: 0xe9dfbd,
      roughness: 0.35,
      metalness: 0.03,
    });
    const brass = new THREE.MeshStandardMaterial({
      color: 0xbba06b,
      roughness: 0.3,
      metalness: 0.75,
    });
    function plate(x, z, r) {
      const g = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.92, r * 0.86, 0.05, 48),
        ceramic,
      );
      base.receiveShadow = true;
      base.castShadow = true;
      g.add(base);
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.055, 10, 48),
        ceramic,
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.y = 0.035;
      g.add(rim);
      g.position.set(x, 0.01, z);
      group.add(g);
      return g;
    }
    const left = plate(-2.2, 0.25, 0.72),
      right = plate(2.6, -0.15, 0.7),
      back = plate(0.4, -2.1, 0.6);
    function spoon(x, z) {
      const g = new THREE.Group();
      const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 8), brass);
      bowl.scale.set(0.7, 0.16, 1.25);
      g.add(bowl);
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.045, 0.7, 10),
        brass,
      );
      handle.rotation.x = Math.PI / 2;
      handle.position.z = 0.45;
      g.add(handle);
      g.position.set(x, 0.07, z);
      g.rotation.y = 0.25;
      group.add(g);
    }
    spoon(-1.25, 0.4);
    spoon(1.65, 0.45);
    let state = { progress: 0, table: 0, px: 0, py: 0 },
      visible = true,
      disposed = false;
    function render() {
      if (!visible || disposed || document.hidden || state.table < 0.005)
        return;
      const mobile = innerWidth <= 760;
      camera.position.set(
        (mobile ? 0 : 2.2) + state.px * 0.2,
        7.6 - state.progress * 0.4,
        9.5,
      );
      camera.lookAt(mobile ? 0 : -1.3, 1.2, 0);
      group.position.set(mobile ? 0 : 1.45, -2.05 + state.table * 0.35, 0);
      group.rotation.y = -0.08 + state.px * 0.025;
      left.position.y = 0.01 + (1 - state.table) * 0.6;
      right.position.y = 0.01 + (1 - state.table) * 0.8;
      back.position.y = 0.01 + (1 - state.table) * 0.35;
      renderer.render(scene, camera);
    }
    function update(e) {
      state = e.detail;
      render();
    }
    function resize() {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      render();
    }
    addEventListener("hawa:scene", update);
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", render);
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      document
        .getElementById("storyStage")
        .classList.toggle("scene-offscreen", !visible);
      if (visible) render();
    });
    observer.observe(document.getElementById("aromaStory"));
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      document.getElementById("storyStage").classList.remove("webgl-ready");
    });
    canvas.addEventListener("webglcontextrestored", () => {
      document.getElementById("storyStage").classList.add("webgl-ready");
      render();
    });
    document.getElementById("storyStage").classList.add("webgl-ready");
    dispatchEvent(new Event("hawa:scene-ready"));
    addEventListener(
      "pagehide",
      () => {
        disposed = true;
        observer.disconnect();
        removeEventListener("hawa:scene", update);
        removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", render);
        scene.traverse((o) => {
          o.geometry?.dispose();
          if (o.material) o.material.dispose();
        });
        renderer.dispose();
        document.getElementById("storyStage").classList.remove("webgl-ready");
      },
      { once: true },
    );
  } catch (e) {
    document.getElementById("storyStage").classList.add("webgl-fallback");
  }
}
