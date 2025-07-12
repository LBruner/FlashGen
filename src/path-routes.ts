export const ankiPaths = {
    getConnection() {
        return '/api/anki/connection';
    },
    getDeckList() {
        return `${process.env.LOCAL_API_URL}/anki/decks`;
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
