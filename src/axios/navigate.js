let navigate = null;

export const setNavigate = (nav) => {
  navigate = nav;
};

export const getNavigate = () => {
  if (!navigate) {
    throw new Error("Navigate function is not set.");
  }
  return navigate;
};
