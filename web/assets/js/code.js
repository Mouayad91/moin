window.onload = async () => {
    // TODO: Get current user and set data and qrcode by username /code?u=username

    const token = localStorage.getItem("access_token");

    const res = await fetch("http://localhost:3000/current-user", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });

    if (res.status === 403 || res.status === 401) {
        logOut();
    }

    if (!res.ok) {
        error("Etwas ist schiefgelaufen");
        return;
    }

    user = await res.json();
    
    document.getElementById("profileP").src = user.profilePicture;
    document.getElementById("pName").innerHTML = user.firstName + " " + user.lastName;
    document.getElementById("bio").innerHTML = user.bio;


    new QRCode("qrcode", {
        text: window.location.protocol + "//" + window.location.host + "/profile.html?u=" + user.username,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
};
