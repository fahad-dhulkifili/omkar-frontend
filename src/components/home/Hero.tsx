"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import type { HomePage } from "@/lib/types";
import { getStrapiMediaUrl } from "@/lib/strapi";

interface HeroProps {
  data: HomePage;
}

export default function Hero({ data }: HeroProps) {
  const heroImageUrl = data.heroImage?.url
    ? getStrapiMediaUrl(data.heroImage.url)
    : null;

  return (
    <HeroWrapper>
      <SplitPanel>
        <LeftPanel>
          <LeftInner>
            {data.eyebrowBrands && data.eyebrowBrands.length > 0 && (
              <EyebrowList>
                {data.eyebrowBrands.map((brand, i) => (
                  <EyebrowItem key={i}>{brand}</EyebrowItem>
                ))}
              </EyebrowList>
            )}

            <Title>
              {data.heroTitle}
              {data.titleHighlight && (
                <>
                  <br />
                  <Highlight>{data.titleHighlight}</Highlight>
                </>
              )}
            </Title>

            {data.tagline && <Tagline>{data.tagline}</Tagline>}

            {data.certifications && data.certifications.length > 0 && (
              <CertList>
                {data.certifications.map((cert) => (
                  <Cert key={cert.id}>{cert.label}</Cert>
                ))}
              </CertList>
            )}

            {data.heroCTAText && (
              <CTAButton href={data.heroCTALink || "/contact"}>
                <span>{data.heroCTAText}</span>
                <Arrow>→</Arrow>
              </CTAButton>
            )}
          </LeftInner>
        </LeftPanel>

        <RightPanel>
          {heroImageUrl ? (
            <HeroImage
              src={heroImageUrl}
              alt={data.heroImage?.alternativeText || "Omkar team"}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <ImagePlaceholder>
              <PlaceholderText>Team Photo</PlaceholderText>
            </ImagePlaceholder>
          )}
          <ImageOverlay />
        </RightPanel>
      </SplitPanel>

      {data.stats && data.stats.length > 0 && (
        <StatsBar $count={data.stats.length}>
          {data.stats.map((stat) => (
            <StatItem key={stat.id}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsBar>
      )}
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
`;

const SplitPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const LeftPanel = styled.div`
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["4xl"]}
    ${({ theme }) => theme.spacing["3xl"]}
    ${({ theme }) => theme.spacing["4xl"]}
    ${({ theme }) => theme.spacing["2xl"]};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 20% 30%,
      rgba(39, 69, 168, 0.3) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    padding: ${({ theme }) => theme.spacing["3xl"]}
      ${({ theme }) => theme.spacing.lg};
    min-height: 70vh;
  }
`;

const LeftInner = styled.div`
  max-width: 560px;
  margin-left: auto;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    margin: 0 auto;
  }
`;

const EyebrowList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const EyebrowItem = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primaryLight};
  opacity: 0.85;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5.5vw, 5rem);
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
`;

const Highlight = styled.em`
  font-style: italic;
  color: ${({ theme }) => theme.colors.primaryLight};
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-style: italic;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 480px;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const CertList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Cert = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.75rem;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.base};

  ${CTAButton}:hover & {
    transform: translateX(6px);
  }
`;

const RightPanel = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.grayLighter};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    min-height: 50vh;
  }
`;

const HeroImage = styled(Image)`
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.navy} 100%
  );
`;

const PlaceholderText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(15, 26, 61, 0.4) 0%, transparent 30%);
  pointer-events: none;
`;

const StatsBar = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: ${({ $count }) => `repeat(${$count}, 1fr)`};
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.colors.grayLighter};

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    border-right: 1px solid ${({ theme }) => theme.colors.grayLighter};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};

    &:nth-child(even) {
      border-right: none;
    }
  }
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.gray};
`;
