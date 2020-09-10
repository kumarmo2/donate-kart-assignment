export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          imageUrl:
            "https://img.gamerjournalist.com/spai/w_728+q_lossy+ret_img+to_webp/https://gamerjournalist.com/wp-content/uploads/2019/12/best-mechanical-keyboards-for-gaming-2020.png",
          price: 14000,
          name: "keychron k2",
          currency: "INR",
          id: 1,
        },
        {
          imageUrl: "https://i.ytimg.com/vi/IkubrmZ0Go0/maxresdefault.jpg",
          price: 16000,
          name: "Motospeed  K87S",
          currency: "INR",
          id: 2,
        },
        {
          imageUrl:
            "https://images-na.ssl-images-amazon.com/images/I/71BBR3-RxBL._AC_SX466_.jpg",
          price: 10000,
          name: "Corsair k57 RGB",
          currency: "INR",
          id: 3,
        },
      ]);
    }, 2000);
  });
};

export const getExchangeRates = (baseCurrency) => {
  return fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
};
