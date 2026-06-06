export type Difficulty = '简单' | '中等' | '困难' | '专家级' | '入门';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface Step {
  title: string;
  description: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  difficulty: Difficulty;
  servings: string;
  category: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: Step[];
  rating: number;
  isFavorite?: boolean;
  favoriteAddedAt?: number;
  isOwner?: boolean;
}

export type Page = 'home' | 'discover' | 'favorites' | 'profile' | 'recipe-detail' | 'create' | 'create-step-2' | 'create-step-3' | 'search' | 'history' | 'my-works' | 'settings' | 'help' | 'tools' | 'offline' | 'feedback';
