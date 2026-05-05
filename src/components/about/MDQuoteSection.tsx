"use client";

import styled from "styled-components";
import { Container } from "@/components/layout/Container";
import type { MDQuote } from "@/lib/types";

interface MDQuoteSectionProps {
  quote: MDQuote;
}

export default function MDQuoteSection({ quote }: MDQuoteSectionProps) {
  if (!quote) return null;

  return (
    <Section>
      <Container>
        <Inner>
          <QuoteMark>"</QuoteMark>
          <Eyebrow>Managing Director</Eyebrow>
          <QuoteText>{quote.quote}</QuoteText>
          <Attribution>
            <AuthorName>{quote.authorName}</AuthorName>
            <AuthorRole>{quote.authorRole}</AuthorRole>
          </Attribution>
        </Inner>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0;
  background: ${({ theme }) => theme.colors.white};
`;

const Inner = styled.blockquote`
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

const QuoteMark = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 9rem;
  line-height: 0.6;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.15;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  user-select: none;
`;

const Eyebrow = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const QuoteText = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: clamp(1.25rem, 2.2vw, 1.75rem);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const Attribution = styled.cite`
  display: block;
  font-style: normal;
`;

const AuthorName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AuthorRole = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.gray};
`;
