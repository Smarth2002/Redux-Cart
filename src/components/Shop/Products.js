import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
    {
        id: 1,
        price: 6,
        title: "first book",
        description: "hello first book",
    },
    {
        id: 2,
        price: 5,
        title: "second book",
        description: "hello second book",
    },
];

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                {DUMMY_PRODUCTS.map((product) => (
                    <ProductItem key={product.id} item={product} />
                ))}
            </ul>
        </section>
    );
};

export default Products;
