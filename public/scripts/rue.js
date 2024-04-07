

export class Rue {
    constructor(position_x, position_y, direction) {
        this.position_x = position_x;
        this.position_y = position_y;

        this.direction = direction;
        this.lumieres = [];
    }

    AjoutLumiere(lumiere) {
        this.lumieres.push(lumiere);
    }

    SupprimeLumiere(lumiere) {
        let indice = this.lumieres.indexOf(lumiere);
        if (index != -1) {
            this.lumieres.splice(indice, 1);
        }
    }

    Verification() {
        return this.lumieres.length == 1;
    }

}