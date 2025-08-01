export class FlashcardLanguage {
    id: number;
    name: string;
    code: string;
    flag: string;

    constructor(id: number, name: string, code: string, countryCode: string) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.flag = countryCodeToFlagEmoji(countryCode);
    }
}


function countryCodeToFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
