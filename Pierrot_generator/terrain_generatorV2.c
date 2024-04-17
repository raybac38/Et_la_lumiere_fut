#include <stdio.h>

#define X_SIZE 4
#define Y_SIZE 4

typedef struct {
    int size_max_x;
    int size_max_y;
    char tab[X_SIZE*2+1][Y_SIZE*2+1];
} Terrain;

void imprimer_tableau(FILE *fichier, Terrain tablo, int x, int y) {
    int x0, y0;

    for (x0 = 0; x0 < x; x0++) {
        for (y0 = 0; y0 < y; y0++) {
            fprintf(fichier, "%c ", tablo.tab[x0][y0]);
        }
        fprintf(fichier, "\n"); // Saut de ligne après chaque ligne complète
    }
}

int main() {
    int x, y, x0, y0;
    Terrain tablo;

    FILE *fichier; // Déclaration d'un pointeur de type FILE

    x = 4*2+1;
    y = 4*2+1;

    tablo.size_max_x = X_SIZE*2+1;
    tablo.size_max_y = Y_SIZE*2+1;

    fichier = fopen("et_la_lumiere_futV2.txt", "w");

    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier.");
        return 1;
    }

    fprintf(fichier, "Generation du terrain\n");

    for (x0 = 0; x0 < x; x0++) {
        for (y0 = 0; y0 < y; y0++) {
            if ((x0 % 2) == 1 && (y0 % 2) == 1) {
                tablo.tab[x0][y0] = '#';
            } else if ((x0 % 2) == 1 && (y0 % 2) == 0) {
                tablo.tab[x0][y0] = '-';
            } else if ((x0 % 2) == 0 && (y0 % 2) == 1) {
                tablo.tab[x0][y0] = '|';
            } else if ((x0 % 2) == 0 && (y0 % 2) == 0) {
                tablo.tab[x0][y0] = '\\';
            }
        }
    }

    imprimer_tableau(fichier, tablo, x, y); // Ajout des arguments manquants
    fclose(fichier);
    return 0;
}