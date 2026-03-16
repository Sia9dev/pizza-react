import React, { useState, useEffect } from "react";

import Categories from "../component/Categories";
import Sort from "../component/Sort";
import PizzaBlock from "../component/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    fetch(
      `https://69afed10c63dd197febaa388.mockapi.io/pizzas?${categoryId > 0 ? `category=${categoryId}` : ""}&sortBy=${sortType.sortProperty}&order=desc `,
    )
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
      });
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />

        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {items.length > 0 ? (
          items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <div>Нет пицц</div>
        )}
      </div>
    </>
  );
};
export default Home;
