"use client";

import styled from "styled-components";
import { useHomePage } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import Reveal from "@/components/layout/Reveal";
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const { data, isLoading, error } = useHomePage();

  if (isLoading) return <LoadingState>Loading...</LoadingState>;
  if (error) return <ErrorState>Error: {error.message}</ErrorState>;
  if (!data) return <ErrorState>No content found.</ErrorState>;

  return (
    <>
      <Navbar transparent />
      <Hero data={data} />
      <Reveal>
        <ServicesOverview
          heading={data.servicesHeading}
          subheading={data.servicesSubheading}
        />
      </Reveal>
      <Reveal>
        <CTASection
          heading={data.ctaHeading}
          description={data.ctaDescription}
          buttonText={data.ctaButtonText}
          buttonLink={data.ctaButtonLink}
        />
      </Reveal>
    </>
  );
}

const LoadingState = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const ErrorState = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.error};
`;
