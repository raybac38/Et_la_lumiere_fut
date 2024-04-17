#include <stdio.h>
#include <stdlib.h>
#define X_SIZE 10
#define Y_SIZE 10
#define DENSITE 0.5

typedef struct {
    int size_max_x;
    int size_max_y;
    char tab[X_SIZE*2+1][Y_SIZE*2+1];
} Terrain;

int random_odd(int n) {
    int r;
    do {
        r = rand() % n + 1;
    } while (r % 2 == 0);
    return r;
}


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
    int x, y, x0, y0, i;
    int final_dens;
    Terrain tablo;

    FILE *fichier; // Déclaration d'un pointeur de type FILE

    x = X_SIZE*2+1;
    y = Y_SIZE*2+1;

    tablo.size_max_x = X_SIZE*2+1;
    tablo.size_max_y = Y_SIZE*2+1;

    final_dens = (X_SIZE*Y_SIZE)*DENSITE;

    fichier = fopen("et_la_lumiere_fut.txt", "w");

    if (fichier == NULL) {
        printf("Erreur lors de l'ouverture du fichier.");
        return 1;
    }

    fprintf(fichier, "Generation du terrain:\n");
    fprintf(fichier, "%d ",X_SIZE);
    fprintf(fichier, "%d\n",Y_SIZE);

    for(i=0; i<final_dens; i++) {
        tablo.tab[random_odd(x)][random_odd(y)] = '#';
    }

// cas particulier et génants    
    tablo.tab[0][0] = ' ';
    tablo.tab[0][1] = ' ';
    tablo.tab[1][0] = ' ';
    tablo.tab[x][y] = ' ';
    tablo.tab[x][y-1] = ' ';
    tablo.tab[x-1][y] = ' ';

// imprime caractere en fonction de la condition
    for (x0 = 1; x0 < x-1; x0++) {
        for (y0 = 1; y0 < y-1; y0++) {
            
            if ( (tablo.tab[x0][y0+1] == '#') || (tablo.tab[x0][y0-1] == '#')) {
                tablo.tab[x0][y0] = '-';
            }
            else if ( (tablo.tab[x0+1][y0+1] == '#') || (tablo.tab[x0-1][y0-1] == '#')) {
                    tablo.tab[x0][y0] = '\\';
            }
            else if ( (tablo.tab[x0+1][y0] == '#') || (tablo.tab[x0-1][y0] == '#')) {
                tablo.tab[x0][y0] = '|';
            }
            else {
                tablo.tab[x0][y0] = ' ' ;
            }
        }
    }

    imprimer_tableau(fichier, tablo, x, y); // Ajout des arguments manquants
    fclose(fichier);
    return 0;
}