import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../interfaces";

const initialState: Account = {
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
  avatar:
    "https://api.kyivindependent.com/storage/2021/12/loveyoustepan.-instagram-1024x683.jpg",
};

export const accountSilce = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<Account>) => {
      console.log(action.payload);
      const newAccountData = {
        avatar: action.payload.avatar,
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
        phone: action.payload.phone,
        website: action.payload.website,
        company: {
          name: action.payload.company.name,
          catchPhrase: action.payload.company.name,
          bs: action.payload.company.name,
        },
        address: {
          street: action.payload.address.street,
          suite: action.payload.address.suite,
          city: action.payload.address.city,
          zipcode: action.payload.address.zipcode,
          geo: {
            lat: action.payload.address.geo.lat,
            lng: action.payload.address.geo.lng,
          },
        },
      };

      return newAccountData;
    },
  },
});

export const { updateAccount } = accountSilce.actions;

export default accountSilce.reducer;
