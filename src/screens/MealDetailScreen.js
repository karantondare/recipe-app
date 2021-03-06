import React, { useCallback, useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import { DefaultText } from "../components/DefaultText";
import { CustomHeaderButton } from "../components/HeaderButton";
import Colors from "../constants/colors";
import { toogleFavorite } from "../store/actions/mealsAction";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

export const MealDetailsScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const dispatch = useDispatch();

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toogleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}MIN</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient, index) => (
        <ListItem key={ingredient} style={styles.ingredients}>
          {index + 1}. {ingredient}
        </ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step} style={styles.steps}>
          {step}
        </ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "heart-sharp" : "heart-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
    marginTop: 10,
    color: Colors.secondaryColor,
  },
  listItem: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderColor: "#ccc",
    padding: 10,
    borderBottomWidth: 1,
  },
});
