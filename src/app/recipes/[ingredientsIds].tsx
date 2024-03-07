import { useEffect, useState } from "react";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View, FlatList } from "react-native";
import { Recipe } from "@/components/Recipe";
import { Ingredients } from "@/components/Ingredients";
import { useLocalSearchParams } from "expo-router";
import { services } from "@/services";
export default function Recipes() {
  const [ingredients, setIngredients] = useState<ingredientResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])
  const params = useLocalSearchParams<{ ingredientsIds: string}>()
  const ingredientsIds = params.ingredientsIds.split(",")
  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients)
  },[])

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes)
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons 
          name="arrow-back"
          size={32} 
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Ingredientes</Text>
      </View>
      <Ingredients ingredients={ingredients}/>
      <FlatList 
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Recipe  recipe={item} onPress={() => router.
        navigate("/recipe/" + item.id)}/>}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16}}
        numColumns={2}
      />
    </View>
  )
}