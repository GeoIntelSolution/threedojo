<template>
    <div class="sdfscene" id="scene">
    </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Text} from 'troika-three-text';
let scene, camera, renderer, controls,plane,myText;
export default {
    name: 'sdf_demo',
    mounted() {
        this.init();
        this.addControl(camera, renderer)
        this.addText()
        this.animate();

    },
    methods: {
        init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / 900, 0.1, 1000)

            const container = document.getElementById("scene");
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight)
            container.appendChild(renderer.domElement);


            const geometry = new THREE.BoxGeometry(10, 10, 10)
            const mesh = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
                uniforms: {
                    opacity: {
                        value: 0.5
                    },
                    uCityColor: {
                        value: new THREE.Color('#5588aa')
                    }
                },
                vertexShader: `
                varying vec3 vPosition;
                void main()
                {
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`,
                fragmentShader: `
                varying vec3 vPosition;
                uniform float opacity;
                uniform vec3 uCityColor;
                void main()
                {
                    float a = opacity;
                    vec2 center=vec2(0.5,0.5);
                    float r =distance(vPosition.xy,center);
                    gl_FragColor= vec4(r/5.0,0.0,0.0,1.0);
                }
                `
            }))



            const light = new THREE.AmbientLight(0x404040); // soft white light
            scene.add(light);
            // scene.add(mesh)
            this.addOutline(mesh)


            var planeGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
            var planeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
            });
            plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            // scene.add(plane);

            camera.position.z = 50;
            camera.position.y = 40;



        },
        addControl() {
            // controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.listenToKeyEvents(window); // optional

            //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

            controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            controls.dampingFactor = 0.05;

            controls.screenSpacePanning = false;

            controls.minDistance = 1;
            controls.maxDistance = 500;

            controls.maxPolarAngle = Math.PI / 2;
        },
        addText(){
            myText =new Text();
            scene.add(myText)

            myText.text='???AAG3857'
            myText.fontSize =0.2;
            myText.color = 0xffffff;
            myText.position.y=2;
            myText.font='./NotoSansSC-Regular.otf'

        },
        animate() {
            renderer.render(scene, camera)
            myText.sync()
            requestAnimationFrame(this.animate)
        },
        addOutline(object) {
            const edges = new THREE.EdgesGeometry(object.geometry, 1)

            //?????????????????????
            const lineMaterial = new THREE.LineBasicMaterial({
                // ????????????
                color: "rgba(38,133,254)",
            });

            //?????????????????????
            const lineS = new THREE.LineSegments(edges, lineMaterial);
            //?????????????????????
            lineS.position.set(
                object.position.x,
                object.position.y + 0,
                object.position.z
            );
            //???????????????
            scene.add(lineS);
        }
    }
}
</script>
<style scoped>
.sdfscene {
    display: block;
    background-color: black;
    width: 100%;
    height: 900px;
}
</style>