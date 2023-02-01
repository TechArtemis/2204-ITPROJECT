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

export interface Location {
    Address: string
    City: string
    Province: Location.Province
    PostalCode: string
}