import { Recipe } from './types';

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: '乡村香草柠檬烤鸡',
    description: '乡村香草柠檬烤鸡，外皮酥脆，肉质多汁。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_P8P0FQWu2fcSRbqX3e2E31yyIUd_oC1Ht0fNKLj7ZvjwbcyRd9OPL5uxH_iRITXzEuH9bO5Oqc8VXE5TvkYRXQca7vDu-EZWZf4sO63dYkRH86pMZZvssDlYz8qTc43z9HTRSYyEaORBuchBr0MH3Rk-KjMkjkq7GWvPp65Q6E8Pq0-UMurdfCm943dMjWdvKW7kErut5eXn0p-EofzRar6WxyE4oKzDROsnIbIH_V_KMguO_PRuODj1f2pDAmLpAN3OkeNzZTSK',
    time: '1小时15分钟',
    difficulty: '中等',
    servings: '4 人份',
    category: '晚餐',
    tags: ['精品推荐'],
    rating: 4.9,
    ingredients: [],
    steps: []
  },
  {
    id: '2',
    title: '牛油果藜麦营养碗',
    description: '健康活力的营养碗，充满色彩与活力。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxu9aiZ_FXlyyyMxSk9ZFDuEk8Z-lshrfqWfajEoSrwHJ7cTh_KT61h7Pi-PNoBDsMU_d9LipQbuaAh37qrMqs4XzkcuCMGveEWJ0BBakl1CBBztrgj8bcPUPG7ZMb979v_m6S2ooNIbwVgFiow8N3CGJOuSqjwis-LN8ZyBHDrIL6KOHcAy1eBYUJ7ipYcnzD7Zo5XHzdRb2H5T1_-UGLN9wyjMvpQSdwBv-kbpgs4gjj-zx0xwOmEg2oAoRzlsck9VxsJL34XDNk',
    time: '20分钟',
    difficulty: '简单',
    servings: '2 人份',
    category: '午餐',
    tags: ['健康', '素食'],
    rating: 4.9,
    ingredients: [],
    steps: []
  },
  {
    id: '3',
    title: '经典番茄罗勒意面',
    description: '最纯粹的意大利风味。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDglg8nhk29qQSjqiCG9HoVGOK2k-_ks2RHAtmy2JfnbqD_OAfrTUAzarPlwwm1kmJ5whKcz4hb2ghlKtze0lKQRkh0CdYJJevfQg1dJGacOmAv40SC7F__2DVZIAg24KKUrv0gTitjelEN2E8llZPPESzXo_0eCyfYYuKrZoSPvEFXjn1mYkKx8zjZezixKqiLO_srjy9sngZpBRUckB1sh5PMuOXM6Vh4YSqpXMAuynloab0i81iJ1cbb2hH0rFFyNrU8c0LMOpzF',
    time: '35分钟',
    difficulty: '简单',
    servings: '2 人份',
    category: '晚餐',
    tags: ['经典', '家常'],
    rating: 4.8,
    ingredients: [],
    steps: []
  },
  {
    id: '4',
    title: '香草烤三文鱼',
    description: '肉质鲜嫩的三文鱼搭配香脆的草药层。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWoYQsref74g0ms7Y7oW83u8pelELxOJk4azXmtmkiK5kmeJlspeEiEDoqxwkGi5pIG6IyonbVOnmniYbeSP2cOlfcgfccnMBPTrX16-N3kbuFx2nRKrUNQl2YmgxB7skMUR_uoOHJr_LQWPdz62sci_PiJ3HBUW9vNUnB_uhtFORcZq5UiMX4rVpqmm_PMuSS7AbkeZuV-A0bPK0GQqxlrafMPhp9xVuRSCVOGg9ecg6fzehvKrQzxNKg1mwWpfwOKlFPMpZIpabM',
    time: '25 分钟',
    difficulty: '简单',
    servings: '2 人份',
    category: '晚餐',
    tags: ['晚餐精选'],
    rating: 4.9,
    ingredients: [
      { name: '中段三文鱼柳', amount: '2 块' },
      { name: '橄榄油', amount: '30 毫升' },
      { name: '新鲜欧芹，切碎', amount: '15 克' },
      { name: '大蒜，切碎', amount: '2 瓣' },
      { name: '柠檬', amount: '1/2 个' },
      { name: '盐和黑胡椒', amount: '适量' }
    ],
    steps: [
      {
        title: '准备香草脆皮',
        description: '在一个小碗中，将蒜末、切碎的欧芹、少许盐和橄榄油混合成糊状。确保香草切得足够碎以获得最佳口感。',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6INQ6aZnK0Z-en9QXakHv3fkt2hFcf4Rm87YhbN1p8dqKl_PkAp41IWggSZYTnsY2Zf0LM9Scv1o1_-f0q5LNaDZG331CM8Dg9lrAzNuPutV535lBIh2ytBJvgC2wqHdrSF0IfUtek7AwASXFLqEPJvlVhROO9FcZCqqVip4D2CAiEuYa93rUvoKB8nHPklGIpQSvkKoOVaT_F9Xx3c3RgNBfLbqTEzBwCQ1OWIDmUhDd1T4H_U2v59ABQTwDHrxYTDp00ioUL84h'
      },
      {
        title: '涂抹三文鱼',
        description: '用纸巾将三文鱼柳拍干。将香草混合物均匀地涂抹在每块三文鱼柳的顶部，轻轻按压使其贴合。静置 5 分钟。',
      },
      {
        title: '完美烘烤',
        description: '将三文鱼柳放在铺有烘焙纸的烤盘上。放入预热至 200°C 的烤箱中烘烤 12-15 分钟，或直到三文鱼变得不透明且容易用叉子剥开。',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHeMXwcO0IFCM2f4QPbvBUmZgtjAeO8QXqT1DFPDQNeaBQGfu1nPrwKJxY7qyekMWcQxwfnfyQF26BcbXKidaH6WBKERqtT_fkp9MRhtFZ9RSxoAJGS4qwHYyQ95v5MA4qXqAq4_DBw1qvZI3lqGOl2Y1RtxM-JMAPB1b4ngLCy2jEwnOpmFHxNPtfGhvINyRE_JWo4-miQxJ-hFUL2O8RtPmXF6_ii1pJvbuRE_xuEvxjo-ioB_Qy7UbN6R-bppCs-bzPtA9iOsHw'
      }
    ]
  },
  {
    id: '5',
    title: '手工乡村酸面团',
    description: '传统的发酵工艺。',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxRGIyrsnXu002xY0GXzr4SqpHgbZ3Kh2NCawDsjj-WP959DKPfxQVlR8Ox8zH4CTYld_oh4j6PcLWeHoaSSoNJOO10UXz4R-G5BaNgZ0KH6M65WADzrz0stLtyutzWK-C5aXvaebAiVS9aJ0RGjtrVLkIMfFgekj3K6yHs_N0Icw_g7baAdZXgK2wZIR65748E-klpHS-klTsnxbBUX4JagfT5L3uwLxpl_dodAd_lxLDq3tdFpGH7A1Uc0v0RnrtrtOcNx0C0ol-',
    time: '24小时',
    difficulty: '困难',
    servings: '1 块',
    category: '烘焙',
    tags: ['传统做法'],
    rating: 4.8,
    ingredients: [],
    steps: []
  }
];

export const CATEGORIES = [
  { id: '1', name: '推荐', icon: 'Star' },
  { id: '2', name: '早餐', icon: 'BakeryDining' },
  { id: '3', name: '午餐', icon: 'LunchDining' },
  { id: '4', name: '晚餐', icon: 'Utensils' },
  { id: '5', name: '烘焙', icon: 'IceCream' },
];

export const INGREDIENTS_CATEGORIES = [
  { name: '肉类', icon: 'Fish', enName: 'Meat', color: 'bg-red-50' },
  { name: '蔬菜', icon: 'LeafyGreen', enName: 'Vegetables', color: 'bg-green-50' },
  { name: '海鲜', icon: 'FishSymbol', enName: 'Seafood', color: 'bg-blue-50' },
  { name: '主食', icon: 'RiceBowl', enName: 'Staples', color: 'bg-orange-50' },
];

export const FLAVORS = ['麻辣 (Spicy)', '清淡 (Light)', '酸甜 (Sweet & Sour)', '酱香 (Savory Sauce)'];
