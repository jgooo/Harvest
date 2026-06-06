/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Compass, 
  Heart, 
  User, 
  Search, 
  Menu, 
  Star, 
  Clock, 
  Utensils, 
  ChevronRight, 
  ArrowLeft,
  Plus,
  Share2,
  X,
  Flame,
  Sparkles,
  RefreshCcw,
  Trash2,
  Pencil,
  History,
  Settings,
  HelpCircle,
  MessageSquare,
  LogOut,
  ArrowRight,
  Camera,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  ChefHat,
  ShieldCheck,
  UtensilsCrossed,
  Refrigerator,
  BookMarked,
  SlidersHorizontal,
  Link,
  Mail,
  Twitter,
  Facebook,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, Recipe } from './types';
import { RECIPES, CATEGORIES, INGREDIENTS_CATEGORIES, FLAVORS } from './constants';

const SideMenu = ({ isOpen, onClose, setPage }: { isOpen: boolean, onClose: () => void, setPage: (p: Page) => void }) => {
  const menuItems = [
    { id: 'home', label: '我的主页', icon: Home },
    { id: 'history', label: '历史记录', icon: History },
    { id: 'tools', label: '厨房工具', icon: Refrigerator },
    { id: 'offline', label: '离线菜谱', icon: BookMarked },
    { divider: true },
    { id: 'settings', label: '设置', icon: Settings },
    { id: 'feedback', label: '意见反馈', icon: MessageSquare },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-background z-[70] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* User Profile Header */}
            <div className="p-6 pt-12 bg-white">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                    alt="User" 
                    className="w-16 h-16 rounded-2xl object-cover border-2 shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-surface-container-high text-on-surface w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-on-surface">美食家小王</h2>
                  <div className="inline-flex items-center px-3 py-0.5 rounded-full border border-on-surface-variant/20 text-on-surface-variant/60 mt-1">
                    <span className="text-[11px] font-medium tracking-wide">尊享会员</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-primary">
                <UtensilsCrossed size={18} strokeWidth={2.5} />
                <span className="text-sm font-bold tracking-[0.05em]">丰收厨房</span>
              </div>
            </div>

            <div className="w-[calc(100%-2rem)] mx-auto h-[1px] bg-on-surface-variant/10" />

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => {
                  if (item.divider) return <div key={index} className="my-6 mx-2 h-[1px] bg-on-surface-variant/5" />;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          if (item.id !== 'divider') {
                            setPage(item.id as Page);
                          }
                          onClose();
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                          item.id === 'home' && index === 0 ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant/80 hover:bg-surface-container-low font-medium'
                        }`}
                      >
                        <item.icon size={20} className={item.id === 'home' && index === 0 ? 'text-primary' : 'text-on-surface-variant/70 group-hover:text-primary transition-colors'} />
                        <span className="text-sm">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Toast = ({ message, clear }: { message: string, clear: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(clear, 2000);
    return () => clearTimeout(timer);
  }, [clear]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] bg-on-surface text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-md"
    >
      <Heart size={16} fill="currentColor" className="text-secondary" />
      <span className="text-xs font-bold uppercase tracking-widest leading-none">{message}</span>
    </motion.div>
  );
};

const BottomNav = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'discover', icon: Compass, label: '发现' },
    { id: 'favorites', icon: Heart, label: '收藏' },
    { id: 'profile', icon: User, label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-surface/95 border-t border-on-surface-variant/10 shadow-md backdrop-blur-lg rounded-t-xl transition-all">
      {tabs.map((tab) => {
        const isActive = currentPage === tab.id || (tab.id === 'profile' && ['settings', 'history', 'my-works'].includes(currentPage));
        return (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id as Page)}
            className={`flex flex-col items-center justify-center transition-all duration-200 px-4 py-1 rounded-full ${
              isActive ? 'text-primary bg-primary/10 scale-105' : 'text-on-surface-variant hover:text-primary active:scale-90'
            }`}
          >
            <tab.icon size={24} fill={isActive ? 'currentColor' : 'none'} className="mb-1" />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const TopBar = ({ title, showMenu = true, onBack, onMenuClick, onSearchClick }: { title: string, showMenu?: boolean, onBack?: () => void, onMenuClick?: () => void, onSearchClick?: () => void }) => (
  <header className="sticky top-0 w-full z-40 flex justify-between items-center px-4 h-16 bg-surface/90 border-b border-on-surface-variant/10 backdrop-blur-md shadow-sm">
    <div className="flex items-center gap-3">
      {onBack ? (
        <button onClick={onBack} className="text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
      ) : showMenu ? (
        <button 
          onClick={onMenuClick}
          className="text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors"
        >
          <Menu size={24} />
        </button>
      ) : null}
      <h1 className="font-display text-xl font-bold text-primary tracking-tight">{title}</h1>
    </div>
    {onSearchClick && (
      <button onClick={onSearchClick} className="text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-90">
        <Search size={24} />
      </button>
    )}
  </header>
);

const RecipeCard = ({ recipe, onClick, onFavorite }: { recipe: Recipe, onClick: () => void, onFavorite: (e: React.MouseEvent) => void }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-surface rounded-xl shadow-sm border border-on-surface-variant/5 overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow group"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <motion.button 
        whileTap={{ scale: 1.4 }}
        onClick={onFavorite}
        className="absolute top-2 right-2 bg-surface/50 backdrop-blur-md rounded-full p-1.5 text-on-surface hover:text-red-500 transition-colors z-10"
      >
        <Heart size={18} fill={recipe.isFavorite ? 'currentColor' : 'none'} className={recipe.isFavorite ? 'text-secondary' : ''} />
      </motion.button>
      {recipe.tags && recipe.tags[0] && (
        <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-secondary" fill="currentColor" />
          <span className="text-[10px] font-bold">{recipe.tags[0]}</span>
        </div>
      )}
    </div>
    <div className="p-3 flex flex-col gap-1.5 grow justify-between">
      <h3 className="font-display font-semibold text-label-md text-on-surface line-clamp-2 leading-snug">{recipe.title}</h3>
      <div className="flex items-center gap-2 text-on-surface-variant text-[11px] font-medium mt-1">
        <span className="flex items-center gap-0.5"><Clock size={12} /> {recipe.time}</span>
        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
        <span className="text-primary">{recipe.difficulty}</span>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [currentPage, setPage] = useState<Page>('home');
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeRatings, setRecipeRatings] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedHomeCategory, setSelectedHomeCategory] = useState<string>('1');
  const [historyCleared, setHistoryCleared] = useState(false);
  const [selectedFavoriteCategory, setSelectedFavoriteCategory] = useState<string>('全部');
  const [favoriteSort, setFavoriteSort] = useState<'date' | 'time' | 'difficulty'>('date');

  const handleFavorite = (e: React.MouseEvent, recipeId: string) => {
    e.stopPropagation();
    setRecipes(prev => prev.map(r => {
      if (r.id === recipeId) {
        const isFav = !r.isFavorite;
        setToast(isFav ? '已添加至收藏' : '已取消收藏');
        return { ...r, isFavorite: isFav, favoriteAddedAt: isFav ? Date.now() : undefined };
      }
      return r;
    }));
    setSelectedRecipe(prev => prev?.id === recipeId ? { ...prev, isFavorite: !prev.isFavorite, favoriteAddedAt: !prev.isFavorite ? Date.now() : undefined } : prev);
  };

  const handleShareAction = (platform: string) => {
    setIsShareModalOpen(false);
    if (platform === 'copy') {
      setToast('链接已复制到剪贴板！');
    } else {
      setToast(`正在分享至${platform}...`);
      setTimeout(() => setToast('✅ 分享成功！'), 1500);
    }
  };

  const showFeedback = (e: React.MouseEvent, msg: string) => {
    e.stopPropagation();
    setToast(msg);
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Clear checked ingredients when opening a new recipe
  useEffect(() => {
    setCheckedIngredients([]);
  }, [selectedRecipe]);

  // Creation State
  const [newRecipe, setNewRecipe] = useState<Partial<Recipe>>({
    title: '',
    description: '',
    time: '',
    difficulty: '初级' as any,
    servings: '2-3人',
    ingredients: [],
    steps: []
  });

  const [currentIngredient, setCurrentIngredient] = useState({ name: '', amount: '' });
  const [currentStep, setCurrentStep] = useState<Partial<Step>>({ title: '', description: '', image: '' });

  // Creation select modal state
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectModalType, setSelectModalType] = useState<'time' | 'difficulty' | 'servings' | null>(null);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Search logic states
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['番茄炒蛋', '清蒸鲈鱼', '轻食沙拉']);
  const trendingSearches = ['红烧肉', '减脂餐', '快手早餐', '空气炸锅', '糖醋排骨', '烘焙新手'];
  const suggestedSearches = ['低脂晚餐', '快手早餐', '时令鲜笋'];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<{
    category: string;
    difficulty: string;
    time: string;
  }>({
    category: '全部',
    difficulty: '全部',
    time: '全部'
  });

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    setSearchQuery(query);
    setIsSearchSubmitted(true);
  };

  const goToSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchSubmitted(true);
    setPage('search');
  };

  const clearRecent = () => setRecentSearches([]);

  const parseTimeStr = (timeStr: string) => {
    let minutes = 0;
    const hoursMatch = timeStr.match(/(\d+)\s*小时/);
    if (hoursMatch) minutes += parseInt(hoursMatch[1]) * 60;
    const minutesMatch = timeStr.match(/(\d+)\s*分钟/);
    if (minutesMatch) minutes += parseInt(minutesMatch[1]);
    return minutes || Number.MAX_SAFE_INTEGER;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        const currentCategoryName = CATEGORIES.find(c => c.id === selectedHomeCategory)?.name;
        const filteredRecipes = selectedHomeCategory === '1' 
          ? recipes.slice(1, 5) 
          : recipes.filter(r => r.category === currentCategoryName);
        
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-8 pb-24"
          >
            <TopBar title="丰收厨房" onMenuClick={() => setIsMenuOpen(true)} />
            
            {/* Hero Section */}
            <section className="px-4">
              <motion.div 
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedRecipe(recipes[0]); setPage('recipe-detail'); }}
                className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <img src={recipes[0].image} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-on-surface-variant/10">
                  <Star size={16} className="text-secondary" fill="currentColor" />
                  <span className="font-semibold text-xs text-on-surface">厨师精选</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                      <h2 className="font-display text-xl font-bold text-white uppercase tracking-wide">{recipes[0].title}</h2>
                      <div className="flex items-center gap-3 text-white/80 text-xs font-semibold">
                        <span className="flex items-center gap-1"><Clock size={14} /> {recipes[0].time}</span>
                        <span className="flex items-center gap-1"><Utensils size={14} /> {recipes[0].difficulty}</span>
                      </div>
                    </div>
                    <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Categories */}
            <section className="relative">
              <div 
                id="categories-scroll"
                className="flex overflow-x-auto hide-scrollbar pl-4 pr-4 gap-3 pb-2 scroll-smooth"
              >
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedHomeCategory(cat.id)}
                    className={`shrink-0 rounded-full flex items-center gap-2 px-5 py-2.5 text-xs font-bold border transition-colors ${
                      selectedHomeCategory === cat.id ? 'bg-primary/10 border-primary/20 text-primary shadow-sm' : 'bg-surface-container border-on-surface-variant/10 text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Recipes */}
            <section className="px-4">
              <div className="flex justify-between items-end mb-4">
                <h2 className="font-display text-lg font-bold text-on-surface tracking-tight">热门食谱</h2>
                <button onClick={() => setPage('discover')} className="text-primary text-[11px] font-bold hover:underline">查看全部</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {filteredRecipes.length > 0 ? filteredRecipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={() => { setSelectedRecipe(recipe); setPage('recipe-detail'); }} 
                    onFavorite={(e) => handleFavorite(e, recipe.id)}
                  />
                )) : (
                  <div className="col-span-2 text-center py-8 text-sm text-on-surface-variant/60 font-semibold bg-surface-container rounded-2xl">
                    正在努力开发新菜谱中...
                  </div>
                )}
              </div>
            </section>


          </motion.div>
        );
      case 'discover':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-8 pb-24"
          >
            <TopBar title="发现美味" onMenuClick={() => setIsMenuOpen(true)} />
            
            <section className="px-4">
               <div 
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchSubmitted(false);
                  setPage('search');
                }}
                className="relative mb-6 cursor-pointer"
               >
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
                <div className="w-full bg-surface-container-low border border-on-surface-variant/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-on-surface-variant/50 shadow-sm">
                  搜索分类、食材、口味...
                </div>
              </div>

              <h2 className="font-display text-lg font-bold text-on-surface mb-4">热门分类</h2>
              <div className="grid grid-cols-2 gap-4">
                <div onClick={() => goToSearch('家常菜')} className="col-span-2 relative aspect-[2/1] rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-on-surface-variant/5">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBobI_hMWdR67ToaU-sEWhDvhs10yhK077yZF-MZRCTWvePNb06Hu8SoCwHDMFtKLxpkpPqYKlNNqGjANagSpFYVoqGI6FDh7DP0tQSJfXk2Ruy10cc8OYUk0LKb5Vzvyxx7rU8OHN-cTLFPlb6QIviwNp6rFBpl06G2hGpMDCyQywZ4byeKIV4NgSGY1pu_kTpqPBToORSflbopdOzgAoLUiXxMBBPNPTJ5qDdgbagp5jJpDXnlpCJ8ZeSGbc4PrY2JUyiULsHiyeE" alt="Home Cooking" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">家常菜</h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold mt-0.5">Everyday Meals</p>
                  </div>
                </div>
                <div onClick={() => goToSearch('快手菜')} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-on-surface-variant/5">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuANrHLmk42lewzIyX1Evr8YxtHbokn4UTzRCSMAHOtSyLY3pqLy7ppCq9j81qNyOfV78xI0X_j7dzY5EmVscIqthpU64BxdgI1DH8nj_MvS6oTOYMB5rn8JEktmd-ohEQMCOhMlhaYNrfQGtKU1g4-Dk2R3E2KdvZbYPEN6JRwF1Itp7riPJFXxx-4DlkMaB5d4VkzCjtXzcHqodkw6YIkPRwbP9UypMJgaUtMKp4H-0XNQDyLireIaqKiWnLMhdSdQdswxGKya99xp" alt="Quick" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-sm uppercase tracking-wide">快手菜</h3>
                    <p className="text-[8px] opacity-80 uppercase tracking-widest font-bold mt-0.5">Quick & Easy</p>
                  </div>
                </div>
                <div onClick={() => goToSearch('烘焙')} className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm border border-on-surface-variant/5">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsqcdSUIKrD2HLLI-MGmyZtBXsCeWruF18nC8ym4bZPdIAoVhyl1g3LIHOm2_8NhD-EPrXSyZWFN_Fb_Mli34tysiExsvu1dGumCmspV2JNmS8in68m5dnD68xxHzgWJ1bJaIfWaxvPj_trt1Jgi29kcso6yvuH9TXXk8eqGGj-vPhl1PSyo9voD3lzAngK9auaEpCRK6Ex631TSt1-6_rRGDIgUf_K-jh66X3GCdl1xRIOLMQfCo4GTUFUK90klIHzq5BkEU3QF2F" alt="Baking" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-sm uppercase tracking-wide">烘焙</h3>
                    <p className="text-[8px] opacity-80 uppercase tracking-widest font-bold mt-0.5">Baking</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="px-4">
              <h2 className="font-display text-lg font-bold text-on-surface mb-4">按食材浏览</h2>
              <div className="grid grid-cols-2 gap-4">
                {INGREDIENTS_CATEGORIES.map((cat) => (
                  <div key={cat.name} onClick={() => goToSearch(cat.name)} className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-3 border border-on-surface-variant/5 shadow-sm hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center text-primary group-hover:scale-110 transition-transform`}>
                      <Utensils size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-on-surface">{cat.name}</h3>
                      <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">{cat.enName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="px-4">
              <h2 className="font-display text-lg font-bold text-on-surface mb-4">按口味浏览</h2>
              <div className="flex flex-wrap gap-2">
                {FLAVORS.map((flavor) => (
                  <button key={flavor} onClick={() => goToSearch(flavor)} className="px-5 py-2.5 rounded-full bg-surface-container-highest border border-on-surface-variant/10 text-[11px] font-bold text-on-surface hover:bg-primary hover:text-white transition-all shadow-sm">
                    {flavor}
                  </button>
                ))}
              </div>
            </section>
          </motion.div>
        );
      case 'favorites':
        const favoriteRecipes = recipes.filter(r => r.isFavorite);
        const favoriteCategories = Array.from(new Set(favoriteRecipes.map(r => r.category)));
        const allFavoriteCategories = ['全部', ...favoriteCategories];
        const displayFavoriteRecipes = selectedFavoriteCategory === '全部' 
          ? favoriteRecipes 
          : favoriteRecipes.filter(r => r.category === selectedFavoriteCategory);

        const difficultySortPriority: Record<string, number> = {
          '简单': 1, '初级': 1, '入门': 1,
          '中等': 2, '中级': 2,
          '困难': 3, '高级': 3, '专家级': 4
        };

        const sortedFavoriteRecipes = [...displayFavoriteRecipes].sort((a, b) => {
          if (favoriteSort === 'date') {
            return (b.favoriteAddedAt || 0) - (a.favoriteAddedAt || 0);
          } else if (favoriteSort === 'time') {
            return parseTimeStr(a.time) - parseTimeStr(b.time);
          } else if (favoriteSort === 'difficulty') {
            return (difficultySortPriority[a.difficulty] || 99) - (difficultySortPriority[b.difficulty] || 99);
          }
          return 0;
        });

        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-6 pb-24"
          >
            <TopBar title="我的收藏" onMenuClick={() => setIsMenuOpen(true)} onSearchClick={() => setPage('search')} />
            
            <section className="px-4">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {allFavoriteCategories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setSelectedFavoriteCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                      selectedFavoriteCategory === cat || (cat === '全部' && !allFavoriteCategories.includes(selectedFavoriteCategory))
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                    }`}
                  >
                    {cat} {cat === '全部' && `(${favoriteRecipes.length})`}
                  </button>
                ))}
              </div>

              {displayFavoriteRecipes.length > 0 ? (
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center -mb-2">
                    <span className="text-sm font-bold text-on-surface">收藏列表</span>
                    <div className="flex bg-surface-container-low rounded-lg p-1">
                      {(['date', 'time', 'difficulty'] as const).map(sort => (
                        <button
                          key={sort}
                          onClick={() => setFavoriteSort(sort)}
                          className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all ${favoriteSort === sort ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                        >
                          {sort === 'date' ? '最新添加' : sort === 'time' ? '用时最短' : '难度最低'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-2">
                    {sortedFavoriteRecipes.map((recipe) => (
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
                        onClick={() => { setSelectedRecipe(recipe); setPage('recipe-detail'); }} 
                        onFavorite={(e) => handleFavorite(e, recipe.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20">
                    <Heart size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface mb-1">暂无收藏</p>
                    <p className="text-xs text-on-surface-variant/60">去发现一些美味食谱吧</p>
                  </div>
                </div>
              )}
            </section>
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-8 pb-24"
          >
            <TopBar title="个人中心" onMenuClick={() => setIsMenuOpen(true)} />
            
            <section className="flex flex-col items-center text-center px-4 pt-6">
              <div className="relative mb-4 group cursor-pointer">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKAbzhB2_mgunQzevU10BCcDbbrt71Z5yPce-PPCCbEjIASYuZ-GJ_yrOHLd094yjMP2BPP7X1UyNALQ2xpWLHETzY_5w-PjTrs_XLto_yH-w4qKDtHFfZhDrTrvUWWP7vVNMM_JqR5EuylsPAvPwAPvP6CTrqFGH8cGv4np6w4Op6C3OJi4cbLajItKsKSwiK1eFRjYdqJcJSeDuE3-oi-sJkIFKybtpz5G4D-oW6r-ItuuilBRGKaPddSEyzS_m1AjCdNQqH8ex-" 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-1 right-1 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  <Camera size={14} />
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-on-surface mb-1">小厨灵感家</h2>
              <p className="text-on-surface-variant/80 text-[11px] font-semibold px-8 leading-relaxed">
                探索有机食材的无限可能，用味道记录生活的美好瞬间。🥬🍓
              </p>
            </section>

            <section className="px-4">
              <div className="flex flex-col items-center bg-white rounded-2xl py-6 shadow-sm border border-on-surface-variant/5">
                <span className="font-display text-3xl font-bold text-primary">42</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">发布的菜谱</span>
              </div>
            </section>

            <section className="px-4 flex flex-col gap-2">
              {[
                { label: '我的作品', icon: Utensils, id: 'my-works' },
                { label: '历史记录', icon: History, id: 'history' },
                { label: '账号设置', icon: Settings, id: 'settings' },
                { label: '帮助中心', icon: HelpCircle, id: 'help' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setPage(item.id as Page)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-on-surface-variant/5 hover:bg-surface-container-high transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <item.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-on-surface">{item.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-on-surface-variant/40" />
                </button>
              ))}
            </section>

            <section className="px-4 mb-4">
              {/* Empty section for padding */}
            </section>
          </motion.div>
        );
      case 'search':
        const allSuggestions = Array.from(new Set([...trendingSearches, ...suggestedSearches]));
        const filteredSuggestions = searchQuery.trim() 
          ? allSuggestions.filter(s => s.includes(searchQuery))
          : [];

        const isFiltering = searchFilters.category !== '全部' || searchFilters.difficulty !== '全部' || searchFilters.time !== '全部';
        const hasQuery = searchQuery.trim() !== '';
        const shouldShowResults = isSearchSubmitted || isFiltering;

        const searchResults = shouldShowResults
          ? recipes.filter(r => {
              const matchesQuery = !hasQuery || r.title.includes(searchQuery) || 
                  r.category.includes(searchQuery) ||
                  r.tags.some(t => t.includes(searchQuery)) ||
                  r.ingredients.some(i => i.name.includes(searchQuery));
              
              const matchesCategory = searchFilters.category === '全部' || r.category === searchFilters.category;
              const matchesDifficulty = searchFilters.difficulty === '全部' || r.difficulty === searchFilters.difficulty;
              
              const rTimeMins = parseTimeStr(r.time);
              const matchesTime = searchFilters.time === '全部' || 
                  (searchFilters.time === '15分钟内' && rTimeMins <= 15) ||
                  (searchFilters.time === '15-30分钟' && rTimeMins > 15 && rTimeMins <= 30) ||
                  (searchFilters.time === '30分钟以上' && rTimeMins > 30);

              return matchesQuery && matchesCategory && matchesDifficulty && matchesTime;
            })
          : [];

        return (
          <motion.div 
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, scale: 1.02 }}
            className="flex flex-col min-h-screen bg-background pb-24"
          >
            <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-on-surface-variant/10 px-4 pt-4 pb-4 flex items-center justify-between gap-4 shadow-sm">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchSubmitted(false);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="w-full bg-surface-container-low border border-on-surface-variant/10 rounded-2xl py-3 pl-12 pr-10 text-xs font-bold text-on-surface shadow-sm focus:outline-none transition-all placeholder:text-on-surface-variant/50"
                  placeholder="搜索分类、食材、口味..."
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-on-surface transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2 transition-colors rounded-full active:scale-95 ${isFilterOpen ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              >
                <SlidersHorizontal size={20} />
              </button>
              <button 
                onClick={() => setPage('discover')}
                className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap active:scale-95 ml-2"
              >
                取消
              </button>
            </header>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 overflow-hidden border-b border-on-surface-variant/10 bg-surface/30"
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <div className="py-4 flex flex-col gap-5">
                    {/* Category Filter */}
                    <div>
                      <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">分类</h4>
                      <div className="flex flex-wrap gap-2">
                        {['全部', ...CATEGORIES.map(c => c.name)].map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSearchFilters(prev => ({...prev, category: cat}))}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${searchFilters.category === cat ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">难度</h4>
                      <div className="flex flex-wrap gap-2">
                        {['全部', '简单', '中等', '困难'].map(diff => (
                          <button
                            key={diff}
                            onClick={() => setSearchFilters(prev => ({...prev, difficulty: diff}))}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${searchFilters.difficulty === diff ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Filter */}
                    <div>
                      <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-3">时间</h4>
                      <div className="flex flex-wrap gap-2">
                        {['全部', '15分钟内', '15-30分钟', '30分钟以上'].map(time => (
                          <button
                            key={time}
                            onClick={() => setSearchFilters(prev => ({...prev, time: time}))}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${searchFilters.time === time ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <main className="flex-grow px-4 py-8 flex flex-col gap-10">
              {shouldShowResults ? (
                // Results View
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-lg font-bold text-on-surface">搜索结果</h3>
                    <span className="text-xs font-bold text-on-surface-variant/60">{searchResults.length}个食谱</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {searchResults.map(recipe => (
                        <RecipeCard 
                          key={recipe.id} 
                          recipe={recipe} 
                          onClick={() => { setSelectedRecipe(recipe); setPage('recipe-detail'); }} 
                          onFavorite={(e) => handleFavorite(e, recipe.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20">
                        <Search size={32} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface mb-1">未找到相关食谱</p>
                        <p className="text-xs text-on-surface-variant/60">尝试换个搜索词，或者按分类浏览</p>
                      </div>
                    </div>
                  )}
                </section>
              ) : searchQuery.trim() ? (
                // Suggestions View
                <section>
                  <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em] opacity-60 mb-4">搜索建议</h3>
                  <ul className="flex flex-col">
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item, i) => (
                        <li 
                          key={i}
                          onClick={() => handleSearch(item)}
                          className="flex items-center justify-between py-3 border-b border-on-surface-variant/5 group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <Search size={16} className="text-primary/40" />
                            <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">{item}</span>
                          </div>
                          <ArrowRight size={14} className="text-on-surface-variant/20" />
                        </li>
                      ))
                    ) : (
                      <div className="py-10 text-center flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20">
                          <Search size={24} />
                        </div>
                        <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">未找到相关建议</p>
                      </div>
                    )}
                  </ul>
                </section>
              ) : (
                // Default View
                <>
                  {recentSearches.length > 0 && (
                    <section>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em] opacity-60">最近搜索</h3>
                        <button 
                          onClick={clearRecent}
                          className="text-[10px] font-bold text-primary hover:text-primary-container transition-colors tracking-widest"
                        >
                          清空记录
                        </button>
                      </div>
                      <ul className="flex flex-col">
                        {recentSearches.map((item, i) => (
                          <li 
                            key={i}
                            onClick={() => handleSearch(item)}
                            className="flex items-center justify-between py-3 border-b border-on-surface-variant/5 group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <History size={16} className="text-on-surface-variant/40" />
                              <span className="text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors">{item}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em] opacity-60">热门搜索</h3>
                      <Flame size={14} className="text-orange-500 fill-orange-500" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((item) => (
                        <button 
                          key={item}
                          onClick={() => handleSearch(item)}
                          className="px-4 py-2 bg-surface-container-highest border border-on-surface-variant/5 rounded-full text-[10px] font-bold text-on-surface-variant hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em] opacity-60">猜你喜欢</h3>
                      <Sparkles size={14} className="text-primary" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestedSearches.map((item) => (
                        <button 
                          key={item}
                          onClick={() => handleSearch(item)}
                          className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </main>
          </motion.div>
        );
      case 'recipe-detail':
        if (!selectedRecipe) return null;
        return (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, y: 50 }}
            className="flex flex-col gap-0 pb-32"
          >
            <div className="relative w-full h-[400px]">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 w-full p-4 z-30 flex justify-between">
                <button onClick={() => setPage('home')} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform">
                  <ArrowLeft size={24} />
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setIsShareModalOpen(true)} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="relative bg-surface rounded-t-[3rem] -mt-12 pt-12 px-6">
              <motion.button 
                whileTap={{ scale: 1.5 }}
                onClick={(e) => handleFavorite(e, selectedRecipe.id)}
                className="absolute -top-7 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border border-on-surface-variant/10 active:scale-90 transition-transform z-40"
              >
                <Heart size={28} className={selectedRecipe.isFavorite ? "text-secondary" : "text-on-surface-variant"} fill={selectedRecipe.isFavorite ? "currentColor" : "none"} />
              </motion.button>

              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-1.5 bg-primary/10 text-primary font-bold text-[10px] rounded-full uppercase tracking-[0.2em] mb-4 shadow-sm border border-primary/5">
                  {selectedRecipe.category || '精选菜肴'}
                </div>
                <h1 className="font-display text-4xl font-bold text-on-surface mb-4 leading-tight tracking-tight">{selectedRecipe.title}</h1>
                
                {/* Interactive Rating Component */}
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentDisplayRating = recipeRatings[selectedRecipe.id] || Math.round(selectedRecipe.rating || 0);
                    return (
                      <button 
                        key={star} 
                        onClick={() => {
                          setRecipeRatings({ ...recipeRatings, [selectedRecipe.id]: star });
                          setToast('感谢您的评分！');
                        }}
                        className="p-1 -ml-1 focus:outline-none transition-transform hover:scale-110 active:scale-90"
                      >
                        <Star 
                          size={24} 
                          className={star <= currentDisplayRating ? "text-yellow-400" : "text-on-surface-variant/20"} 
                          fill={star <= currentDisplayRating ? "currentColor" : "none"} 
                        />
                      </button>
                    );
                  })}
                  <span className="text-sm font-bold text-on-surface-variant ml-2">
                    {recipeRatings[selectedRecipe.id] ? `${recipeRatings[selectedRecipe.id]}.0` : selectedRecipe.rating} 分
                    {recipeRatings[selectedRecipe.id] && <span className="text-[10px] ml-2 px-2 py-0.5 bg-yellow-400/10 text-yellow-600 rounded-full">已评价</span>}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-8 text-on-surface-variant/80 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2"><Clock size={18} className="text-primary" /> {selectedRecipe.time}</div>
                  <div className="flex items-center gap-2"><Utensils size={18} className="text-primary" /> {selectedRecipe.difficulty}</div>
                  <div className="flex items-center gap-2"><User size={18} className="text-primary" /> {selectedRecipe.servings}</div>
                </div>
              </div>

              <hr className="border-on-surface-variant/10 my-8" />

              <section className="mb-10">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="font-display text-xl font-bold text-on-surface tracking-tight">准备食材</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{selectedRecipe.ingredients.length} 项</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {selectedRecipe.ingredients.length > 0 ? selectedRecipe.ingredients.map((ing, i) => {
                    const isChecked = checkedIngredients.includes(i);
                    return (
                      <label 
                        key={i} 
                        onClick={() => toggleIngredient(i)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group shadow-sm ${
                          isChecked ? 'bg-surface-container border-on-surface-variant/5' : 'bg-white border-on-surface-variant/5 hover:border-primary/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            readOnly
                            className="w-5 h-5 rounded-full border-2 border-outline-variant text-primary focus:ring-primary shadow-sm" 
                          />
                          <span className={`text-xs font-bold transition-all ${
                            isChecked ? 'text-on-surface-variant/40 line-through' : 'text-on-surface group-hover:text-primary'
                          }`}>
                            {ing.name}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold uppercase transition-all ${
                          isChecked ? 'text-on-surface-variant/20' : 'text-on-surface-variant/60'
                        }`}>
                          {ing.amount}
                        </span>
                      </label>
                    );
                  }) : (
                    <p className="text-xs text-on-surface-variant italic">食材清单正在整理中...</p>
                  )}
                </div>
              </section>

              <section>
                 <h2 className="font-display text-xl font-bold text-on-surface mb-8 tracking-tight">分步指南</h2>
                 <div className="flex flex-col gap-10">
                   {selectedRecipe.steps.length > 0 ? selectedRecipe.steps.map((step, i) => (
                     <div key={i} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary shadow-sm border border-primary/5">
                            {i + 1}
                          </div>
                          {i < selectedRecipe.steps.length - 1 && <div className="w-[2px] h-full bg-on-surface-variant/5 mt-4 rounded-full" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <h3 className="font-display font-bold text-lg text-on-surface mb-3 tracking-tight">{step.title}</h3>
                          <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-medium">{step.description}</p>
                          {step.image && (
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-on-surface-variant/5">
                               <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                               <div className="absolute inset-0 bg-black/5" />
                            </div>
                          )}
                        </div>
                     </div>
                   )) : (
                     <p className="text-xs text-on-surface-variant italic">烹饪步骤稍后奉上...</p>
                   )}
                 </div>
              </section>
            </div>
          </motion.div>
        );
      case 'create':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: -50 }}
            className="flex flex-col min-h-screen bg-background pb-32"
          >
            <header className="sticky top-0 z-40 bg-white border-b border-on-surface-variant/5 px-4 h-16 flex items-center justify-between">
              <button onClick={() => setPage('home')} className="p-2 text-on-surface">
                <ArrowLeft size={24} />
              </button>
              <h1 className="font-display text-lg font-bold">创建菜谱</h1>
              <div className="w-10" />
            </header>

            {/* Progress Bar */}
            <div className="px-6 py-8">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-on-surface-variant/10 -translate-y-1/2 z-0" />
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                  <span className="text-[10px] font-bold text-primary">基本信息</span>
                </div>
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2">
                  <div className="w-8 h-8 rounded-full bg-on-surface-variant/10 text-on-surface-variant/40 flex items-center justify-center font-bold text-sm">2</div>
                  <span className="text-[10px] font-bold text-on-surface-variant/40">添加食材</span>
                </div>
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2">
                  <div className="w-8 h-8 rounded-full bg-on-surface-variant/10 text-on-surface-variant/40 flex items-center justify-center font-bold text-sm">3</div>
                  <span className="text-[10px] font-bold text-on-surface-variant/40">步骤详情</span>
                </div>
              </div>
            </div>

            <div className="px-6 space-y-8">
              {/* Image Upload Area */}
              <label className="aspect-[4/3] w-full border-2 border-dashed border-on-surface-variant/20 rounded-2xl flex flex-col items-center justify-center gap-2 bg-surface-container-low text-on-surface-variant/60 cursor-pointer overflow-hidden relative group transition-colors hover:bg-on-surface-variant/5">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setNewRecipe({...newRecipe, image: ev.target?.result as string});
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }} />
                {newRecipe.image ? (
                  <>
                    <img src={newRecipe.image} alt="Recipe preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="mb-1" />
                      <span className="text-xs font-bold">点击更换图片</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Camera size={32} />
                    <span className="text-xs font-bold">上传菜谱成品图</span>
                    <span className="text-[10px] opacity-60">建议比例 4:3 或 16:9</span>
                  </>
                )}
              </label>

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">菜谱名称 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                    placeholder="例如：迷迭香烤春鸡"
                    className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-colors" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">简介故事</label>
                  <textarea 
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({...newRecipe, description: e.target.value})}
                    placeholder="分享这道菜背后的故事，或者烹饪的灵感来源..."
                    rows={4}
                    className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="bg-white rounded-2xl border border-on-surface-variant/10 divide-y divide-on-surface-variant/5 overflow-hidden shadow-sm">
                  <button 
                    onClick={() => { setSelectModalType('time'); setIsSelectModalOpen(true); }}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Clock size={18} />
                      </div>
                      <span className="text-sm font-bold text-on-surface">烹饪时间</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-sm font-bold">
                      <span className={newRecipe.time ? "text-primary" : ""}>{newRecipe.time || '请选择'}</span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                  <button 
                    onClick={() => { setSelectModalType('difficulty'); setIsSelectModalOpen(true); }}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Utensils size={18} />
                      </div>
                      <span className="text-sm font-bold text-on-surface">制作难度</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-sm font-bold">
                      <span className={newRecipe.difficulty ? "text-primary" : ""}>{newRecipe.difficulty || '初级'}</span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                  <button 
                    onClick={() => { setSelectModalType('servings'); setIsSelectModalOpen(true); }}
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={18} />
                      </div>
                      <span className="text-sm font-bold text-on-surface">适用人数</span>
                    </div>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 text-sm font-bold">
                      <span className={newRecipe.servings ? "text-primary" : ""}>{newRecipe.servings || '2-3人'}</span>
                      <ChevronRight size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-background border-t border-on-surface-variant/5 z-40">
              <button 
                onClick={() => setPage('create-step-2')}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                下一步：添加食材 <ArrowRight size={18} />
              </button>
            </div>

            {/* Select Modal */}
            <AnimatePresence>
              {isSelectModalOpen && selectModalType && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0 }}
                    onClick={() => setIsSelectModalOpen(false)}
                    className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                  />
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 w-full bg-surface rounded-t-3xl z-50 p-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-display text-xl font-bold">
                        {selectModalType === 'time' && '选择烹饪时间'}
                        {selectModalType === 'difficulty' && '选择制作难度'}
                        {selectModalType === 'servings' && '选择适用人数'}
                      </h3>
                      <button 
                        onClick={() => setIsSelectModalOpen(false)}
                        className="p-2 bg-surface-container-low rounded-full text-on-surface-variant/60 hover:text-on-surface"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {selectModalType === 'time' && ['10分钟以内', '15-30分钟', '30-60分钟', '1小时以上'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setNewRecipe({ ...newRecipe, time: opt }); setIsSelectModalOpen(false); }}
                          className={`p-4 rounded-2xl border text-sm font-bold transition-all ${newRecipe.time === opt ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-on-surface-variant/10 text-on-surface hover:bg-surface-container-low'}`}
                        >
                          {opt}
                        </button>
                      ))}
                      {selectModalType === 'difficulty' && ['初级', '中级', '高级'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setNewRecipe({ ...newRecipe, difficulty: opt as any }); setIsSelectModalOpen(false); }}
                          className={`p-4 rounded-2xl border text-sm font-bold transition-all ${newRecipe.difficulty === opt ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-on-surface-variant/10 text-on-surface hover:bg-surface-container-low'}`}
                        >
                          {opt}
                        </button>
                      ))}
                      {selectModalType === 'servings' && ['1人份', '2-3人份', '4-5人份', '6人以上'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setNewRecipe({ ...newRecipe, servings: opt }); setIsSelectModalOpen(false); }}
                          className={`p-4 rounded-2xl border text-sm font-bold transition-all ${newRecipe.servings === opt ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-on-surface-variant/10 text-on-surface hover:bg-surface-container-low'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case 'create-step-2':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: -50 }}
            className="flex flex-col min-h-screen bg-background pb-32"
          >
            <header className="sticky top-0 z-40 bg-white border-b border-on-surface-variant/5 px-4 h-16 flex items-center justify-between">
              <button onClick={() => setPage('create')} className="p-2 text-on-surface">
                <X size={24} />
              </button>
              <h1 className="font-display text-lg font-bold">创建菜谱</h1>
              <button className="text-primary font-bold text-sm">存草稿</button>
            </header>

            <div className="relative h-48 bg-surface-container-low overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover opacity-50" 
                alt="Background"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[90%] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white flex justify-between items-center z-10">
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star size={14} className="text-primary" fill="currentColor" />
                  </div>
                  <span className="text-[8px] font-bold">基本信息</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md">2</div>
                  <span className="text-[8px] font-bold text-primary">食材清单</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-6 h-6 rounded-full bg-on-surface-variant/10 flex items-center justify-center">3</div>
                  <span className="text-[8px] font-bold">编写步骤</span>
                </div>
              </div>
            </div>

            <div className="px-6 mt-8">
              <h2 className="font-display text-3xl font-bold mb-3">准备食材</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
                一份好的食谱离不开精准的用量记录。请列出所有需要的材料。
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    已添加食材 ({newRecipe.ingredients?.length || 0})
                  </h3>
                  <div className="space-y-3">
                    {(newRecipe.ingredients || []).map((ing, i) => (
                      <div key={i} className="bg-white border border-on-surface-variant/10 rounded-xl p-4 flex items-center justify-between group shadow-sm">
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-sm">{ing.name}</span>
                          <span className="px-2 py-1 bg-on-surface-variant/5 rounded-md text-[10px] font-bold text-on-surface-variant/60">{ing.amount}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:text-primary"><Pencil size={18} /></button>
                          <button 
                            onClick={() => {
                              const updated = [...(newRecipe.ingredients || [])];
                              updated.splice(i, 1);
                              setNewRecipe({...newRecipe, ingredients: updated});
                            }}
                            className="p-2 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-4">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-primary">
                    <Plus size={18} /> 添加新食材
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">食材名称</label>
                      <input 
                        type="text" 
                        value={currentIngredient.name}
                        onChange={(e) => setCurrentIngredient({...currentIngredient, name: e.target.value})}
                        placeholder="如：大蒜"
                        className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-2 px-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1">用量</label>
                      <input 
                        type="text" 
                        value={currentIngredient.amount}
                        onChange={(e) => setCurrentIngredient({...currentIngredient, amount: e.target.value})}
                        placeholder="如：3瓣"
                        className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-2 px-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (currentIngredient.name && currentIngredient.amount) {
                         setNewRecipe({
                           ...newRecipe, 
                           ingredients: [...(newRecipe.ingredients || []), currentIngredient]
                         });
                         setCurrentIngredient({ name: '', amount: '' });
                      }
                    }}
                    className="w-full py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                  >
                    <Plus size={18} /> 确认添加
                  </button>
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-background border-t border-on-surface-variant/5 z-50 flex gap-4">
              <button 
                onClick={() => setPage('create')}
                className="flex-1 py-4 border border-on-surface-variant/20 rounded-full font-bold text-sm hover:bg-surface-container-low transition-colors"
              >
                上一步
              </button>
              <button 
                onClick={() => setPage('create-step-3')}
                className="flex-[2] py-4 bg-primary text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                下一步：编写步骤 <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        );
      case 'create-step-3':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: -50 }}
            className="flex flex-col min-h-screen bg-background pb-32"
          >
            <header className="sticky top-0 z-40 bg-white border-b border-on-surface-variant/5 px-4 h-16 flex items-center justify-between">
              <button onClick={() => setPage('create-step-2')} className="p-2 text-on-surface">
                <ArrowLeft size={24} />
              </button>
              <h1 className="font-display text-lg font-bold">创建菜谱</h1>
              <button className="text-primary font-bold text-sm">发布</button>
            </header>

            {/* Progress Bar */}
            <div className="px-6 pt-8 pb-4">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 -translate-y-1/2 z-0" />
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2 opacity-40">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star size={16} className="text-primary" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-bold text-primary">基本信息</span>
                </div>
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2 opacity-40">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star size={16} className="text-primary" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-bold text-primary">添加食材</span>
                </div>
                <div className="flex flex-col items-center gap-2 relative z-10 bg-background px-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">3</div>
                  <span className="text-[10px] font-bold text-primary">步骤详情</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
               <h2 className="font-display text-3xl font-bold mb-3">编写步骤</h2>
               <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
                 描述每一个细节，让你的厨艺在别人的厨房里完美再现。
               </p>
               
               <div className="space-y-8">
                 {/* Existing Steps */}
                 {newRecipe.steps && newRecipe.steps.length > 0 && (
                   <div className="space-y-6">
                     <h3 className="text-sm font-bold flex items-center gap-2">
                       已添加步骤 ({newRecipe.steps.length})
                     </h3>
                     <div className="space-y-4">
                       {newRecipe.steps.map((step, i) => (
                         <div key={i} className="bg-white border border-on-surface-variant/10 rounded-2xl p-4 shadow-sm group">
                           <div className="flex items-center justify-between mb-3 border-b border-on-surface-variant/5 pb-3">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                 {i + 1}
                               </div>
                               <h4 className="font-bold text-sm">{step.title}</h4>
                             </div>
                             <button 
                               onClick={() => {
                                 const updated = [...(newRecipe.steps || [])];
                                 updated.splice(i, 1);
                                 setNewRecipe({...newRecipe, steps: updated});
                               }}
                               className="p-2 text-on-surface-variant/40 hover:text-red-500 transition-colors"
                             >
                               <Trash2 size={18} />
                             </button>
                           </div>
                           <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                           {step.image && (
                             <img src={step.image} alt="Step preview" className="w-full h-32 object-cover rounded-xl mt-3" />
                           )}
                         </div>
                       ))}
                     </div>
                   </div>
                 )}

                 {/* Add New Step Form */}
                 <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 space-y-5">
                   <h4 className="text-sm font-bold flex items-center gap-2 text-primary">
                     <Plus size={18} /> {newRecipe.steps && newRecipe.steps.length > 0 ? '添加下一步' : '添加第一个步骤'}
                   </h4>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1.5">步骤标题</label>
                       <input 
                         type="text" 
                         value={currentStep.title}
                         onChange={(e) => setCurrentStep({...currentStep, title: e.target.value})}
                         placeholder="如：准备食材"
                         className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-colors"
                       />
                     </div>
                     
                     <div>
                       <label className="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1.5">步骤描述</label>
                       <textarea 
                         value={currentStep.description}
                         onChange={(e) => setCurrentStep({...currentStep, description: e.target.value})}
                         placeholder="详细描述这一步的做法..."
                         rows={3}
                         className="w-full bg-white border border-on-surface-variant/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-primary transition-colors resize-none"
                       />
                     </div>

                     <div>
                       <label className="block text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-1.5">步骤配图 (可选)</label>
                       <label 
                         className={`aspect-[2/1] w-full rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                           currentStep.image 
                             ? 'border-none p-0 overflow-hidden relative' 
                             : 'border-2 border-dashed border-primary/30 hover:bg-primary/10 bg-primary/5 text-primary/60'
                         }`}
                       >
                         <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                               const reader = new FileReader();
                               reader.onload = (ev) => setCurrentStep({...currentStep, image: ev.target?.result as string});
                               reader.readAsDataURL(e.target.files[0]);
                            }
                         }} />
                         {currentStep.image ? (
                           <>
                             <img src={currentStep.image} alt="Upload preview" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                               <Camera size={24} className="mb-1" />
                               <span className="text-xs font-bold">点击更换图片</span>
                             </div>
                           </>
                         ) : (
                           <>
                             <Camera size={24} />
                             <span className="text-xs font-bold">点击上传步骤图</span>
                           </>
                         )}
                       </label>
                     </div>
                   </div>

                   <button 
                     onClick={() => {
                       if (currentStep.title && currentStep.description) {
                          setNewRecipe({
                            ...newRecipe, 
                            steps: [...(newRecipe.steps || []), currentStep as Step]
                          });
                          setCurrentStep({ title: '', description: '', image: '' });
                       } else {
                          setToast('请输入标题和描述！');
                       }
                     }}
                     className="w-full py-3.5 border-2 border-primary text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors bg-white mt-2"
                   >
                     <Plus size={18} /> 确认添加本步骤
                   </button>
                 </div>
               </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-background border-t border-on-surface-variant/5 z-50 flex gap-4">
              <button 
                onClick={() => setPage('create-step-2')}
                className="flex-1 py-4 border border-on-surface-variant/20 rounded-full font-bold text-sm"
              >
                上一步
              </button>
              <button 
                onClick={() => {
                   if (!newRecipe.steps || newRecipe.steps.length === 0) {
                      setToast('请至少添加一个步骤！');
                      return;
                   }
                   
                   const isEditing = !!newRecipe.id;
                   const completeRecipe = {
                     ...newRecipe,
                     id: newRecipe.id || Date.now().toString(),
                     rating: newRecipe.rating || 5.0,
                     category: newRecipe.category || '家常菜',
                     tags: newRecipe.tags || ['新发布'],
                     image: newRecipe.image || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
                     title: newRecipe.title || '未命名菜谱',
                     isOwner: true,
                   } as Recipe;
                   
                   if (isEditing) {
                     setRecipes(recipes.map(r => r.id === completeRecipe.id ? completeRecipe : r));
                     setToast('菜谱更新成功！');
                   } else {
                     setRecipes([completeRecipe, ...recipes]);
                     setToast('恭喜，菜谱发布成功！');
                   }
                   
                   setNewRecipe({
                     title: '', description: '', time: '', difficulty: '初级' as any, servings: '2-3人', ingredients: [], steps: []
                   });
                   setTimeout(() => setPage('my-works'), 1500);
                }}
                className="flex-[2] py-4 bg-primary text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                完成并发布 <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        );
      case 'history':
      case 'my-works':
        const displayRecipes = currentPage === 'history' && historyCleared ? [] : (currentPage === 'my-works' ? recipes.filter(r => r.isOwner) : recipes.slice(0, 3));
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0 }}
            className="flex flex-col gap-6 pb-24"
          >
            <TopBar title={currentPage === 'history' ? '浏览记录' : '我的作品'} onBack={() => setPage('profile')} />
            <section className="px-4 py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-on-surface">{currentPage === 'history' ? '最近查看' : '已发布作品'}</h2>
                {currentPage === 'history' && !historyCleared && (
                  <button onClick={() => setHistoryCleared(true)} className="text-[10px] font-bold text-primary uppercase tracking-widest">清空记录</button>
                )}
              </div>
              
              {displayRecipes.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {displayRecipes.map((recipe) => (
                    <div 
                      key={recipe.id} 
                      className="flex items-center gap-4 p-3 bg-white rounded-2xl shadow-sm border border-on-surface-variant/5 hover:bg-surface-container-low transition-colors group relative"
                    >
                      <div 
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                        onClick={() => { setSelectedRecipe(recipe); setPage('recipe-detail'); }}
                      >
                        <img src={recipe.image} alt={recipe.title} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">{recipe.title}</h3>
                          <p className="text-[10px] font-bold text-on-surface-variant/60 flex items-center gap-1.5 mt-1 sm:mt-2 uppercase tracking-wider">
                            <Clock size={14} /> {recipe.time} • <Utensils size={14} /> {recipe.difficulty}
                          </p>
                        </div>
                      </div>
                      
                      {currentPage === 'my-works' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setNewRecipe(recipe);
                            setPage('create');
                          }}
                          className="p-2.5 mr-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-95 z-10"
                          aria-label="编辑菜谱"
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20">
                    <History size={32} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface mb-1">暂无{currentPage === 'history' ? '记录' : '作品'}</p>
                    <p className="text-xs text-on-surface-variant/60">
                      {currentPage === 'history' ? '您还没有浏览过任何菜谱' : '快去发布你的第一道菜谱吧'}
                    </p>
                  </div>
                </div>
              )}
            </section>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: 50 }}
            className="flex flex-col gap-8 pb-24"
          >
             <TopBar title="设置" onBack={() => setPage('profile')} />
             <section className="px-4 space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-on-surface-variant/60 mb-3 px-2 uppercase tracking-[0.2em]">通用设置</h3>
                  <div className="bg-white rounded-2xl shadow-sm border border-on-surface-variant/10 overflow-hidden">
                    <button onClick={(e) => showFeedback(e, '敬请期待')} className="w-full flex items-center justify-between p-4 border-b border-on-surface-variant/5 hover:bg-surface-container-low transition-colors">
                      <span className="text-sm font-bold text-on-surface">账号管理</span>
                      <ChevronRight size={18} className="text-on-surface-variant/30" />
                    </button>
                    <button onClick={(e) => showFeedback(e, '敬请期待')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
                      <span className="text-sm font-bold text-on-surface">通知设置</span>
                      <ChevronRight size={18} className="text-on-surface-variant/30" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-on-surface-variant/60 mb-3 px-2 uppercase tracking-[0.2em]">关于丰收厨房</h3>
                  <div className="bg-white rounded-2xl shadow-sm border border-on-surface-variant/10 overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-on-surface-variant/5">
                      <span className="text-sm font-bold text-on-surface">当前版本</span>
                      <span className="text-xs font-bold text-on-surface-variant/40">2.4.1</span>
                    </div>
                    <button onClick={(e) => showFeedback(e, '敬请期待')} className="w-full flex items-center justify-between p-4 border-b border-on-surface-variant/5 hover:bg-surface-container-low transition-colors">
                      <span className="text-sm font-bold text-on-surface">服务协议</span>
                      <ChevronRight size={18} className="text-on-surface-variant/30" />
                    </button>
                    <button onClick={(e) => showFeedback(e, '敬请期待')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
                      <span className="text-sm font-bold text-on-surface">隐私政策</span>
                      <ChevronRight size={18} className="text-on-surface-variant/30" />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => showFeedback({ stopPropagation: () => {} } as any, '已退出登录')}
                  className="w-full py-4 text-red-500 font-bold text-xs uppercase tracking-[0.2em] border-t border-on-surface-variant/10 mt-4"
                >
                  退出登录
                </button>
             </section>
          </motion.div>
        );
      case 'tools':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: 50 }}
            className="flex flex-col gap-8 pb-24"
          >
             <TopBar title="厨房工具" onBack={() => setPage('home')} />
             <section className="px-4 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-on-surface-variant/5">
                  <h3 className="font-display font-bold text-lg mb-2">单位换算</h3>
                  <p className="text-xs text-on-surface-variant mb-4">快速换算容量、重量、温度。</p>
                  <button onClick={(e) => showFeedback(e, '敬请期待')} className="text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-xl">使用工具</button>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-on-surface-variant/5">
                  <h3 className="font-display font-bold text-lg mb-2">智能计时器</h3>
                  <p className="text-xs text-on-surface-variant mb-4">多任务并行提示，烹饪不再手忙脚乱。</p>
                  <button onClick={(e) => showFeedback(e, '敬请期待')} className="text-primary text-sm font-bold bg-primary/10 px-4 py-2 rounded-xl">使用工具</button>
                </div>
             </section>
          </motion.div>
        );
      case 'offline':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: 50 }}
            className="flex flex-col gap-8 pb-24"
          >
             <TopBar title="离线菜谱" onBack={() => setPage('home')} />
             <section className="px-4 py-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/20">
                  <BookMarked size={32} />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface mb-1">暂无离线内容</p>
                  <p className="text-xs text-on-surface-variant/60">开启自动缓存以在无网络时查看菜谱</p>
                </div>
                <button onClick={(e) => showFeedback(e, '已开启离线缓存')} className="mt-4 text-white text-sm font-bold bg-primary px-6 py-2.5 rounded-full shadow-sm">
                  开启离线缓存
                </button>
             </section>
          </motion.div>
        );
      case 'feedback':
      case 'help':
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }} exit={{ opacity: 0, x: 50 }}
            className="flex flex-col gap-6 pb-24"
          >
             <TopBar title={currentPage === 'feedback' ? '意见反馈' : '帮助中心'} onBack={() => setPage('profile')} />
             <section className="px-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-on-surface-variant/5">
                  <h3 className="font-display font-bold text-lg mb-4">{currentPage === 'feedback' ? '告诉我们您的想法' : '需要帮忙吗？'}</h3>
                  <textarea 
                    rows={4}
                    className="w-full bg-surface-container-low border border-on-surface-variant/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/30 mb-4"
                    placeholder={currentPage === 'feedback' ? '分享您的建议...' : '描述您遇到的问题...'}
                  />
                  <button 
                    onClick={(e) => {
                      showFeedback(e, '提交成功，感谢您的反馈！');
                      setTimeout(() => setPage('profile'), 1500);
                    }}
                    className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"
                  >
                    提交
                  </button>
                </div>
             </section>
          </motion.div>
        );
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative overflow-x-hidden font-body selection:bg-primary/20 transition-colors">
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        setPage={setPage} 
      />
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
      <AnimatePresence>
        {toast && <Toast message={toast} clear={() => setToast(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isShareModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsShareModalOpen(false)}
               className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: "spring", stiffness: 260, damping: 25 }} 
               className="fixed bottom-0 left-0 w-full bg-surface z-[101] rounded-t-3xl overflow-hidden pb-safe flex flex-col"
            >
              <div className="flex items-center justify-between p-6 pb-2">
                <h3 className="font-display font-bold text-lg text-on-surface">分享菜谱</h3>
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-2 bg-surface-container-low rounded-full text-on-surface-variant/60 hover:text-on-surface transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-x-auto max-w-full">
                <div className="flex gap-6 min-w-max pb-4">
                  <button onClick={() => handleShareAction('微信')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-[#07C160]/10 text-[#07C160] flex items-center justify-center group-active:scale-90 transition-transform">
                      <MessageSquare size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">微信</span>
                  </button>
                  <button onClick={() => handleShareAction('朋友圈')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-[#07C160]/10 text-[#07C160] flex items-center justify-center group-active:scale-90 transition-transform">
                      <Compass size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">朋友圈</span>
                  </button>
                  <button onClick={() => handleShareAction('Twitter')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-black/5 text-black flex items-center justify-center group-active:scale-90 transition-transform">
                      <Twitter size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">Twitter</span>
                  </button>
                  <button onClick={() => handleShareAction('Instagram')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center group-active:scale-90 transition-transform">
                      <Instagram size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">Instagram</span>
                  </button>
                  <button onClick={() => handleShareAction('Facebook')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center group-active:scale-90 transition-transform">
                      <Facebook size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">Facebook</span>
                  </button>
                  <button onClick={() => handleShareAction('Email')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center group-active:scale-90 transition-transform">
                      <Mail size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">邮件分享</span>
                  </button>
                  <button onClick={() => handleShareAction('copy')} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center group-active:scale-90 transition-transform">
                      <Link size={28} />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant">复制链接</span>
                  </button>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button 
                  onClick={() => setIsShareModalOpen(false)}
                  className="w-full py-4 rounded-2xl bg-surface-container-low text-on-surface font-bold hover:bg-surface-container transition-colors"
                >
                  取消
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav currentPage={currentPage} setPage={setPage} />
    </div>
  );
}
