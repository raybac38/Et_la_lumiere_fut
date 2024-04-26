const Direction = {
    NORD: 'nord',
    NORD_EST: 'nord-est',
    EST: 'est',
    SUD_EST: 'sud-est'
};

function traduireDirection(direction) {
    switch (direction) {
        case Direction.NORD:
            return '|';
        case Direction.NORD_EST:
            return '/';
        case Direction.EST:
            return '-';
        case Direction.SUD_EST:
            return '\\';
        default:
            return direction; // Retourne la direction inchangée si elle n'est pas définie
    }
}

function isInEnum(value) {
    return Object.values(Direction).includes(value);
}

function isSameDirection(direction_1, direction_2) {
    return direction_1 === direction_2;
}

module.exports = {traduireDirection, isInEnum, Direction, isSameDirection };
