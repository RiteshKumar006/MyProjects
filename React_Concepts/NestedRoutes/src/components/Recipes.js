import React, { useState, useEffect } from "react";
import { Row, Layout, Menu, Divider } from "antd";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import { getCategories } from "../api";
import { Link, useRouteMatch, Route, Switch } from "react-router-dom";

const Recipes = () => {
  const [categories, setCategories] = useState([]);
  const {  url } = useRouteMatch();
  useEffect(() => {
    getCategories().then((cats) => setCategories(cats));
  }, []);
  return (
    <Layout>
      <Row span={12}>
        <Menu mode="horizontal" theme="dark">
          {categories &&
            categories.map((c, i) => (
              <Menu.Item key={i}>
                {" "}
                <Link to={`${url}/${c}`}> {c.toUpperCase()} </Link>{" "}
              </Menu.Item>
            ))}
        </Menu>
      </Row>
      <Divider />
      <Row>
        <Switch>
          <Route exact path={url}>
            <h1>Please select the recipe from the categories menu</h1>
          </Route>
          <Route path={`${url}/:category/:recipeId?`}>
          <RecipeList />
          </Route>
          <RecipeDetail />
        </Switch>
      </Row>
    </Layout>
  );
};

export default Recipes;
