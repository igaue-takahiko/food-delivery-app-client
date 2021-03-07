export const initialState = {
  auth: {
    authenticated: false,
    loading: false,
    account: {},
    name: "",
    address: {},
    imageUrl: [],
    payment: [],
    items: [],
    tags: "",
    minOrderAmount: "",
    costForOne: "",
    cart: {},
    _id: "",
    firstName: "",
    lastName: "",
  },
  ui: {
    loading: false,
    serverError: false,
    errors: null,
    errorsSeller: null,
    signUpSuccess: false,
  },
  data: {},
};
