// Description: Checks if a string is valid
export function isValidStr(string: String) {
    const stringNum = +string;
    if (string === "" || !string || !isNaN(stringNum) || string.trim() === "") {
        return false;
    }

    return true;
}