import Container from "@/components/Container";
import MainLayout from "@/layouts/MainLayout";

export default function Imprint() {
  return (
    <MainLayout centerContent>
      <Container>
        <h1 className="font-bold text-5xl">Imprint</h1>
        <h2 className="font-semibold text-2xl mb-2 mt-1">
          According to § 5 of the German Telemedia Act (TMG)
        </h2>
        <h3 className="font-bold text-1xl mb-0.5">
          Responsible for this website is:
        </h3>
        <p>
          Dennis Paulus
          <br />
          Voerder Straße 99
          <br />
          Hinterhaus
          <br />
          58135 Hagen
          <br />
          Germany
        </p>
        <p className="mt-0.5">
          <b>E-Mail:</b> me@crg.sh
        </p>
        <h2 className="font-semibold text-2xl mt-4">Disclaimers</h2>
        <h3 className="font-bold text-1xl mb-0.5 mt-1">
          Accountability for the content
        </h3>
        <p>
          The contents of our pages have been created with the utmost care.
          However, we cannot guarantee the contents&apos; accuracy, completeness
          or topicality. According to statutory provisions, we are furthermore
          responsible for our own content on these web pages. In this matter,
          please note that we are not obliged to monitor the transmitted or
          saved information of third parties, or investigate circumstances
          pointing to illegal activity. Our obligations to remove or block the
          use of information under generally applicable laws remain unaffected
          by this as per §§ 8 to 10 of the Telemedia Act (TMG).
        </p>
        <h3 className="font-bold text-1xl mb-0.5 mt-1">
          Accountability for the links
        </h3>
        <p>
          Responsibility for the content of external links (to web pages of
          third parties) lies solely with the operators of the linked pages. No
          violations were evident to us at the time of linking. Should any legal
          infringement become known to us, we will remove the respective link
          immediately.
        </p>
      </Container>
    </MainLayout>
  );
}
