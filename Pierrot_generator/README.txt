final_dens = (X_SIZE*Y_SIZE)*DENSITE;

V1 na jamais marché
V2 tout le terrain
V3 enleve seulement les intersections
V4 intersection, sans demande de densité
V5 generation avec demande de densité et supression des caracteres inutiles
V6 ajout alternance des \ et /
V7 ajout fun verif_tabl : suppression des # seuls et #-#-#-# (avec moins de deux routes qui connecte le bloc) car cela renvoit une erreur logique
V8 programme avec densite longueur largueur en argument