document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('article-search');
    const articleCards = Array.from(document.querySelectorAll('.article-card'));

    if (!searchInput || articleCards.length === 0) {
        return;
    }

    const applySearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        articleCards.forEach((card) => {
            const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
            const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
            const keywords = (card.getAttribute('data-title') || '').toLowerCase();
            const category = (card.getAttribute('data-category') || '').toLowerCase();
            const matches = !query || title.includes(query) || desc.includes(query) || keywords.includes(query) || category.includes(query);

            if (matches) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                visibleCount += 1;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
            }
        });

        const emptyState = document.getElementById('search-empty-state');
        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    };

    searchInput.addEventListener('input', applySearch);
    applySearch();
});
