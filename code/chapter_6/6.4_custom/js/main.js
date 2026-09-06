const input = document.querySelector("#country");
const listbox = document.querySelector("#country-listbox");
const options = [...listbox.querySelectorAll('[role="option"]')];
const status = document.querySelector("#results-status");

let visibleOptions = [...options];
let activeIndex = -1;
let selectedOption = null;

function openList() {
    if (visibleOptions.length === 0) return;

    listbox.hidden = false;
    input.setAttribute("aria-expanded", "true");

    const selectedIndex = visibleOptions.indexOf(selectedOption);

    if (selectedIndex >= 0) {
        setActiveOption(selectedIndex);
    }
}

function closeList() {
    listbox.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");

    options.forEach(option => {
        option.setAttribute("aria-selected", "false");
    });

    activeIndex = -1;
}

function showAllOptions() {
    options.forEach(option => {
        option.hidden = false;
    });

    visibleOptions = [...options];
}

function setActiveOption(index) {
    activeIndex = index;
    const activeOption = visibleOptions[index];

    options.forEach(option => {
        const isActive = option === activeOption;

        option.setAttribute(
            "aria-selected",
            isActive ? "true" : "false"
        );

        option.classList.toggle("active", isActive);
    });

    if (!activeOption) {
        input.removeAttribute("aria-activedescendant");
        return;
    }

    /*
     * Set aria-selected before changing aria-activedescendant.
     * This gives assistive technology the complete option state
     * when the active-descendant change is exposed.
     */
    input.setAttribute(
        "aria-activedescendant",
        activeOption.id
    );

    activeOption.scrollIntoView({
        block: "nearest"
    });
}

function filterOptions() {
    const query = input.value.trim().toLowerCase();

    visibleOptions = options.filter(option => {
        const matches = option.textContent
            .trim()
            .toLowerCase()
            .includes(query);

        option.hidden = !matches;
        return matches;
    });

    setActiveOption(-1);

    const count = visibleOptions.length;

    status.textContent =
        count === 0
            ? "No suggestions available."
            : `${count} suggestion${count === 1 ? "" : "s"} available.`;

    if (count > 0) {
        openList();
    } else {
        closeList();
    }
}

function selectOption(option) {
    input.value = option.textContent.trim();
    closeList();
    input.focus();
}

/*
 * Typing filters the available options.
 */
input.addEventListener("input", () => {
    selectedOption = null;

    options.forEach(option => {
        option.setAttribute("aria-selected", "false");
    });

    filterOptions();
});

/*
 * Clicking or tapping the input opens the complete list when
 * no filtered results are currently displayed.
 */
input.addEventListener("pointerdown", () => {
    if (listbox.hidden) {
        if (input.value.trim() === "") {
            showAllOptions();
        } else {
            filterOptions();
        }

        openList();
    }
});

input.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowDown":
            event.preventDefault();

            if (listbox.hidden) {
                if (input.value.trim() === "") {
                    showAllOptions();
                } else {
                    filterOptions();
                }

                openList();
            }

            if (visibleOptions.length > 0) {
                const nextIndex =
                    activeIndex < visibleOptions.length - 1
                        ? activeIndex + 1
                        : 0;

                setActiveOption(nextIndex);
            }
            break;

        case "ArrowUp":
            event.preventDefault();

            if (listbox.hidden) {
                if (input.value.trim() === "") {
                    showAllOptions();
                } else {
                    filterOptions();
                }

                openList();
            }

            if (visibleOptions.length > 0) {
                const previousIndex =
                    activeIndex > 0
                        ? activeIndex - 1
                        : visibleOptions.length - 1;

                setActiveOption(previousIndex);
            }
            break;

        case "Enter":
            if (!listbox.hidden && activeIndex >= 0) {
                event.preventDefault();
                selectOption(visibleOptions[activeIndex]);
            }
            break;

        case "Escape":
            if (!listbox.hidden) {
                event.preventDefault();
                closeList();
            }
            break;

        case "Tab":
            closeList();
            break;
    }
});

/*
 * Handle mouse, touch, and pen selection before the input can
 * lose focus and close the popup.
 */
listbox.addEventListener("pointerdown", event => {
    const option = event.target.closest('[role="option"]');

    if (!option || option.hidden) return;

    event.preventDefault();
    selectOption(option);
});

/*
 * Update the visual active state when a pointer moves over
 * an option. This does not move DOM focus from the input.
 */
listbox.addEventListener("pointermove", event => {
    const option = event.target.closest('[role="option"]');

    if (!option || option.hidden) return;

    const index = visibleOptions.indexOf(option);

    if (index >= 0 && index !== activeIndex) {
        setActiveOption(index);
    }
});

/*
 * Delay closing so pointer interaction with an option can finish.
 */
input.addEventListener("blur", () => {
    window.setTimeout(() => {
        if (!input.matches(":focus")) {
            closeList();
        }
    }, 0);
});