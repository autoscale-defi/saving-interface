export function buildUrlParams(
  search: string,
  urlParams: {
    [key: string]: string;
  }
) {
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams as any);

  const nextUrlParams = new URLSearchParams({
    ...params,
    ...urlParams,
  }).toString();

  return { nextUrlParams, params };
}
