
import * as SocketServices from './socketServices.js'

import { camera, renderer, scene} from '../client.js';

import { map } from './map.js';

import { CastRaycast} from './raycaster.js'


var container = document.getElementById("Scene");


const message_reussite = "Bravo !\n Vous avez réussi à éclairer toutes les rues du village sans qu'aucun lampadaire ne se croise, et en respectant les exigences strictes de la brigade du bon goût. La lumière rayonne harmonieusement dans notre charmant village !";
const message_echec = "Hmm, quelque chose ne va pas. \n Il semblerait qu'il y ait des erreurs dans votre disposition des lampadaires. Assurez-vous que chaque rue est correctement éclairée et qu'aucun lampadaire ne se croise. La brigade du bon goût n'approuverait pas cette configuration !";
const message_humour = "La vérification d'une carte non existante n'est déterministe que dans l'imaginaire du programmeur."


function InitEvent() {
    /// Gestion dynamique de la fenetre

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.render(scene, camera);
    }


    /// UI



    const button_generate_new_map = document.getElementById("new_map");
    const button_verification = document.getElementById("verification");
    const button_solve = document.getElementById("solve");

    var input_field_map_size_x = document.getElementById("taille_x");
    var input_field_map_size_y = document.getElementById("taille_y");
    var input_field_map_density = document.getElementById("density");


    button_generate_new_map.addEventListener('click', () => {
        SocketServices.Request_New_Map(input_field_map_size_x.value, input_field_map_size_y.value, 1 - input_field_map_density.value);
    });

    button_solve.addEventListener('click', () => {
        SocketServices.Request_Solve();
    });

    button_verification.addEventListener('click', () => {
        let resultat = map.Verification();
        
        AffichageFenetreRésultat(resultat);
    });

    container.addEventListener('click', CastRaycast, false);

    function AffichageFenetreRésultat(res)
    {

        /// Création d'une fenetre en avant plan
        let message = " ";
        if(res == true)
        {
            message = message_reussite;
        }
        else{
            message = message_echec;
        }

        if(map.IsMapEmpty())
        {
            message = message_humour;
        }

        var fenetre = document.createElement('div');
        fenetre.classList.add('fenetre-avant-plan');

        fenetre.innerHTML = `
        <div class="contenu">
            <p>${message}</p>
            <button id="boutonOK">OK</button>
        </div>`;

        document.body.appendChild(fenetre);

        const boutonOK = document.getElementById('boutonOK');

        // Creation du bouton OK
        boutonOK.addEventListener('click', function() {
            document.body.removeChild(fenetre);
        });
    }


}





export { InitEvent };