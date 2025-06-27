import { IMintPasses } from '../../stores/CardStore'

export const cardsUrl = 'https://minebarons.io/cards/'
export const actualCraftNoLvls = [
    {
        link: '/assets/images/farm_pass.jpg',
        placeholder: '/assets/images/farm_pass.jpg',
        item: 'farm_pack',
        type: 'farm_pack',
    },
    {
        link: '/assets/images/mine_pass.jpg',
        placeholder: '/assets/images/mine_pass.jpg',
        item: 'mine_pack',
        type: 'mine_pack',
    },
    {
        link: '/assets/images/queen_pass.jpg',
        placeholder: '/assets/images/queen_pass.jpg',
        item: 'queen_pack',
        type: 'queen_pack',
    },
    {
        link: '/assets/images/king_pass.jpg',
        placeholder: '/assets/images/king_pass.jpg',
        item: 'king_pack',
        type: 'king_pack',
    },
    {
        link: '/assets/images/cards/farm.jpg',
        placeholder: '/assets/images/cards/farm.jpg',
        item: 'farmLvL1',
        type: 'farm',
    },
    {
        link: '/assets/images/cards/field.jpg',
        placeholder: '/assets/images/cards/field.jpg',
        item: 'fieldLvL1',
        type: 'field',
    },
    {
        link: '/assets/images/cards/sawmill.jpg',
        placeholder: '/assets/images/cards/sawmill.jpg',
        item: 'sawmillLvL1',
        type: 'sawmill',
    },
    {
        link: '/assets/images/cards/stone_mine.jpg',
        placeholder: '/assets/images/cards/stone_mine.jpg',
        item: 'stoneMineLvL1',
        type: 'stone',
    },
    {
        link: '/assets/images/cards/iron_mine.jpg',
        placeholder: '/assets/images/cards/iron_mine.jpg',
        item: 'ironMineLvL1',
        type: 'iron',
    },
    {
        link: '/assets/images/cards/gold_mine.jpg',
        placeholder: '/assets/images/cards/gold_mine.jpg',
        item: 'goldMineLvL1',
        type: 'gold',
    },
    {
        link: '/assets/images/cards/blue_amulet.jpg',
        placeholder: '/assets/images/cards/blue_amulet.jpg',
        item: 'blueAmuletLvL1',
        type: 'blueAmulet',
    },
    {
        link: '/assets/images/cards/red_amulet.jpg',
        placeholder: '/assets/images/cards/red_amulet.jpg',
        item: 'redAmuletLvL1',
        type: 'redAmulet',
    },
    {
        link: '/assets/images/cards/green_amulet.jpg',
        placeholder: '/assets/images/cards/green_amulet.jpg',
        item: 'greenAmuletLvL1',
        type: 'greenAmulet',
    },

    {
        link: '/assets/images/cards/militia_spearmans.jpg',
        placeholder: '/assets/images/cards/militia_spearmans.jpg',
        item: 'pick',
        type: 'pick',
    },
    {
        link: '/assets/images/cards/militia_archers.jpg',
        placeholder: '/assets/images/cards/militia_archers.jpg',
        item: 'bowsMilitiaLvL1',
        type: 'bowsMilitia',
    },
    {
        link: '/assets/images/cards/spearman.jpg',
        placeholder: '/assets/images/cards/spearman.jpg',
        item: 'spearLvL1',
        type: 'spearL',
    },
    {
        link: '/assets/images/cards/archer.jpg',
        placeholder: '/assets/images/cards/archer.jpg',
        item: 'archerLvL1',
        type: 'archer',
    },
    {
        link: '/assets/images/cards/swordsman.jpg',
        placeholder: '/assets/images/cards/swordsman.jpg',
        item: 'swordLvL1',
        type: 'sword',
    },
    {
        link: '/assets/images/cards/cavalry.jpg',
        placeholder: '/assets/images/cards/cavalry.jpg',
        item: 'cavalryLvL1',
        type: 'cavalry',
    },
    {
        link: '/assets/images/cards/siege_weapon.jpg',
        placeholder: '/assets/images/cards/siege_weapon.jpg',
        item: 'siegeLvL1',
        type: 'siege',
    },
]
export const res = (type: string) => {
    if (type === 'horse') return 'assets/images/resources/farm.png'
    if (type === 'gold') return 'assets/images/resources/gold.png'
    if (type === 'stone') return 'assets/images/resources/stone.png'
    if (type === 'iron') return 'assets/images/resources/coal.png'
    if (type === 'wood') return 'assets/images/resources/wood.png'
    if (type === 'food') return 'assets/images/resources/food.png'
    else return ''
}
export const actualCraft = [
    {
        link: '../../assets/images/cards/farm_lv1.jpg',
        item: 'farmLvL1',
        type: 'farm',
    },
    {
        link: '../../assets/images/cards/field_lv1.jpg',
        item: 'fieldLvL1',
        type: 'field',
    },
    {
        link: '../../assets/images/cards/sawmill_lv1.jpg',
        item: 'sawmillLvL1',
        type: 'sawmill',
    },
    {
        link: '../../assets/images/cards/stone_mine_lv1.jpg',
        item: 'stoneMineLvL1',
        type: 'stone',
    },
    {
        link: '../../assets/images/cards/iron_mine_lv1.jpg',
        item: 'ironMineLvL1',
        type: 'iron',
    },
    {
        link: '../../assets/images/cards/gold_mine_lv1.jpg',
        item: 'goldMineLvL1',
        type: 'gold',
    },
    {
        link: '../../assets/images/cards/blue_amulet_lv1.jpg',
        item: 'blueAmulet',
        type: 'blueAmulet',
    },
    {
        link: '../../assets/images/cards/red_amulet_lv1.jpg',
        item: 'redAmulet',
        type: 'redAmulet',
    },
    {
        link: '../../assets/images/cards/green_amulet_lv1.jpg',
        item: 'greenAmulet',
        type: 'greenAmulet',
    },
    {
        link: '../../assets/images/cards/militia_spearmens_lv1.jpg',
        item: 'spearsMilitiaLvL1',
        type: 'spearsMilitia',
    },
    {
        link: '../../assets/images/cards/militia_archers_lv1.jpg',
        item: 'bowsMilitiaLvL1',
        type: 'bowsMilitia',
    },
    {
        link: '../../assets/images/cards/spearman_lv1.jpg',
        item: 'spearLvL1',
        type: 'spear',
    },
    {
        link: '../../assets/images/cards/archer_lv1.jpg',
        item: 'archerLvL1',
        type: 'archer',
    },
    {
        link: '../../assets/images/cards/swordsman_lv1.jpg',
        item: 'swordLvL1',
        type: 'sword',
    },
    {
        link: '../../assets/images/cards/cavalry_lv1.jpg',
        item: 'cavalryLvL1',
        type: 'cavalry',
    },
    {
        link: '../../assets/images/cards/siege_weapon_lv1.jpg',
        item: 'siegeLvL1',
        type: 'siege',
    },
]
export const craft = [
    'assets/images/cards/cavalry_lv1.jpg',
    'assets/images/cards/spearman_lv1.jpg',
    'assets/images/cards/archer_lv1.jpg',
    'assets/images/cards/swordsman_lv1.jpg',
    'assets/images/cards/militia_spearmens_lv1.jpg',
    'assets/images/cards/militia_archers_lv1.jpg',
    'assets/images/cards/stone_mine_lv1.jpg',
    'assets/images/cards/farm_lv1.jpg',
    'assets/images/cards/iron_mine_lv1.jpg',
    'assets/images/cards/gold_mine_lv1.jpg',
    'assets/images/cards/sawmill_lv1.jpg',
    'assets/images/cards/farm_lv1.jpg',
    'assets/images/cards/land_lv1.jpg',
    'assets/images/cards/siege_weapon_lv1.jpg',
    'assets/images/cards/red_amulet_lv1.jpg',
    'assets/images/cards/blue_amulet_lv1.jpg',
]

