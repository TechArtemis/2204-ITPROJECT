
/**
 * @param {string} address - address of location
 * @param {string} city - city of location
 * @param {string} province - province of location
 * @param {string} postalCode - postal code of location
 *
 */
export interface Location {
    address: string
    city: string
    province: Location.Province
    postalCode: string
}

//namespace for Location
export namespace Location {

    // Enum for Province
    export enum Province {
        AB = "AB",
        BC = "BC",
        MB = "MB",
        NB = "NB",
        NL = "NL",
        NS = "NS",
        NT = "NT",
        NU = "NU",
        ON = "ON",
        PE = "PE",
        QC = "QC",
        SK = "SK",
        YT = "YT"
    }
}

