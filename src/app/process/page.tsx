"use client";

import styled from "styled-components";
import { useProcessPage } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import ProcessSteps from "@/components/process/ProcessSteps";
import TrainingSection from "@/components/process/TrainingSection";
import IndustriesSection from "@/components/process/IndustriesSection";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/layout/Reveal";

export default function ProcessPage() {
  const { data, isLoading, error } = useProcessPage();

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!data) return <State>No content found.</State>;

  return (
    <>
      <Navbar />
      <Reveal>
        <TrainingSection
          heading={data.trainingHeading}
          subheading={data.trainingSubheading}
          description={data.trainingDescription}
          images={data.trainingImages || []}
          tags={data.trainingTags}
        />
      </Reveal>
      <Reveal>
        <ProcessSteps
          heading={data.heading}
          headingHighlight={data.headingHighlight}
          introduction={data.introduction}
          steps={data.steps}
        />
      </Reveal>
      <Reveal>
        <ProcessSteps
          heading={data.heading}
          headingHighlight={data.headingHighlight}
          introduction={data.introduction}
          steps={data.steps}
        />
      </Reveal>
      <Reveal>
        <TrainingSection
          heading={data.trainingHeading}
          subheading={data.trainingSubheading}
          description={data.trainingDescription}
          images={data.trainingImages || []}
          tags={data.trainingTags}
        />
      </Reveal>
      {data.industries && data.industries.length > 0 && (
        <Reveal>
          <IndustriesSection industries={data.industries} />
        </Reveal>
      )}
      <Reveal>
        <CTASection
          heading="Deploy the right team, the right way."
          description="Our five-gate process ensures every placement meets defence-grade standards — from requirement analysis to compliance enrolment."
          buttonText="Request a Consultation"
          buttonLink="/contact"
        />
      </Reveal>
    </>
  );
}

const State = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;
