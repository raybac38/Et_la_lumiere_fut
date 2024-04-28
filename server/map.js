const CONSTANTE = require('./constante');

const rue_caractere = ["\\", "/", "-", "|"];

class Map {
    constructor(taille_x, taille_y) {
        console.log("Creating Map instance...");
        this.grille = this.Initialization(taille_x, taille_y);
        console.log("Map instance created.");
    }

    Initialization(taille_x, taille_y) {
        console.log("Initializing Map...");
        console.log(taille_x, taille_y);
        this.size_x = taille_x;
        this.size_y = taille_y;
        this.grille = this.CreateNullArray(this.size_x, this.size_y);
    }

    CreateNullArray(size_x, size_y) {
        let tableau = new Array(size_x);
        for (let index_x = 0; index_x < size_x; index_x++) {
            tableau[index_x] = new Array(size_y).fill(null);
        }
        return tableau;
    }

    GetNumberOfRows() {
        return this.size_y;
    }

    GetNumberOfColumns() {
        return this.size_x;
    }

    ClearMap() {
        console.log("Vidage de la map...");
        let number_rows = this.GetNumberOfRows();
        let number_columns = this.GetNumberOfColumns();

        for (let index_x = 0; index_x < number_columns; index_x++) {
            for (let index_y = 0; index_y < number_rows; index_y++) {
                if (this.EstValide(index_x, index_y)) {
                    this.grille[index_x][index_y] = null;
                }
            }
        }
        console.log("Map vider.");
    }

    EstValide(x, y) {
        return x >= 0 && x < this.GetNumberOfColumns() && y >= 0 && y < this.GetNumberOfRows();
    }

    IsCroisement(x, y) {
        return this.grille[x][y] === "#";
    }

    IsRue(x, y) {
        let character = this.grille[x][y];
        return rue_caractere.includes(character);
    }

    LoadMap(raw_data) {
        console.log("Loading map...");
        let data = raw_data.split("\n");

        if (data.length > 2) {
            console.log("Initializing map with size...");
            this.Initialization(parseInt(data[0]), parseInt(data[1]));
            console.log(data);
            data.splice(0, 2);

            console.log(data);
            
            for (let y = 0; y < this.size_y; y++) {
                for (let x = 0; x < this.size_x; x++) {
                    this.grille[y][x] = data[x][y];
                }
            }
            
            
            console.log("Map loaded successfully.", this.grille);

        } else {
            console.log("Error loading map.");
        }
    }

    IsNotStreetOrSameDirection(x, y, direction_reference, map) {
        if (map.grille[x][y] === " ") {
            console.log("case vide");
            return false; 
        }
            console.log("x,y", x, y, direction_reference, map.grille[x][y], "condition", map.grille[x][y] == CONSTANTE.traduireDirection(direction_reference));
    
        if (map.IsCroisement(x, y)) {
            console.log("Croisement détecté");
            return true; 
        } else if (map.IsRue(x, y)) {
            // Si c'est une rue, vérifie si elle va dans la même direction que la référence
            return map.grille[x][y] == CONSTANTE.traduireDirection(direction_reference);
        }
        return false; // Par défaut, ce n'est pas une rue ou un croisement
    }

    CreateDimac(Dimac) {
        console.log("Creating DIMAC...");
        for (let x = 0; x < this.GetNumberOfColumns(); x++) {
            for (let y = 0; y < this.GetNumberOfRows(); y++) {
                let clause = [];
                let clause_dimac = [];


                if (this.IsCroisement(x, y)) {
                    //  Logique de croisement
                    console.log("logique croisement");
                    clause = this.IntersectionInStraightLine(x, y);

                    if(clause.length == 0) continue;

                    for (let index = 0; index < clause.length; index++) {
                        clause_dimac.push(this.PositionToId(x, y ) * -1);
                        clause_dimac.push(this.PositionToId(clause[index][0], clause[index][1]) * -1);
                        Dimac.AjouterClause(clause_dimac);
                        clause_dimac = [];
                    }
                    Dimac.AjouterLitteral(this.PositionToId(x, y ));
                } else if (this.IsRue(x, y)) {
                    //  Logique de rue
                    console.log("logique rue");
                    clause = this.IntersectionInStraightLine(x, y);
                    if(clause.length == 0) continue;

                    for (let index = 0; index < clause.length; index++) {
                        clause_dimac.push(this.PositionToId(clause[index][0], clause[index][1]));

                    }
                    Dimac.AjouterClause(clause_dimac);
                    Dimac.AjouterLitteral(this.PositionToId(x, y ));



                }
                
                
            }
        }
        console.log("DIMAC created.");
    }

    OffsetToDirection(offset_x, offset_y) {
        if (offset_x == 0 && (offset_y == 1 || offset_y == -1)) {
            return CONSTANTE.Direction.NORD;
        }
        if (offset_x == 1 && offset_y == 1 || offset_x == -1 && offset_y == -1) {
            return CONSTANTE.Direction.NORD_EST;
        }
        if ((offset_x == 1 || offset_x == -1) && offset_y == 0) {
            return CONSTANTE.Direction.EST;
        }
        if (offset_x == -1 && offset_y == 1 || offset_x == 1 && offset_y == -1) {
            return CONSTANTE.Direction.SUD_EST;
        }
        throw new Error('Direction non reconnue');
    }

    PositionToId(x, y) {
        return parseInt(x) + parseInt(y) * parseInt(this.size_x);
    }

    IntersectionInStraightLine(starting_x, starting_y) {
        let straight_line = [];
        console.log("debut propagation");
        const LightPropagation = (starting_x, starting_y, offsets) => {


            for (const [offset_x, offset_y] of offsets) {
                let x = parseInt(starting_x) + parseInt(offset_x);
                let y = parseInt(starting_y) + parseInt(offset_y);

                let direction_reference = this.OffsetToDirection(offset_x, offset_y);

                console.log("Nous somme au coordonnée ", starting_x, starting_y);
                console.log("Nous regardons au ", x, y);
                console.log("Nous somme sur ", this.grille[starting_x][starting_y]);
                console.log("Nous voyons", this.grille[x][y], "/");

                if(this.IsRue(starting_x, starting_y))
                {
                    straight_line.push([x, y]);
                }
    

                while (this.EstValide(x, y) && this.IsNotStreetOrSameDirection(x, y, direction_reference, this)) {
                    [x, y] = [x + offset_x, y + offset_y];
                    if (this.IsCroisement(x, y)) {
                        straight_line.push([x, y]);
                    }
                }
            }
        };
    
        let offsets = [
            [0, 1], [1, 1], [1, 0], [1, -1],
            [0, -1], [-1, -1], [-1, 0], [-1, 1]
        ];
    
        if (this.IsRue(starting_x, starting_y)) {
            offsets = null;
    
            switch (this.grille[starting_x][starting_y]) {
                case "|":
                    offsets = [[0, 1], [0, -1]];
                    break;
                case "-":
                    offsets = [[1, 0], [-1, 0]];
                    break;
                case "/":
                    offsets = [[1, 1], [-1, -1]];
                    break;
                case "\\":
                    offsets = [[1, -1], [-1, 1]];
                    break;
                default:
                    break;
            }
        }
    
        LightPropagation(starting_x, starting_y, offsets);
    
        return straight_line;
    }
    
}

module.exports = { Map };