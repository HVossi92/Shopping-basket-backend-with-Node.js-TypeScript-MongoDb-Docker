import HttpException from "./HttpException";

class ItemNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Item with ID '${id}' does not exist`);
    }
}

export default ItemNotFoundException;
