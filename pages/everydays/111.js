import {
    MeshWobbleMaterial,
    ContactShadows,
    Environment,
} from "@react-three/drei";
import Canvas from "../../components/Canvas";
import {withFrame} from "../../hoc/withFrame";
import * as color from "../../constants/tailwind";
import {
    DotScreen,
    EffectComposer,
    HueSaturation,
} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";

const Outer = withFrame(Inner);

function Inner(props) {
    return (
        <>
            <Ball next={props.next}/>
            <ContactShadows
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, -1.6, 0]}
                opacity={1}
                width={15}
                height={15}
                blur={2}
                far={1.6}
            />
            <Environment preset="dawn"/>
        </>
    );
}

function Ball() {
    return (
        <mesh>
            <icosahedronBufferGeometry args={[128, 128, 128]}/>
            <MeshWobbleMaterial
                color={color.indigo[400]}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.1}
                factor={10}
                speed={0}
                roughness={0}
            />
        </mesh>
    );
}

export default function App(props) {
    return (
        <Canvas
            colorManagement={true}
            style={{background: "#202020"}}
            next={props.next}
            camera={{position: [0.09680295377004483, 53.10666081822827, 25.749477057147324]}}
        >
            <EffectComposer disableNormalPass={true}>
                <HueSaturation saturation={0.6}/>
                <DotScreen
                    blendFunction={BlendFunction.MULTIPLY}
                    angle={Math.PI * 0.25}
                    scale={10000}
                />
            </EffectComposer>
            <Outer next={props.next}/>
        </Canvas>
    );
}
