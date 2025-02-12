export const onAddFavourite = (id, onChange) => {
  let result = localStorage.getItem("favouriteArray");
  let parcedResult = JSON.parse(result);
  console.log(parcedResult);
  if (parcedResult?.length >= 1) {
    if (!parcedResult.find((elem) => elem.questId == id)) {
      parcedResult.push({ questId: id });
      onChange(true);

      localStorage.setItem("favouriteArray", JSON.stringify(parcedResult));
    } else {
      let newArray = parcedResult.filter((elem) => elem.questId !== id);
      onChange(false);
      console.log("newArray", newArray);
      localStorage.setItem("favouriteArray", JSON.stringify(newArray));
    }
  } else {
    parcedResult = [{ questId: id }];
    onChange(true);

    localStorage.setItem("favouriteArray", JSON.stringify(parcedResult));
  }
};
export const isFavouriteCheck = (id, onChange) => {
  let result = localStorage.getItem("favouriteArray");
  let parcedResult = JSON.parse(result);

  if (parcedResult?.length >= 1) {
    if (parcedResult.find((elem) => elem?.questId == id)) {
      onChange(true);
    }
  }
};
