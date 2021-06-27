import { useUrlSearchParamsStore } from "../store/urlSearchParams.store";

describe("middleware", () => {
  test("updates url search string", () => {
    useUrlSearchParamsStore.getState().updateUrlSearchParams("foo", 1);

    expect(location.search).toBe("?foo=1");

    useUrlSearchParamsStore.getState().updateUrlSearchParams("bar", 2);

    expect(location.search).toBe("?foo=1&bar=2");
  });
});
