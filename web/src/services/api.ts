const baseUrl = 'http://localhost:3000/games';

interface AdsData {
  data: Object;
  weekDays: string[];
  useVoiceChannel: Boolean;
}

export async function getGames(setState: Function) {
  const request = await fetch(baseUrl);
  const result = await request.json();
  setState(result);
}

export async function publishAds(id: string, data: AdsData) {
  const request = await fetch(`${baseUrl}/${id}/ads`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST',
  });
  const result = await request.json();
  return result;
}
