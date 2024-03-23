# Et_la_lumiere_fut

##Principe du jeu : 

Allumer toute les rue
Aucun lampadaire ne peut éclairer un autre
Deux couleur identique ne peuvent se croiser a une intersection





Projet de jeu logique 



	

##Spécification des fichiers 

Pour utiliser un format de fichier lisible par un humain, nous utiliserons le standard JSON

voir https://fr.wikipedia.org/wiki/JavaScript_Object_Notation

Exemple du format JSON que nous utiliserons
{
  "taille" : {
	"x":4,
	"y":5
  },
	
 "tuiles" :[
   {
   "id" : 1,
   "rue" : [0, 1, 2]}
   ]
}

Ce qui peut etre traduit en C par : 

typedef struct {
    int id;
    int* rues;
    int nbRues;
} Tuile;

// Structure pour représenter la ville
typedef struct {
    int taille_x;
    int taille_y;
    Tuile* tuiles;
    int nbTuiles;
} Ville;


Le village est composé de "tuile" carrer, et on nommera "croisement" le centre de celle ci.

De se croisement, il peut avoir jusqu'a 8 rue allant sur un autre croisement dans les 8 directions cardinal (N, NE, E, ES, S, SO, O, ON)

Exemple 

NO N NE
  \|/
O--@--E
  /|\
SO S SE

On considère que l'on ne peut posser de lampadaire que sur un croisement

Dans un premier temps, nous oublirons la contrainte de couleur. 



##Programme de génération de village

Ce programme prend trois argument en entrée : (unsigned) taille-x, (unsigned) taille-y et "name" 
Ce programme genère un fichier JSON contenant un plan de la ville sous format JSON

Par exemple, si il est écrit en C, on devrait avoir quelle que chose comme ça :

./a.out 5 6 zzz

et sort un fichier zzz.json d'une plan de ville de taille 5 par 6


Le coeur de ce programme est de la génération procédurale ^^ Tu vas voir, c'est facile

Il y a plusieur méthode pour atteindre l'objectif

###Generation par pose de lampadaire

C'est la plus simple, mais aussi la moins intéréssante :
tu part de la solution pour généré la carte

Tu pose certain nombre de lampadaire sur la carte, et tu part d'eux pour définir les rue. Cela utilise beaucoup d'aléatoire.

###Generation par Wave Function Collapse

Plus dur, mais beaucoup plus intéréssante

Tu donne a l'ordinateur une série de condition, et il se débrouille comme un grand.

https://robertheaton.com/2018/12/17/wavefunction-collapse-algorithm/

Ce site explique bien le principe


/!\ Pour les deux méthodes de génération, il y a une limitation

Il ne peut avoir de croissement entre deux rue en diagonal, car cela crée un croissement qui n'est pas sur le centre d'une tuile
Cela crée des cartes trop compliquer

##Programme de traduction logique

Ce programme prend en entrée le fichier JSON, en crée un ensemble de clause logique pour le SAT Solveur sous le format DIMAC

voir https://wackb.gricad-pages.univ-grenoble-alpes.fr/inf402/satformat.pdf






