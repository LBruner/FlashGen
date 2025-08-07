import AnkiConnectSetupGuide from "@/components/anki-connection/guide/anki-connect-setup-guide";
import {appName} from "@/constants";

export const metadata = {
    title: `AnkiConnect Guide | ${appName}`,
};

const AnkiSetupGuidePage = () => {
    return (
        <AnkiConnectSetupGuide/>
    );
};

export default AnkiSetupGuidePage;