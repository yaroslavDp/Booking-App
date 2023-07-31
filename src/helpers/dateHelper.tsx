export const getDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, time] = tomorrow.toISOString().split("T");
    const futureDay = date
      .split("-")
      .map((item, index) => {
        if (index === 2) {
          item = (+item).toString().padStart(2, "0");
          return item;
        }
        return item;
      })
      .join("-");
  
    return {futureDay, time};
  };
  