const STATE = {
  items: [],
};

function fillState(amount) {
  let defaultItemData = {
    key1: "hello1",
    key2: "hello2",
    key3: "hello3",
    key4: "hello4",
    key5: "hello5",
  };

  STATE.items = [...Array(amount)].map(() => defaultItemData)
}

fillState(15);

function reducer(state = STATE, action) {
  return state;
}

export default reducer;
