
var isMenuOpen = false;

function fetchMarkdownFileContent(fileUrl) {
    return fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.text();
        });
}

function createList() {
    var x = 0;
    while (x < pages.length) {
        document.getElementById('list').innerHTML += `<button class="lb" onclick='displayrenderedfile("${source}/${pages[x]}")'>${pagenames[x]}</button>`
        x++;
    }
    displayrenderedfile(`${source}/${pages[0]}`);
}

window.addEventListener('load', checkVisibility);
window.addEventListener('load', createList);
window.addEventListener('load', setName);
window.addEventListener('resize', checkVisibility);

function setName() {
    document.getElementById("appname").innerHTML = AppName;
}

function checkVisibility() {
    if (innerWidth > 600) {
        document.getElementById('hamburger').style.visibility = 'hidden';
        document.getElementById("menubar").style.left = "0";
    }
    else {
        document.getElementById('hamburger').style.visibility = 'visible';
    }
}
function convertMarkdownToHtml(markdownText) {
    const md = new markdownit();
    return md.render(markdownText);
  }
function displayrenderedfile(fileUrl) {
    fetchMarkdownFileContent(fileUrl)
        .then(text => {
            document.getElementById("page").innerHTML = convertMarkdownToHtml(text);
            console.log(text); // You can log the fetched text if needed
        })
        .catch(error => {
            console.error('Error fetching markdown content:', error);
        });
    if (innerWidth < 600) {
        toggleMenu();
    }
}


function toggleMenu() {
    if (innerWidth < 600) {
        if (isMenuOpen) {
            document.getElementById("menubar").style.left = "-100%";
            isMenuOpen = false;
        } else {
            document.getElementById("menubar").style.left = "0";
            isMenuOpen = true;
        }
    }
}