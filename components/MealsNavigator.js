import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { CategoriesScreen } from "../screens/CategoriesScreen";
import { CategoryMealsScreen } from "../screens/CategoryMealsScreen";
import { MealDetailsScreen } from "../screens/MealDetailScreen";

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoryMeals: { screen: CategoryMealsScreen },
  MealDetail: MealDetailsScreen,
});

export default createAppContainer(MealsNavigator);

// Also add this import in the file where you are using createStackNavigator:

// import { createStackNavigator } from 'react-navigation-stack';
// Same for TabsNavigator (used a little bit later in this module):

// npm install --save react-navigation-tabs
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// And also for DrawerNavigator (also used later in this module):

// npm install --save react-navigation-drawer
// import { createDrawerNavigator } from 'react-navigation-drawer';
