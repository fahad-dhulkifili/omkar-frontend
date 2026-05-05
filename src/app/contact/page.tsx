"use client";

import { useState } from "react";
import styled from "styled-components";
import { useContactPage } from "@/lib/queries";
import Navbar from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import * as Yup from "yup";

export default function ContactPage() {
  const { data, isLoading, error } = useContactPage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    organisation: Yup.string().max(
      100,
      "Organisation name can't exceed 100 characters",
    ),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[+\d][\d\s-]{7,}$/, "Enter a valid phone number"),
    email: Yup.string().test(
      "email",
      "Enter a valid email address",
      (value) => {
        if (!value || value.trim() === "") return true;
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
    ),
    service: Yup.string().required("Please select a service"),
    message: Yup.string().max(1000, "Message can't exceed 1000 characters"),
  });

  if (isLoading) return <State>Loading...</State>;
  if (error) return <State>Error: {error.message}</State>;
  if (!data) return <State>No content found.</State>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName") as string,
      organisation: formData.get("organisation") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    try {
      await validationSchema.validate(payload, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <Section>
        <Container>
          <Grid>
            <Left>
              <Eyebrow>Get in Touch</Eyebrow>
              <Heading>{data.heading}</Heading>
              {data.description && <Lead>{data.description}</Lead>}

              {data.offices && data.offices.length > 0 && (
                <Offices>
                  {data.offices.map((office) => (
                    <OfficeCard key={office.id} $isPrimary={office.isPrimary}>
                      <OfficeName>{office.name}</OfficeName>
                      <OfficeDetail>
                        <DetailIcon>📍</DetailIcon>
                        <DetailText>{office.address}</DetailText>
                      </OfficeDetail>
                      {office.email && (
                        <OfficeDetail>
                          <DetailIcon>✉</DetailIcon>
                          <DetailText>
                            <a href={`mailto:${office.email}`}>
                              {office.email}
                            </a>
                          </DetailText>
                        </OfficeDetail>
                      )}
                      {office.website && (
                        <OfficeDetail>
                          <DetailIcon>🌐</DetailIcon>
                          <DetailText>
                            <a
                              href={office.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {office.website.replace("https://", "")}
                            </a>
                          </DetailText>
                        </OfficeDetail>
                      )}
                    </OfficeCard>
                  ))}
                </Offices>
              )}

              {data.registrations && data.registrations.length > 0 && (
                <Registrations>
                  <RegistrationsLabel>Registrations</RegistrationsLabel>
                  <RegList>
                    {data.registrations.map((reg) => (
                      <RegItem key={reg.id}>
                        <RegKey>{reg.label}</RegKey>
                        <RegValue>{reg.value}</RegValue>
                      </RegItem>
                    ))}
                  </RegList>
                </Registrations>
              )}
            </Left>

            <Right>
              {!submitted ? (
                <Form onSubmit={handleSubmit}>
                  <FormRow>
                    <FormGroup>
                      <Label>Full Name</Label>
                      <Input
                        type="text"
                        name="fullName"
                        placeholder="Your name"
                      />
                      {errors.fullName && (
                        <FieldError>{errors.fullName}</FieldError>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Organisation</Label>
                      <Input
                        type="text"
                        name="organisation"
                        placeholder="Company / Institution"
                      />
                    </FormGroup>
                  </FormRow>
                  <FormRow>
                    <FormGroup>
                      <Label>Phone</Label>
                      <Input type="tel" name="phone" placeholder="+91" />
                      {errors.phone && <FieldError>{errors.phone}</FieldError>}
                    </FormGroup>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                      />
                      {errors.email && <FieldError>{errors.email}</FieldError>}
                    </FormGroup>
                  </FormRow>
                  <FormGroup>
                    <Label>Service Required</Label>
                    <Select name="service" defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option>Security Services — Man Guarding</option>
                      <option>Security Services — VVIP / Escort</option>
                      <option>
                        Security Services — CCTV / Drone Surveillance
                      </option>
                      <option>Facility Management</option>
                      <option>General Contracting / Payroll</option>
                      <option>Executive / White-Collar Recruitment</option>
                      <option>Security Audit &amp; Risk Assessment</option>
                      <option>Other / Not Sure</option>
                    </Select>
                    {errors.service && (
                      <FieldError>{errors.service}</FieldError>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label>Message</Label>
                    <Textarea
                      name="message"
                      placeholder="Brief description of your requirement — location, headcount, timeline…"
                      rows={5}
                    />
                  </FormGroup>
                  <SubmitButton type="submit" disabled={sending}>
                    <span>{sending ? "Sending..." : "Submit Request →"}</span>
                  </SubmitButton>
                </Form>
              ) : (
                <SuccessMessage>
                  <SuccessIcon>✓</SuccessIcon>
                  <SuccessTitle>Message received.</SuccessTitle>
                  <SuccessText>
                    We'll be in touch shortly. Thank you for your interest in
                    Omkar Group.
                  </SuccessText>
                </SuccessMessage>
              )}
            </Right>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
const State = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.gray};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing["4xl"]} 0;
  background: ${({ theme }) => theme.colors.white};
  margin-top: 80px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
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

const Heading = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  letter-spacing: -0.02em;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Lead = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.grayDark};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
  max-width: 480px;
`;

const Offices = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};
`;

const OfficeCard = styled.div<{ $isPrimary: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  border-left: 3px solid
    ${({ $isPrimary, theme }) =>
      $isPrimary ? theme.colors.primary : theme.colors.grayLighter};
  background: ${({ theme }) => theme.colors.offWhite};
`;

const OfficeName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OfficeDetail = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  align-items: flex-start;
`;

const DetailIcon = styled.span`
  flex-shrink: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const DetailText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.grayDark};
  a {
    color: ${({ theme }) => theme.colors.primary};
    transition: color ${({ theme }) => theme.transitions.base};
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

const Registrations = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.grayLighter};
`;

const RegistrationsLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RegList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const RegItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RegKey = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.navy};
  min-width: 100px;
`;

const RegValue = styled.span`
  color: ${({ theme }) => theme.colors.grayDark};
  letter-spacing: 0.02em;
`;

const Right = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  background: ${({ theme }) => theme.colors.offWhite};
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ theme }) => theme.colors.grayDark};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-family: inherit;
  font-size: 0.875rem;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.25s ease;
  &:focus {
    border-color: #2745a8;
  }
  &::placeholder {
    color: #b0b0b0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-family: inherit;
  font-size: 0.875rem;
  color: #1a1a1a;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.25s ease;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a7a7a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  &:focus {
    border-color: #2745a8;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  font-family: inherit;
  font-size: 0.875rem;
  color: #1a1a1a;
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.25s ease;
  &:focus {
    border-color: #2745a8;
  }
  &::placeholder {
    color: #b0b0b0;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  border: none;
  width: 100%;
  transition: all ${({ theme }) => theme.transitions.base};
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  border: 1px solid ${({ theme }) => theme.colors.grayLighter};
  background: ${({ theme }) => theme.colors.offWhite};
  min-height: 400px;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SuccessTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SuccessText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.grayDark};
  max-width: 360px;
`;
const FieldError = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.error};
  margin-top: 2px;
`;
