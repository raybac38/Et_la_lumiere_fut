# Jeu de logique : Et_la_lumiere_fut

## Principe du jeu : 

Pour le festival, le comité chargé de l'organisation des fêtes souhaite disposer des lanternes un peu partout dans la ville.
Cependant, le maire a rigoureusement interdit d'installer plus d'une lanterne par rue.

## Règle du jeu : 

Pose les lanternes sur le croisement de la ville pour éclairer toute les rues sans que deux lanterne s'éclaire.

## Interface Utilisateur

L'interface utilisateur de ce projet est conçue pour être simple et conviviale. Voici une description des éléments interactifs de l'interface :
Panneau Latéral (SidePanel)

Le panneau latéral contient plusieurs boutons et options pour interagir avec le jeu. Voici ce que chaque élément représente :

    Bouton "Nouvelle carte" : Permet de générer une nouvelle carte pour le jeu.

    Bouton "Vérification" : Déclenche la vérification de la carte pour s'assurer qu'elle respecte les règles du jeu.
    
    Le bouton "Résoudre" déclenche le processus de résolution automatique de la carte. Voici ce qu'il fait :

      Activation en cas de solvabilité : Si la carte est solvable, le bouton sera activé et un contour vert apparaîtra autour de celui-ci pour indiquer que la résolution est possible.

      Désactivation en cas d'insolvabilité : Si la carte n'est pas solvable, le bouton restera désactivé et un contour rouge apparaîtra pour indiquer que la résolution n'est pas possible dans l'état actuel de la carte.

      <---Important a noté : en fonction des parametres, le calcule de solvabilité peut prendre un certien temps--->

    Options de Taille (TailleOption) : Permet de définir la taille de la carte et sa densité. Vous pouvez spécifier la taille de la carte en ajustant le nombre dans le champ "Taille de la carte", et la densité en ajustant le nombre dans le champ "Densité".

Scène (Scene)

La scène représente la zone de jeu où la carte est affichée et où les interactions se produisent.
Cliquer sur un croisement octogonal pour ajouter une lanterne.
Cliquer sur un croisement en forme d'anneau pour enlevé la lanterne.

## Installation

Pour pouvoir utiliser notre code, vous aurez besoin des éléments suivants :

    Un compilateur C, nous utilisons GCC.
    Les bibliotecs Bison( Yacc) et Flex pour le SAT Solver
    Un terminal exécutant du bash.
    Une installation de Node.js.

Pour commencer, assurez-vous d'avoir GCC installé sur votre système. Si ce n'est pas déjà le cas, vous pouvez l'installer avec la commande suivante :

>sudo apt install gcc

Compilation du programme de génération de terrain

>cd Pierrot_generator
>bash Compile.sh

Compilation du SAT solveur

>cd ./sat-solver

>sudo apt-get install flex
>sudo apt-get install bison

>make all

-Merci de vérifier que toutes les dépendances nessessaire sont installer sur le systeme.

Installation de Node JS

>sudo apt install nodejs

Verification de l'installation via : 

>node -v

Installation des dépendances Node JS

>sudo npm install

L'installation est maintenant terminée !

Lancement du logiciel :

Pour exécuter notre programme, utilisez la commande suivante dans le répertoire racine du projet :

>npm start

Ensuite, ouvrez votre navigateur Internet et allez à l'adresse suivante : http://localhost:3000
/!\ Si le port 3000 est déjà utiliser, Node JS ne se lancera pas.


## Licence

Ce projet est sous licence MIT. Cela signifie que vous avez le droit de l'utiliser, de le modifier et de le distribuer librement, à condition de conserver une copie de l'avis de licence avec le projet. Voici un résumé des principales conditions de la licence MIT :

    Vous êtes autorisé à utiliser, copier, modifier, fusionner, publier, distribuer, sous-licencier et/ou vendre des copies du logiciel, sous réserve des conditions suivantes :
        L'avis de droit d'auteur ci-dessus et cet avis de permission doivent être inclus dans toutes les copies ou parties substantielles du logiciel.

    LE LOGICIEL EST FOURNI "TEL QUEL", SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER LES GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DES DROITS D'AUTEUR NE SERONT RESPONSABLES DE TOUTE RÉCLAMATION, DOMMAGES OU AUTRE RESPONSABILITÉ, QUE CE SOIT DANS LE CADRE D'UN CONTRAT, D'UN DÉLIT OU AUTRE, EN LIEN AVEC LE LOGICIEL OU SON UTILISATION OU D'AUTRES OPÉRATIONS DANS LE LOGICIEL.

Pour plus de détails, veuillez consulter le fichier LICENSE inclus dans ce projet.

En utilisant ce logiciel, vous acceptez les conditions de la licence MIT.

## Développeur :

Hugo PONSIN, Pierre MEDINA, Al Akoum Abdelkader

## Contacts :

Problème de licences ? Avis / Recommandation ? 
N'hésité pas a me contacté

  -> hponsin@gmail.com



