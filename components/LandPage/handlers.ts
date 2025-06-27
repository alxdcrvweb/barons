export const getCastleImage = (name?:string) =>{
    if(name?.includes('fence')) return "assets/images/kingdoms/kingdom_boost_1.jpg"
    if(name?.includes('castle')) return "assets/images/kingdoms/kingdom_boost_2.jpg"
    if(name?.includes('fortress')) return "assets/images/kingdoms/kingdom_boost_3.jpg"
    if(name?.includes('citadel')) return "assets/images/kingdoms/kingdom_boost_4.jpg"
    return ""
}