// import { Stars } from '@react-three/drei';
import './App.css';
import Moon from './components/landing';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 10] }} style={{ background: "#000" }}>
        {/* <Stars /> */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <Moon />
      </Canvas>
    </div>
  );
}

export default App;

