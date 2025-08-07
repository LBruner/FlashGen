'use client';

import React, {useState} from "react";
import Link from "next/link";
import {pagePaths} from "@/path-routes";
import {ArrowLeft, CheckCircle, Copy, ExternalLink, Settings, Terminal, Wifi} from "lucide-react";

const AnkiConnectSetupGuide: React.FC = _ => {
    const [copiedStep, setCopiedStep] = useState<string | null>(null);

    const copyToClipboard = (text: string, stepId: string) => {
        navigator.clipboard.writeText(text).then();
        setCopiedStep(stepId);
        setTimeout(() => setCopiedStep(null), 2000);
    };

    const envTemplate = `AI_API_URL=your_ai_api_url_here
          API_AUTHORIZATION_TOKEN=your_auth_token_here
          ANKI_URL=http://localhost:8765`;

    return (
        <div
            className="h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
            <div className="w-8/12 mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link href={pagePaths.getAppGuidePage()}>
                        <button
                            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2"/>
                            Back to Guide
                        </button>
                    </Link>

                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div
                                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Wifi className="w-10 h-10 text-white"/>
                            </div>
                            <div
                                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                <CheckCircle className="w-5 h-5 text-white"/>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Connect to Anki
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Follow these simple steps to set up a seamless connection between your app and Anki desktop
                    </p>
                </div>

                {/* Step 1: Install AnkiConnect */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8 mb-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                            1
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Install AnkiConnect
                                Add-on</h2>
                            <p className="text-gray-600 dark:text-gray-300">Get the essential add-on for Anki
                                communication</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div
                            className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800/30">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Method 1: Direct
                                Installation</h3>
                            <ol className="space-y-3">
                                <li className="flex items-start">
                                    <span
                                        className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                                    <span className="text-blue-800 dark:text-blue-200">Open Anki and go to <strong>Tools → Add-ons</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span
                                        className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                                    <span
                                        className="text-blue-800 dark:text-blue-200">Click <strong>"Get Add-ons..."</strong></span>
                                </li>
                                <li className="flex items-start">
                                    <span
                                        className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                                    <div className="flex-1">
                                        <span className="text-blue-800 dark:text-blue-200">Enter this code:</span>
                                        <div
                                            className="mt-2 bg-white dark:bg-gray-800 rounded-lg border border-blue-300 dark:border-blue-600 p-3 font-mono text-lg flex items-center justify-between">
                                            <span
                                                className="text-blue-900 dark:text-blue-100 font-bold">2055492159</span>
                                            <button
                                                onClick={() => copyToClipboard('2055492159', 'addon-code')}
                                                className="ml-2 p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                                            >
                                                {copiedStep === 'addon-code' ? <CheckCircle className="w-4 h-4"/> :
                                                    <Copy className="w-4 h-4"/>}
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span
                                        className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">4</span>
                                    <span className="text-blue-800 dark:text-blue-200">Click <strong>"OK"</strong> and restart Anki</span>
                                </li>
                            </ol>
                        </div>

                        <div
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Method 2: Web
                                Download</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Alternatively, you can download directly from AnkiWeb:
                            </p>
                            <a
                                href="https://ankiweb.net/shared/info/2055492159"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4 mr-2"/>
                                Visit AnkiWeb
                            </a>
                        </div>
                    </div>
                </div>

                {/* Step 2: Project Setup */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8 mb-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                            2
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set Up the Project</h2>
                            <p className="text-gray-600 dark:text-gray-300">Clone and configure the application</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                                <Terminal className="w-5 h-5 mr-2"/>
                                Prerequisites
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2"/>
                                    <span>Node.js installed on your system</span>
                                </div>
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2"/>
                                    <span>Git for cloning the repository</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Installation Commands</h3>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1. Clone the
                                        repository:</p>
                                    <div
                                        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm flex items-center justify-between border border-gray-700">
                                        <span
                                            className="text-green-400">git clone https://github.com/LBruner/FlashGen</span>
                                        <button
                                            onClick={() => copyToClipboard('git clone https://github.com/LBruner/FlashGen', 'git-clone')}
                                            className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedStep === 'git-clone' ? <CheckCircle className="w-4 h-4"/> :
                                                <Copy className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">2. Navigate to project
                                        directory:</p>
                                    <div
                                        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm flex items-center justify-between border border-gray-700">
                                        <span className="text-green-400">cd FlashGen</span>
                                        <button
                                            onClick={() => copyToClipboard('cd FlashGen', 'cd-project')}
                                            className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedStep === 'cd-project' ? <CheckCircle className="w-4 h-4"/> :
                                                <Copy className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">3. Install
                                        dependencies:</p>
                                    <div
                                        className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm flex items-center justify-between border border-gray-700">
                                        <span className="text-green-400">npm install</span>
                                        <button
                                            onClick={() => copyToClipboard('npm install', 'npm-install')}
                                            className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedStep === 'npm-install' ? <CheckCircle className="w-4 h-4"/> :
                                                <Copy className="w-4 h-4"/>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 3: Environment Configuration */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8 mb-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                            3
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Environment</h2>
                            <p className="text-gray-600 dark:text-gray-300">Set up your environment variables</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div
                            className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30">
                            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                                <Settings className="w-5 h-5 mr-2"/>
                                Environment Variables Setup
                            </h3>
                            <p className="text-purple-800 dark:text-purple-200 mb-4">
                                Create a <code
                                className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded font-mono">.env</code> file
                                in your project root with the following variables:
                            </p>

                            <div
                                className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm border border-gray-700">
                                <pre className="text-green-400 whitespace-pre-wrap">{envTemplate}</pre>
                                <button
                                    onClick={() => copyToClipboard(envTemplate, 'env-template')}
                                    className="mt-3 inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                                >
                                    {copiedStep === 'env-template' ? <CheckCircle className="w-3 h-3 mr-1"/> :
                                        <Copy className="w-3 h-3 mr-1"/>}
                                    Copy Template
                                </button>
                            </div>
                        </div>

                        <div
                            className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800/30">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Variable
                                Descriptions:</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <code
                                        className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded font-mono text-sm mr-3 mt-0.5">AI_API_URL</code>
                                    <span className="text-amber-800 dark:text-amber-200 text-sm">Your AI service API endpoint URL</span>
                                </div>
                                <div className="flex items-start">
                                    <code
                                        className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded font-mono text-sm mr-3 mt-0.5">API_AUTHORIZATION_TOKEN</code>
                                    <span className="text-amber-800 dark:text-amber-200 text-sm">Authorization token for your AI service</span>
                                </div>
                                <div className="flex items-start">
                                    <code
                                        className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded font-mono text-sm mr-3 mt-0.5">ANKI_URL</code>
                                    <span className="text-amber-800 dark:text-amber-200 text-sm">AnkiConnect URL (default: http://localhost:8765)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4: Build and Run */}
                <div
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 p-8 mb-8 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <div
                            className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-lg">
                            4
                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Build and Launch</h2>
                            <p className="text-gray-600 dark:text-gray-300">Start using your app with Anki</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">1. Build the project:</p>
                                <div
                                    className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm flex items-center justify-between border border-gray-700">
                                    <span className="text-green-400">npm run build</span>
                                    <button
                                        onClick={() => copyToClipboard('npm run build', 'npm-build')}
                                        className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copiedStep === 'npm-build' ? <CheckCircle className="w-4 h-4"/> :
                                            <Copy className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">2. Start the
                                    application:</p>
                                <div
                                    className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 font-mono text-sm flex items-center justify-between border border-gray-700">
                                    <span className="text-green-400">npm start</span>
                                    <button
                                        onClick={() => copyToClipboard('npm start', 'npm-start')}
                                        className="ml-2 p-1 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copiedStep === 'npm-start' ? <CheckCircle className="w-4 h-4"/> :
                                            <Copy className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800/30">
                            <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-4">Final Steps:</h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-emerald-800 dark:text-emerald-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3"/>
                                    <span>Make sure Anki is running with AnkiConnect installed</span>
                                </div>
                                <div className="flex items-center text-emerald-800 dark:text-emerald-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3"/>
                                    <span>Test the connection in your app</span>
                                </div>
                                <div className="flex items-center text-emerald-800 dark:text-emerald-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3"/>
                                    <span>Start creating and syncing flashcards!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center text-white shadow-xl">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8"/>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
                    <p className="text-green-100 mb-6">
                        Your app is now connected to Anki. You can start creating flashcards that will automatically
                        sync with your Anki decks.
                    </p>
                    <Link href={pagePaths.getHomePage()}>
                        <button
                            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-md">
                            Start Creating Flashcards
                        </button>
                    </Link>
                </div>

                {/* Troubleshooting */}
                <div
                    className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need Help?</h2>
                    <div className="space-y-3 text-gray-600 dark:text-gray-300">
                        <p>• Make sure Anki is running before starting the app</p>
                        <p>• Check that AnkiConnect is properly installed (Tools → Add-ons)</p>
                        <p>• Verify your environment variables are correctly set</p>
                        <p>• Ensure no firewall is blocking localhost:8765</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnkiConnectSetupGuide;