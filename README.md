# Et_la_lumiere_fut

## Principe du jeu : 

Allumer toute les rue
Aucun lampadaire ne peut éclairer un autre
Deux couleur identique ne peuvent se croiser a une intersection

	
## Spécification des fichiers 

2
2
\    
-#-#-
  \  
-#-#-
    \

Nous utiliserons se format de fichier pour la topographique des villes.
Nous commencons sur la premiere ligne avec le nombre de croisement sur l'axe X, puis sur l'axe Y
Ensuite, le plans de la ville est déssiner en ASCII.

On considère que l'on ne peut posser de lampadaire que sur un croisement

Dans un premier temps, nous oublirons la contrainte de couleur. 


## Installation

Pour pouvoir utiliser notre code, vous aurez besoin des éléments suivants :

    Un compilateur C, nous utilisons GCC.
    Un terminal exécutant du bash.
    Une installation de Node.js.

Pour commencer, assurez-vous d'avoir GCC installé sur votre système. Si ce n'est pas déjà le cas, vous pouvez l'installer avec la commande suivante :

>sudo apt install gcc

Ensuite, compilé le programme de génération en C :

>cd Pierrot_generator
>bash Compile.sh

Après avoir compilé avec succès, retournez au répertoire principal et installez Node.js et ses dépendances :


>cd ..
>sudo apt install nodejs

Vérifiez que Node.js est installé correctement en vérifiant sa version :

>node -v

Une fois Node.js installé, installez les dépendances du projet avec npm :

>npm install

L'installation est maintenant terminée !

Pour exécuter notre programme, utilisez la commande suivante :

>npm start

Ensuite, ouvrez votre navigateur Internet et allez à l'adresse suivante : http://localhost:3000.




