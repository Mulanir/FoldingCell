const STATE = {
  items: [],
};

function fillState(amount) {
  let defaultItemData = {
    key1: "hello1",
    key2: "hello2",
    key3: "hello3",
  };

  for (let i = 0; i < amount; i++) {
    STATE.items.push(defaultItemData);
  }
}

fillState(6);

function reducer(state = STATE, action) {
  return state;
}

export default reducer;
