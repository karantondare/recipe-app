import React from "react";
import { Platform, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Colors from "../constants/colors";
import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CategoryMealsScreen } from "../screens/CategoryMealsScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { MealDetailsScreen } from "../screens/MealDetailScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { FiltersScreen } from "../screens/FiltersScreen";

const defaultStackNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerTintColor:
      Platform.OS === "android" ? Colors.white : Colors.primaryColor,
  },
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: {
      screen: MealDetailsScreen,
    },
  },
  defaultStackNavOptions
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailsScreen,
  },
  defaultStackNavOptions
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarLabel: "All Recipes",
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons
            name="restaurant-menu"
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.primaryColor,
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons name="favorite" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.secondaryColor,
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: "white",
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: Colors.accentColor,
        },
      });

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.secondaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        marginTop: StatusBar.currentHeight,
      },
    },
  }
);

export default createAppContainer(MainNavigator);
