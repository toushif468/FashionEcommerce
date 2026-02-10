import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ProductType, Size } from "../types/assets";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate, type NavigateFunction } from "react-router-dom";
// import { products, type Product } from "../assets/assets";

type CartItemsType = {
  [productId: string]: {
    [size: string]: number;
  };
};

interface ShopContextType {
  products: ProductType[];
  currency: string;
  delivery_fee: number;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;

  cartItems: CartItemsType;
  addToCart: (itemId: string, size: Size) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: Size, quantity: number) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;

}
export const ShopContext = createContext<ShopContextType>({
  products: [],
  currency: '$',
  delivery_fee: 10,

  search: '',
  setSearch: () => { },

  showSearch: false,
  setShowSearch: () => { },

  cartItems: {},
  addToCart: () => { },
  getCartCount: () => 0,
  updateQuantity: () => { },
  getCartAmount: () => 0,
  navigate: () => { },

});


interface ShopContextProviderProps {
  children: ReactNode;
};






const ShopContextProvider = ({ children }: ShopContextProviderProps) => {

  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItemsType>({});
  const navigate = useNavigate();
  const addToCart = async (itemId: string, size: Size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      }
      else {
        cartData[itemId][size] = 1
      }
    }
    else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1;
    }



    setCartItems(cartData);
  }

  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0)
            totalCount += cartItems[items][item];
        } catch (error) {

        }
      }
    }
    return totalCount;
  }

  const updateQuantity = async (itemId: string, size: Size, quantity: number) => {
    let cartData = structuredClone(cartItems);

    if (size && cartData[itemId]) {
      cartData[itemId][size] = quantity;

      setCartItems(cartData);
    }

  }

 const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);

      // if (!itemInfo) continue; //TS safegaurd

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo!.price * cartItems[items][item];
          }
        } catch (error) {

        }
      }
    }

    return totalAmount;
  }

  const value: ShopContextType = {
    products,
    currency: '$',
    delivery_fee: 10,

    search,
    setSearch,

    showSearch,
    setShowSearch,


    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};


export default ShopContextProvider;