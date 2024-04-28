import { container, camera, scene } from "../client.js";
import { Lampadaire } from "./lumiere.js";

import * as CONSTANTE from './constants.js';
import { map} from './map.js';

import * as THREE from '/three.js';

var id_number = 0;

function CastRaycast(event)
{
    console.log("event");
    let raycaster = new THREE.Raycaster();
    let mouse =  new THREE.Vector2();

    var rect = container.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children);

    let name;

    if (intersects.length > 0) {
        name = intersects[0].object.name;
    }

    if(name == undefined){return}

    let name_code = name.split(":");

    if(name_code[0] == "c")
    {
        let coordonner_x = name_code[1];
        let coordonner_y = name_code[2];

        let is_lampadaire = map.CheckLampadaire(coordonner_x, coordonner_y);


        if(is_lampadaire)
        {
            console.log("Suppression d'un lampadaire");
            let croisement = map.GetCroisement(coordonner_x, coordonner_y);
            let lampadaire = croisement.GetLampadaire();
            map.SupprimeLampadaire(coordonner_x, coordonner_y, lampadaire);
        }
        else
        {
            console.log("Ajout d'un lampadaire");
            let lampadaire = new Lampadaire(CONSTANTE.Couleurs.BLANC, id_number);
            id_number ++;
            map.AjoutLampadaire(coordonner_x, coordonner_y, lampadaire);
        }

    }
}


function GetIdNumber()
{
    id_number++;
    return id_number - 1;
}




export { CastRaycast , GetIdNumber}