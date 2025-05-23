export type FiltersState = {
  city: string;
  experience: string;
  job: string;
};

export function buildQuery(filters: FiltersState): string {
  const params = new URLSearchParams();

  if (filters.city) params.set("city", filters.city);
  if (filters.experience) params.set("experience", filters.experience);
  if (filters.job) params.set("job", filters.job);

  const query = params.toString();
  return query ? `/?${query}` : "/";
}
