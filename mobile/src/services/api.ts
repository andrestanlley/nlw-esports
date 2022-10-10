const baseurl = 'http://192.168.1.113:3000';

export async function getGames(setGames: Function) {
  const request = await fetch(`${baseurl}/games`);
  const result = await request.json();
  setGames(result);
}

export async function getAds(gameId: string, setAds: Function) {
  const request = await fetch(`${baseurl}/games/${gameId}/ads`);
  const result = await request.json();
  setAds(result);
}

export async function getDiscordUser(adsId: string, setDiscordDuoSelected: Function){
  const request = await fetch(`${baseurl}/ads/${adsId}/discord`)
  const result = await request.json()
  setDiscordDuoSelected(result.discord)
}
