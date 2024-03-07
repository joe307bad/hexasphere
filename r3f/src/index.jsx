import {createRoot} from 'react-dom/client'
import React, {useMemo} from 'react'
import {Canvas} from '@react-three/fiber'
import Hexasphere from '../../src/hexasphere';
import {OrbitControls} from "@react-three/drei";
import {randomHexColor} from "random-hex-color-generator";

function TileMesh({positions, indices}) {
    return (<mesh>
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
        <meshStandardMaterial color={randomHexColor()}/>
    </mesh>)
}

function Comp() {

    const tiles = useMemo(() => {
        var hexasphere = new Hexasphere(30, 2, .95);
        var tiles = [];

        hexasphere.tiles.forEach(t => {
            const v = [];
            t.boundary.forEach((bp) => {
                v.push(parseFloat(bp.x), parseFloat(bp.y), parseFloat(bp.z));
            })

            const positions = new Float32Array(v);

            const i = [];
            i.push(0, 1, 2, 0, 2, 3, 0, 3, 4);
            if (positions.length > 15) {
                i.push(0, 4, 5);
            }

            const indices = new Uint16Array(i);
            tiles.push({positions, indices});
        })


        return tiles;
    }, [])


    return (<>
        <OrbitControls/>
        {tiles.map((t, i) => <TileMesh key={i} positions={t.positions} indices={t.indices}/>)}
        <ambientLight/>
    </>)
}


createRoot(document.getElementById('app')).render(<Canvas
    style={{height: '100%'}}
    camera={{position: [0, 50, 25], fov: 45}}
>
    <Comp/>
</Canvas>,)