export const getRightPlaceholder = (name?: string) => {
    if (!name) return 'assets/images/cards/farm.jpg'
    if (name.includes('pack_farm'))
        return 'assets/images/cards/placeholders/pack_farm.png'
    if (name.includes('pack_king'))
        return 'assets/images/cards/placeholders/pack_king.png'
    if (name.includes('pack_queen'))
        return 'assets/images/cards/placeholders/pack_queen.png'
    if (name.includes('pack_mine'))
        return 'assets/images/cards/placeholders/pack_mine.png'
    if (name.includes('token'))
        return 'assets/images/cards/placeholders/pack_tokens.png'
    if (name.includes('farm'))
        return 'assets/images/cards/placeholders/farm.jpg'
    if (name.includes('field'))
        return 'assets/images/cards/placeholders/field.jpg'
    if (name.includes('sawmill'))
        return 'assets/images/cards/placeholders/sawmill.jpg'
    if (name.includes('stoneMine'))
        return 'assets/images/cards/placeholders/stone_mine.jpg'
    if (name.includes('ironMine'))
        return 'assets/images/cards/placeholders/iron_mine.jpg'
    if (name.includes('goldMine'))
        return 'assets/images/cards/placeholders/gold_mine.jpg'
    if (name.includes('blueAmulet'))
        return 'assets/images/cards/placeholders/blue_amulet.jpg'
    if (name.includes('redAmulet'))
        return `assets/images/cards/placeholders/red_amulet.jpg`
    if (name.includes('greenAmulet'))
        return `assets/images/cards/placeholders/green_amulet.jpg`
    if (name.includes('spearsMilitia'))
        return 'assets/images/cards/placeholders/militia_spearmans.jpg'
    if (name.includes('bowsMilitia'))
        return 'assets/images/cards/placeholders/militia_archers.jpg'
    if (name.includes('spear'))
        return 'assets/images/cards/placeholders/spearman.jpg'
    if (name.includes('archer'))
        return 'assets/images/cards/placeholders/archer.jpg'
    if (name.includes('sword'))
        return 'assets/images/cards/placeholders/swordsman.jpg'
    if (name.includes('cavalry'))
        return `assets/images/cards/placeholders/cavalry.jpg`
    if (name.includes('siege'))
        return `assets/images/cards/placeholders/siege_weapon.jpg`
    else return 'assets/images/cards/placeholders/siege_weapon.jpg'
}
export const getRightImage = (
    name: string,
    quality?: number,
    wearOut?: number,
    level?: number,
) => {
    // console.log('%chandlers.ts line:184 quality', 'color: #007acc;',name, quality,wearOut,level);
    let lvl = name.slice(-1)
    if (name.includes('token')) return `${cardsUrl + 'tokens'}.jpg`
    if (name.includes('pack')) return `${cardsUrl + name}.jpg`
    if (name.includes('farm'))
        return `${cardsUrl}farm-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('field'))
        return `${cardsUrl}field-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('sawmill'))
        return `${cardsUrl}sawmill-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('stoneMine'))
        return `${cardsUrl}stone_mine-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('ironMine'))
        return `${cardsUrl}iron_mine-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('goldMine'))
        return `${cardsUrl}gold_mine-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('blueAmulet'))
        return `${cardsUrl}blue_amulet-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('redAmulet'))
        return `${cardsUrl}red_amulet-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('greenAmulet'))
        return `${cardsUrl}green_amulet-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('spearsMilitia'))
        return `${cardsUrl}militia_spearmans-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('bowsMilitia'))
        return `${cardsUrl}militia_archers-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('spear'))
        return `${cardsUrl}spearman-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('archer'))
        return `${cardsUrl}archer-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('sword'))
        return `${cardsUrl}swordsman-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
    if (name.includes('cavalry'))
        return `${cardsUrl}cavalry-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`

    if (name.includes('siege'))
        return `${cardsUrl}siege_weapon-${
            level ? level : lvl
        }-${quality}-${wearOut?.toFixed(0)}.jpg`
}
export const getRightItemName = (name: string) => {
    if (name.includes('mine_pack')) return 'Mine pack'
    if (name.includes('queen_pack')) return 'Queen pack'
    if (name.includes('farm_pack')) return 'Farm pack'
    if (name.includes('king_pack')) return 'King pack'
    if (name.includes('tokens_pack')) return 'Tokens pack'
    if (name.includes('farm')) return 'Farm level ' + name[name.length - 1]
    if (name.includes('field')) return 'Field level ' + name[name.length - 1]
    if (name.includes('stone'))
        return 'Stone mine level ' + name[name.length - 1]
    if (name.includes('iron')) return 'Iron mine level ' + name[name.length - 1]
    if (name.includes('gold')) return 'Gold mine level ' + name[name.length - 1]
    if (name.includes('sword'))
        return 'Swordsman level ' + name[name.length - 1]
    if (name.includes('sawmill'))
        return 'Sawmill level ' + name[name.length - 1]
    if (name.includes('spearsMilitia'))
        return 'Militia Spearmans level ' + name[name.length - 1]
    if (name.includes('spear')) return 'Spearman level ' + name[name.length - 1]
    if (name.includes('archer')) return 'Archer level ' + name[name.length - 1]
    if (name.includes('bowsMilitia'))
        return 'Militia Archers level ' + name[name.length - 1]
    if (name.includes('blueAmulet'))
        return 'Blue Amulet level ' + name[name.length - 1]
    if (name.includes('redAmulet'))
        return 'Red Amulet level ' + name[name.length - 1]
    if (name.includes('greenAmulet'))
        return 'Green Amulet level ' + name[name.length - 1]
    if (name.includes('siege'))
        return 'Siege weapon level ' + name[name.length - 1]
    if (name.includes('cavalry'))
        return 'Cavalry level ' + name[name.length - 1]
    else return name
}
export const getLoot = (type?: string) => {
    if (type?.includes('king'))
        return 'random Land x 1, max quality Gold Mine x 2, max quality (Farm or Field or Sawmill or Mine) x 3'
    if (type?.includes('queen'))
        return 'random Land x 1, max quality Gold Mine x 1, chance (15%) to get +1 Gold Mine!'
    if (type?.includes('mine'))
        return 'max quality (Stone or Iron Mine) x 2, chance (5%) to get Gold Mine!'
    if (type?.includes('token')) return '5000 MBM'
    if (type?.includes('farm'))
        return 'max quality (Farm or Field or Sawmill) x 2, chance (10%) to get +1 Farm or Field'
    else return '??'
}
export const getPacksValue = (type?: string, user?: any) => {
    if (type?.includes('queen') && user?.queenPack) return user?.queenPack
    if (type?.includes('king') && user?.kingPack) return user?.kingPack
    if (type?.includes('mine') && user?.minePack) return user?.minePack
    if (type?.includes('farm') && user?.farmPack) return user?.farmPack
    if (type?.includes('token') && user?.farmPack) return user?.tokenPack
    else return 0
}
export const getPacksMintedValue = (type?: string, user?: any) => {
    if (type?.includes('queen') && user?.queenPack) return user?.queenPackOpen
    if (type?.includes('king') && user?.kingPack) return user?.kingPackOpen
    if (type?.includes('mine') && user?.minePack) return user?.minePackOpen
    if (type?.includes('farm') && user?.farmPack) return user?.farmPackOpen
    if (type?.includes('token') && user?.farmPack) return user?.tokenPackOpen
    else return 0
}
export const getRightCardTitle = (name: string) => {
    if (name.includes('field')) return 'Field'
    if (name.includes('farm')) return 'Farm'
    if (name.includes('stone')) return 'Stone mine'
    if (name.includes('iron')) return 'Iron mine'
    if (name.includes('gold')) return 'Gold mine'
    if (name.includes('sword')) return 'Swordsman'
    if (name.includes('sawmill')) return 'Sawmill'
    if (name.includes('spearsMilitia')) return 'Militia Spearmans'
    if (name.includes('spear')) return 'Spearman'
    if (name.includes('archer')) return 'Archer'
    if (name.includes('bowsMilitia')) return 'Militia Archers'
    if (name.includes('blueAmulet')) return 'Blue Amulet'
    if (name.includes('redAmulet')) return 'Red Amulet'
    if (name.includes('greenAmulet')) return 'Green Amulet'
    if (name.includes('siege')) return 'Siege weapon'
    if (name.includes('cavalry')) return 'Cavalry'
    else return name
}

