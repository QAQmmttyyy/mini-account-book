import { useAppStore } from "./store/app.store";

export const request: typeof fetch = async (...args) => {
  try {
    const response = await fetch(...args);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    useAppStore.getState().setMsg(String(error));
    // For type reason.
    return undefined as any;
  }
};
