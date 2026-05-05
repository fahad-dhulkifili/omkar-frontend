"use client";

import styled from "styled-components";
import { useServicesPage } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import CTASection from "@/components/home/CTASection";
import Reveal from "@/components/layout/Reveal";

export default function ServicesPage() {
  const { data, isLoading, error } = useServicesPage();

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!data) return <State>No content found.</State>;

  return (
    <>
      <Navbar />
      <Reveal>
        <ServicesHero heading={data.heading} introduction={data.introduction} />
      </Reveal>
      {data.services && data.services.length > 0 && (
        <Reveal>
          <ServicesGrid services={data.services} />
        </Reveal>
      )}
      <Reveal>
        <CTASection
          heading="Ready to deploy the right team?"
          description="Tell us about your operation. We'll match the workforce, manage the compliance, and stand by the standard."
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
