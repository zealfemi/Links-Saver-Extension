let myLinks = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveTab = document.getElementById("tab-btn")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}
 
saveTab.addEventListener("click", function () {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks))
        render(myLinks)
    })
})

function render(link) {
    let listItems = ""

    for (let i = 0; i < link.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${myLinks[i]}'>
                ${link[i]}
            </a>
        </li>`
    }

    ulEl.innerHTML = listItems
}

saveBtn.addEventListener("click", function () {
    myLinks.push(inputEl.value)
    inputEl.value = null
    localStorage.setItem("myLinks", JSON.stringify(myLinks))
    render(myLinks)
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})
