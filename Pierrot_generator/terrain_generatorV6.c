#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_SIZE 1000

typedef struct {
    int size_max_x;
    int size_max_y;
    char tab[MAX_SIZE][MAX_SIZE];
} Terrain;

void imprimer_tableau(FILE *fichier, Terrain tablo, int x, int y) {
    int x0, y0;

    for (x0 = 0; x0 < x; x0++) {
        for (y0 = 0; y0 < y; y0++) {
            fprintf(fichier, "%c ", tablo.tab[x0][y0]);
        }
        fprintf(fichier, "\n");
    }
}

void generer_terrain(Terrain *tablo, double densite) {
    int x0, y0;

    // Initialisation avec des caractères par défaut
    for (x0 = 0; x0 < MAX_SIZE; x0++) {
        for (y0 = 0; y0 < MAX_SIZE; y0++) {
            tablo->tab[x0][y0] = ' ';
        }
    }

    for (x0 = 0; x0 < tablo->size_max_x; x0++) {
        for (y0 = 0; y0 < tablo->size_max_y; y0++) {
            if ((x0 % 2) == 1 && (y0 % 2) == 1) {
                tablo->tab[x0][y0] = '#';
            } else if ((x0 % 2) == 1 && (y0 % 2) == 0) {
                tablo->tab[x0][y0] = '-';
            } else if ((x0 % 2) == 0 && (y0 % 2) == 1) {
                tablo->tab[x0][y0] = '|';
            } else if ((x0 % 2) == 0 && (y0 % 2) == 0 && x0 != tablo->size_max_x - 1 && y0 != tablo->size_max_y - 1) {
                
                tablo->tab[x0][y0] = '\\';
            }
        }
    }

    int total_intersections = (tablo->size_max_x / 2) * (tablo->size_max_y / 2);
    int nb_intersections_hashtag = (int)(densite * total_intersections);

    srand(time(NULL));

    for (int i = 0; i < nb_intersections_hashtag; i++) {
        int x, y;
        do {
            x = rand() % (tablo->size_max_x / 2) * 2 + 1;
            y = rand() % (tablo->size_max_y / 2) * 2 + 1;
        } while (tablo->tab[x][y] != '#');
        
        tablo->tab[x][y] = ' ';
    }

    // Supprimer les caractères qui ne sont pas entre deux '#' ou entre un '#' et le bord du terrain
    for (x0 = 0; x0 < tablo->size_max_x; x0++) {
        for (y0 = 0; y0 < tablo->size_max_y; y0++) {
            if (tablo->tab[x0][y0] == '-' || tablo->tab[x0][y0] == '|' || tablo->tab[x0][y0] == '\\') {
                // Vérifier si le caractère est entre deux '#' dans la même rangée
                if ((y0 - 1 >= 0 && tablo->tab[x0][y0 - 1] == '#') && (y0 + 1 < tablo->size_max_y && tablo->tab[x0][y0 + 1] == '#')) {
                    continue;
                }
                // Vérifier si le caractère est entre deux '#' dans la même colonne
                if ((x0 - 1 >= 0 && tablo->tab[x0 - 1][y0] == '#') && (x0 + 1 < tablo->size_max_x && tablo->tab[x0 + 1][y0] == '#')) {
                    continue;
                }
                if ((x0 - 1 >= 0 && y0 - 1 >= 0) && tablo->tab[x0-1][y0-1] == '#') {
                    if ((x0 + 1 < tablo->size_max_x) && (y0+1 < tablo->size_max_y) && tablo->tab[x0+1][y0+1] == '#') {
                        continue;
                    }
                }
  
                // Si aucune des conditions ci-dessus n'est remplie, supprimer le caractère
                tablo->tab[x0][y0] = ' ';
            }
        }
    }
}

int main() {
    Terrain tablo;

    FILE *fichier;

    printf("Entrez la taille en X : ");
    scanf("%d", &tablo.size_max_x);

    printf("Entrez la taille en Y : ");
    scanf("%d", &tablo.size_max_y);

    double densite;
    printf("Entrez la densite (entre 0 et 1)(0 étant le maximum et 1 le minimum) : ");
    scanf("%lf", &densite);

    fichier = fopen("et_la_lumiere_futV2.txt", "w");

    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier.");
        return 1;
    }

    fprintf(fichier, "Largeur : %d\n", tablo.size_max_x);
    fprintf(fichier, "Hauteur : %d\n", tablo.size_max_y);
    fprintf(fichier, "Densite : %.2lf\n\n", densite);
    fprintf(fichier, "----------------------------------------------------------------------------------- \n Generation du terrain: \n");

    generer_terrain(&tablo, densite); // Densité de caractères '#' selon la densité spécifiée

    imprimer_tableau(fichier, tablo, tablo.size_max_x, tablo.size_max_y);

    fclose(fichier);
    return 0;
}