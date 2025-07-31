export const ankiPaths = {
    getConnection() {
        return '/api/anki/connection';
    },
    getDeckStats() {
        return `/api/anki/decks/stats`;
    },
    getFlashcardsEndpoint() {
        return `/api/anki/flashcards`;
    },
    getDecksEndpoint() {
        return `/api/anki/decks`;
    },
    getDecksStatsEndpoint() {
        return `/api/anki/decks`;
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
    getAnkiConnectPageGuide(){
        return '/app-guide/anki-connect';
    },
    getTsvExportPageGuide(){
        return '/app-guide/tsv-export';
    }
}
