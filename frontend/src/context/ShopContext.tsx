import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ProductType, Size } from "../types/assets";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import axios from "axios";


const currency = '$';
const delivery_fee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

type CartItemsType = {
  [productId: string]: {
    [size: string]: number;
  };
};

interface ShopContextType {
  products: ProductType[];
  currency: string;
  delivery_fee: number;
  backendUrl: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItemsType;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemsType>>;
  addToCart: (itemId: string, size: Size | null) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: Size, quantity: number) => void;
  getCartAmount: () => number;

  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  navigate: NavigateFunction;
}

export const ShopContext = createContext<ShopContextType>({
  products: [],
  currency,
  delivery_fee,
  backendUrl,
  search: '',
  setSearch: () => { },
  showSearch: false,
  setShowSearch: () => { },
  cartItems: {},
  setCartItems: () => { },
  addToCart: async () => { },
  getCartCount: () => 0,
  updateQuantity: async () => { },
  getCartAmount: () => 0,
  token: '',
  setToken: () => { },
  navigate: () => { },
});

interface ShopContextProviderProps {
  children: ReactNode;
}




const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [search, setSearch] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemsType>({});
  const [token, setToken] = useState<string>('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const navigate = useNavigate();


  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const addToCart = async (itemId: string, size: Size | null) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
      } catch (error) {
        console.log(error)
        // toast.error(error.message)`
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0)
            totalCount += cartItems[items][item];
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId: string, size: Size, quantity: number) => {
    let cartData = structuredClone(cartItems);
    if (size && cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if (token) {
        try {
          await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

        } catch (error) {
          console.log(error)
          if (error instanceof Error) {

            toast.error(error.message);
          } else {
            toast.error("Something went wrong")
          }
        }
      }

    }
  };


  const getUserCart = async (token: string) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Something went wrong");
      }
    }
  }



  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
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


  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    // FIXED: Added a null check and provided a fallback empty string

    const storedToken = localStorage.getItem('token');
    if (!token && storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  }, [token]); // Added token dependency for safety



  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;