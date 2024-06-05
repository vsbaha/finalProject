// src/Product.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProduct,
  nextProduct,
  previousProduct,
  selectCurrentProduct,
  selectCurrentProductId,
  selectStatus,
  selectError,
} from "./features/productSlice";
import "./Product.css";

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectCurrentProduct);
  const productId = useSelector(selectCurrentProductId);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className="product-card">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <h1>{product.title}</h1>
          <img src={product.thumbnail} alt={product.title} />
          <p>{product.description}</p>
          <div className="price">${product.price}</div>
          <div className="buttons">
            <button onClick={() => dispatch(previousProduct())}>Назад</button>
            <button onClick={() => dispatch(nextProduct())}>Вперед</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
