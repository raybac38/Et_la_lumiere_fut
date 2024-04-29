

export class Lampadaire {
    constructor(couleur, id) {
        this.couleur = couleur;
        this.id = id;
    }

    CreeLumiere() {
        let lumiere = new Lumiere(this.couleur, this.id);
        return lumiere;
    }
    GetId()
    {
        return this.id;
    }

    
}


export class Lumiere {

    constructor(couleur, id) {
        this.couleur = couleur;
        this.id = id;
    }
    GetId()
    {
        return this.id;
    }
    GetColor()
    {
        return this.couleur;
    }
}