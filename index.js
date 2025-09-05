const url = "https://api.github.com/users/";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const profileContainer = document.getElementById("profileContainer");
const loadingElem = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
        <div class="top-section">
                <div class="left">
                    <div class="avatar">
                        <img src="${
                          profile.avatar_url
                        }" width="80px" height="80px" alt="avatar">
                    </div>
                    <div class="self">
                        <h1>${profile.name || "No Name"}</h1>
                        <h1>@${profile.login}</h1>
                    </div>
                </div>
                <a href="${profile.html_url}" target="_blank">
                    <button class="primary-btn">Check Profile</button>
                </a>
            </div>
            <div class="about">
                <h2>About</h2>
                <p>${profile.bio || "No Bio"}</p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3>Following</h3>
                    <p>${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>
        `;
};

profileContainer.classList.remove("profile-container");

const fetchProfile = async () => {
  const username = searchInput.value.trim();

  if (!username) {
    loadingElem.innerHTML = "Please enter a username.";
    loadingElem.style.color = "red";
    return;
  }

  loadingElem.innerText = "Loading....";
  loadingElem.style.color = "black";

  try {
    const res = await fetch(`${url}${username}`);
    if (!res.ok) {
      throw new Error("User not found");
    }
    const data = await res.json();

    if (data.message) {
      loadingElem.innerHTML = data.message;
      loadingElem.style.color = "red";
    } else {
      profileContainer.classList.add("profile-container");
      loadingElem.innerHTML = "";
      profileContainer.innerHTML = generateProfile(data);
      searchInput.value = "";
    }

    // console.log("data", data);
  } catch (error) {
    console.log({ error });
    loadingElem.innerHTML = "An error occurred: " + error.message;
    loadingElem.style.color = "red";
  }
};

searchBtn.addEventListener("click", fetchProfile);

// https://github.com/Sk-Sakirul