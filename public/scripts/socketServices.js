import {map} from './map.js'
const socket = io();

var hasSolveData = false;

socket.on('map_data', (data) => 
{
    map.LectureMap(data);
});

function Request_New_Map(size_x, size_y, density)
{
    SetSolveData(false);
    socket.emit('request_new_map', size_x, size_y, density);
}

socket.on('solve', (data)=>
{
    SetSolveData(true, data);
    console.log("Solution de l'énigme est arrivé");
    console.log(data);
    map.SauvegardeSolution(data);
})


function SetSolveData(new_value, data)
{
    var solve_button = document.getElementById("solve");

    hasSolveData = new_value;

    var solve_state = document.getElementById("SolveState");

    if (hasSolveData) {

        if(data[2] == "S")
        {
            solve_button.style.borderColor = '#859900';
            solve_button.disabled = false; 
            solve_button.style.opacity = 1; 
            solve_state.textContent = "SATISFIABLE";

        }
        else
        {
            solve_button.style.borderColor = '#dc322f';
            solve_button.disabled = true; 
            solve_button.style.opacity = 0.5; 
            solve_state.textContent = "UNSATISFIABLE";

        }

    } else {
        solve_button.style.borderColor = 'transparent';
        solve_button.disabled = true; 
        solve_button.style.opacity = 0.5; 
        solve_state.textContent = " ";

    }
}

SetSolveData(false);

export {Request_New_Map}