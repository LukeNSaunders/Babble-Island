const baseUrl = "http://localhost:4000";

// FOR LOGIN

export const login = async (user) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
      mode: "cors",
    });
    const loggedUser = await response.json();

    return loggedUser;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (user) => {
  try {
    console.log("help Im stuck in the api service");
    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    });
    const data = await response.json;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// FOR CHARACTER INTERACTION

export const fetchCharacters = async () => {
  try {
    const res = await fetch(`${baseUrl}/character`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const startDialogue = async (character) => {
  try {
    const response = await fetch(`${baseUrl}/character`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character: character }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const createDialogue = async (dialogue) => {
  try {
    const res = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dialogue),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// USER  STARS

export const fetchUserStars = async () => {
  try {
    const res = await fetch(`${baseUrl}/user`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export const updateStars = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const translateWord = async (word) => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?q=${word}&target=en&source=es&format=text&key=AIzaSyD56Mw8C84FywZbeclWpYNzjNopb1rjqgc`,
      {
        method: "POST",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const defineWord = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/es/${word}`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = async () => {
  try {
    const response = await fetch(`${baseUrl}/stories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const storyReader = async (story) => {
  try {
    const response = await fetch(`${baseUrl}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: story.story, title: story.title }),
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const refreshUser = async () => {
  try {
    const response = await fetch(`${baseUrl}/refresh`, {
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
