export const withoutdashes = (arr: string) => {
    return arr
      .split("T")[0]
      .split("-")
      .reverse()
      .join(".");
};