const { info, error, success } = toastr;

const url = "http://localhost:3000";

let user;

window.onload = async () => {
    $(".ui.dropdown").dropdown({
        onChange: addPlatform,
    });

    const token = localStorage.getItem("access_token");

    const res = await fetch(url + "/current-user", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (res.status === 403 || res.status === 401) {
        logOut();
    }

    if (!res.ok) {
        error("Etwas ist schiefgelaufen");
    }
    user = await res.json();
    renderProfile(user);
    generateDropdown();
};

const update = async () => {
    const user = getUserData();
    sendPatch(user);
};

const sendPatch = async (data) => {
    const res = await fetch(url + "/update", {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        error("Something went wrong");
    }

    return res.json();
};

const logOut = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
};

const addPlatform = async () => {
    const platformName = document.getElementById("platform").value;
    const platform = platforms[platformName];

    const res = await fetch(url + "/links", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(platform),
    });

    if (res.ok) {
        const links = await res.json();
        clearLinks();
        links.forEach(link => {
            document
            .getElementById("profileForm")
            .appendChild(platformBuilder(link));
        })

    }
};

const renderProfile = (profile) => {
    document.getElementById("firstname").value = profile.firstName;
    document.getElementById("lastname").value = profile.lastName;
    document.getElementById("bio").value = profile.bio;
    document.getElementById("profilePicture").src = profile.profilePicture;
    document.getElementById("viewProfileButton").href = "/profile.html?u=" + profile.username

    const { links } = profile;

    const profileForm = document.getElementById("profileForm");

    profileForm.append(...links.map((link) => platformBuilder(link)));
};

const clearLinks = () => {
    const platformLinks = document.querySelectorAll(".platformLink");
    platformLinks.forEach((pl) => pl.remove());
};

const platformBuilder = (platform) => {
    const field = document.createElement("div");
    const label = document.createElement("label");
    const inputDiv = document.createElement("div");
    const lockIcon = document.createElement("i");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const closeIcon = document.createElement("i");

    field.className = "field platformLink";
    label.append(
        platform.displayName +
            ` - ${platform.usernameBased ? "Username" : "URL"} eingeben`
    );
    inputDiv.id = platform._id;
    inputDiv.className = "ui left icon input";
    lockIcon.className = platforms[platform.name].iconClass;
    input.onblur = updatePlatform;
    input.value = platform.usernameBased ? platform.username : platform.url;
    input.className = "pillar";
    input.placeholder = platform.displayName + " eingeben...";
    input.type = "text";
    button.className = "ui basic icon button pillar";
    button.appendChild(closeIcon);
    button.onclick = deletePlatform;
    closeIcon.className = "close icon";
    button.style.marginLeft = "4px";

    inputDiv.append(lockIcon, input, button);
    field.append(label, inputDiv);

    return field;
};

const deletePlatform = async (ev) => {
    const { target } = ev;
    if (!target.parentElement.id) {
        return;
    }
    const res = await fetch(url + "/links/" + target.parentElement.id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });

    if (res.ok) {
        target.parentElement.parentElement.remove();
    }
};

const updatePlatform = async (ev) => {
    const { target } = ev;

    if (target.parentElement.id == null) {
        return;
    }

    const val = target.value;

    await fetch(url + "/links/" + target.parentElement.id, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            info: val,
        }),
    });
};

const getUserData = () => {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const bio = document.getElementById("bio").value;

    return { firstName, lastName, bio };
};

const generateDropdown = () => {
    Object.keys(platforms).forEach((platform) => {
        platform = platforms[platform];
        const pDiv = document.createElement("div");
        pDiv.className = "item";
        pDiv.dataset.value = platform.name;

        const icon = document.createElement("i");
        icon.className = platform.iconClass;
        pDiv.append(icon, platform.displayName);
        document.getElementById("dropdownMenu").appendChild(pDiv);
    });
};

const updatePP = async () => {
    const res = await fetch(url + "/update-pp", {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    if(!res.ok) {
        error("Etwas ist schiefgelaufen");
        return;
    }
    const user = await res.json();
    document.getElementById("profilePicture").src = user.profilePicture;
};
