import Container from "@/components/Container";
import MainLayout from "@/layouts/MainLayout";

export default function Imprint() {
  return (
    <MainLayout centerContent>
      <Container className="text-xl">
        <h1 className="font-bold text-5xl mb-2">Privacy Policy</h1>
        <p>
          At this point in time, Xenyria Tools does not collect any user data.
        </p>
        <p className="text-white/75 mt-1 text-lg">
          The only data collected is anonymous usage data. This data is stored
          on servers rented by my company BlazingWorks from Hetzner&apos;s data
          center in Falkenstein, Germany.
        </p>
      </Container>
    </MainLayout>
  );
}