export const getRightLogName = (name: string) => {
    if (name.includes('stone')) return 'Stone mine'
    if (name.includes('iron')) return 'Iron mine'
    if (name.includes('gold')) return 'Gold mine'
    if (name.includes('sword')) return 'Swordsman'
    if (name.includes('spearsMilitia')) return 'Militia Spearmans'
    if (name.includes('spear')) return 'Spearman'
    if (name.includes('archer')) return 'Archer'
    if (name.includes('bowsMilitia')) return 'Militia Archers'
    if (name.includes('blueAmulet')) return 'Blue Amulet'
    if (name.includes('redAmulet')) return 'Red Amulet'
    if (name.includes('greenAmulet')) return 'Green Amulet'
    if (name.includes('siege')) return 'Siege weapon'
    if (name.includes('cavalry')) return 'Cavalry'
    else return name
}
export const getRightScheme = (name: string) => {
    if (name.includes('fieldLvL1')) return craftPreviews[0]
    if (name.includes('stoneMineLvL1')) return craftPreviews[1]
    if (name.includes('farmLvL1')) return craftPreviews[2]
    if (name.includes('ironMineLvL1')) return craftPreviews[3]
    if (name.includes('goldMineLvL1')) return craftPreviews[4]
    if (name.includes('sawmillLvL1')) return craftPreviews[5]
    if (name.includes('cavalryLvL1')) return craftPreviews[6]
    if (name.includes('spearLvL1')) return craftPreviews[7]
    if (name.includes('archerLvL1')) return craftPreviews[8]
    if (name.includes('swordLvL1')) return craftPreviews[9]
    if (name.includes('siegeLvL1')) return craftPreviews[10]
    if (name.includes('bowsMilitiaLvL1')) return craftPreviews[11]
    if (name.includes('spearsMilitiaLvL1')) return craftPreviews[12]
    if (name.includes('blueAmulet')) return craftPreviews[13]
    if (name.includes('redAmulet')) return craftPreviews[13]
    if (name.includes('greenAmulet')) return craftPreviews[13]
    if (name.includes('axe')) return craftPreviews[14]
    if (name.includes('pick')) return craftPreviews[15]
    if (name.includes('shovel')) return craftPreviews[16]
    if (name.includes('farm_pack')) return craftPreviews[17]
    if (name.includes('mine_pack')) return craftPreviews[18]
    if (name.includes('queen_pack')) return craftPreviews[19]
    if (name.includes('king_pack')) return craftPreviews[20]
    if (name.includes('tokens_pack')) return craftPreviews[21]
}
export const craftPreviews = [
    'assets/images/craftPreviews/field.jpg',
    'assets/images/craftPreviews/stone_mine.jpg',
    'assets/images/craftPreviews/farm.jpg',
    'assets/images/craftPreviews/iron_mine.jpg',
    'assets/images/craftPreviews/gold_mine.jpg',
    'assets/images/craftPreviews/sawmill.jpg',
    'assets/images/craftPreviews/cavalry.jpg',
    'assets/images/craftPreviews/spearman.jpg',
    'assets/images/craftPreviews/archer.jpg',
    'assets/images/craftPreviews/swordsman.jpg',
    'assets/images/craftPreviews/siege.jpg',
    'assets/images/craftPreviews/militia_archer.jpg',
    'assets/images/craftPreviews/militia_spearmans.jpg',
    'assets/images/craftPreviews/amulet.jpg',
    'assets/images/craftPreviews/axe.jpg',
    'assets/images/craftPreviews/pick.jpg',
    'assets/images/craftPreviews/shovel.jpg',
    'assets/images/craftPreviews/farm_pack.jpg',
    'assets/images/craftPreviews/mine_pack.jpg',
    'assets/images/craftPreviews/queen_pack.jpg',
    'assets/images/craftPreviews/king_pack.jpg',
    'assets/images/craftPreviews/tokens_pack.jpg',
]
export const getUserField = (
    name?: string,
    mintpasses?: IMintPasses,
    allTokens?: number,
) => {
    if (name?.includes('farm_pack') || name?.includes('pack_farm'))
        return mintpasses!['FARM PASS']
    if (name?.includes('mine_pack') || name?.includes('pack_mine'))
        return mintpasses!['MINE PASS']
    if (name?.includes('queen_pack') || name?.includes('pack_queen'))
        return mintpasses!['QUEEN PASS']
    if (name?.includes('king_pack') || name?.includes('pack_king'))
        return mintpasses!['KING PASS']
    if (name?.includes('tokens_pack') || name?.includes('pack_token'))
        return allTokens
    else return ''
}
export const getPackName = (name: string) => {
    if (name.includes('farm_pack') || name.includes('pack_farm'))
        return 'farmPack'
    if (name.includes('mine_pack') || name.includes('pack_mine'))
        return 'minePack'
    if (name.includes('queen_pack') || name.includes('pack_queen'))
        return 'queenPack'
    if (name.includes('king_pack') || name.includes('pack_king'))
        return 'kingPack'
    if (name.includes('tokens_pack') || name.includes('pack_token'))
        return 'tokenPack'
    else return ''
}
export const craftInfo = (name: string) => {
    if (name.includes('spearsMilitia'))
        return 'weak type of troops for the initial protection of settlements from robbery'
    if (name.includes('bowsMilitia'))
        return 'weak type of troops for the initial protection of settlements from robbery'
    if (name.includes('spearL'))
        return 'the main type of troops for defense and war'
    if (name.includes('archer')) return 'long-range light units of the main use'
    if (name.includes('sword')) return 'powerful reinforced combat unit for war'
    if (name.includes('cavalry'))
        return 'the most powerful type of troops for the strongest armies'
    if (name.includes('siege'))
        return 'Special weapon for destroying and weakening fortifications during sieges'
}
export const packsForSale = {
    king_pack: {
        available: {
            mp: 400,
            wl: 100,
        },
        price: {
            mp: 249,
            wl: 349,
            public: 499,
        },
    },
    queen_pack: {
        available: {
            mp: 300,
            wl: 200,
        },
        price: {
            mp: 149,
            wl: 249,
            public: 349,
        },
    },
    mine_pack: {
        available: {
            mp: 700,
            wl: 500,
        },
        price: {
            mp: 49,
            wl: 99,
            public: 119,
        },
    },
    farm_pack: {
        available: {
            mp: 700,
            wl: 500,
        },
        price: {
            mp: 49,
            wl: 79,
            public: 99,
        },
    },
}
