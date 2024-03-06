const ul = document.querySelector(".job-tags"),
    input = document.querySelector(".search"),
    container = document.querySelector(".job-offer-technology-tags");

let suggestContainer = document.querySelector(".suggester");

let suggestions = [
    "Channel",
    "CodingLab",
    "CodingNepal",
    "YouTube",
    "YouTuber",
    "How to start YouTube Channel",
    "What does HTML stands for?",
    "What does CSS stands for?",
];

let maxTags = 10,
    tags = [];

let currentFocus = -1;

//search suggestions and handle Enter key
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); // prevent form submission on Enter
        let tag;
        if (currentFocus > -1) {
            let suggestion = suggestContainer.children[currentFocus];
            if (input.value) {
                tag = suggestion.textContent.replace(/\s+/g, ' ');
            }
        } else {
            tag = e.target.value.replace(/\s+/g, ' ');
        }
        if (tag.length > 1 && !tags.includes(tag)) {
            if (tags.length < maxTags) {
                tag.split(',').forEach(tag => {
                    tags.push(tag);
                    createTag();
                });
            }
        }
        e.target.value = "";
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); // prevent scrolling on arrow keys
        let suggestionsList = suggestContainer.querySelectorAll(".suggestion");
        if (suggestionsList.length > 0) {
            if (e.key === "ArrowDown") {
                currentFocus = (currentFocus + 1) % suggestionsList.length;
            } else if (e.key === "ArrowUp") {
                currentFocus = (currentFocus - 1 + suggestionsList.length) % suggestionsList.length;
            }

            suggestionsList.forEach(item => item.classList.remove("active"));

            let suggestion = suggestContainer.children[currentFocus];
            suggestion.classList.add("active");
        }
    } else {
        let userData = e.target.value;
        let emptyArray = [];
        if (userData) {
            emptyArray = suggestions.filter((data) => {
                return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            });
            emptyArray = emptyArray.map((data) => {
                return (data = '<li class="suggestion">' + data + '</li>');
            });
            container.classList.add("active");
            showSuggestions(emptyArray);
        } else {
            container.classList.remove("active");
        }
    }
});

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        listData = '<li class="suggestion">' + input.value + '</li>';
    } else {
        listData = list.join('');
    }
    suggestContainer.innerHTML = listData;
}

function createTag() {
    ul.querySelectorAll("li").forEach((li) => li.remove());
    tags.slice().reverse().forEach((tag) => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="removeTag(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);
    });
}

function removeTag(element, tag) {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
}

//click suggestion
suggestContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        input.value = e.target.textContent.trim();
        container.classList.remove("active");
        const enterKeyEvent = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            charCode: 13,
        });
        input.dispatchEvent(enterKeyEvent);
    }
});
