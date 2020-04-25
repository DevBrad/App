class FetchApi {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }
  async getGamesList() {
    const response = await fetch(`${this.apiURL}/games`);
    return response.json();
  }
  async createNewGame(gameObject) {
    const response = await fetch(`${this.apiURL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: gameObject,
    });
    return response.json();
  }
  async updateGameRequest(gameID, updateGameObj) {
    const response = await fetch(`${this.apiURL}/games/${gameID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: updateGameObj,
    });
    return response.json();
  }
  async deleteGameById(gameID) {
    const response = await fetch(`${this.apiURL}/games/${gameID}`, {
      method: "DELETE",
    });
    return response.text();
  }
}
