export interface Cartas {
    ok:    boolean;
    carta: Carta;
}

export interface Carta {
    name:          string;
    manaCost:      string;
    cmc:           number;
    colors:        string[];
    colorIdentity: string[];
    type:          string;
    types:         string[];
    rarity:        string;
    set:           string;
    setName:       string;
    text:          string;
    flavor:        string;
    artist:        string;
    number:        string;
    layout:        string;
    multiverseid:  string;
    imageUrl:      string;
    rulings:       Ruling[];
    foreignNames:  ForeignName[];
    printings:     string[];
    originalText:  string;
    originalType:  string;
    legalities:    LegalityElement[];
    id:            string;
}

export interface ForeignName {
    name:         string;
    text:         string;
    type:         string;
    flavor:       string;
    imageUrl:     string;
    language:     string;
    identifiers:  Identifiers;
    multiverseid: number;
}

export interface Identifiers {
    scryfallId:   string;
    multiverseId: number;
}

export interface LegalityElement {
    format:   string;
    legality: LegalityEnum;
}

export enum LegalityEnum {
    Legal = "Legal",
}

export interface Ruling {
    date: string;
    text: string;
}

export interface CartaBuscar {
    name: string;
}

export interface CartaGuardar {
    id_api: number;
    nombre_es: string;
    nombre_en: string;
    foto_es: string;
    foto_en: string;
}

export interface CartaNoRepetida {
    id : number;
    status : string;
}