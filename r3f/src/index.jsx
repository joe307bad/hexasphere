import {createRoot} from 'react-dom/client'
import React, {useMemo} from 'react'
import {Canvas} from '@react-three/fiber'
import Hexasphere from '../../src/hexasphere';
import * as THREE from 'three';
import {OrbitControls} from "@react-three/drei";

function Box(props) {

    const [vertices, faces] = useMemo(() => {
        var hexasphere = new Hexasphere(30, 2, .95);
        var t = hexasphere.tiles[0];
        const vertices = [];
        let indices = []
        for (var j = 0; j < t.boundary.length; j++) {
            var bp = t.boundary[j];
            vertices.push(parseFloat(bp.x), parseFloat(bp.y), parseFloat(bp.z));
        }
        indices.push(0, 1, 2, 0, 2, 3, 0, 3, 4);
        if (vertices.length > 15) {
            indices.push(0, 4, 5);
        }
        // geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3, false));
        // geometry.setIndex(indices);

        var faces = []
        // faces.push(new THREE.Face3(0,1,2));
        // faces.push(new THREE.Face3(0,2,3));
        // faces.push(new THREE.Face3(0,3,4));

        return [new Float32Array(vertices), faces];
    }, []);
    console.log(vertices);
    return (
        <mesh>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={vertices}/>
            </bufferGeometry>
            <meshPhongMaterial color="red"/>
        </mesh>
    )
}

var hexasphere = new Hexasphere(30, 2, .95);
console.log(hexasphere);
var t = hexasphere.tiles[0];
console.log(t.boundary);
const v = [];
t.boundary.forEach((bp) => {
    v.push(parseFloat(bp.x), parseFloat(bp.y), parseFloat(bp.z));
})
console.log({v})

const positions = new Float32Array(v);

//     new Float32Array([
//     2, 1, 0,
//     0, 1, 0,
//     -1, 0, 0,
//     0, -1, 0
// ])

const i = [];
i.push(0,1,2,0,2,3,0,3,4);
if(positions.length > 15){
    i.push(0,4,5);
}

const indices = new Uint16Array(i);

//     new Uint16Array([
//     0, 1, 3,
//     2, 3, 1,
// ])

function Comp() {
    return (
        <>
            <OrbitControls/>
            <gridHelper size={10} divisions={10}/>
            <mesh>
                <bufferGeometry>
                    <bufferAttribute
                        attach='attributes-position'
                        array={positions}
                        count={positions.length / 3}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="index"
                        array={indices}
                        count={indices.length}
                        itemSize={1}
                    />
                </bufferGeometry>
            </mesh>
        </>
    )
}


createRoot(document.getElementById('app')).render(
    <Canvas
        style={{height: '100%'}}
        camera={{position: [0, 50, 25], fov: 45}}
    >
        <Comp/>
    </Canvas>,
)
