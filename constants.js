
module.exports = {
    CREEP: 'creep',
    DEFAULT_TEXT_STYLE: {
        align: 'center',
        opacity: 0.8
    },
    MAX_EXTENSIONS_PER_ROOM: 5,
    PLAIN: 'plain',
    /** Where energy resources should be transferred to in order of priority */
    PRIORITISED_ENERGY_STRUCTURES: [
        STRUCTURE_SPAWN,
        STRUCTURE_EXTENSION,
        STRUCTURE_TOWER,
    ],
    TERRAIN: 'terrain',
    VISUALIZE_PATH_STYLE: {
        fill: 'transparent',
        stroke: '#fff',
        lineStyle: 'dashed',
        strokeWidth: .15,
        opacity: .1
    },
    WALL: 'wall',
}
