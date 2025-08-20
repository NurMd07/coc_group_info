      const addPlayerButton = document.querySelector(".addPlayer");
      const updatePlayerButton = document.querySelector(".updatePlayer");
      const deletePlayerButton = document.querySelector(".deletePlayer");
      const addPlayerForm = document.querySelector(".addPlayerForm");
      const updatePlayerForm = document.querySelector(".updatePlayerForm");
      const deletePlayerForm = document.querySelector(".deletePlayerForm");
      const error = document.querySelector(".error");
      const homeBtn = document.querySelector(".homeBtn");

      addPlayerButton.addEventListener("click", () => {
        addPlayerForm.classList.toggle("hide");
        if (!addPlayerForm.classList.contains("hide")) {
          document.body.classList.add("blur");
        } else {
          document.body.classList.toggle("blur");
        }
        updatePlayerForm.classList.add("hide");
        deletePlayerForm.classList.add("hide");
        if (error) {
          error.classList.add("hide");
        }
      });

      updatePlayerButton.addEventListener("click", () => {
        updatePlayerForm.classList.toggle("hide");
        if (!updatePlayerForm.classList.contains("hide")) {
          document.body.classList.add("blur");
        } else {
          document.body.classList.remove("blur");
        }
        addPlayerForm.classList.add("hide");
        deletePlayerForm.classList.add("hide");
        if (error) {
          error.classList.add("hide");
        }
      });

      deletePlayerButton.addEventListener("click", () => {
        deletePlayerForm.classList.toggle("hide");
        if (!deletePlayerForm.classList.contains("hide")) {
          document.body.classList.add("blur");
        } else {
          document.body.classList.remove("blur");
        }
        addPlayerForm.classList.add("hide");
        updatePlayerForm.classList.add("hide");
        if (error) {
          error.classList.add("hide");
        }
      });

      homeBtn.addEventListener("click", () => {
        window.location.href = "/";
      });