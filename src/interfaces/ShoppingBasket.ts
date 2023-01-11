import ShoppingBasketItem from "./ShoppingBasketItem";

interface ShoppingBasket {
    _id: string;
    shoppingBasketItems: ShoppingBasketItem[];
    totalPrice: number;
    createDate: number;
    modifyDate: number;
}
export default ShoppingBasket;