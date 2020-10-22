import { PropertyObject } from "./propertyObject";

interface Item {
    id: string;
    className: string;
    tag: string;
    description?: string;
    manufacturer?: string;
    properties?: PropertyObject;
}

export default Item;
