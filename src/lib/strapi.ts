const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

interface StrapiRequestOptions {
  populate?: string | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

function buildQueryString(options: StrapiRequestOptions): string {
  const params = new URLSearchParams();

  if (options.populate) {
    if (typeof options.populate === "string") {
      params.append("populate", options.populate);
    } else {
      const flattenPopulate = (
        obj: Record<string, unknown>,
        prefix = "populate",
      ) => {
        Object.entries(obj).forEach(([key, value]) => {
          const newKey = `${prefix}[${key}]`;
          if (typeof value === "object" && value !== null) {
            flattenPopulate(value as Record<string, unknown>, newKey);
          } else {
            params.append(newKey, String(value));
          }
        });
      };
      flattenPopulate(options.populate);
    }
  }

  if (options.sort) {
    const sortArr = Array.isArray(options.sort) ? options.sort : [options.sort];
    sortArr.forEach((s) => params.append("sort", s));
  }

  if (options.pagination) {
    if (options.pagination.page)
      params.append("pagination[page]", String(options.pagination.page));
    if (options.pagination.pageSize)
      params.append(
        "pagination[pageSize]",
        String(options.pagination.pageSize),
      );
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function fetchStrapi<T>(
  endpoint: string,
  options: StrapiRequestOptions = {},
): Promise<T> {
  const queryString = buildQueryString(options);
  const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(
      `Strapi fetch error: ${res.status} ${res.statusText} — ${url}`,
    );
  }

  const json = await res.json();
  return json;
}

/**
 * Get the full URL for a Strapi media asset.
 */
export function getStrapiMediaUrl(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
