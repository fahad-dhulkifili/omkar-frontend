"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { ProcessStep } from "@/lib/types";

interface ProcessStepsProps {
  heading: string;
  headingHighlight?: string;
  introduction?: string;
  steps: ProcessStep[];
}

export default function ProcessSteps({
  heading,
  headingHighlight,
  introduction,
  steps,
}: ProcessStepsProps) {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>How We Deploy</Eyebrow>
          <Heading>
            {heading}
            {headingHighlight && (
              <>
                {" "}
                <Highlight>{headingHighlight}</Highlight>
              </>
            )}
          </Heading>
          {introduction && <Lead>{introduction}</Lead>}
        </Header>

        {steps && steps.length > 0 && (
          <StepsList>
            {steps.map((step) => (
              <Step key={step.id}>
                <StepNumber>
                  {String(step.stepNumber).padStart(2, "0")}
                </StepNumber>
                <StepContent>
                  <StepHeading>{step.heading}</StepHeading>
                  <StepDescription>{step.description}</StepDescription>
                </StepContent>
              </Step>
            ))}
          </StepsList>
        )}
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

const Header = styled.div`
  max-width: 720px;
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Highlight = styled.em`
  font-style: italic;
  color: ${({ theme }) => theme.colors.primaryLight};
`;

const Lead = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 660px;
`;

const StepsList = styled.ol`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
`;

const Step = styled.li`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayLighter};
  transition: padding-left ${({ theme }) => theme.transitions.base};

  &:hover {
    padding-left: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 60px 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const StepNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.25;
  line-height: 1;
  padding-top: 0.2rem;
`;

const StepContent = styled.div``;

const StepHeading = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StepDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.grayDark};
`;
