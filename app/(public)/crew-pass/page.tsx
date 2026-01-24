import { GridScan } from "@/components/crew-pass/grid-scan";
import Lanyard from "@/components/crew-pass/lanyard";

export default function CrewPassPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <GridScan
          sensitivity={0}
          lineThickness={1}
          linesColor="#002A15"
          gridScale={0.1}
          scanColor="#39DA2C"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          scanSoftness={2.5}
          scanDuration={4}
        />
      </div>
      <div className="fixed">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>
    </div>
  );
}

