export const ankiPaths = {
    getConnection() {
        return '/api/anki/connection';
    },
    getDeckList() {
        return `/api/anki/decks`;
    },
    getDeckStats() {
        return `/api/anki/deck-stats`;
    },
    getAddFlashcard() {
        return `/api/anki/add-flashcards`;
    },
    getCreateDeck() {
        return `/api/anki/create-deck`;
    },
    getDeleteDeck() {
        return `/api/anki/delete-deck`;
    },
}

export const pagePaths = {
    getHomePage() {
        return '/home';
    },
    getUserDecksPage() {
        return '/user-decks';
    },
    getSettingsPage() {
        return '/settings';
    },
    getAppGuidePage() {
        return '/app-guide';
    },
}
