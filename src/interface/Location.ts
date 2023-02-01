/**
 * Enum for Location
 */
export namespace Location {
    export enum Province {
        AB,
        BC,
        MB,
        NB,
        NL,
        NS,
        NT,
        NU,
        ON,
        PE,
        QC,
        SK,
        YT
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