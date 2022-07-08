
const toggleBtn = document.querySelectorAll(".header_toggle");

let loginInput = document.querySelector(".searchBar_user");
const formBtn = document.querySelector(".blue");


let photo = document.querySelector(".profileHeader_photo");
let legName = document.querySelector(".profileHeader_name");
//turn element into <a> tag; create a function inside of determine(display, source) to decrease lines and specificity
let unDisplay = document.querySelector(".profileHeader_userName");
let joined = document.querySelector(".profileHeader_joined");

let bio = document.querySelector(".bioStat_content");

let repo = document.querySelector(".ghStats_repo-count");
let followers = document.querySelector(".ghStats_followers-count");
let following = document.querySelector(".ghStats_following-count");

let hq = document.querySelector(".miscStats_location--p");
let site = document.querySelector(".miscStats_website--a");
let twitter = document.querySelector(".miscStats_twitter--a");
let company = document.querySelector(".miscStats_company--a");

/*Checks operating system color preference*/
if (
    /* This condition checks whether the user has set a site preference for 
        dark mode OR a OS-level preference for Dark Mode AND no site preference */
    localStorage.getItem('data-color-mode') === 'dark' ||
    (window.matchMedia('(prefers-data-color-scheme: dark)').matches &&
     !localStorage.getItem('data-color-mode'))
) {
    // if true, set the site to Dark Mode
    document.documentElement.setAttribute('data-color-mode', 'dark')
}


/*Toggle button for in-browser color-mode preference*/
const colorMode = e => {
    if(e.currentTarget.classList.contains("light--hidden")){
        document.documentElement.setAttribute("data-color-mode", "dark");
        localStorage.setItem("data-color-mode", "dark");
        return
        }
    document.documentElement.setAttribute("data-color-mode", "light");
    localStorage.setItem("data-color-mode", "light");
    }

    toggleBtn.forEach(btn => {
        btn.addEventListener('click', colorMode)
    })

//Enables the 'Enter' / 'Return' key; initiates user search.
let getData = e => {
    e.preventDefault();
    if (e.which === 13) { btn.click }
    findEm(loginInput.value)
}

function findEm(un) {

    let link =  'https://api.github.com/users/';
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if(xhr.status == 200){
            let data = JSON.parse(this.response);
            //determines whether the name/pair data for each entry has value
            function  determine(display, source) {
                //RegExp-based url validation for both github and website links.
                let regGh = /(?<=@[A-z])/;
                let regWeb = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/

                if (source === null || source ==="") {
                    display.innerHTML = "not available";
                    //if an icon's element is processed, makes it transluscent along with the succeeding <p> tag.
                    display.previousElementSibling.classList.add("opacity");
                    display.classList.add("opacity");
                } else {
                    display.innerHTML = source;
                    //if an icon's element is processed, makes it transluscent along with the succeeding <p> tag.
                    display.previousElementSibling.classList.remove("opacity");
                    display.classList.remove("opacity");
                }
                
                //needing to make a more condensed function to better make use of performance.
                if((display === site && source !== "") && regWeb.test(source)){
                    display.href = source;
                    display.classList.remove("normal");
                } else if
                 ((display === site && source === null) ||
                  (display === site && source !== null) && !regWeb.test(source)){
                    display.classList.add("normal");
                    display.removeAttribute("href");
                  }
        
                if (display === twitter && source !== null) {
                    display.innerHTML = "@" + display.innerHTML;
                    display.href = `www.twitter.com/`+display.innerHTML;
                    display.classList.remove("normal");
                    display.innerHTML = source;
                } else if (display===twitter && source===null){
                    display.classList.add("normal");
                    display.removeAttribute("href");
                }

                if(((display === company && source !== null)) && regGh.test(source)) {
                    display.href = `https://www.github.com/`+source.replace('@', '');
                    display.classList.remove("normal");
                } else if 
                ((display === company && source === null) ||
                 (display === company && source !== null) && !regGh.test(source))
                 {
                    display.classList.add("normal");
                    display.removeAttribute("href");
                }

            }
            console.log(determine(repo, data.public_repos));
            photo.src = data.avatar_url;
            legName.innerHTML = data.name;
            unDisplay.innerHTML = "@" +data.login;
            joined.innerHTML = "joined " + data.created_at;

            if(data.bio === null) {
                bio.innerHTML = "This profile has no bio.";
                bio.style.opacity = .75;
            } else {bio.innerHTML = data.bio}

            determine(repo, data.public_repos);
            determine(followers, data.followers);
            determine(following, data.following);

            determine(hq, data.location);
            determine(site, data.blog);
            determine(twitter, data.twitter_username);
            determine(company, data.company);

        }
    }
    xhr.open('GET', link + un, true);
    xhr.send();
}


findEm("octocat");
formBtn.addEventListener('click', getData);