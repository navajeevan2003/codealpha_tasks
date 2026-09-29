/* =========================================================
   CODEALPHA IMAGE GALLERY
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const gallery =
    document.getElementById("gallery");

const galleryItems =
    Array.from(
        document.querySelectorAll(".gallery-item")
    );

const filterButtons =
    document.querySelectorAll(".filter-btn");

const searchInput =
    document.getElementById("searchInput");

const noResults =
    document.getElementById("noResults");

const themeBtn =
    document.getElementById("themeBtn");

const modal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalClose =
    document.getElementById("modalClose");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================================================
   VARIABLES
========================================================= */

let currentFilter = "all";

let currentModalIndex = 0;


/* =========================================================
   FILTER GALLERY
========================================================= */

function filterGallery() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleCount = 0;


    galleryItems.forEach(
        (item) => {

            const category =
                item.dataset.category;

            const title =
                item.dataset.title
                    .toLowerCase();


            const categoryMatch =
                currentFilter === "all" ||
                category === currentFilter;


            const searchMatch =
                title.includes(searchText);


            if (
                categoryMatch &&
                searchMatch
            ) {

                item.style.display = "block";

                visibleCount++;

            }

            else {

                item.style.display = "none";

            }

        }
    );


    if (visibleCount === 0) {

        noResults.style.display = "block";

    }

    else {

        noResults.style.display = "none";

    }

}


/* =========================================================
   FILTER BUTTONS
========================================================= */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                filterGallery();

            }
        );

    }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    filterGallery
);


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(index) {

    currentModalIndex = index;

    const item =
        galleryItems[index];

    const image =
        item.querySelector("img");

    const itemTitle =
        item.dataset.title;

    const category =
        item.dataset.category;


    modalImage.src =
        image.src;

    modalImage.alt =
        image.alt;

    modalTitle.textContent =
        itemTitle;

    modalCategory.textContent =
        category.charAt(0).toUpperCase() +
        category.slice(1);


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeModal
);


/* =========================================================
   GALLERY IMAGE CLICK
========================================================= */

galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            (event) => {

                if (
                    event.target.classList.contains(
                        "view-btn"
                    ) ||
                    event.target.tagName === "IMG"
                ) {

                    openModal(index);

                }

            }
        );

    }
);


/* =========================================================
   NEXT IMAGE
========================================================= */

function showNext() {

    currentModalIndex++;

    if (
        currentModalIndex >=
        galleryItems.length
    ) {

        currentModalIndex = 0;

    }

    openModal(currentModalIndex);

}


nextBtn.addEventListener(
    "click",
    showNext
);


/* =========================================================
   PREVIOUS IMAGE
========================================================= */

function showPrevious() {

    currentModalIndex--;

    if (
        currentModalIndex < 0
    ) {

        currentModalIndex =
            galleryItems.length - 1;

    }

    openModal(currentModalIndex);

}


prevBtn.addEventListener(
    "click",
    showPrevious
);


/* =========================================================
   MODAL BACKGROUND CLICK
========================================================= */

modal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !modal.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeModal();

        }


        if (event.key === "ArrowRight") {

            showNext();

        }


        if (event.key === "ArrowLeft") {

            showPrevious();

        }

    }
);


/* =========================================================
   THEME
========================================================= */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            themeBtn.textContent = "🌙";

        }

        else {

            themeBtn.textContent = "☀";

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

filterGallery();

console.log(
    "CodeAlpha Image Gallery loaded successfully."
);