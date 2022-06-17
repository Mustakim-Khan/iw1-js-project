function pressButtonTest() {
    //console.log(navigator.clipboard);
    navigator.clipboard.writeText('Test')
        .then(() => {
            console.log('a été écrit')
        })
        .catch(() => {
            console.log("échoué")
        })
}
function printClipboard() {
    navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            console.log("Read access ranted!");
            navigator.clipboard.readText()
                .then((copiedText) => {
                    console.log(copiedText);
                })
        }
    });
}

function copyToClipboard() {
    let copyText = document.getElementById("content").value;
    navigator.clipboard.writeText(copyText).then(() => {
        // Alert the user that the action took place.
        // Nobody likes hidden stuff being done under the hood!
        console.log("Copied to clipboard");
    });
}
document.addEventListener('copy', (e) => {

});
