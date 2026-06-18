import PageWrapper from "@/shared/components/shared/PageWrapper";
import RequestSection from "./sections/RequestSection";

const ConsolePage = () => {
  return (
    <PageWrapper>
      <h1>Test Console</h1>
      <p>Test API endpoints and view responses in real-time.</p>
      <div>
        <RequestSection />
      </div>
    </PageWrapper>
  );
};
export default ConsolePage;
