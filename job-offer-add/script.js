const dropdown = document.querySelector('.dropdown');
const input = dropdown.querySelector('.input-field');
const selectedOpt = dropdown.querySelector('.select > .selected');


function seniorityOptions() {
    console.log(selectedOpt.textContent)

    switch (selectedOpt.textContent) {
        case 'Remote': {
            input.style.display = 'none';
        } break;
        default : input.style.display = 'block';
    }
}
