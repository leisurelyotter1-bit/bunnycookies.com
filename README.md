<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bunny's Cookie Collection</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .recipe-card {
            transition: all 0.3s ease;
        }
        .recipe-card:hover {
            transform: translateY(-4px);
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 50;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .modal.active {
            display: flex;
        }
        .heart-filled {
            fill: #ec4899;
        }
        .tab-active {
            background: linear-gradient(to right, #f472b6, #fb7185);
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .tab-inactive {
            color: #db2777;
        }
        .tab-inactive:hover {
            background: #fce7f3;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-3xl shadow-lg p-6 mb-6 border-4 border-pink-300">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-4">
                    <div class="text-5xl">(๑ᵔ⌔ᵔ๑)</div>
                    <div>
                        <h1 class="text-3xl font-bold text-pink-600">Bunny's Cookie Collection</h1>
                        <p class="text-pink-400 text-sm">～ exotic treats from around the world ～</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="toggleFavorites()" id="favBtn" class="p-3 rounded-2xl transition-all bg-pink-100 text-pink-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </button>
                    <button onclick="showAddModal()" class="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-2xl hover:shadow-lg transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- View Toggle -->
        <div class="bg-white rounded-3xl shadow-lg p-2 mb-6 border-4 border-pink-200 flex gap-2">
            <button id="myTab" onclick="switchView('my')" class="flex-1 py-3 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 tab-active">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                My Recipes
            </button>
            <button id="sharedTab" onclick="switchView('shared')" class="flex-1 py-3 px-6 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 tab-inactive">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Community Recipes
            </button>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-3xl shadow-lg p-4 mb-6 border-4 border-pink-200">
            <div class="relative">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" id="searchInput" placeholder="search for cookies... ₍ᐢ._.ᐢ₎" 
                    class="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-pink-800"
                    oninput="filterRecipes()">
            </div>
        </div>

        <!-- Loading -->
        <div id="loading" class="bg-white rounded-3xl p-12 text-center border-4 border-pink-200 mb-6" style="display: none;">
            <div class="text-6xl mb-4">(๑ᵔ⌔ᵔ๑)</div>
            <p class="text-pink-400">loading delicious recipes...</p>
        </div>

        <!-- Recipe Grid -->
        <div id="recipeGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"></div>

        <!-- No Results -->
        <div id="noResults" class="bg-white rounded-3xl p-12 text-center border-4 border-pink-200" style="display: none;">
            <div class="text-6xl mb-4">(๑•́ ₃ •̀๑)</div>
            <p class="text-pink-400" id="noResultsText">no cookies found... try a different search!</p>
        </div>

        <!-- Recipe Detail Modal -->
        <div id="detailModal" class="modal">
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onclick="event.stopPropagation()">
                <div id="modalContent"></div>
            </div>
        </div>

        <!-- Add Recipe Modal -->
        <div id="addModal" class="modal">
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-pink-600">Add New Cookie Recipe ₍ᐢ._.ᐢ₎</h2>
                    <button onclick="hideAddModal()" class="text-pink-400 hover:text-pink-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Cookie Name</label>
                        <input type="text" id="newName" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="e.g., Matcha White Chocolate Cookies">
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Description</label>
                        <input type="text" id="newDesc" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="A brief description...">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-pink-600 font-medium mb-2">Difficulty</label>
                            <select id="newDiff" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-pink-600 font-medium mb-2">Time</label>
                            <input type="text" id="newTime" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="e.g., 45 min">
                        </div>
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Ingredients (one per line)</label>
                        <textarea id="newIngredients" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32" placeholder="2 cups flour&#10;1 cup sugar&#10;1/2 cup butter"></textarea>
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Instructions</label>
                        <textarea id="newInstructions" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32" placeholder="Step by step instructions..."></textarea>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="shareCheck" class="w-5 h-5 rounded text-pink-500 focus:ring-pink-400">
                            <div class="flex-1">
                                <div class="flex items-center gap-2 font-medium text-pink-600">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Share with Community
                                </div>
                                <p class="text-sm text-pink-400 mt-1">
                                    Let other bunnies see and bake your recipe! You can change this later.
                                </p>
                            </div>
                        </label>
                    </div>
                    <button onclick="addRecipe()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold hover:shadow-lg transition-all">
                        Add Cookie Recipe ♡
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Decorative bunny -->
    <div class="fixed bottom-4 right-4 text-4xl opacity-50 pointer-events-none">
        ₍ᐢ._.ᐢ₎
    </div>

    <script>
        const initialRecipes = [
            {
                id: 1,
                name: "Persian Saffron Raisin Cookies",
                description: "Golden, aromatic cookies with exotic saffron and sweet raisins",
                ingredients: ["2 cups flour", "1/2 tsp saffron threads", "1 cup raisins", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"],
                instructions: "Steep saffron in warm water. Cream butter and sugar, add egg and saffron water. Mix in dry ingredients and raisins. Chill 30 min. Bake at 350°F for 12-15 min.",
                difficulty: "Easy",
                time: "45 min",
                favorite: false,
                isShared: false,
                isDefault: true
            },
            {
                id: 2,
                name: "Lavender Honey Cookies",
                description: "Delicate butter cookies infused with lavender and honey",
                ingredients: ["2 cups flour", "2 tbsp dried lavender", "1/2 cup honey", "1/2 cup butter", "1 egg", "1/2 tsp vanilla"],
                instructions: "Grind lavender finely. Cream butter and honey, add egg. Mix in flour and lavender. Roll into balls, flatten slightly. Bake at 325°F for 10-12 min.",
                difficulty: "Easy",
                time: "30 min",
                favorite: false,
                isShared: false,
                isDefault: true
            },
            {
                id: 3,
                name: "Cardamom Orange Shortbread",
                description: "Buttery shortbread with warm cardamom and bright orange",
                ingredients: ["2 cups flour", "1 tsp cardamom", "1 tbsp orange zest", "1 cup butter", "1/2 cup sugar", "1/4 tsp salt"],
                instructions: "Mix flour, cardamom, salt. Cream butter and sugar, add zest. Fold in flour mixture. Roll out, cut shapes. Bake at 325°F for 15-18 min.",
                difficulty: "Easy",
                time: "35 min",
                favorite: false,
                isShared: false,
                isDefault: true
            },
            {
                id: 4,
                name: "Rose Water Pistachio Cookies",
                description: "Middle Eastern inspired cookies with pistachios and rose",
                ingredients: ["2 cups flour", "1 cup pistachios (chopped)", "1 tbsp rose water", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"],
                instructions: "Cream butter and sugar, add egg and rose water. Mix in flour, cardamom, and pistachios. Form balls, press gently. Bake at 350°F for 12-14 min.",
                difficulty: "Medium",
                time: "40 min",
                favorite: false,
                isShared: false,
                isDefault: true
            },
            {
                id: 5,
                name: "Black Sesame Cookies",
                description: "Nutty, toasty cookies with exotic black sesame flavor",
                ingredients: ["1.5 cups flour", "1/2 cup black sesame seeds", "1/2 cup butter", "3/4 cup sugar", "1 egg", "2 tbsp honey", "1/2 tsp salt"],
                instructions: "Toast sesame seeds. Cream butter, sugar, and honey. Add egg. Mix in flour, salt, and sesame. Chill 1 hour. Roll and slice. Bake at 350°F for 10-12 min.",
                difficulty: "Medium",
                time: "1 hr 20 min",
                favorite: false,
                isShared: false,
                isDefault: true
            },
            {
                id: 6,
                name: "Matcha White Chocolate Cookies",
                description: "Japanese green tea cookies with creamy white chocolate",
                ingredients: ["2 cups flour", "2 tbsp matcha powder", "1 cup white chocolate chips", "1/2 cup butter", "3/4 cup sugar", "1 egg", "1 tsp vanilla"],
                instructions: "Sift flour and matcha together. Cream butter and sugar, add egg and vanilla. Fold in flour mixture and chocolate chips. Bake at 350°F for 11-13 min.",
                difficulty: "Easy",
                time: "35 min",
                favorite: false,
                isShared: false,
                isDefault: true
            }
        ];

        let myRecipes = [...initialRecipes];
        let sharedRecipes = [];
        let currentView = 'my';
        let showFavoritesOnly = false;

        function saveMyRecipes() {
            localStorage.setItem('myRecipes', JSON.stringify(myRecipes));
        }

        function loadMyRecipes() {
            const saved = localStorage.getItem('myRecipes');
            if (saved) {
                myRecipes = JSON.parse(saved);
            }
        }

        function switchView(view) {
            currentView = view;
            const myTab = document.getElementById('myTab');
            const sharedTab = document.getElementById('sharedTab');
            
            if (view === 'my') {
                myTab.classList.add('tab-active');
                myTab.classList.remove('tab-inactive');
                sharedTab.classList.remove('tab-active');
                sharedTab.classList.add('tab-inactive');
            } else {
                sharedTab.classList.add('tab-active');
                sharedTab.classList.remove('tab-inactive');
                myTab.classList.remove('tab-active');
                myTab.classList.add('tab-inactive');
                loadSharedRecipes();
            }
            
            renderRecipes();
        }

        async function loadSharedRecipes() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('recipeGrid').style.display = 'none';
            
            sharedRecipes = [];
            
            // Simulate loading (since we can't actually store shared recipes in plain HTML)
            setTimeout(() => {
                // In a real app, this would fetch from a database
                // For now, we'll show recipes that users have marked as shared from localStorage
                const allUsers = getAllSharedRecipes();
                sharedRecipes = allUsers;
                
                document.getElementById('loading').style.display = 'none';
                renderRecipes();
            }, 500);
        }

        function getAllSharedRecipes() {
            // Get shared recipes from localStorage (simulating a shared database)
            const shared = localStorage.getItem('sharedRecipes');
            return shared ? JSON.parse(shared) : [];
        }

        function saveSharedRecipes() {
            localStorage.setItem('sharedRecipes', JSON.stringify(sharedRecipes));
        }

        function renderRecipes() {
            const grid = document.getElementById('recipeGrid');
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            const recipes = currentView === 'my' ? myRecipes : sharedRecipes;
            
            const filtered = recipes.filter(recipe => {
                const matchesSearch = recipe.name.toLowerCase().includes(searchQuery) ||
                                    recipe.description.toLowerCase().includes(searchQuery);
                const matchesFavorite = !showFavoritesOnly || recipe.favorite;
                return matchesSearch && matchesFavorite;
            });

            if (filtered.length === 0) {
                grid.style.display = 'none';
                document.getElementById('noResults').style.display = 'block';
                document.getElementById('noResultsText').textContent = 
                    currentView === 'shared' 
                        ? 'no community recipes yet... be the first to share!' 
                        : 'no cookies found... try a different search!';
                return;
            }

            grid.style.display = 'grid';
            document.getElementById('noResults').style.display = 'none';

            grid.innerHTML = filtered.map(recipe => `
                <div class="recipe-card bg-white rounded-3xl p-5 border-3 border-pink-200 hover:border-pink-400 cursor-pointer transition-all hover:shadow-xl" onclick="showDetail(${recipe.id})">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <h3 class="font-bold text-pink-600 text-lg">${recipe.name}</h3>
                                ${recipe.isShared && currentView === 'my' ? `
                                    <svg class="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ` : ''}
                            </div>
                            <p class="text-pink-400 text-sm">${recipe.description}</p>
                        </div>
                        ${currentView === 'my' ? `
                            <button onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" class="ml-2 text-pink-300 hover:text-pink-500 transition-colors">
                                <svg class="w-5 h-5 ${recipe.favorite ? 'heart-filled' : ''}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                    <div class="flex gap-2 text-xs">
                        <span class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">${recipe.difficulty}</span>
                        <span class="bg-rose-100 text-rose-600 px-3 py-1 rounded-full">⏰ ${recipe.time}</span>
                    </div>
                </div>
            `).join('');
        }

        function showDetail(id) {
            const recipes = currentView === 'my' ? myRecipes : sharedRecipes;
            const recipe = recipes.find(r => r.id === id);
            if (!recipe) return;

            const modal = document.getElementById('detailModal');
            const content = document.getElementById('modalContent');

            const shareButton = currentView === 'my' && !recipe.isDefault ? `
                <button onclick="toggleRecipeSharing(${recipe.id})" class="w-full py-3 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 mb-3 ${
                    recipe.isShared
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${recipe.isShared ? `
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        ` : `
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        `}
                    </svg>
                    ${recipe.isShared ? 'Make Private' : 'Share with Community'}
                </button>
            ` : '';

            content.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <h2 class="text-3xl font-bold text-pink-600">${recipe.name}</h2>
                            ${recipe.isShared && currentView === 'my' ? `
                                <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ` : ''}
                        </div>
                        <p class="text-pink-400">${recipe.description}</p>
                    </div>
                    <button onclick="hideDetail()" class="text-pink-400 hover:text-pink-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>      difficulty: "Medium",
      time: "40 min",
      favorite: false,
      shared: false,
      author: "Bunny's Collection"
    },
    {
      id: 5,
      name: "Black Sesame Cookies",
      description: "Nutty, toasty cookies with exotic black sesame flavor",
      ingredients: ["1.5 cups flour", "1/2 cup black sesame seeds", "1/2 cup butter", "3/4 cup sugar", "1 egg", "2 tbsp honey", "1/2 tsp salt"],
      instructions: "Toast sesame seeds. Cream butter, sugar, and honey. Add egg. Mix in flour, salt, and sesame. Chill 1 hour. Roll and slice. Bake at 350°F for 10-12 min.",
      difficulty: "Medium",
      time: "1 hr 20 min",
      favorite: false,
      shared: false,
      author: "Bunny's Collection"
    },
    {
      id: 6,
      name: "Matcha White Chocolate Cookies",
      description: "Japanese green tea cookies with creamy white chocolate",
      ingredients: ["2 cups flour", "2 tbsp matcha powder", "1 cup white chocolate chips", "1/2 cup butter", "3/4 cup sugar", "1 egg", "1 tsp vanilla"],
      instructions: "Sift flour and matcha together. Cream butter and sugar, add egg and vanilla. Fold in flour mixture and chocolate chips. Bake at 350°F for 11-13 min.",
      difficulty: "Easy",
      time: "35 min",
      favorite: false,
      shared: false,
      author: "Bunny's Collection"
    }
  ];

  const [myRecipes, setMyRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState('my'); // 'my' or 'community'
  const [username, setUsername] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    ingredients: '',
    instructions: '',
    difficulty: 'Easy',
    time: '',
    shared: false
  });

  useEffect(() => {
    loadUsername();
    loadMyRecipes();
    loadSharedRecipes();
  }, []);

  const loadUsername = () => {
    const saved = localStorage.getItem('bunnyUsername');
    if (!saved) {
      setShowUsernameModal(true);
    } else {
      setUsername(saved);
    }
  };

  const saveUsername = (name) => {
    const trimmed = name.trim();
    if (trimmed) {
      localStorage.setItem('bunnyUsername', trimmed);
      setUsername(trimmed);
      setShowUsernameModal(false);
    }
  };

  const loadMyRecipes = () => {
    const saved = localStorage.getItem('bunnyMyRecipes');
    if (saved) {
      setMyRecipes(JSON.parse(saved));
    } else {
      setMyRecipes(initialRecipes);
      localStorage.setItem('bunnyMyRecipes', JSON.stringify(initialRecipes));
    }
  };

  const saveMyRecipes = (recipes) => {
    localStorage.setItem('bunnyMyRecipes', JSON.stringify(recipes));
    setMyRecipes(recipes);
  };

  const loadSharedRecipes = async () => {
    try {
      setIsLoading(true);
      const result = await window.storage.list('recipe:', true);
      if (result && result.keys) {
        const recipes = [];
        for (const key of result.keys) {
          try {
            const data = await window.storage.get(key, true);
            if (data && data.value) {
              recipes.push(JSON.parse(data.value));
            }
          } catch (e) {
            console.log('Could not load recipe:', key);
          }
        }
        setSharedRecipes(recipes);
      }
    } catch (error) {
      console.log('Loading shared recipes...');
      setSharedRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const shareRecipe = async (recipe) => {
    try {
      const sharedRecipe = {
        ...recipe,
        id: `shared_${Date.now()}_${Math.random()}`,
        author: username || 'Anonymous Baker',
        sharedAt: new Date().toISOString()
      };
      
      await window.storage.set(`recipe:${sharedRecipe.id}`, JSON.stringify(sharedRecipe), true);
      await loadSharedRecipes();
      alert('Recipe shared with the community! ♡');
    } catch (error) {
      alert('Could not share recipe. Please try again!');
    }
  };

  const getCurrentRecipes = () => {
    return viewMode === 'my' ? myRecipes : sharedRecipes;
  };

  const filteredRecipes = getCurrentRecipes().filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || recipe.favorite;
    return matchesSearch && matchesFavorite;
  });

  const toggleFavorite = (id) => {
    if (viewMode === 'my') {
      const updated = myRecipes.map(recipe => 
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      );
      saveMyRecipes(updated);
    }
  };

  const deleteRecipe = (id) => {
    if (viewMode === 'my') {
      const updated = myRecipes.filter(recipe => recipe.id !== id);
      saveMyRecipes(updated);
      setSelectedRecipe(null);
    }
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
      favorite: false,
      author: username || 'Anonymous Baker'
    };
    
    const updated = [...myRecipes, recipe];
    saveMyRecipes(updated);

    if (newRecipe.shared) {
      shareRecipe(recipe);
    }
    
    setShowAddForm(false);
    setNewRecipe({
      name: '',
      description: '',
      ingredients: '',
      instructions: '',
      difficulty: 'Easy',
      time: '',
      shared: false
    });
  };

  const copyToCommunity = async (recipe) => {
    await shareRecipe(recipe);
  };

  const copyToMyRecipes = (recipe) => {
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      favorite: false,
      author: `From ${recipe.author}`
    };
    const updated = [...myRecipes, newRecipe];
    saveMyRecipes(updated);
    alert('Recipe copied to your collection! ♡');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border-4 border-pink-300">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">(๑ᵔ⌔ᵔ๑)</div>
              <div>
                <h1 className="text-3xl font-bold text-pink-600">Bunny's Cookie Collection</h1>
                <p className="text-pink-400 text-sm">～ exotic treats from around the world ～</p>
                {username && <p className="text-pink-300 text-xs mt-1">Baker: {username}</p>}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowUsernameModal(true)}
                className="p-3 rounded-2xl transition-all bg-purple-100 text-purple-600 hover:bg-purple-200"
                title="Change username"
              >
                <Users size={20} />
              </button>
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

        {/* View Mode Toggle */}
        <div className="bg-white rounded-3xl shadow-lg p-2 mb-6 border-4 border-pink-200 flex gap-2">
          <button
            onClick={() => setViewMode('my')}
            className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'my'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                : 'bg-transparent text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Lock size={18} />
            My Recipes ({myRecipes.length})
          </button>
          <button
            onClick={() => setViewMode('community')}
            className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 ${
              viewMode === 'community'
                ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white'
                : 'bg-transparent text-pink-600 hover:bg-pink-50'
            }`}
          >
            <Globe size={18} />
            Community Recipes ({sharedRecipes.length})
          </button>
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

        {/* Loading */}
        {isLoading && viewMode === 'community' && (
          <div className="bg-white rounded-3xl p-12 text-center border-4 border-pink-200 mb-6">
            <div className="text-6xl mb-4">₍ᐢ._.ᐢ₎</div>
            <p className="text-pink-400">loading community recipes...</p>
          </div>
        )}

        {/* Recipe Grid */}
        {!isLoading && (
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
                    <p className="text-pink-400 text-sm mb-1">{recipe.description}</p>
                    <p className="text-pink-300 text-xs">by {recipe.author}</p>
                  </div>
                  {viewMode === 'my' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className="ml-2 text-pink-300 hover:text-pink-500 transition-colors"
                    >
                      <Heart className={recipe.favorite ? 'fill-current text-pink-500' : ''} size={20} />
                    </button>
                  )}
                </div>
                <div className="flex gap-2 text-xs flex-wrap">
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                    {recipe.difficulty}
                  </span>
                  <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full">
                    ⏰ {recipe.time}
                  </span>
                  {viewMode === 'community' && (
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full flex items-center gap-1">
                      <Globe size={12} />
                      Shared
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredRecipes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-4 border-pink-200">
            <div className="text-6xl mb-4">(๑•́ ₃ •̀๑)</div>
            <p className="text-pink-400">
              {viewMode === 'community' 
                ? 'no community recipes yet... be the first to share!' 
                : 'no cookies found... try a different search!'}
            </p>
          </div>
        )}

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRecipe(null)}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-pink-600 mb-2">{selectedRecipe.name}</h2>
                  <p className="text-pink-400 mb-1">{selectedRecipe.description}</p>
                  <p className="text-pink-300 text-sm">by {selectedRecipe.author}</p>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="text-pink-400 hover:text-pink-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm">
                  {selectedRecipe.difficulty}
                </span>
                <span className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">
                  ⏰ {selectedRecipe.time}
                </span>
                {viewMode === 'community' && (
                  <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm flex items-center gap-1">
                    <Globe size={14} />
                    Community Recipe
                  </span>
                )}
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

              <div className="flex gap-3 flex-wrap">
                {viewMode === 'my' ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(selectedRecipe.id);
                        setSelectedRecipe({...selectedRecipe, favorite: !selectedRecipe.favorite});
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
                      onClick={() => copyToCommunity(selectedRecipe)}
                      className="flex-1 py-3 rounded-2xl bg-purple-100 text-purple-600 hover:bg-purple-200 font-medium transition-all"
                    >
                      <Globe className="inline mr-2" size={18} />
                      Share with Community
                    </button>
                    <button
                      onClick={() => deleteRecipe(selectedRecipe.id)}
                      className="px-6 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 font-medium transition-all"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => copyToMyRecipes(selectedRecipe)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-medium hover:shadow-lg transition-all"
                  >
                    <Plus className="inline mr-2" size={18} />
                    Copy to My Recipes
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Username Modal */}
        {showUsernameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-pink-300">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">Welcome, Baker! ₍ᐢ._.ᐢ₎</h2>
              <p className="text-pink-400 mb-6">Choose a name so others can see who shared these yummy recipes!</p>
              <input
                type="text"
                placeholder="Enter your baker name..."
                defaultValue={username}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    saveUsername(e.target.value);
                  }
                }}
                className="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none mb-4"
                autoFocus
              />
              <button
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  saveUsername(input.value);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold hover:shadow-lg transition-all"
              >
                Start Baking! ♡
              </button>
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

                <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newRecipe.shared}
                      onChange={(e) => setNewRecipe({...newRecipe, shared: e.target.checked})}
                      className="w-5 h-5 rounded border-purple-300 text-purple-600 focus:ring-purple-400"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-purple-600 flex items-center gap-2">
                        <Globe size={16} />
                        Share with Community
                      </div>
                      <div className="text-xs text-purple-400 mt-1">
                        Let other bakers see and use your recipe! (You can also share it later)
                      </div>
                    </div>
                  </label>
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

      {/* Decorative bunny */}
      <div className="fixed bottom-4 right-4 text-4xl opacity-50 pointer-events-none">
        ₍ᐢ._.ᐢ₎
      </div>
    </div>
  );
};

export default BunnyCookieRecipes;        }
        .modal.active {
            display: flex;
        }
        .heart-filled {
            fill: #ec4899;
        }
    </style>
</head>
<body class="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-3xl shadow-lg p-6 mb-6 border-4 border-pink-300">
            <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-4">
                    <div class="text-5xl">(๑ᵔ⌔ᵔ๑)</div>
                    <div>
                        <h1 class="text-3xl font-bold text-pink-600">Bunny's Cookie Collection</h1>
                        <p class="text-pink-400 text-sm">～ exotic treats from around the world ～</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="toggleFavorites()" id="favBtn" class="p-3 rounded-2xl transition-all bg-pink-100 text-pink-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </button>
                    <button onclick="showAddModal()" class="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-2xl hover:shadow-lg transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-3xl shadow-lg p-4 mb-6 border-4 border-pink-200">
            <div class="relative">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" id="searchInput" placeholder="search for cookies... ₍ᐢ._.ᐢ₎" 
                    class="w-full pl-12 pr-4 py-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none text-pink-800"
                    oninput="filterRecipes()">
            </div>
        </div>

        <!-- Recipe Grid -->
        <div id="recipeGrid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"></div>

        <!-- No Results -->
        <div id="noResults" class="bg-white rounded-3xl p-12 text-center border-4 border-pink-200" style="display: none;">
            <div class="text-6xl mb-4">(๑•́ ₃ •̀๑)</div>
            <p class="text-pink-400">no cookies found... try a different search!</p>
        </div>

        <!-- Recipe Detail Modal -->
        <div id="detailModal" class="modal">
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onclick="event.stopPropagation()">
                <div id="modalContent"></div>
            </div>
        </div>

        <!-- Add Recipe Modal -->
        <div id="addModal" class="modal">
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onclick="event.stopPropagation()">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold text-pink-600">Add New Cookie Recipe ₍ᐢ._.ᐢ₎</h2>
                    <button onclick="hideAddModal()" class="text-pink-400 hover:text-pink-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Cookie Name</label>
                        <input type="text" id="newName" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="e.g., Matcha White Chocolate Cookies">
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Description</label>
                        <input type="text" id="newDesc" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="A brief description...">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-pink-600 font-medium mb-2">Difficulty</label>
                            <select id="newDiff" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-pink-600 font-medium mb-2">Time</label>
                            <input type="text" id="newTime" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none" placeholder="e.g., 45 min">
                        </div>
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Ingredients (one per line)</label>
                        <textarea id="newIngredients" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32" placeholder="2 cups flour&#10;1 cup sugar&#10;1/2 cup butter"></textarea>
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Instructions</label>
                        <textarea id="newInstructions" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32" placeholder="Step by step instructions..."></textarea>
                    </div>
                    <button onclick="addRecipe()" class="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold hover:shadow-lg transition-all">
                        Add Cookie Recipe ♡
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Decorative bunny -->
    <div class="fixed bottom-4 right-4 text-4xl opacity-50 pointer-events-none">
        ₍ᐢ._.ᐢ₎
    </div>

    <script>
        let recipes = [
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

        let showFavoritesOnly = false;

        function saveRecipes() {
            localStorage.setItem('bunnyRecipes', JSON.stringify(recipes));
        }

        function loadRecipes() {
            const saved = localStorage.getItem('bunnyRecipes');
            if (saved) {
                recipes = JSON.parse(saved);
            }
        }

        function renderRecipes() {
            const grid = document.getElementById('recipeGrid');
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            
            const filtered = recipes.filter(recipe => {
                const matchesSearch = recipe.name.toLowerCase().includes(searchQuery) ||
                                    recipe.description.toLowerCase().includes(searchQuery);
                const matchesFavorite = !showFavoritesOnly || recipe.favorite;
                return matchesSearch && matchesFavorite;
            });

            if (filtered.length === 0) {
                grid.style.display = 'none';
                document.getElementById('noResults').style.display = 'block';
                return;
            }

            grid.style.display = 'grid';
            document.getElementById('noResults').style.display = 'none';

            grid.innerHTML = filtered.map(recipe => `
                <div class="recipe-card bg-white rounded-3xl p-5 border-3 border-pink-200 hover:border-pink-400 cursor-pointer transition-all hover:shadow-xl" onclick="showDetail(${recipe.id})">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h3 class="font-bold text-pink-600 text-lg mb-1">${recipe.name}</h3>
                            <p class="text-pink-400 text-sm">${recipe.description}</p>
                        </div>
                        <button onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" class="ml-2 text-pink-300 hover:text-pink-500 transition-colors">
                            <svg class="w-5 h-5 ${recipe.favorite ? 'heart-filled' : ''}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex gap-2 text-xs">
                        <span class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">${recipe.difficulty}</span>
                        <span class="bg-rose-100 text-rose-600 px-3 py-1 rounded-full">⏰ ${recipe.time}</span>
                    </div>
                </div>
            `).join('');
        }

        function showDetail(id) {
            const recipe = recipes.find(r => r.id === id);
            if (!recipe) return;

            const modal = document.getElementById('detailModal');
            const content = document.getElementById('modalContent');

            content.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div class="flex-1">
                        <h2 class="text-3xl font-bold text-pink-600 mb-2">${recipe.name}</h2>
                        <p class="text-pink-400">${recipe.description}</p>
                    </div>
                    <button onclick="hideDetail()" class="text-pink-400 hover:text-pink-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex gap-2 mb-6">
                    <span class="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm">${recipe.difficulty}</span>
                    <span class="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">⏰ ${recipe.time}</span>
                </div>
                <div class="mb-6">
                    <h3 class="font-bold text-pink-600 mb-3 text-lg">🥣 Ingredients</h3>
                    <ul class="space-y-2 bg-pink-50 p-4 rounded-2xl">
                        ${recipe.ingredients.map(ing => `
                            <li class="text-pink-700 flex items-start gap-2">
                                <span class="text-pink-400">•</span>
                                <span>${ing}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="mb-6">
                    <h3 class="font-bold text-pink-600 mb-3 text-lg">📝 Instructions</h3>
                    <p class="text-pink-700 bg-pink-50 p-4 rounded-2xl leading-relaxed">${recipe.instructions}</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="toggleFavorite(${recipe.id}); showDetail(${recipe.id})" class="flex-1 py-3 rounded-2xl font-medium transition-all ${recipe.favorite ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'}">
                        <svg class="inline w-5 h-5 mr-2 ${recipe.favorite ? 'heart-filled' : ''}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        ${recipe.favorite ? 'Favorited!' : 'Add to Favorites'}
                    </button>
                    <button onclick="deleteRecipe(${recipe.id})" class="px-6 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 font-medium transition-all">Delete</button>
                </div>
            `;

            modal.classList.add('active');
        }

        function hideDetail() {
            document.getElementById('detailModal').classList.remove('active');
        }

        function toggleFavorite(id) {
            const recipe = recipes.find(r => r.id === id);
            if (recipe) {
                recipe.favorite = !recipe.favorite;
                saveRecipes();
                renderRecipes();
            }
        }

        function deleteRecipe(id) {
            recipes = recipes.filter(r => r.id !== id);
            saveRecipes();
            hideDetail();
            renderRecipes();
        }

        function toggleFavorites() {
            showFavoritesOnly = !showFavoritesOnly;
            const btn = document.getElementById('favBtn');
            if (showFavoritesOnly) {
                btn.classList.remove('bg-pink-100', 'text-pink-600');
                btn.classList.add('bg-pink-400', 'text-white');
            } else {
                btn.classList.remove('bg-pink-400', 'text-white');
                btn.classList.add('bg-pink-100', 'text-pink-600');
            }
            renderRecipes();
        }

        function filterRecipes() {
            renderRecipes();
        }

        function showAddModal() {
            document.getElementById('addModal').classList.add('active');
        }

        function hideAddModal() {
            document.getElementById('addModal').classList.remove('active');
            document.getElementById('newName').value = '';
            document.getElementById('newDesc').value = '';
            document.getElementById('newDiff').value = 'Easy';
            document.getElementById('newTime').value = '';
            document.getElementById('newIngredients').value = '';
            document.getElementById('newInstructions').value = '';
        }

        function addRecipe() {
            const name = document.getElementById('newName').value.trim();
            const description = document.getElementById('newDesc').value.trim();
            const difficulty = document.getElementById('newDiff').value;
            const time = document.getElementById('newTime').value.trim();
            const ingredients = document.getElementById('newIngredients').value.split('\n').filter(i => i.trim());
            const instructions = document.getElementById('newInstructions').value.trim();

            if (!name || !description) {
                alert('Please fill in at least the name and description!');
                return;
            }

            const newRecipe = {
                id: Date.now(),
                name,
                description,
                ingredients,
                instructions,
                difficulty,
                time,
                favorite: false
            };

            recipes.push(newRecipe);
            saveRecipes();
            hideAddModal();
            renderRecipes();
        }

        document.getElementById('detailModal').onclick = hideDetail;
        document.getElementById('addModal').onclick = hideAddModal;

        loadRecipes();
        renderRecipes();
    </script>
</body>
</html>
