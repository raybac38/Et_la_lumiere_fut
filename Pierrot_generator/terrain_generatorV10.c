#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

#define MAX_SIZE 1000

typedef struct {
    int size_max_x;
    int size_max_y;
    char tab[MAX_SIZE][MAX_SIZE];
} Terrain;

void imprimer_tableau(Terrain tablo, int x, int y) {
    int x0, y0;

    for (x0 = 0; x0 < x; x0++) {
        for (y0 = 0; y0 < y; y0++) {
            printf("%c", tablo.tab[x0][y0]);
        }
        printf("\n");
    }
}

int aleatoire_rue(int proba) {
   proba = proba % 10;
   int i;
   for(i=0; i<= proba ;i++) {
    if( rand() % 9 == 0 ) {
        return 0;
    }
   }
   return 1;
}

void initialiser_terrain(Terrain *tablo) {
    for (int x = 0; x < tablo->size_max_x; x++) {
        for (int y = 0; y < tablo->size_max_y; y++) {
            tablo->tab[x][y] = ' ';
        }
    }
}

void ajouter_caractere(Terrain *tablo, int x, int y, char caractere) {
    if (x >= 0 && x < tablo->size_max_x && y >= 0 && y < tablo->size_max_y) {
        tablo->tab[x][y] = caractere;
    }
}

void generer_terrain(Terrain *tablo, double densite, int proba) {
    initialiser_terrain(tablo);
    srand(time(NULL));

    for (int x = 1; x < tablo->size_max_x - 1; x += 2) {
        for (int y = 1; y < tablo->size_max_y - 1; y += 2) {
            ajouter_caractere(tablo, x, y, '#');
        }
    }

    for (int x = 1; x < tablo->size_max_x - 1; x += 2) {
        for (int y = 0; y < tablo->size_max_y; y += 2) {
            if (aleatoire_rue(proba)) {
                ajouter_caractere(tablo, x, y, '-');
            }
        }
    }

    for (int x = 0; x < tablo->size_max_x; x += 2) {
        for (int y = 1; y < tablo->size_max_y - 1; y += 2) {
            if (aleatoire_rue(proba)) {
                ajouter_caractere(tablo, x, y, '|');
            }
        }
    }

    int total_intersections = (tablo->size_max_x / 2) * (tablo->size_max_y / 2);
    int nb_intersections_hashtag = (int)(densite * total_intersections);

    for (int i = 0; i < nb_intersections_hashtag; i++) {
        int x, y;
        do {
            x = rand() % (tablo->size_max_x / 2) * 2 + 1;
            y = rand() % (tablo->size_max_y / 2) * 2 + 1;
        } while (tablo->tab[x][y] != '#');
        
        ajouter_caractere(tablo, x, y, ' ');
    }

    for (int x = 0; x < tablo->size_max_x; x++) {
        for (int y = 0; y < tablo->size_max_y; y++) {
            if (tablo->tab[x][y] == '-' || tablo->tab[x][y] == '|' || tablo->tab[x][y] == '\\' || tablo->tab[x][y] == '/') {
                if ((y - 1 >= 0 && tablo->tab[x][y - 1] == '#') && (y + 1 < tablo->size_max_y && tablo->tab[x][y + 1] == '#')) {
                    continue;
                }
                if ((x - 1 >= 0 && tablo->tab[x - 1][y] == '#') && (x + 1 < tablo->size_max_x && tablo->tab[x + 1][y] == '#')) {
                    continue;
                }
                if ((x - 1 >= 0 && y - 1 >= 0) && tablo->tab[x-1][y-1] == '#') {
                    if ((x + 1 < tablo->size_max_x) && (y+1 < tablo->size_max_y) && tablo->tab[x+1][y+1] == '#') {
                        continue;
                    }
                }
                tablo->tab[x][y] = ' ';
            }
        }
    }
}

void verif_tabl(Terrain *tablo, double densite, int  proba) {
    int x0, y0;
     for (x0 = 0; x0 < tablo->size_max_x; x0++) {
        for (y0 = 0; y0 < tablo->size_max_y; y0++) {
            
            if (x0 > 0 && y0 > 0 && x0 < tablo->size_max_x && y0 < tablo->size_max_x) {
                if(tablo->tab[x0][y0] == '#' && tablo->tab[x0-1][y0-1] == ' ' && tablo->tab[x0-1][y0] == ' ') {
                    if(tablo->tab[x0][y0-1] == ' ' &&  tablo->tab[x0+1][y0] ==' ' && tablo->tab[x0][y0+1] == ' ' && tablo->tab[x0+1][y0+1] == ' ') {
                        tablo->tab[x0][y0] = ' ';
                    }
                }
                else if (((tablo->tab[x0-1][y0+1]) == '#'  && (tablo->tab[x0+1][y0-1]) == '#')&& aleatoire_rue(proba) == 0) {
                tablo->tab[x0][y0] = '/';     
            }
            }
//            if (x0 > 0 && y0 > 0 && x0 < ((tablo->size_max_x)-8)) && y0 < ((tablo->size_max_x)-8) {
//                if(tablo->tab[x0][y0] = '#' && tablo->tab[x0][y0+2] = '#' tablo->tab[x0][y0+4] = '#' tablo->tab[x0][y0+6] = '#') {
//                    if (tablo->tab[x0-1][y0])
//                }
//            }
             
            

        }
    }
}



int main(int argc, char *argv[]) {
    if (argc != 5) {
        printf("Usage: %s <taille_x> <taille_y> <densite> <proba apparition de route>\n", argv[0]);
        return 1;
    }

    int x = atoi(argv[1]) * 2 + 1; // Convertit le premier argument en entier
    int y = atoi(argv[2]) * 2 + 1; // Convertit le deuxième argument en entier
    double densite = atof(argv[3]); // Convertit le troisième argument en double
    int proba = atof(argv[4]);

    Terrain tablo;

    printf( "%d\n", y);
    printf( "%d\n", x);
    tablo.size_max_x = x;
    tablo.size_max_y = y;

    generer_terrain(&tablo, densite, proba); // Densité de caractères '#' selon la densité spécifiée
    verif_tabl(&tablo, densite, proba);

    imprimer_tableau(tablo, tablo.size_max_x, tablo.size_max_y);

    return 0;
}






