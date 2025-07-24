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
    getAddFlashcard(){
        return `/api/anki/add-flashcards`;
    }
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
