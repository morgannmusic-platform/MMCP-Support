document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar");

    if (!navbarContainer) {
        console.warn("Element #navbar introuvable dans le DOM.");
        return;
    }

    const navbarPath = "/assets/navbar/navbar.html";

    fetch(navbarPath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: Impossible de charger le fichier ${navbarPath}`);
            }
            return response.text();
        })
        .then((data) => {
            navbarContainer.innerHTML = data;

            const desktopNavLinks = navbarContainer.querySelector("#desktop-nav-links");
            const mobileMenuOverlay = navbarContainer.querySelector("#mobile-menu-overlay");
            const mobileMenu = navbarContainer.querySelector("#mobile-menu");
            const menuToggle = navbarContainer.querySelector("#menu-toggle");

            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const animateNavbar = () => {
                if (typeof gsap !== "undefined" && !reducedMotion) {
                    const tl = gsap.timeline();
                    tl.to(".navbar", {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                        startAt: { y: -20, opacity: 0 }
                    });

                    tl.to(".nav-logo", {
                        opacity: 1,
                        duration: 0.4,
                        ease: "power1.out"
                    }, "-=0.2");

                    tl.to(".nav-item", {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.06,
                        ease: "power1.out",
                        startAt: { y: -5, opacity: 0 }
                    }, "-=0.25");
                } else {
                    const bar = navbarContainer.querySelector(".navbar");
                    if (bar) bar.style.opacity = "1";
                    navbarContainer.querySelectorAll(".nav-logo, .nav-item").forEach((el) => {
                        el.style.opacity = "1";
                    });
                }
            };

            const mobileNavLinksContainer = document.createElement('div');
            mobileNavLinksContainer.className = 'mobile-nav-links';
            if (desktopNavLinks) mobileNavLinksContainer.innerHTML = desktopNavLinks.innerHTML;
            mobileMenu.appendChild(mobileNavLinksContainer);

            const attachMobileMenuLinkListeners = () => {
                mobileMenu.querySelectorAll('a, button').forEach(link => {
                    link.addEventListener('click', () => closeMobileMenu());
                });
            };

            attachMobileMenuLinkListeners();

            const openMobileMenu = () => {
                if (typeof gsap === "undefined" || reducedMotion) {
                    mobileMenuOverlay.style.display = "block";
                    mobileMenuOverlay.style.opacity = "1";
                    mobileMenu.style.transform = "translateX(0)";
                } else {
                    gsap.set(mobileMenuOverlay, { display: 'block' });
                    gsap.to(mobileMenuOverlay, { opacity: 1, duration: 0.3 });
                    gsap.to(mobileMenu, { x: "0%", duration: 0.4, ease: "power2.out" });

                    gsap.fromTo(mobileMenu.querySelectorAll('a'),
                        { opacity: 0, x: 20 },
                        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.1 }
                    );
                }
                menuToggle?.classList.add('is-active');
            };

            const closeMobileMenu = () => {
                if (typeof gsap === "undefined" || reducedMotion) {
                    mobileMenuOverlay.style.display = "none";
                    mobileMenu.style.transform = "translateX(100%)";
                } else {
                    gsap.to(mobileMenu, { x: "100%", duration: 0.4, ease: "power2.in" });
                    gsap.to(mobileMenuOverlay, {
                        opacity: 0,
                        duration: 0.3,
                        onComplete: () => gsap.set(mobileMenuOverlay, { display: 'none' })
                    });
                }
                menuToggle?.classList.remove('is-active');
            };

            menuToggle?.addEventListener("click", () => {
                const isOpen = menuToggle.classList.contains('is-active');
                if (isOpen) closeMobileMenu();
                else openMobileMenu();
            });

            mobileMenuOverlay?.addEventListener("click", (e) => {
                if (e.target === mobileMenuOverlay) closeMobileMenu();
            });

            animateNavbar();

            const logo = navbarContainer.querySelector(".nav-logo");
            if (logo && typeof gsap !== "undefined" && !reducedMotion) {
                logo.addEventListener("mouseenter", () => {
                    gsap.to(logo, { scale: 1.1, duration: 0.3, ease: "power2.out" });
                });
                logo.addEventListener("mouseleave", () => {
                    gsap.to(logo, { scale: 1, duration: 0.3, ease: "power2.inOut" });
                });
            }
        })
        .catch((error) => console.error("Erreur Navbar:", error));
});