import HttpException from "./HttpException";

class ShoppingBasketNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Shopping basket with ID '${id}' does not exist`);
    }
}

export default ShoppingBasketNotFoundException;
