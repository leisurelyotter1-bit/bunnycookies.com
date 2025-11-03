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
        <div id="detailModal" class="modal" onclick="hideDetail()">
            <div class="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-pink-300" onclick="event.stopPropagation()">
                <div id="modalContent"></div>
            </div>
        </div>

        <!-- Add Recipe Modal -->
        <div id="addModal" class="modal" onclick="hideAddModal()">
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

        function getAllSharedRecipes() {
            const shared = localStorage.getItem('sharedRecipes');
            return shared ? JSON.parse(shared) : [];
        }

        function saveSharedRecipes() {
            localStorage.setItem('sharedRecipes', JSON.stringify(sharedRecipes));
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

        function loadSharedRecipes() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('recipeGrid').style.display = 'none';
            
            setTimeout(() => {
                sharedRecipes = getAllSharedRecipes();
                document.getElementById('loading').style.display = 'none';
                renderRecipes();
            }, 300);
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
                ${shareButton}
                ${currentView === 'my' ? `
                    <div class="flex gap-3">
                        <button onclick="toggleFavorite(${recipe.id}); showDetail(${recipe.id})" class="flex-1 py-3 rounded-2xl font-medium transition-all ${
                            recipe.favorite
                                ? 'bg-pink-500 text-white'
                                : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                        }">
                            <svg class="inline w-5 h-5 mr-2 ${recipe.favorite ? 'heart-filled' : ''}" fill="${recipe.favorite ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            ${recipe.favorite ? 'Favorited!' : 'Add to Favorites'}
                        </button>
                        <button onclick="deleteRecipe(${recipe.id})" class="px-6 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 font-medium transition-all">Delete</button>
                    </div>
                ` : ''}
            `;

            modal.classList.add('active');
        }

        function hideDetail() {
            document.getElementById('detailModal').classList.remove('active');
        }

        function toggleFavorite(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (recipe) {
                recipe.favorite = !recipe.favorite;
                saveMyRecipes();
                renderRecipes();
            }
        }

        function deleteRecipe(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (recipe && recipe.isShared) {
                sharedRecipes = sharedRecipes.filter(r => r.id !== id);
                saveSharedRecipes();
            }
            myRecipes = myRecipes.filter(r => r.id !== id);
            saveMyRecipes();
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
            document.getElementById('shareCheck').checked = false;
        }

        function addRecipe() {
            const name = document.getElementById('newName').value.trim();
            const description = document.getElementById('newDesc').value.trim();
            const difficulty = document.getElementById('newDiff').value;
            const time = document.getElementById('newTime').value.trim();
            const ingredients = document.getElementById('newIngredients').value.split('\n').filter(i => i.trim());
            const instructions = document.getElementById('newInstructions').value.trim();
            const isShared = document.getElementById('shareCheck').checked;

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
                favorite: false,
                isShared: isShared,
                isDefault: false
            };

            myRecipes.push(newRecipe);
            saveMyRecipes();

            if (isShared) {
                sharedRecipes.push(newRecipe);
                saveSharedRecipes();
            }

            hideAddModal();
            renderRecipes();
        }

        function toggleRecipeSharing(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (!recipe || recipe.isDefault) return;

            recipe.isShared = !recipe.isShared;

            if (recipe.isShared) {
                sharedRecipes.push({...recipe});
                saveSharedRecipes();
            } else {
                sharedRecipes = sharedRecipes.filter(r => r.id !== id);
                saveSharedRecipes();
            }

            saveMyRecipes();
            hideDetail();
            renderRecipes();
        }

        loadMyRecipes();
        sharedRecipes = getAllSharedRecipes();
        renderRecipes();
    </script>
</body>
</html>
