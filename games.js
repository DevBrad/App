class Game {
  constructor(id, title, imageUrl, description) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.fetchApi = new FetchApi("https://games-app-siit.herokuapp.com");
  }
  render(container) {
    const game = document.createElement("div");
    // console.log(game);
    game.setAttribute("id", this._id);
    this.updateGame(game);
    // console.log(this);
    container.appendChild(game);
  }
  updateGame(ele) {
    ele.innerHTML = `
    <h1>${this.title}</h1> 
    <img src="${this.imageUrl}" />
    <p>${this.description}</p> 
    <button class="delete-btn" game-id="${this._id}">Delete Game</button>
    <button class="update-btn" game-id="${this._id}">Edit Game</button>`;
    // console.log(ele);
    const game = this;
    // console.log(game);

    ele
      .querySelector(".delete-btn")
      .addEventListener("click", async function (event) {
        event.preventDefault();
        await fetchApi.deleteGameById(event.target.getAttribute("game-id"));
        event.target.parentElement.remove();
      });
    ele
      .querySelector(".update-btn")
      .addEventListener("click", function (event) {
        event.preventDefault();
        game.updateForm(event.target.parentElement);
      });
  }
  updateForm(domElement) {
    const form = document.getElementById("updateForm");
    const gameTitleElement = form.querySelector("input[name=gameTitle]");
    const gameDescriptionElement = form.querySelector(
      "textarea[name=gameDescription]"
    );
    const gameImageUrlElement = form.querySelector("input[name=gameImageUrl]");
    gameTitleElement.value = this.title;
    gameDescriptionElement.value = this.description;
    gameImageUrlElement.value = this.imageUrl;
    domElement.appendChild(form);
    const game = this;
    form
      .querySelector("button[id=saveGameBtn]")
      .addEventListener("click", async function (e) {
        e.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitleElement.value);
        urlencoded.append("imageUrl", gameImageUrlElement.value);
        urlencoded.append("description", gameDescriptionElement.value);
        const updatedGame = await fetchApi.updateGameRequest(
          game._id,
          urlencoded
        );
        if (updatedGame !== undefined) {
          game.title = updatedGame.title;
          game.imageUrl = updatedGameFromApi.imageUrl;
          game.description = updatedGameFromApi.description;
          const game = document.getElementById(game._id);
          game.updateGame(game);
        }
        document.getElementById("container").appendChild(form);
      });
    form
      .querySelector("button[id=cancelUpdate]")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("container").appendChild(form);
      });
  }
}
