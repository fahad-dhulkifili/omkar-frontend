"use client";

import Image from "next/image";
import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { AboutPage } from "@/lib/types";

interface AboutHeroProps {
  data: AboutPage;
}

export default function AboutHero({ data }: AboutHeroProps) {
  const imageUrl = data.storyImage?.url
    ? getStrapiMediaUrl(data.storyImage.url)
    : null;

  return (
    <Section>
      <Container>
        <Inner $hasImage={!!imageUrl}>
          <Left>
            <Eyebrow>Our Story</Eyebrow>
            <Heading>{data.heading}</Heading>
            <Story>
              {data.story.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Story>
            {(data.mission || data.vision) && (
              <Pillars>
                {data.mission && (
                  <Pillar>
                    <PillarLabel>Mission</PillarLabel>
                    <PillarText>{data.mission}</PillarText>
                  </Pillar>
                )}
                {data.vision && (
                  <Pillar>
                    <PillarLabel>Vision</PillarLabel>
                    <PillarText>{data.vision}</PillarText>
                  </Pillar>
                )}
              </Pillars>
            )}
          </Left>

          {imageUrl && (
            <Right>
              <ImageWrap>
                <Image
                  src={imageUrl}
                  alt={data.storyImage?.alternativeText || "Omkar team"}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </ImageWrap>
              <ImageCaption>
                The Omkar team — defence-grade standards, civilian operations
              </ImageCaption>
            </Right>
          )}
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0
    ${({ theme }) => theme.spacing["3xl"]};
  background: ${({ theme }) => theme.colors.white};
  margin-top: 80px;
`;

const Inner = styled.div<{ $hasImage: boolean }>`
  display: grid;
  grid-template-columns: ${({ $hasImage }) =>
    $hasImage ? "1.1fr 1fr" : "1fr"};
  gap: ${({ theme }) => theme.spacing["3xl"]};
  align-items: start;
  max-width: ${({ $hasImage }) => ($hasImage ? "none" : "780px")};

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const Left = styled.div``;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Story = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.grayDark};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Pillars = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Pillar = styled.div``;

const PillarLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PillarText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const Right = styled.div`
  position: sticky;
  top: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.laptop}) {
    position: static;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: ${({ theme }) => theme.colors.grayLighter};
  overflow: hidden;
`;

const ImageCaption = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.gray};
`;
