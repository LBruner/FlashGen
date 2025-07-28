import {ArrowRight, CheckCircle, Download, Wifi, WifiOff} from 'lucide-react';

const AppGuideOptions = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <WifiOff className="w-8 h-8 text-red-600 dark:text-red-400"/>
                            </div>
                            <div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Anki Connection Not Available
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Don't worry! You can still use this app in two different ways. Choose the method that works best
                        for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 p-8 border-2 border-transparent dark:border-gray-700 transition-all duration-300 cursor-pointer hover:shadow-xl dark:hover:shadow-gray-900/40 hover:border-blue-200 dark:hover:border-blue-600/50
                        }`}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Wifi className="w-8 h-8 text-blue-600 dark:text-blue-400"/>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                            Connect to Anki
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                            Set up a direct connection to your Anki desktop application for seamless card management.
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Real-time sync with Anki</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Automatic card creation</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Direct deck management</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border dark:border-blue-800/30">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Requirements:</strong> Anki desktop app with AnkiConnect add-on installed
                            </p>
                        </div>

                        <button
                            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center shadow-sm dark:shadow-gray-900/20">
                            <span>Learn How to Connect</span>
                            <ArrowRight className="w-4 h-4 ml-2"/>
                        </button>
                    </div>

                    <div
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 p-8 border-2 border-transparent dark:border-gray-700 transition-all duration-300 cursor-pointer hover:shadow-xl dark:hover:shadow-gray-900/40 hover:border-green-200 dark:hover:border-green-600/50`}
                    >
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <Download className="w-8 h-8 text-green-600 dark:text-green-400"/>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-4">
                            Download CSV File
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                            Export your cards as a CSV file that you can manually import into Anki or other
                            applications.
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Works without Anki running</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Compatible with any platform</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0"/>
                                <span>Full control over import process</span>
                            </div>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-6 border dark:border-green-800/30">
                            <p className="text-sm text-green-800 dark:text-green-200">
                                <strong>Perfect for:</strong> Users who prefer manual control or don't have Anki desktop
                            </p>
                        </div>

                        <button
                            className="w-full bg-green-600 dark:bg-green-700 text-white py-3 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-200 flex items-center justify-center shadow-sm dark:shadow-gray-900/20">
                            <span>Learn About CSV Export</span>
                            <ArrowRight className="w-4 h-4 ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppGuideOptions;