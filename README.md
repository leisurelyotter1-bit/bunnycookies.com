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
                        ⭐
                    </button>
                    <button onclick="showAddModal()" class="bg-gradient-to-r from-pink-400 to-rose-400 text-white p-3 rounded-2xl hover:shadow-lg transition-all">
                        ➕
                    </button>
                </div>
            </div>
        </div>

        <!-- View Toggle -->
        <div class="bg-white rounded-3xl shadow-lg p-2 mb-6 border-4 border-pink-200 flex gap-2">
            <button id="myTab" onclick="switchView('my')" class="flex-1 py-3 px-6 rounded-2xl font-medium transition-all bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md">
                🔒 My Recipes
            </button>
            <button id="sharedTab" onclick="switchView('shared')" class="flex-1 py-3 px-6 rounded-2xl font-medium transition-all text-pink-600">
                🌍 Community Recipes
            </button>
        </div>

        <!-- Search Bar -->
        <div class="bg-white rounded-3xl shadow-lg p-4 mb-6 border-4 border-pink-200">
            <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300">🔍</span>
                <input type="text" id="searchInput" placeholder="search for cookies..." 
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
            <p class="text-pink-400" id="noResultsText">no cookies found...</p>
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
                    <h2 class="text-3xl font-bold text-pink-600">Add New Cookie Recipe</h2>
                    <button onclick="hideAddModal()" class="text-pink-400 hover:text-pink-600 text-2xl">✕</button>
                </div>
                <div class="space-y-4">
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Cookie Name</label>
                        <input type="text" id="newName" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none">
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Description</label>
                        <input type="text" id="newDesc" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none">
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
                        <textarea id="newIngredients" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32"></textarea>
                    </div>
                    <div>
                        <label class="block text-pink-600 font-medium mb-2">Instructions</label>
                        <textarea id="newInstructions" class="w-full p-3 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none h-32"></textarea>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="shareCheck" class="w-5 h-5 rounded">
                            <div class="flex-1">
                                <div class="font-medium text-pink-600">🌍 Share with Community</div>
                                <p class="text-sm text-pink-400 mt-1">Let other bunnies see your recipe!</p>
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

    <div class="fixed bottom-4 right-4 text-4xl opacity-50 pointer-events-none">₍ᐢ._.ᐢ₎</div>

    <script>
        const initialRecipes = [
            {id: 1, name: "Persian Saffron Raisin Cookies", description: "Golden, aromatic cookies with exotic saffron and sweet raisins", ingredients: ["2 cups flour", "1/2 tsp saffron threads", "1 cup raisins", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"], instructions: "Steep saffron in warm water. Cream butter and sugar, add egg and saffron water. Mix in dry ingredients and raisins. Chill 30 min. Bake at 350°F for 12-15 min.", difficulty: "Easy", time: "45 min", favorite: false, isShared: false, isDefault: true},
            {id: 2, name: "Lavender Honey Cookies", description: "Delicate butter cookies infused with lavender and honey", ingredients: ["2 cups flour", "2 tbsp dried lavender", "1/2 cup honey", "1/2 cup butter", "1 egg", "1/2 tsp vanilla"], instructions: "Grind lavender finely. Cream butter and honey, add egg. Mix in flour and lavender. Roll into balls, flatten slightly. Bake at 325°F for 10-12 min.", difficulty: "Easy", time: "30 min", favorite: false, isShared: false, isDefault: true},
            {id: 3, name: "Cardamom Orange Shortbread", description: "Buttery shortbread with warm cardamom and bright orange", ingredients: ["2 cups flour", "1 tsp cardamom", "1 tbsp orange zest", "1 cup butter", "1/2 cup sugar", "1/4 tsp salt"], instructions: "Mix flour, cardamom, salt. Cream butter and sugar, add zest. Fold in flour mixture. Roll out, cut shapes. Bake at 325°F for 15-18 min.", difficulty: "Easy", time: "35 min", favorite: false, isShared: false, isDefault: true},
            {id: 4, name: "Rose Water Pistachio Cookies", description: "Middle Eastern inspired cookies with pistachios and rose", ingredients: ["2 cups flour", "1 cup pistachios (chopped)", "1 tbsp rose water", "3/4 cup sugar", "1/2 cup butter", "1 egg", "1/2 tsp cardamom"], instructions: "Cream butter and sugar, add egg and rose water. Mix in flour, cardamom, and pistachios. Form balls, press gently. Bake at 350°F for 12-14 min.", difficulty: "Medium", time: "40 min", favorite: false, isShared: false, isDefault: true},
            {id: 5, name: "Black Sesame Cookies", description: "Nutty, toasty cookies with exotic black sesame flavor", ingredients: ["1.5 cups flour", "1/2 cup black sesame seeds", "1/2 cup butter", "3/4 cup sugar", "1 egg", "2 tbsp honey", "1/2 tsp salt"], instructions: "Toast sesame seeds. Cream butter, sugar, and honey. Add egg. Mix in flour, salt, and sesame. Chill 1 hour. Roll and slice. Bake at 350°F for 10-12 min.", difficulty: "Medium", time: "1 hr 20 min", favorite: false, isShared: false, isDefault: true},
            {id: 6, name: "Matcha White Chocolate Cookies", description: "Japanese green tea cookies with creamy white chocolate", ingredients: ["2 cups flour", "2 tbsp matcha powder", "1 cup white chocolate chips", "1/2 cup butter", "3/4 cup sugar", "1 egg", "1 tsp vanilla"], instructions: "Sift flour and matcha together. Cream butter and sugar, add egg and vanilla. Fold in flour mixture and chocolate chips. Bake at 350°F for 11-13 min.", difficulty: "Easy", time: "35 min", favorite: false, isShared: false, isDefault: true}
        ];

        let myRecipes = [];
        let sharedRecipes = [];
        let currentView = 'my';
        let showFavoritesOnly = false;

        async function init() {
            await loadMyRecipes();
            if (currentView === 'shared') {
                await loadSharedRecipes();
            }
            renderRecipes();
        }

        async function loadMyRecipes() {
            try {
                const result = await window.storage.get('my-recipes');
                if (result && result.value) {
                    myRecipes = JSON.parse(result.value);
                } else {
                    myRecipes = [...initialRecipes];
                    await window.storage.set('my-recipes', JSON.stringify(myRecipes));
                }
            } catch (error) {
                console.log('Loading initial recipes');
                myRecipes = [...initialRecipes];
            }
        }

        async function saveMyRecipes() {
            try {
                await window.storage.set('my-recipes', JSON.stringify(myRecipes));
            } catch (error) {
                console.error('Failed to save recipes:', error);
            }
        }

        async function loadSharedRecipes() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('recipeGrid').style.display = 'none';
            
            try {
                const keys = await window.storage.list('shared-recipe:', true);
                if (keys && keys.keys && keys.keys.length > 0) {
                    const recipePromises = keys.keys.map(async (key) => {
                        try {
                            const result = await window.storage.get(key, true);
                            return result ? JSON.parse(result.value) : null;
                        } catch {
                            return null;
                        }
                    });
                    const recipes = await Promise.all(recipePromises);
                    sharedRecipes = recipes.filter(r => r !== null);
                } else {
                    sharedRecipes = [];
                }
            } catch (error) {
                console.error('Failed to load shared recipes:', error);
                sharedRecipes = [];
            }
            
            document.getElementById('loading').style.display = 'none';
            renderRecipes();
        }

        function switchView(view) {
            currentView = view;
            const myTab = document.getElementById('myTab');
            const sharedTab = document.getElementById('sharedTab');
            
            if (view === 'my') {
                myTab.className = 'flex-1 py-3 px-6 rounded-2xl font-medium transition-all bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md';
                sharedTab.className = 'flex-1 py-3 px-6 rounded-2xl font-medium transition-all text-pink-600 hover:bg-pink-50';
            } else {
                sharedTab.className = 'flex-1 py-3 px-6 rounded-2xl font-medium transition-all bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-md';
                myTab.className = 'flex-1 py-3 px-6 rounded-2xl font-medium transition-all text-pink-600 hover:bg-pink-50';
                loadSharedRecipes();
            }
            
            renderRecipes();
        }

        function renderRecipes() {
            const grid = document.getElementById('recipeGrid');
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            const recipes = currentView === 'my' ? myRecipes : sharedRecipes;
            
            const filtered = recipes.filter(recipe => {
                const matchesSearch = recipe.name.toLowerCase().includes(searchQuery) || recipe.description.toLowerCase().includes(searchQuery);
                const matchesFavorite = !showFavoritesOnly || recipe.favorite;
                return matchesSearch && matchesFavorite;
            });

            if (filtered.length === 0) {
                grid.style.display = 'none';
                document.getElementById('noResults').style.display = 'block';
                document.getElementById('noResultsText').textContent = currentView === 'shared' ? 'no community recipes yet... be the first to share!' : 'no cookies found...';
                return;
            }

            grid.style.display = 'grid';
            document.getElementById('noResults').style.display = 'none';

            grid.innerHTML = filtered.map(recipe => `
                <div class="recipe-card bg-white rounded-3xl p-5 border-3 border-pink-200 hover:border-pink-400 cursor-pointer transition-all hover:shadow-xl" onclick="showDetail(${recipe.id})">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h3 class="font-bold text-pink-600 text-lg mb-1">${recipe.name} ${recipe.isShared && currentView === 'my' ? '🌍' : ''}</h3>
                            <p class="text-pink-400 text-sm">${recipe.description}</p>
                        </div>
                        ${currentView === 'my' ? `<button onclick="event.stopPropagation(); toggleFavorite(${recipe.id})" class="ml-2 text-2xl">${recipe.favorite ? '💖' : '🤍'}</button>` : ''}
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

            const shareBtn = currentView === 'my' && !recipe.isDefault ? `
                <button onclick="toggleRecipeSharing(${recipe.id})" class="w-full py-3 rounded-2xl font-medium transition-all mb-3 ${recipe.isShared ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">
                    ${recipe.isShared ? '🔒 Make Private' : '🌍 Share with Community'}
                </button>` : '';

            document.getElementById('modalContent').innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div class="flex-1">
                        <h2 class="text-3xl font-bold text-pink-600 mb-2">${recipe.name} ${recipe.isShared && currentView === 'my' ? '🌍' : ''}</h2>
                        <p class="text-pink-400">${recipe.description}</p>
                    </div>
                    <button onclick="hideDetail()" class="text-pink-400 hover:text-pink-600 text-2xl">✕</button>
                </div>
                <div class="flex gap-2 mb-6">
                    <span class="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm">${recipe.difficulty}</span>
                    <span class="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm">⏰ ${recipe.time}</span>
                </div>
                <div class="mb-6">
                    <h3 class="font-bold text-pink-600 mb-3 text-lg">🥣 Ingredients</h3>
                    <ul class="space-y-2 bg-pink-50 p-4 rounded-2xl">
                        ${recipe.ingredients.map(ing => `<li class="text-pink-700">• ${ing}</li>`).join('')}
                    </ul>
                </div>
                <div class="mb-6">
                    <h3 class="font-bold text-pink-600 mb-3 text-lg">📝 Instructions</h3>
                    <p class="text-pink-700 bg-pink-50 p-4 rounded-2xl leading-relaxed">${recipe.instructions}</p>
                </div>
                ${shareBtn}
                ${currentView === 'my' ? `
                    <div class="flex gap-3">
                        <button onclick="toggleFavorite(${recipe.id}); showDetail(${recipe.id})" class="flex-1 py-3 rounded-2xl font-medium transition-all ${recipe.favorite ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-600'}">
                            ${recipe.favorite ? '💖 Favorited!' : '🤍 Add to Favorites'}
                        </button>
                        <button onclick="deleteRecipe(${recipe.id})" class="px-6 py-3 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 font-medium transition-all">Delete</button>
                    </div>
                ` : ''}
            `;
            document.getElementById('detailModal').classList.add('active');
        }

        function hideDetail() {
            document.getElementById('detailModal').classList.remove('active');
        }

        async function toggleFavorite(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (recipe) {
                recipe.favorite = !recipe.favorite;
                await saveMyRecipes();
                renderRecipes();
            }
        }

        async function deleteRecipe(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (recipe && recipe.isShared) {
                try {
                    await window.storage.delete(`shared-recipe:${id}`, true);
                } catch (error) {
                    console.error('Failed to delete shared recipe:', error);
                }
            }
            myRecipes = myRecipes.filter(r => r.id !== id);
            await saveMyRecipes();
            hideDetail();
            renderRecipes();
            if (currentView === 'shared') {
                await loadSharedRecipes();
            }
        }

        function toggleFavorites() {
            showFavoritesOnly = !showFavoritesOnly;
            const btn = document.getElementById('favBtn');
            btn.className = showFavoritesOnly ? 'p-3 rounded-2xl transition-all bg-pink-400 text-white' : 'p-3 rounded-2xl transition-all bg-pink-100 text-pink-600';
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

        async function addRecipe() {
            const name = document.getElementById('newName').value.trim();
            const description = document.getElementById('newDesc').value.trim();
            if (!name || !description) {
                alert('Please fill in name and description!');
                return;
            }

            const newRecipe = {
                id: Date.now(),
                name,
                description,
                ingredients: document.getElementById('newIngredients').value.split('\n').filter(i => i.trim()),
                instructions: document.getElementById('newInstructions').value.trim(),
                difficulty: document.getElementById('newDiff').value,
                time: document.getElementById('newTime').value.trim(),
                favorite: false,
                isShared: document.getElementById('shareCheck').checked,
                isDefault: false
            };

            myRecipes.push(newRecipe);
            await saveMyRecipes();

            if (newRecipe.isShared) {
                try {
                    await window.storage.set(`shared-recipe:${newRecipe.id}`, JSON.stringify(newRecipe), true);
                } catch (error) {
                    console.error('Failed to share recipe:', error);
                }
            }

            hideAddModal();
            renderRecipes();
            if (currentView === 'shared' && newRecipe.isShared) {
                await loadSharedRecipes();
            }
        }

        async function toggleRecipeSharing(id) {
            const recipe = myRecipes.find(r => r.id === id);
            if (!recipe || recipe.isDefault) return;

            recipe.isShared = !recipe.isShared;

            if (recipe.isShared) {
                try {
                    await window.storage.set(`shared-recipe:${id}`, JSON.stringify(recipe), true);
                } catch (error) {
                    console.error('Failed to share recipe:', error);
                }
            } else {
                try {
                    await window.storage.delete(`shared-recipe:${id}`, true);
                } catch (error) {
                    console.error('Failed to unshare recipe:', error);
                }
            }
            
            await saveMyRecipes();
            hideDetail();
            renderRecipes();
            if (currentView === 'shared') {
                await loadSharedRecipes();
            }
        }

        init();
    </script>
</body>
</html>
