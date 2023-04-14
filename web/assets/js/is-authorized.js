const token = localStorage.getItem("access_token");
if (!token) {
    window.location.href = "/";
}
