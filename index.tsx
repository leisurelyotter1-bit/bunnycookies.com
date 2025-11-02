import React, { useState, useEffect } from 'react';
import { Heart, Search, Plus, X, Star } from 'lucide-react';

const BunnyCookieRecipes = () => {
  const initialRecipes = [
    {
      id: 1,
      name: "Persian Saffron Raisin Cookies",
      description: "Golden, aromatic cookies with exotic saffron and sweet raisins",
      ingredients: ["2 cups flour", "1/2 tsp saffron threads", "1 cup raisins", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"],
      instructions: "Steep saffron in warm water. Cream butter and sugar, add egg and saffron water. Mix in dry ingredients and raisins. Chill 30 min. Bake at 350°F for 12-15 min.",
      difficulty: "Easy",
      time: "45 min",
      favorite: false
    },
    {
      id: 2,
      name: "Lavender Honey Cookies",
      description: "Delicate butter cookies infused with lavender and honey",
      ingredients: ["2 cups flour", "2 tbsp dried lavender", "1/2 cup honey", "1/2 cup butter", "1 egg", "1/2 tsp vanilla"],
      instructions: "Grind lavender finely. Cream butter and honey, add egg. Mix in flour and lavender. Roll into balls, flatten slightly. Bake at 325°F for 10-12 min.",
      difficulty: "Easy",
      time: "30 min",
      favorite: false
    },
    {
      id: 3,
      name: "Cardamom Orange Shortbread",
      description: "Buttery shortbread with warm cardamom and bright orange",
      ingredients: ["2 cups flour", "1 tsp cardamom", "1 tbsp orange zest", "1 cup butter", "1/2 cup sugar", "1/4 tsp salt"],
      instructions: "Mix flour, cardamom, salt. Cream butter and sugar, add zest. Fold in flour mixture. Roll out, cut shapes. Bake at 325°F for 15-18 min.",
      difficulty: "Easy",
      time: "35 min",
      favorite: false
    },
    {
      id: 4,
      name: "Rose Water Pistachio Cookies",
      description: "Middle Eastern inspired cookies with pistachios and rose",
      ingredients: ["2 cups flour", "1 cup pistachios (chopped)", "1 tbsp rose water", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"],
      instructions: "Cream butter and sugar, add egg and rose water. Mix in flour, cardamom, and pistachios. Form balls, press gently. Bake at 350°F for 12-14 min.",
      difficulty: "Medium",
      time: "40 min",
      favorite: false
    },
    {
      id: 5,
      name: "Black Sesame Cookies",
      description: "Nutty, toasty cookies with exotic black sesame flavor",
      ingredients: ["1.5 cups flour", "1/2 cup black sesame seeds", "1/2 cup butter", "3/4 cup sugar", "1 egg", "2 tbsp honey", "1/2 tsp salt"],
      instructions: "Toast sesame seeds. Cream butter, sugar, and honey. Add egg. Mix in flour, salt, and sesame. Chill 1 hour. Roll and slice. Bake at 350°F for 10-12 min.",
      difficulty: "Medium",
      time: "1 hr 20 min",
      favorite: false
    },
    {
      id: 6,
      name: "Matcha White Chocolate Cookies",
      description: "Japanese green tea cookies with creamy white chocolate",
      ingredients: ["2 cups flour", "2 tbsp matcha powder", "1 cup white chocolate chips", "1/2 cup butter", "3/4 cup sugar", "1 egg", "1 tsp vanilla"],
      instructions: "Sift flour and matcha together. Cream butter and sugar, add egg and vanilla. Fold in flour mixture and chocolate chips. Bake at 350°F for 11-13 min.",
      difficulty: "Easy",
      time: "35 min",
      favorite: false
    }
  ];

  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    difficulty: 'Easy',
    time: ''
  });

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || recipe.favorite;
    return matchesSearch && matchesFavorite;
  });

  const toggleFavorite = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
    setSelectedRecipe(null);
  };

  const addRecipe = () => {
    if (!newRecipe.name || !newRecipe.description) return;
    
    const recipe = {
      id: Date.now(),
      name: newRecipe.name,
      description: newRecipe.description,
      ingredients: newRecipe.ingredients.split('\n').filter(i => i.trim()),
      instructions: newRecipe.instructions,
      difficulty: newRecipe.difficulty,
      time: newRecipe.time,
      favorite: false
    };
    
    setRecipes([...recipes, recipe]);
    setShowAddForm(false);
    setNewRecipe({
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      difficulty: 'Easy',
      time: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 p-4 md:p-8">
      {/* Header with bunny */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border-4 border-pink-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                (๑ᵔ⌔ᵔ๑)
              </div>
              <div>
                <h1 className="text-3xl font-bold text-pink-600">Bunny's Cookie Collection</h1>
                <p className="text-pink-400 text-sm">～ exotic treats from around the world ～</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`p-3 rounded-2xl transition-all ${
                  showFavoritesOnly 
                    ? 'bg-pink-400 text-white' 
                    : 'bg-pink-100 text-pink-600'
                }`}
              >
                <Star className={showFavoritesOnly ? 'fill-current' : ''} size={20} />
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-2xl hover:shadow-lg transition-all"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="bg-white rounded-3xl shadow-lg p-4 mb-6 border-4 border-pink-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300" size={20} />
            <input
              type="text"
              placeholder="search for cookies... ₍ᐢ._.ᐢ₎"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-pink-800"
            />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white rounded-3xl p-5 border-3 border-pink-200 hover:border-pink-400 cursor-pointer transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-pink-600 text-lg mb-1">{recipe.name}</h3>
                  <p className="text-pink-400 text-sm">{recipe.description}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                  className="ml-2 text-pink-300 hover:text-pink-500 transition-colors"
                >
                  <Heart className={recipe.favorite ? 'fill-current text-pink-500' : ''} size={20} />
                </button>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                  {recipe.difficulty}
                </span>
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full">
                  ⏰ {recipe.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredRecipes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-4 border-pink-200">
            <div className="text-6xl mb-4">(๑•́ ₃ •̀๑)</div>
            <p className="text-pink-400">no cookies found... try a different search!</p>
          </div>
        )}

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRecipe(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-pink-600 mb-2">{selectedRecipe.name}</h2>
                  <p className="text-pink-400">{selectedRecipe.description}</p>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="text-pink-400 hover:text-pink-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-2 mb-6">
                <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm">
                  {selectedRecipe.difficulty}
                </span>
                <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">
                  ⏰ {selectedRecipe.time}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-pink-600 mb-3 text-lg flex items-center gap-2">
                  <span>🥣</span> Ingredients
                </h3>
                <ul className="space-y-2 bg-pink-50 p-4 rounded-2xl">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-pink-700 flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-pink-600 mb-3 text-lg flex items-center gap-2">
                  <span>📝</span> Instructions
                </h3>
                <p className="text-pink-700 bg-pink-50 p-4 rounded-2xl leading-relaxed">
                  {selectedRecipe.instructions}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedRecipe.id);
                  }}
                  className={`flex-1 py-3 rounded-2xl font-medium transition-all ${
                    selectedRecipe.favorite
                      ? 'bg-pink-500 text-white'
                      : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                  }`}
                >
                  <Heart className={`inline mr-2 ${selectedRecipe.favorite ? 'fill-current' : ''}`} size={18} />
                  {selectedRecipe.favorite ? 'Favorited!' : 'Add to Favorites'}
                </button>
                <button
                  onClick={() => deleteRecipe(selectedRecipe.id)}
                  className="px-6 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Recipe Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddForm(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-pink-600">Add New Cookie Recipe ₍ᐢ._.ᐢ₎</h2>
                <button onClick={() => setShowAddForm(false)} className="text-pink-400 hover:text-pink-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-pink-600 font-medium mb-2">Cookie Name</label>
                  <input
                    type="text"
                    value={newRecipe.name}
                    onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
                    className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                    placeholder="e.g., Matcha White Chocolate Cookies"
                  />
                </div>

                <div>
                  <label className="block text-pink-600 font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
                    className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                    placeholder="A brief description of your cookie..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-pink-600 font-medium mb-2">Difficulty</label>
                    <select
                      value={newRecipe.difficulty}
                      onChange={(e) => setNewRecipe({...newRecipe, difficulty: e.target.value})}
                      className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-pink-600 font-medium mb-2">Time</label>
                    <input
                      type="text"
                      value={newRecipe.time}
                      onChange={(e) => setNewRecipe({...newRecipe, time: e.target.value})}
                      className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                      placeholder="e.g., 45 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-pink-600 font-medium mb-2">Ingredients (one per line)</label>
                  <textarea
                    value={newRecipe.ingredients}
                    onChange={(e) => setNewRecipe({...newRecipe, ingredients: e.target.value})}
                    className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32"
                    placeholder="2 cups flour&#10;1 cup sugar&#10;1/2 cup butter"
                  />
                </div>

                <div>
                  <label className="block text-pink-600 font-medium mb-2">Instructions</label>
                  <textarea
                    value={newRecipe.instructions}
                    onChange={(e) => setNewRecipe({...newRecipe, instructions: e.target.value})}
                    className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32"
                    placeholder="Step by step instructions..."
                  />
                </div>

                <button
                  onClick={addRecipe}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold hover:shadow-lg transition-all"
                >
                  Add Cookie Recipe ♡
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative bunnies */}
      <div className="fixed bottom-4 right-4 text-4xl opacity-50 pointer-events-none">
        ₍ᐢ._.ᐢ₎
      </div>
    </div>
  );
};

export default BunnyCookieRecipes;