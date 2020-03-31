const STATE = {
  items: [],
};

function fillState(amount) {
  let defaultItemData = {
    key1: "hello1",
    key2: "hello2",
    key3: "hello3",
    key4: "hello4",
  };

  for (let i = 0; i < amount; i++) {
    STATE.items.push(defaultItemData);
  }
}

fillState(15);

function reducer(state = STATE, action) {
  return state;
}

export default reducer;
