#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_SIZE 1000

typedef struct
{
    int size_max_x;
    int size_max_y;
    char tab[MAX_SIZE][MAX_SIZE];
} Terrain;

void imprimer_tableau(Terrain tablo, int x, int y)
{
    int x0, y0;

    for (x0 = 0; x0 < x; x0++)
    {
        for (y0 = 0; y0 < y; y0++)
        {
            printf("%c", tablo.tab[x0][y0]);
        }
        printf("\n");
    }
}

void generer_terrain(Terrain *tablo, double densite)
{
    int x0, y0;

    // Initialisation avec des caractères par défaut
    for (x0 = 0; x0 < MAX_SIZE; x0++)
    {
        for (y0 = 0; y0 < MAX_SIZE; y0++)
        {
            tablo->tab[x0][y0] = ' ';
        }
    }

    for (x0 = 0; x0 < tablo->size_max_x; x0++)
    {
        for (y0 = 0; y0 < tablo->size_max_y; y0++)
        {
            if ((x0 % 2) == 1 && (y0 % 2) == 1)
            {
                tablo->tab[x0][y0] = '#';
            }
            else if ((x0 % 2) == 1 && (y0 % 2) == 0)
            {
                tablo->tab[x0][y0] = '-';
            }
            else if ((x0 % 2) == 0 && (y0 % 2) == 1)
            {
                tablo->tab[x0][y0] = '|';
            }
            else if ((x0 % 2) == 0 && (y0 % 2) == 0 && x0 != tablo->size_max_x - 1 && y0 != tablo->size_max_y - 1)
            {
                // Génération aléatoire de '/' ou '\'
                int random_choice = rand() % 2; // Générer un nombre aléatoire entre 0 et 1

                // Vérifier si '/' peut être placé
                if ((y0 - 1 >= 0 && tablo->tab[x0][y0 - 1] == '#') && (y0 + 1 < tablo->size_max_y && (tablo->tab[x0][y0 + 1] == ' ' || tablo->tab[x0][y0 + 1] == '/')))
                {
                    tablo->tab[x0][y0] = '/';
                }
                // Vérifier si '\' peut être placé
                else if ((x0 - 1 >= 0 && tablo->tab[x0 - 1][y0] == '#') && (x0 + 1 < tablo->size_max_x && (tablo->tab[x0 + 1][y0] == ' ' || tablo->tab[x0 + 1][y0] == '/')))
                {
                    tablo->tab[x0][y0] = '\\';
                }
                // Si les deux peuvent être placés, choisir aléatoirement entre '/' et '\'
                else if (random_choice == 0)
                {
                    tablo->tab[x0][y0] = '/';
                }
                else
                {
                    tablo->tab[x0][y0] = '\\';
                }
            }
        }
    }

    int total_intersections = (tablo->size_max_x / 2) * (tablo->size_max_y / 2);
    int nb_intersections_hashtag = (int)(densite * total_intersections);

    srand(time(NULL));

    for (int i = 0; i < nb_intersections_hashtag; i++)
    {
        int x, y;
        do
        {
            x = rand() % (tablo->size_max_x / 2) * 2 + 1;
            y = rand() % (tablo->size_max_y / 2) * 2 + 1;
        } while (tablo->tab[x][y] != '#');

        tablo->tab[x][y] = ' ';
    }

    // Supprimer les caractères qui ne sont pas entre deux '#' ou entre un '#' et le bord du terrain
    for (x0 = 0; x0 < tablo->size_max_x; x0++)
    {
        for (y0 = 0; y0 < tablo->size_max_y; y0++)
        {
            if (tablo->tab[x0][y0] == '-' || tablo->tab[x0][y0] == '|' || tablo->tab[x0][y0] == '\\' || tablo->tab[x0][y0] == '/')
            {
                // Vérifier si le caractère est entre deux '#' dans la même rangée
                if ((y0 - 1 >= 0 && tablo->tab[x0][y0 - 1] == '#') && (y0 + 1 < tablo->size_max_y && tablo->tab[x0][y0 + 1] == '#'))
                {
                    continue;
                }
                // Vérifier si le caractère est entre deux '#' dans la même colonne
                if ((x0 - 1 >= 0 && tablo->tab[x0 - 1][y0] == '#') && (x0 + 1 < tablo->size_max_x && tablo->tab[x0 + 1][y0] == '#'))
                {
                    continue;
                }
                if ((x0 - 1 >= 0 && y0 - 1 >= 0) && tablo->tab[x0 - 1][y0 - 1] == '#')
                {
                    if ((x0 + 1 < tablo->size_max_x) && (y0 + 1 < tablo->size_max_y) && tablo->tab[x0 + 1][y0 + 1] == '#')
                    {
                        continue;
                    }
                }

                // Si aucune des conditions ci-dessus n'est remplie, supprimer le caractère
                tablo->tab[x0][y0] = ' ';
            }
        }
    }
}

void vider_case_si_entouree(Terrain *tablo, int x, int y)
{
    if (x > 0 && y > 0 && x < tablo->size_max_x && y < tablo->size_max_y) /// Verification de la validité de l'index
    {
        if (tablo->tab[x][y] == '#' &&
            tablo->tab[x - 1][y - 1] == ' ' &&
            tablo->tab[x + 1][y + 1] == ' ' &&
            tablo->tab[x - 1][y + 1] == ' ' &&
            tablo->tab[x + 1][y - 1] == ' ' &&
            tablo->tab[x - 1][y] == ' ' &&
            tablo->tab[x + 1][y] == ' ' &&
            tablo->tab[x][y - 1] == ' ' &&
            tablo->tab[x][y + 1] == ' ')
        {
            tablo->tab[x][y] = ' ';
        }
    }
}

void verifier_terrain(Terrain *tablo)
{
    int x, y;
    for (x = 0; x < tablo->size_max_x; x++)
    {
        for (y = 0; y < tablo->size_max_y; y++)
        {
            vider_case_si_entouree(tablo, x, y);
        }
    }
}

void verif_tabl(Terrain *tablo, double densite)
{

    verifier_terrain(tablo);
}

int main(int argc, char *argv[])
{
    if (argc != 4)
    {
        printf("Usage: %s <taille_x> <taille_y> <densite>\n", argv[0]);
        return 1;
    }

    int x = atoi(argv[1]) * 2 + 1;  // Convertit le premier argument en entier
    int y = atoi(argv[2]) * 2 + 1;  // Convertit le deuxième argument en entier
    double densite = atof(argv[3]); // Convertit le troisième argument en double

    Terrain tablo;

    printf("%d\n", y);
    printf("%d\n", x);
    tablo.size_max_x = x;
    tablo.size_max_y = y;

    generer_terrain(&tablo, densite); // Densité de caractères '#' selon la densité spécifiée
    verif_tabl(&tablo, densite);

    imprimer_tableau(tablo, tablo.size_max_x, tablo.size_max_y);

    return 0;
}
