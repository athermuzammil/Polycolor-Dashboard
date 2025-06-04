import { BACK_KEY } from "./variables";

export const getToken = (token1) => {
  let tokenWithKeys;
  if (token1) {
    tokenWithKeys = token1;
  } else {
    tokenWithKeys = localStorage.getItem("token");
  }
  if (!tokenWithKeys) return null;

  // Assuming FRONT_KEY and BACK_KEY have fixed lengths

  return tokenWithKeys;
};
