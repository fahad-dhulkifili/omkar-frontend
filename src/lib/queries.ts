"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "./strapi";
import type {
  StrapiSingleResponse,
  StrapiCollectionResponse,
  HomePage,
  AboutPage,
  ServicesPage,
  ProcessPage,
  ContactPage,
  ClientSector,
  ServicePillar,
} from "./types";

const POPULATE_ALL = "*";

// ─── Single Type Queries ───

export function useHomePage() {
  return useQuery({
    queryKey: ["home"],
    queryFn: () =>
      fetchStrapi<StrapiSingleResponse<HomePage>>("home-page", {
        populate: POPULATE_ALL,
      }),
    select: (res) => res.data,
  });
}

export function useAboutPage() {
  return useQuery({
    queryKey: ["about"],
    queryFn: () =>
      fetchStrapi<StrapiSingleResponse<AboutPage>>("about-page", {
        populate: POPULATE_ALL,
      }),
    select: (res) => res.data,
  });
}

export function useServicesPage() {
  return useQuery({
    queryKey: ["services-page"],
    queryFn: () =>
      fetchStrapi<StrapiSingleResponse<ServicesPage>>("services-page", {
        populate: POPULATE_ALL,
      }),
    select: (res) => res.data,
  });
}

export function useProcessPage() {
  return useQuery({
    queryKey: ["process-page"],
    queryFn: () =>
      fetchStrapi<StrapiSingleResponse<ProcessPage>>("process-page", {
        populate: POPULATE_ALL,
      }),
    select: (res) => res.data,
  });
}

export function useContactPage() {
  return useQuery({
    queryKey: ["contact"],
    queryFn: () =>
      fetchStrapi<StrapiSingleResponse<ContactPage>>("contact-page", {
        populate: POPULATE_ALL,
      }),
    select: (res) => res.data,
  });
}

// ─── Collection Type Queries ───

export function useClientSectors() {
  return useQuery({
    queryKey: ["client-sectors"],
    queryFn: () =>
      fetchStrapi<StrapiCollectionResponse<ClientSector>>("client-sectors", {
        populate: POPULATE_ALL,
        sort: "order:asc",
        pagination: { pageSize: 100 },
      }),
    select: (res) => res.data,
  });
}

// ─── Service Pillars (deep populate: pillars → subServices → bullets) ───

const PILLAR_POPULATE = {
  heroImage: true,
  subServices: {
    populate: {
      bullets: true,
    },
  },
};

export function useServicePillars() {
  return useQuery({
    queryKey: ["service-pillars"],
    queryFn: () =>
      fetchStrapi<StrapiCollectionResponse<ServicePillar>>("service-pillars", {
        populate: PILLAR_POPULATE,
        sort: "order:asc",
        pagination: { pageSize: 100 },
      }),
    select: (res) => res.data,
  });
}

export function useServicePillar(slug: string) {
  return useQuery({
    queryKey: ["service-pillar", slug],
    queryFn: () =>
      fetchStrapi<StrapiCollectionResponse<ServicePillar>>("service-pillars", {
        populate: PILLAR_POPULATE,
        filters: { slug: { $eq: slug } },
      }),
    select: (res) => res.data[0] ?? null,
    enabled: !!slug,
  });
}
