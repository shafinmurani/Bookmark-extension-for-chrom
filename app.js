const inputElement = document.getElementById("inputElement")
const saveInputBtn = document.getElementById("saveInput")
const listEl = document.getElementById("listEl")
const clrAll = document.getElementById("clearAll")
const err = document.getElementById("err")
const savetab = document.getElementById("savetab")
const up = document.getElementById('up')
let savedArray = []

let savedFromLocalStorage = JSON.parse(localStorage.getItem("savedItems"))

if (savedFromLocalStorage) {
    savedArray = savedFromLocalStorage
    render()
} else {
    savedArray = []
}
up.addEventListener('click', function () {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedArray));
    err.innerHTML = '<a href="data:' + data + '" download="bookmarks.json">Export Bookmarks</a>';
})
savetab.addEventListener('click', function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        savedArray.push(tabs[0].url)
        localStorage.setItem("savedItems", JSON.stringify(savedArray))
        render()
    })
})

saveInputBtn.addEventListener('click', function () {
    if (!inputElement.value) {
        err.textContent = "Input Cannot be Empty."
    }
    // console.log(inputElement.value)  
    var input = inputElement.value
    savedArray.push(input)
    render()
    inputElement.value = ""
    // console.log(savedArray)
})
clrAll.addEventListener('click', function () {
    clearAll()
})

function render() {
    let listItems = ""
    for (let index = 0; index < savedArray.length; index++) {
        listItems += `
        <li>
        <a target='_blank' href='https://${savedArray[index]}'>${savedArray[index]}</a>
        </li>`
        // const li = document.createElement("li")
        // li.textContent = savedArray[index]
        // listEl.append(li)
    }
    listEl.innerHTML = listItems
    localStorage.setItem("savedItems", JSON.stringify(savedArray))
}
function clearAll() {
    localStorage.clear()
    savedArray = []
    render()
}