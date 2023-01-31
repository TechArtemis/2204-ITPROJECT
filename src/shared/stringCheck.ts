export function validateStr(string: String) {
    const stringNum = +string;
    if (string === "" || !string || !isNaN(stringNum) || string.trim() === "") {
        return false;
    }
    return true;
}