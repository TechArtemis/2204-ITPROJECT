/**
 * Enum for Location
 */
export namespace Location {
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

/**
 * Interface for Location
 */
export interface Location {
    address: string
    city: string
    province: Location.Province
    postalCode: string
}