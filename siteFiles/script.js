const button = document.querySelectorAll(".header_toggle");

let userName = document.getElementById("input");

let photo = document.querySelector(".profileHeader_photo");
let legName = document.querySelector(".profileHeader_name");
let unDisplay = document.querySelector(".profileHeader_userName");
let joined = document.querySelector(".profileHeader_joined");

let bio = document.querySelector(".bioStat_content");

let repo = document.querySelector(".ghStats_repo-count");
let followers = document.querySelector(".ghStats_followers-count");
let following = document.querySelector(".ghStats_following-count");

let hq = document.querySelector("miscStats_location");
let site = document.querySelector(".miscStats_website");
let twitter = document.querySelector(".miscStats_twitter");
let company = document.querySelector(".miscStats_company")


if (
    /* This condition checks whether the user has set a site preference for dark mode OR a OS-level preference for Dark Mode AND no site preference */
    localStorage.getItem('color-mode') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
     !localStorage.getItem('color-mode'))
) {
    // if true, set the site to Dark Mode
    document.documentElement.setAttribute('color-mode', 'dark')
}

/*toggle button for color-mode preference*/
const colorMode = e => {
    if(e.currentTarget.classList.contains("light--hidden")){
        document.documentElement.setAttribute("color-mode", "dark");
        localStorage.setItem("color-mode", "dark");
        return
        }
    document.documentElement.setAttribute("color-mode", "light");
    localStorage.setItem("color-mode", "light");
    }

    button.forEach(btn => {
        btn.addEventListener('click', colorMode)
    })

window.onload = findEm("octocat");


function findEm(un) {
    let link =  'https://api.github.com/users/';
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status == 200){
            console.log("Success!");
            let data = JSON.parse(this.response);
            photo.src = data.avatar_url
            legName.innerHTML = data.name;
            userName.innerHTML = "@" +data.login;
            joined.innerHTML = "joined " + data.created_at;
        }
    }
    xhr.open('GET', link + un, true);
    xhr.send();
}