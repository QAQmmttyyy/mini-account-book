import create, { StateCreator } from "zustand";

export enum BillSearchParamsKey {
  YEAR = "year",
  MONTH = "month",
  CATEGORY = "category",
}

interface UrlSearchParamsState {
  urlSearchParams: URLSearchParams;
  updateUrlSearchParams: (name: string, value: any) => void;
}

// Middleware
function changeSearchParamWithoutPageRefresh(
  config: StateCreator<UrlSearchParamsState>
): StateCreator<UrlSearchParamsState> {
  return (set, get, api) => {
    return config(
      (...args) => {
        set(...args);
        // The change.
        const url = new URL(location.href);
        for (const [name, value] of api.getState().urlSearchParams) {
          url.searchParams.set(name, value);
        }
        history.pushState({}, "", url.toString());
      },
      get,
      api
    );
  };
}

export const useUrlSearchParamsStore = create(
  changeSearchParamWithoutPageRefresh((set) => {
    return {
      urlSearchParams: new URLSearchParams(location.search),
      updateUrlSearchParams: (name, value) =>
        set((prev) => {
          prev.urlSearchParams.set(name, String(value));
          return {
            urlSearchParams: new URLSearchParams(prev.urlSearchParams),
          };
        }),
    };
  })
);
