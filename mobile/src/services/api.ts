const baseurl = 'http://192.168.1.107:3000'

export async function getGames(setGames: Function){
    const request = await fetch(`${baseurl}/games`)
    const result = await request.json()
    setGames(result)
}