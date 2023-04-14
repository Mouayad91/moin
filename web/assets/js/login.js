const { error, info, success } = toastr;

window.onload = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
        window.location.href = "/edit-profile.html";
    }
};

const login = async () => {
    document.getElementById("loginButton").className =
        "ui fluid large yellow submit button pillar loading";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        error("Bitte fülle alle Felder aus");
        document.getElementById("loginButton").className =
            "ui fluid large yellow submit button pillar";
        return;
    }

    info("Wir bitten um Geduld, Anfrage sollte jeden moment empfangen werden.");

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (res.status === 401) {
        error("Username oder passwort falsch");
        document.getElementById("loginButton").className =
        "ui fluid large yellow submit button pillar";
        return;
    }

    if (!res.ok) {
        error("Etwas ist schiefgelaufen, bitte versuche es später nochmal");
        document.getElementById("loginButton").className =
        "ui fluid large yellow submit button pillar";
        return;
    }

    const { access_token } = await res.json();

    localStorage.setItem("access_token", access_token);
    window.location.href = "/edit-profile.html";
};
