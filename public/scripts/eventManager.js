
import * as SocketServices from './socketServices.js'

import { CastRaycast} from './raycaster.js'


var container = document.getElementById("Scene");

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

    container.addEventListener('click', CastRaycast, false);

}





export { InitEvent };