export const ankiPaths = {
    getConnection() {
        return '/api/anki/connection';
    },
    getDeckList() {
        return `${process.env.LOCAL_API_URL}/anki/decks`;
    },
    getDeckStats() {
        return `${process.env.LOCAL_API_URL}/anki/deck-stats`;
    },
}

export const pagePaths = {
    getHomePage() {
        return '/flashcards';
    },
    getUserDecksPage() {
        return '/user-decks';
    },
    getSettingsPage() {
        return '/settings';
    },
}
