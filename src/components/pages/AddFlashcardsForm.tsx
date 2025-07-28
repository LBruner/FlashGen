import React, {Dispatch, SetStateAction} from "react";
import LanguageSettingsModal from "@/components/UI/language-settings-modal/language-settings-modal";
import TagInput from "@/components/UI/tag-input/TagInput";
import {IoFlash, IoGlobeOutline, IoSparkles} from "react-icons/io5";
import DashboardHeader from "@/components/UI/dashboard/DashboardHeader";
import {useAppSettings} from "@/store/context/settings-context-provider";
import CustomToast from "@/components/UI/toast/CustomToast";
import {useRouter} from "next/navigation";
import {pagePaths} from "@/path-routes";

interface AddFlashcardsScreenProps {
    selectedDeck: string;
    setSelectedDeck: Dispatch<SetStateAction<string>>;
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
    inputLanguage: string;
    setInputLanguage: Dispatch<SetStateAction<string>>;
    outputLanguage: string;
    setOutputLanguage: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    handleCreateFlashcards: () => void;
    userDecks: string[];
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const AddFlashcardsForm: React.FC<AddFlashcardsScreenProps> = (props) => {
    const {isAnkiConnected} = useAppSettings();
    const router = useRouter();

    const redirectToGuidePage = () =>{
        router.push(pagePaths.getAppGuidePage());
    }

    return (
        <div className={'w-full h-auto relative overflow-hidden'}>
            <CustomToast
                title={'Connection Error!'} content={`We can't connect to AnkiConnect API`} type={'default'}
                shouldDisplayToast={!isAnkiConnected}
                onClickActionBtn={redirectToGuidePage}
            />
            <div className={'relative z-10 flex flex-col w-full h-screen py-8 px-12'}>
                <DashboardHeader
                    title={'Create Flashcards'}
                />
                <div className={'flex-1 flex flex-col justify-center items-center mb-24'}>
                    <LanguageSettingsModal {...props}/>

                    <div className={'w-full'}>
                        <div className={'text-center mb-12'}>
                            <div className={'inline-flex items-center justify-center mb-8 relative'}>
                                <div
                                    className={'relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300'}>
                                    <IoGlobeOutline size={28} className="text-white animate-spin-slow"/>
                                </div>
                            </div>

                            <p className={'text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 leading-tight'}>
                                Add Words to Study
                            </p>

                            <p className={'text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium'}>
                                Type words, press Enter, and watch AI create{' '}
                                <span
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                                    perfect flashcards
                                </span>{' '}
                                for your learning journey
                            </p>
                        </div>

                        <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto'}>
                            <div
                                className={'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300'}>
                                <div
                                    className={'text-2xl font-bold text-blue-600 dark:text-blue-400'}>{props.tags.length}</div>
                                <div className={'text-sm text-gray-600 dark:text-gray-300 font-medium'}>Words Added
                                </div>
                            </div>
                            <div
                                className={'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300'}>
                                <div className={'text-2xl font-bold text-purple-600 dark:text-purple-400'}>AI</div>
                                <div className={'text-sm text-gray-600 dark:text-gray-300 font-medium'}>Powered</div>
                            </div>
                            <div
                                className={'bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300'}>
                                <div className={'text-2xl font-bold text-emerald-600 dark:text-emerald-400'}>∞</div>
                                <div className={'text-sm text-gray-600 dark:text-gray-300 font-medium'}>Possibilities
                                </div>
                            </div>
                        </div>

                        <div
                            className={'relative group max-w-3xl mx-auto'}
                        >
                            <div
                                className={'relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border border-white/40 dark:border-gray-700/40 rounded-3xl p-8 sm:p-10 shadow-2xl'}>
                                <div className={'mb-8'}>
                                    <div className={'relative'}>
                                        <TagInput tags={props.tags} setTags={props.setTags}/>
                                    </div>
                                </div>
                                <button
                                    onClick={props.onOpen}
                                    disabled={props.tags.length === 0 || props.isLoading}
                                    className={`group/btn relative w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                                        props.tags.length > 0 && !props.isLoading
                                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-2xl hover:shadow-purple-500/25'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    } overflow-hidden`}
                                >
                                    <div className={'relative flex items-center justify-center gap-3'}>
                                        {props.isLoading ? (
                                            <>
                                                <div
                                                    className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                                                <span>Creating Magic...</span>
                                            </>
                                        ) : (
                                            <>
                                                <IoSparkles
                                                    className={`${props.tags.length > 0 ? "text-white" : "text-gray-500 dark:text-gray-400"} animate-pulse`}
                                                    size={24}/>
                                                <span>Create {props.tags.length} Flashcards</span>
                                                {props.tags.length > 0 &&
                                                    <IoFlash className="text-white animate-bounce" size={20}/>}
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFlashcardsForm;