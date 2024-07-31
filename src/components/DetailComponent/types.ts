export interface IngredientGroup {
  name: string;
  items: string[];
}

export interface Recipe {
  name: string;
  photoUrl: string;
  ingredients: (string | IngredientGroup)[];
  steps: string[];
  source: string;
}
