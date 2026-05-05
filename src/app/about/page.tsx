"use client";

import styled from "styled-components";
import { useAboutPage } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import AboutHero from "@/components/about/AboutHero";
import TimelineSection from "@/components/about/TimelineSection";
import MDQuoteSection from "@/components/about/MDQuoteSection";
import StatsBar from "@/components/about/StatsBar";
import Reveal from "@/components/layout/Reveal";

export default function AboutPage() {
  const { data, isLoading, error } = useAboutPage();

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!data) return <State>No content found.</State>;

  return (
    <>
      <Navbar />
      <Reveal>
        <AboutHero data={data} />
      </Reveal>
      {data.timeline && data.timeline.length > 0 && (
        <Reveal>
          <TimelineSection items={data.timeline} />
        </Reveal>
      )}
      {data.mdQuote && (
        <Reveal>
          <MDQuoteSection quote={data.mdQuote} />
        </Reveal>
      )}
      {data.stats && data.stats.length > 0 && (
        <Reveal>
          <StatsBar stats={data.stats} background="dark" />
        </Reveal>
      )}
    </>
  );
}

const State = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;
