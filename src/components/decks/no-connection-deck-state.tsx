import {BookOpen, Wifi, WifiOff} from 'lucide-react';
import Link from "next/link";
import {pagePaths} from "@/path-routes";

const UserCardsNoConnection = () => {
    return (
        <div className="h-screen flex flex-col justify-start items-center py-32">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400"/>
                            </div>
                            <div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 dark:bg-orange-600 rounded-full flex items-center justify-center">
                                <WifiOff className="w-3 h-3 text-white"/>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Can't Load Your Decks
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        We can't connect to Anki to retrieve your decks right now. Here are some ways you can still manage your cards.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 p-6 border dark:border-gray-700">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Need Help Connecting to Anki?
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Make sure Anki desktop is running and you have the AnkiConnect add-on installed. The connection requires both to be active.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={() =>{window.location.reload()}} className="bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-sm shadow-sm dark:shadow-gray-900/20">
                                    Retry Connection
                                </button>
                                <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-sm">
                                    <Link href={pagePaths.getAppGuidePage()}>View Guide</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCardsNoConnection;