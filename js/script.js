document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ÉLÉMENTS
    ========================================================= */

    const menuButton = document.querySelector(".menu");
    const navigation = document.querySelector(".links");
    const header = document.querySelector(".header");

    const navigationLinks = document.querySelectorAll(
        ".links a[href^='#']"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    /* =========================================================
       MENU MOBILE
    ========================================================= */

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon =
                menuButton.querySelector("i");

            if (icon) {

                icon.className = isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

            }

        });


        /* Fermer le menu après un clic */

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuButton.querySelector("i");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bars";
                }

            });

        });


        /* Fermer si on clique ailleurs */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                navigation.contains(event.target);

            const clickedButton =
                menuButton.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton &&
                navigation.classList.contains("open")
            ) {

                navigation.classList.remove("open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuButton.querySelector("i");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bars";
                }

            }

        });

    }


    /* =========================================================
       HEADER AU SCROLL
    ========================================================= */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =========================================================
       NAVIGATION ACTIVE
    ========================================================= */

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                currentSection &&
                target === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =========================================================
       ANIMATION DES ÉLÉMENTS
    ========================================================= */

    const animatedElements =
        document.querySelectorAll(
            ".skill-card, " +
            ".project, " +
            ".stats article, " +
            ".timeline article, " +
            ".about-location > div, " +
            ".projects-more"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        animatedElements.forEach(
            (element, index) => {

                element.classList.add("reveal");

                /*
                 Petit décalage entre les cartes
                 pour une animation plus naturelle.
                */

                element.style.transitionDelay =
                    `${Math.min(index * 0.025, 0.15)}s`;

                observer.observe(element);

            }
        );

    } else {

        animatedElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =========================================================
       ANNÉE AUTOMATIQUE
    ========================================================= */

    const yearElement =
        document.querySelector(
            "[data-year]"
        );

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =========================================================
       LIENS EXTERNES — OUVERTURE
    ========================================================= */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "clicked"
                );

                setTimeout(() => {

                    link.classList.remove(
                        "clicked"
                    );

                }, 300);

            }
        );

    });


    /* =========================================================
       EFFET SUR LES CARTES PROJETS
    ========================================================= */

    const projects =
        document.querySelectorAll(
            ".project"
        );


    projects.forEach((project) => {

        project.addEventListener(
            "mouseenter",
            () => {

                project.classList.add(
                    "project-hover"
                );

            }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                project.classList.remove(
                    "project-hover"
                );

            }
        );

    });


    /* =========================================================
       EFFET SUR LES TECHNOLOGIES
    ========================================================= */

    const technologies =
        document.querySelectorAll(
            ".tech-list span, .project-tech span"
        );


    technologies.forEach((technology) => {

        technology.addEventListener(
            "mouseenter",
            () => {

                technology.classList.add(
                    "tech-hover"
                );

            }
        );


        technology.addEventListener(
            "mouseleave",
            () => {

                technology.classList.remove(
                    "tech-hover"
                );

            }
        );

    });


    /* =========================================================
       SCROLL DOUX POUR LES ANCRES
    ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =========================================================
       PARALLAXE LÉGER DE LA PHOTO
    ========================================================= */

    const portrait =
        document.querySelector(
            ".portrait"
        );


    let ticking = false;


    function updatePortrait() {

        if (
            !portrait ||
            window.innerWidth <= 760
        ) {

            ticking = false;

            return;

        }


        const scrollY =
            window.scrollY;

        const movement =
            Math.min(
                scrollY * 0.025,
                18
            );


        portrait.style.transform =
            `translateY(${-movement}px)`;


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updatePortrait
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    /* =========================================================
       EMPÊCHER LE PARALLAXE DE RESTER SUR MOBILE
    ========================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                portrait &&
                window.innerWidth <= 760
            ) {

                portrait.style.transform =
                    "";

            }

        }
    );


    /* =========================================================
       BOUTON CV
    ========================================================= */

    const cvLinks =
        document.querySelectorAll(
            'a[href*="cv.pdf"]'
        );


    cvLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.classList.add(
                    "cv-clicked"
                );

                setTimeout(() => {

                    link.classList.remove(
                        "cv-clicked"
                    );

                }, 500);

            }
        );

    });


    /* =========================================================
       CONSOLE
    ========================================================= */

    console.log(
        "%c El Hadji Madiara Gueye ",
        "background:#3184ff;color:white;" +
        "padding:8px 12px;border-radius:6px;" +
        "font-weight:bold;"
    );

    console.log(
        "Portfolio — Data Science · IA · Web"
    );

});