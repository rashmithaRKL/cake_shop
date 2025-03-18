
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'birthday' | 'wedding' | 'custom' | 'party' | 'tools';
  featured?: boolean;
  bestSeller?: boolean;
  stock: number;
  dimensions?: string;
  weight?: string;
  ingredients?: string[];
  allergens?: string[];
  tags?: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Blush Wedding Cake',
    description: 'A sophisticated three-tier wedding cake with delicate sugar flowers and a subtle blush ombré effect. Perfect for elegant ceremonies.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474d7f5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'wedding',
    featured: true,
    stock: 10,
    dimensions: '12" x 10" x 8"',
    weight: '5kg',
    ingredients: ['Vanilla sponge', 'Buttercream', 'Fondant', 'Sugar flowers'],
    allergens: ['Dairy', 'Eggs', 'Wheat'],
    tags: ['wedding', 'elegant', 'premium']
  },
  {
    id: '2',
    name: 'Chocolate Birthday Delight',
    description: 'Rich chocolate cake with ganache filling and chocolate buttercream frosting. Decorated with chocolate drips and premium chocolate pieces.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1568827999250-11f3a388e483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'birthday',
    bestSeller: true,
    stock: 15,
    dimensions: '8" round',
    weight: '2kg',
    ingredients: ['Chocolate sponge', 'Chocolate ganache', 'Chocolate buttercream'],
    allergens: ['Dairy', 'Eggs', 'Wheat'],
    tags: ['birthday', 'chocolate', 'rich']
  },
  {
    id: '3',
    name: 'Pastel Rainbow Celebration Cake',
    description: 'Colorful layered cake with pastel-colored buttercream. Perfect for birthdays and special celebrations.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1557979619-445218f326b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'birthday',
    featured: true,
    stock: 8,
    dimensions: '6" round',
    weight: '1.5kg',
    ingredients: ['Vanilla sponge', 'Buttercream', 'Food coloring'],
    allergens: ['Dairy', 'Eggs', 'Wheat'],
    tags: ['birthday', 'colorful', 'celebration']
  },
  {
    id: '4',
    name: 'Rustic Naked Wedding Cake',
    description: 'Elegant naked cake with fresh berries and flowers. Perfect for rustic and outdoor weddings.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'wedding',
    stock: 5,
    dimensions: '10" x 8" x 6"',
    weight: '4kg',
    ingredients: ['Vanilla sponge', 'Buttercream', 'Fresh berries', 'Edible flowers'],
    allergens: ['Dairy', 'Eggs', 'Wheat'],
    tags: ['wedding', 'rustic', 'natural']
  },
  {
    id: '5',
    name: 'Custom Portrait Cake',
    description: 'Personalized cake with hand-painted portrait. A unique gift for birthdays, anniversaries, or any special occasion.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'custom',
    stock: 20,
    dimensions: 'Custom',
    ingredients: ['Choice of sponge', 'Buttercream', 'Fondant', 'Edible ink'],
    allergens: ['Varies based on selection'],
    tags: ['custom', 'portrait', 'personalized']
  },
  {
    id: '6',
    name: 'Metallic Gold Cake Topper',
    description: 'Elegant gold-plated cake topper. Available in various designs and customizable text.',
    price: 25,
    image: 'https://images.unsplash.com/photo-1559003229-7f3a37193884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'tools',
    stock: 50,
    dimensions: '6" width',
    tags: ['topper', 'gold', 'accessory']
  },
  {
    id: '7',
    name: 'Festive Balloon Bouquet',
    description: 'Colorful balloon arrangement for parties and celebrations. Includes 15 premium balloons in your chosen colors.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'party',
    stock: 100,
    tags: ['balloons', 'party', 'decoration']
  },
  {
    id: '8',
    name: 'Professional Piping Set',
    description: 'Complete set of professional piping tips and bags for cake decorating.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1541119304694-387204bc1d85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'tools',
    bestSeller: true,
    stock: 30,
    tags: ['tools', 'baking', 'decorating']
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: string, limit: number = 4): Product[] => {
  const product = getProductById(id);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== id && p.category === product.category)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerQuery) || 
      product.description.toLowerCase().includes(lowerQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
};
