

//helper function to round off the number to 2 digits
export const  addDecimals = (num) => {
  return (Math.round(num*100) / 100).toFixed(2);
}

export const updateCart = (state) => {

  // calculate the items price
  state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + item.price*item.qty, 0));
  // calculate the shipping charges ( If order is over $100 then free, else $10 for shipping charges)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0:100);
  // calculate the taxes (15% tax)
  state.taxPrice = addDecimals(Number((0.15*state.itemsPrice).toFixed(2)));
  // calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);
  
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};