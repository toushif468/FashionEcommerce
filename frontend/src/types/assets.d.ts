declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";


export interface Assets {
  [x: string]: string | undefined;
  logo: string;
  hero_img: string;
  Heroupdated: string;
  HeroV2:string,
  HeroV3png: string,
  HEROV4:string,
  cart_icon: string;
  dropdown_icon: string;
  exchange_icon: string;
  profile_icon: string;
  quality_icon: string;
  search_icon: string;
  star_dull_icon: string;
  star_icon: string;
  bin_icon: string;
  support_img: string;
  menu_icon: string;
  about_img: string;
  contact_img: string;
  razorpay_logo: string;
  stripe_logo: string;
  cross_icon: string;
}

export type Category = "Men" | "Women" | "Kids";
export type SubCategory = "Topwear" | "Bottomwear" | "Winterwear";
export type Size = "S" | "M" | "L" | "XL" | "XXL" | null;
export type Color = "Black" | "Grey" | "Green" | "Red" | "Orange" | "Blue" | "Pink" | "White" ;

export interface RelatedProductsProps {
  category: Category;
  subCategory: SubCategory;
}

export interface ProductType {
  rating: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: Category;
  subCategory: SubCategory;
  sizes: Size[];
  colors: Color[];
  date: number;
  bestseller: boolean;
}
export default products;

export type CartDataItem = {
  _id: string;
  size: Size;
  color: Color;
  quantity: number;
};

export interface OrderItemType extends ProductType {
    quantity: number;
    size: string;
    status: string;
    payment: boolean;
    paymentMethod: string;
    date: number;
  }

export interface CartItemType extends ProductType {
    quantity: number;
    size: string;
  }

export interface OrderType {
    _id: string;
    userId: string;
    items: CartItemType[];
    amount: number;
    address: {
      firstName: string;
      lastName: string;
      email: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
      phone: string;
    };
    status: string;
    paymentMethod: string;
    payment: boolean;
    date: number;
  }


    export interface OrderItemType extends ProductType {
      size: string;
      quantity: number;
    }
  
    export interface FormDataTypes {
      firstName: string;
      lastName: string;
      companyName: string; // Added company name
      country: string;
      street: string;
      city: string;
      state: string;
      zipcode: string;
      phone: string;
      email: string;
    }