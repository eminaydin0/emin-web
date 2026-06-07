import { CoreEntry } from "@/components/modules/CoreEntry";
import { IdentityModule } from "@/components/modules/IdentityModule";
import { TechMatrix } from "@/components/modules/TechMatrix";
import { MissionArchive } from "@/components/modules/MissionArchive";
import { EvolutionLog } from "@/components/modules/EvolutionLog";
import { ContactProtocol } from "@/components/modules/ContactProtocol";

export default function Home() {
  return (
    <>
      <CoreEntry />
      <IdentityModule />
      <TechMatrix />
      <MissionArchive />
      <EvolutionLog />
      <ContactProtocol />
    </>
  );
}
