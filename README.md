I dare you to find the secret menu.


Notes
<!-- buttons are discovered in the JavaScript by selecting the game-button class -->
<!-- onclick triggers a button push interaction -->
Code
<button id="green" class="game-button button-top-left" onclick="game.pressButton(this)"></button>
<button id="red" class="game-button button-top-right" onclick="game.pressButton(this)"></button>
<button id="yellow" class="game-button button-bottom-left" onclick="game.pressButton(this)"></button>
<button id="blue" class="game-button button-bottom-right" onclick="game.pressButton(this)"></button>
<div class="controls center">
<div class="game-name">Simon<sup>&reg;</sup></div>
<div id="score" class="score center">--</div>
<button class="btn btn-primary" onclick="game.reset()">Reset</button>


Note:
It is interesting that sometimes a js file is being referenced in the <head>, and sometimes in the <body>
<!-- Script is located at the bottom because it references HTML elements during initialization -->
<script src="play.js"></script>
After further research, js should usually be referenced in the head, unless there is some sort of performance
or page loading issue. More info:
<a href="https://stackoverflow.com/questions/3531314/should-i-write-script-in-the-body-or-the-head-of-the-html"></a>


Notes:
Can change localStorage with sessionStorage or cookies. Sadly, localStorage and SessionStorage stay in the browser
for that one user only. LocalStorage will stay forever until it is replaced or removed, while sessionstorage will get 
removed as soon as the user closes the browser.
Cookies have limited space.
<!-- The simplest way to store information that the user provides. -->
<!-- The stuff inside querySelector parameters must match exactly with the input id. -->
<!--   -->
Code
function login() { 
  const nameEl = document.querySelector("#name"); //#name refers to the element id in index.html
  localStorage.setItem("userName", nameEl.value); //localStorage means stores locally on computer
  window.location.href = "play.html"; //will bring user to a different page
}


For more information that I've learned, check out my google document I've been making all semester:
<a href="https://docs.google.com/document/d/1XcvlYu0Nyb0sWxD6iOxS2NOwcJ75xeo_bsVtBCIPTUM/edit?usp=sharing"></a>



Learned how to more effectively use the span element. Due to it being naturally inline, I can include two buttons,
or an image with a paragraph to display side by side.



Simon Service stuff ----------------------------
Check out index.js line 5. the port 3000 is important. For the startup assignment, change this to port 4000.
(should say const port = process.argv.length > 2 ? process.argv[2] : 3000;)



On index.js:

app.use(express.static('public'));
//by using the word public, we are accessing the public folder


To ignore modules or files we don't want, create .gitignore and add them there. Example:
node_modules






File that we no longer need? deployFiles.sh code below just in case.
#!/bin/bash

while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployFiles.sh -k <pem key file> -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying files for $service to $hostname with $key\n"

# Step 1
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 2
printf "\n----> Copy the distribution package to the target.\n"
scp -r -i "$key" * ubuntu@$hostname:services/$service/public


