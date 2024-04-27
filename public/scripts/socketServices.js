import {map} from './map.js'
const socket = io();



socket.on('map_data', (data) => 
{
    map.LectureMap(data);
});

function Request_New_Map(size_x, size_y, density)
{
    socket.emit('request_new_map', size_x, size_y, density);
}

socket.on('solve', (data)=>
{
    console.log(data);
})


export {Request_New_Map}