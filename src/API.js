export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJiMWY4MTE4ZC0yOWZlLTQwMjMtYjk2ZS02OWNmMmE4ZDhkMDYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTc2NjQ2NTY0MywiZXhwIjoxNzY3MDcwNDQzfQ.getFBgJBfe871sg7WyvrK9bQJy_zaAMuhP9fBooMaZw";

export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
