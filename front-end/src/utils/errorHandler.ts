// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (error: any) => {
  const environment = "development";
  if (environment === "development") {
    console.error("Development Error", error);
  } else {
    console.error("Something went wrong. Please try again later.");
  }
};
