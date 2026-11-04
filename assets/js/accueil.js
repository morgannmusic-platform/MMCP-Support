// --- RÉPERTOIRE GLOBAL DES ARTICLES (Pour référence et futures pages) ---
const GLOBAL_ARTICLES_DIRECTORY = [
    { id: 1, titre: "Distribution Globale", categorie: "distribution", url: "/distribution/guide-plateformes.html", icone: "distribution.png" },
    { id: 2, titre: "100% de vos Royalties", categorie: "revenus", url: "/revenus/gestion-royalties.html", icone: "royalties.png" },
    { id: 3, titre: "Son Haute Définition & Dolby Atmos", categorie: "technique", url: "/technique/dolby-atmos.html", icone: "audio.png" },
    { id: 4, titre: "Statuts & Contrats Signés", categorie: "compte", url: "/compte/statuts-contrats.html", icone: "contrat.png" },
    { id: 5, titre: "Système de Paiement & Retraits", categorie: "finances", url: "/finances/paiements.html", icone: "paiement.png" },
    { id: 6, titre: "Codes ISRC et UPC", categorie: "technique", url: "/technique/codes-isrc-upc.html", icone: "codes.png" },
    { id: 7, titre: "Guide de l'artiste Pro", categorie: "compte", url: "/compte/guide-pro.html", icone: "pro.png" },
    { id: 8, titre: "Distribution Label Indépendant", categorie: "distribution", url: "/distribution/label-independant.html", icone: "label.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- VERROUILLAGE DU SCROLL AU DÉPART ---
    document.body.classList.add('locked-scroll');

    // --- 1. GESTION DES INFOS BULLES (HOVER) ---
    const helpIcons = document.querySelectorAll('.help-icon');
    const infoDisplay = document.getElementById('role-info-display');

    helpIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const card = icon.closest('.role-card');
            const infoText = card.getAttribute('data-info');
            infoDisplay.textContent = infoText;
            infoDisplay.style.display = 'block';
        });

        icon.addEventListener('mouseleave', () => {
            infoDisplay.style.display = 'none';
            infoDisplay.textContent = '';
        });
    });


    // --- 2. ANIMATION KARAOKE DU HAUT + APPARITION DES ICÔNES ---
    const textContainer = document.querySelector('.karaoke-text');
    const roleCards = document.querySelectorAll('.role-card');

    if (roleCards.length > 0) {
        gsap.set(roleCards, { opacity: 0, y: 20, scale: 0.95 });
    }

    if (textContainer) {
        const words = textContainer.querySelectorAll('.word');
        words.forEach(word => {
            const wordText = word.textContent;
            word.innerHTML = '';
            for (let i = 0; i < wordText.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = wordText[i];
                word.appendChild(charSpan);
            }
        });

        const chars = textContainer.querySelectorAll('.char');

        gsap.set(chars, {
            opacity: 0,
            y: 8,
            scale: 0.95,
            fontWeight: 'normal',
            color: '#222947',
            textShadow: 'none'
        });

        const charsArray = Array.from(chars);
        const part1Chars = charsArray.slice(0, 14);
        const part2Chars = charsArray.slice(14);

        const masterTl = gsap.timeline({
            onComplete: () => {
                // --- DÉVERROUILLAGE DU SCROLL UNE FOIS L'INTRO TERMINÉE ---
                document.body.classList.remove('locked-scroll');
            }
        });

        // Animation du texte partie 1
        masterTl.to(part1Chars, {
            duration: 0.5,
            opacity: 1,
            y: -3,
            scale: 1.1,
            color: '#515a80',
            fontWeight: 'bold',
            textShadow: '0 0 10px #515a809d',
            stagger: {
                each: 0.06,
                onComplete: function () {
                    gsap.to(this.targets(), {
                        duration: 0.4,
                        y: 0,
                        scale: 1,
                        color: '#222947',
                        fontWeight: 'normal',
                        textShadow: 'none'
                    });
                }
            }
        })
            .to({}, { duration: 0.2 })
            // Animation du texte partie 2
            .to(part2Chars, {
                duration: 0.45,
                opacity: 1,
                y: -3,
                scale: 1.1,
                color: '#515a80',
                fontWeight: 'bold',
                textShadow: '0 0 10px #515a809d',
                stagger: {
                    each: 0.04,
                    onComplete: function () {
                        gsap.to(this.targets(), {
                            duration: 0.35,
                            y: 0,
                            scale: 1,
                            color: '#222947',
                            fontWeight: 'normal',
                            textShadow: 'none'
                        });
                    }
                }
            })
            // --- 3. APPARITION DES ICÔNES UNE PAR UNE ---
            .to(roleCards, {
                duration: 0.6,
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.2,
                ease: 'back.out(1.5)',
                onStart: () => {
                    roleCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('highlight');
                            setTimeout(() => {
                                card.classList.remove('highlight');
                            }, 600);
                        }, index * 200);
                    });
                }
            }, "+=0.2");
    }


    // --- 4. ANIMATION DU BAS AU DÉFILEMENT (FAMILLE & ARTICLES) ---
    const familleSection = document.querySelector('.famille-section');
    if (familleSection) {
        const familleTextContainer = document.querySelector('.karaoke-text-famille');
        const wordsF = familleTextContainer.querySelectorAll('.word-f');

        wordsF.forEach(word => {
            const wordText = word.textContent;
            word.innerHTML = '';
            for (let i = 0; i < wordText.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.className = 'char-f';
                charSpan.textContent = wordText[i];
                word.appendChild(charSpan);
            }
        });

        const charsF = familleTextContainer.querySelectorAll('.char-f');
        const familleQ = familleSection.querySelector('.famille-q');

        gsap.set(charsF, {
            opacity: 0,
            y: 8,
            scale: 0.95,
            fontWeight: 'normal',
            color: '#222947',
            textShadow: 'none'
        });

        if (familleQ) {
            gsap.set(familleQ, { fontSize: '24pt' });
        }

        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    if (familleQ) {
                        gsap.to(familleQ, {
                            duration: 0.4,
                            fontSize: '36pt',
                            ease: 'power2.out'
                        });

                        setTimeout(() => {
                            gsap.to(familleQ, {
                                duration: 0.5,
                                fontSize: '24pt',
                                ease: 'power2.inOut'
                            });
                        }, 3000);
                    }

                    gsap.to(charsF, {
                        duration: 0.45,
                        opacity: 1,
                        y: -3,
                        scale: 1.1,
                        color: '#515a80',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px #515a809d',
                        delay: 2.0,
                        stagger: {
                            each: 0.05,
                            onComplete: function () {
                                gsap.to(this.targets(), {
                                    duration: 0.35,
                                    y: 0,
                                    scale: 1,
                                    color: '#222947',
                                    fontWeight: 'normal',
                                    textShadow: 'none'
                                });
                            }
                        }
                    });
                }
            });
        }, { threshold: 0.8 });

        observer.observe(familleSection);
    }


    // --- 5. ANIMATION DES CARTES D'ARTICLES ET BARRE DE RECHERCHE ---
    const articlesSection = document.querySelector('.articles-section');
    if (articlesSection) {
        const searchBar = document.querySelector('.search-bar-wrapper');
        const articleCards = document.querySelectorAll('.article-card');

        gsap.set(searchBar, { opacity: 0, y: -20, scale: 0.95 });
        gsap.set(articleCards, { opacity: 0, y: 30 });

        let articlesAnimated = false;

        const articlesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !articlesAnimated) {
                    articlesAnimated = true;

                    const articlesTl = gsap.timeline();

                    articlesTl.to(searchBar, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        ease: 'power2.out'
                    })
                        .to(articleCards, {
                            duration: 0.6,
                            opacity: 1,
                            y: 0,
                            stagger: 0.15,
                            ease: 'power2.out'
                        }, "-=0.2");
                }
            });
        }, { threshold: 0.2 });

        articlesObserver.observe(articlesSection);

        // --- 6. FILTRE DE RECHERCHE INTERACTIF GLOBAL ---
        const searchInput = document.getElementById('article-search');
        if (searchInput) {
            const applySearch = () => {
                const query = searchInput.value.toLowerCase().trim();
                let visibleCount = 0;

                articleCards.forEach(card => {
                    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                    const keywords = (card.getAttribute('data-title') || '').toLowerCase();
                    const category = (card.getAttribute('data-category') || '').toLowerCase();
                    const matches = !query || title.includes(query) || desc.includes(query) || keywords.includes(query) || category.includes(query);

                    if (matches) {
                        visibleCount += 1;
                        card.style.display = 'flex';
                        if (typeof gsap !== 'undefined') {
                            gsap.to(card, { duration: 0.2, opacity: 1, scale: 1, clearProps: 'transform,opacity' });
                        }
                    } else {
                        card.style.display = 'none';
                        if (typeof gsap !== 'undefined') {
                            gsap.set(card, { opacity: 0, scale: 0.96 });
                        }
                    }
                });

                const emptyState = document.getElementById('search-empty-state');
                if (emptyState) {
                    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            };

            searchInput.addEventListener('input', applySearch);
            applySearch();
        }
    }
});