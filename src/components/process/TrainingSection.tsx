"use client";

import Image from "next/image";
import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { StrapiMedia } from "@/lib/types";

interface TrainingSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  images: StrapiMedia[];
  tags?: string[];
}

export default function TrainingSection({
  heading,
  subheading,
  description,
  images,
  tags,
}: TrainingSectionProps) {
  return (
    <Section>
      <Container>
        <Inner>
          <Left>
            <Eyebrow>Training Standard</Eyebrow>
            {heading && <Heading>{heading}</Heading>}
            {subheading && <Subheading>{subheading}</Subheading>}
            {description && <Description>{description}</Description>}

            {tags && tags.length > 0 && (
              <Tags>
                {tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </Tags>
            )}
          </Left>

          {images && images.length > 0 && (
            <Right>
              {images.map((img) => {
                const url = getStrapiMediaUrl(img.url);
                return (
                  <ImageWrap key={img.id}>
                    <Image
                      src={url}
                      alt={img.alternativeText || "Training"}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    <ImageOverlay>
                      <ImageCaption>
                        {img.alternativeText || img.name}
                      </ImageCaption>
                    </ImageOverlay>
                  </ImageWrap>
                );
              })}
            </Right>
          )}
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["3xl"]} 0;
  background: ${({ theme }) => theme.colors.offWhite};
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing["3xl"]};
  align-items: start;

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

const Heading = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subheading = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.grayDark};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Tag = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.grayDark};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  padding: 0.35rem 0.7rem;
  background: ${({ theme }) => theme.colors.white};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.grayLighter};
  overflow: hidden;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: linear-gradient(to top, rgba(15, 26, 61, 0.85), transparent);
`;

const ImageCaption = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.9);
`;
