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
            <torusKnotBufferGeometry args={[128, 128, 128]}/>
            <MeshWobbleMaterial
                color={color.indigo[400]}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
                metalness={0.1}
                factor={100000}
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
            camera={{position: [-364.3452953837426, 10.021523774493001, 84.13254899313455]}}
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
