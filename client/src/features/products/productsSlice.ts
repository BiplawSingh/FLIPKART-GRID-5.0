import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IModifiedProduct, IProduct } from "../../types/product";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import {
  filterBySubCategories,
  getCachedProductsByPrimaryCategories,
  getCachedProductsByPrimaryCategory,
  sliceProductsAndAddToLocalStorage,
} from "./helpers";
import { IParameter } from "../../types/parameters";
import { IUserProduct } from "../../types/user";
import cloneDeep from "lodash/cloneDeep";
import img from "../../assets/img.jpeg"

interface ICartProducts {
  products: IModifiedProduct[] | null;
  totalCost: number;
  discount?: number;
}

interface IinitialState {
  products: IProduct[] | null;
  cartProducts: ICartProducts;
  productsByIds: IProduct[] | null;
  productsByCategory: IProduct[] | null;
  loading: boolean;
}

const initialState: IinitialState = {
  products: null,
  productsByIds: null,
  productsByCategory: null,
  cartProducts: { products: null, totalCost: 0 },
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCartProductsAndTotalCost(state, actions: PayloadAction<IUserProduct[]>) {
      const mappedProducts: IModifiedProduct[] = [];

      if (state.products?.length) {
        state.products.forEach((product) => {
          const matchedProductInCart = actions.payload.find(
            (item) => item.id === product.id
          );

          if (!!matchedProductInCart) {
            mappedProducts.push({
              ...product,
              amount: matchedProductInCart.amount,
              price: +(matchedProductInCart.amount * product.price).toFixed(2),
            });
          }
        });

        state.cartProducts.products = mappedProducts;
      }

      if (mappedProducts.length) {
        let total = mappedProducts.reduce(
          (previousValue, currentValue) => previousValue + currentValue.price,
          0
        );
        total = +total.toFixed(2);
        state.cartProducts.totalCost = total;
      } else {
        state.cartProducts.totalCost = 0;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProductsByCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProductsByCategories.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.productsByCategory = action.payload;
        }
      );
  },
});

const products: IProduct[] = [
  {
    id: "men",
    name: "Highlander Jeans",
    imageUrl: img,
    colors: ["blue", "black"],
    sizes: ["L", "XL"],
    price: 896.89,
    stockAmount: 2,
    discountRate: 34,
    description: {
      details: "Lorem ispum",
      materials: ["Cotton", "Plastic"],
    },
    primaryCategory: "men",
    secondaryCategory: "sho",
    tertiaryCategory: "ls",
    collections: ["New", "Sale"],
  },
];

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    // let q = query(collection(db, "products"));
    // const querySnapshot = await getDocs(q);
    let data: IProduct[] | null = getCachedProductsByPrimaryCategories();

    if (!data || !data.length) {
      // data = uerySnapshot.docs.map((doc) => {
      //   let docData = doc.data() as IProduct;
      //   docData.id =q doc.id;
      //   return docData;
      // });
      data = products;
      sliceProductsAndAddToLocalStorage(data);
    }

    return data;
  }
);

export const fetchProductsByCategories = createAsyncThunk(
  "products/fetchProductsByCategories",
  async (
    {
      searchParameters,
      favoriteProductIds,
    }: {
      searchParameters: IParameter;
      favoriteProductIds: string[] | undefined;
    },
    thunkAPI
  ) => {
    // const { primary, secondary, tertiary } = searchParameters;

    // let data: IProduct[] = getCachedProductsByPrimaryCategory(primary);

    // // if products didn't cached before get products from server and cache
    // if (!data || data.length === 0) {
    //   data = [];
    //   let q = query(
    //     collection(db, "products"),
    //     where("primaryCategory", "==", primary)
    //   );
    //   let querySnapshot = await getDocs(q);

    //   querySnapshot.docs.forEach((doc) => {
    //     let docData = doc.data() as IProduct;
    //     docData.id = doc.id;
    //     data.push(docData);
    //   });
    //   localStorage.setItem(primary, JSON.stringify(data));
    // }

    // if (secondary.length) {
    //   const tertiaryIds = tertiary.flatMap((item) => Object.values(item));
    //   let filteredProducts = filterBySubCategories(
    //     secondary,
    //     tertiaryIds,
    //     data
    //   );
    //   filteredProducts = mapWithFavoriteProductIds(
    //     filteredProducts,
    //     favoriteProductIds
    //   );
    //   return filteredProducts;
    // } else {
    //   let filteredProducts = mapWithFavoriteProductIds(
    //     data,
    //     favoriteProductIds
    //   );
    //   return filteredProducts;
    return products;
  }
);

export default productsSlice.reducer;
export const { setCartProductsAndTotalCost } =
  productsSlice.actions;
