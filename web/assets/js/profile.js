window.onload = async () => {
    const username = new URLSearchParams(window.location.search).get("u");

    const res = await fetch("http://localhost:3000/profile?u=" + username);
    if (!res.ok) {
        window.location.href = "/404.html";
    }

    const user = await res.json();

    document.getElementById("profileP").src = user.profilePicture;
    document.getElementById("pName").innerHTML =
        user.firstName + " " + user.lastName;
    document.getElementById("bio").innerHTML = user.bio;

    const profileForm = document.getElementById("profileForm");
    const { links } = user;
    links.forEach(link => {
        profileForm.innerHTML += linkButtonBuilder(link);
    })
};

const linkButtonBuilder = (link) => {
    const platform = platforms[link.name];
    const html = `                <div class="field">
    <a
      href="${link.usernameBased ? (link.host + link.username) : link.url}"
      class="ui fluid large basic submit button pillar"
      style="color: black !important"
      ><i class="${platform.iconClass}"></i> ${platform.displayName}</a
    >
  </div>`;

  return html;
};
