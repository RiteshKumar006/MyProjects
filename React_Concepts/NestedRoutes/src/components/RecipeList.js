import React, { useState, useEffect } from "react";
import { Layout, Col, Typography } from "antd";
import { getRecipes } from "../api";
import RecipeCard from "./RecipeCard";
import { Link,useParams } from "react-router-dom";
import RecipeDetail from "./RecipeDetail";

const { Title } = Typography;
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { category, recipeId } = useParams();

  useEffect(() => {
    getRecipes(category).then((data) => setRecipes(data));
  }, [category]);
  return (
    <Layout>
      <Title level={3}>{category.toUpperCase()} RECIPES</Title>
      <Col span={24} align="center">
        {!recipeId && recipes && recipes.map((recipe) => 
        (<Link to={`${category}/${recipe.id}`} key={recipe.id}>
        <RecipeCard recipe={recipe} />
        </Link>))}
        {recipeId && <RecipeDetail id={recipeId} />}
      </Col>
    </Layout>
  );
};

export default RecipeList;
