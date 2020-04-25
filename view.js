const fetchApi = new FetchApi("https://games-app-siit.herokuapp.com");

async function games() {
  let games = await fetchApi.getGamesList();
  let list = [];

  for (let i = 0; i < games.length; i++) {
    const _game = games[i];
    const $game = new Game(
      _game._id,
      _game.title,
      _game.imageUrl,
      _game.description
    );
    list.push($game);
  }

  const container = document.querySelector(".container");
  for (let i = 0; i < list.length; i++) {
    list[i].render(container);
  }
}
games();

function validateFormElement(inputElement, errorMessage) {
  if (inputElement.value === "") {
    if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
      buildErrorMessage(inputElement, errorMessage);
    }
  } else {
    if (document.querySelector('[rel="' + inputElement.id + '"]')) {
      console.log("the error is erased!");
      document.querySelector('[rel="' + inputElement.id + '"]').remove();
      inputElement.classList.remove("inputError");
    }
  }
}

function validateReleaseTimestampElement(inputElement, errorMessage) {
  if (isNaN(inputElement.value) && inputElement.value !== "") {
    buildErrorMessage(inputElement, errorMessage);
  }
}

function buildErrorMessage(inputEl, errosMsg) {
  inputEl.classList.add("inputError");
  const errorMsgElement = document.createElement("span");
  errorMsgElement.setAttribute("rel", inputEl.id);
  errorMsgElement.classList.add("errorMsg");
  errorMsgElement.innerHTML = errosMsg;
  inputEl.after(errorMsgElement);
}

document
  .querySelector(".submitBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGender = document.getElementById("gameGender");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "the title is required!");
    validateFormElement(gameGender, "the gender is required!");
    validateFormElement(gameImageUrl, "the image URL is required!");
    validateFormElement(gameRelease, "the release date is required!");

    validateReleaseTimestampElement(
      gameRelease,
      "The release date you provided is not a valid timestamp!"
    );
    if (
      gameTitle.value !== "" &&
      gameGender.value !== "" &&
      gameImageUrl.value !== "" &&
      gameRelease.value !== ""
    ) {
      var urlencoded = new URLSearchParams();
      urlencoded.append("title", gameTitle.value);
      urlencoded.append("releaseDate", gameRelease.value);
      urlencoded.append("gender", gameGender.value);
      urlencoded.append("publisher", gamePublisher.value);
      urlencoded.append("imageUrl", gameImageUrl.value);
      urlencoded.append("description", gameDescription.value);
      const newGame = await fetchApi.createNewGame(urlencoded);
      const newGameApi = new Game(
        newGameApi._id,
        newGameApi.title,
        newGameApi.imageUrl,
        newGameApi.description
      );
      container = document.querySelector(".container");
      newGame.render(container);
    }
  });
