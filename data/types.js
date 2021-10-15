module.exports = {
    jobs: [
        { name: 'Paladin',      id: 'PAL', type: 'TANK' },
        { name: 'Warrior',      id: 'WAR', type: 'TANK' },
        { name: 'Dark Knight',  id: 'DRK', type: 'TANK' },
        { name: 'Gunbreaker',   id: 'GNB', type: 'TANK' },
        { name: 'White Mage',   id: 'WHM', type: 'HEAL' },
        { name: 'Scholar',      id: 'SCH', type: 'HEAL' },
        { name: 'Astrologian',  id: 'AST', type: 'HEAL' },
        { name: 'Monk',         id: 'MNK', type: 'DPS', subtype: 'Melee' },
        { name: 'Dragoon',      id: 'DRG', type: 'DPS', subtype: 'Melee' },
        { name: 'Ninja',        id: 'NIN', type: 'DPS', subtype: 'Melee' },
        { name: 'Samurai',      id: 'SAM', type: 'DPS', subtype: 'Melee' },
        { name: 'Bard',         id: 'BRD', type: 'DPS', subtype: 'Ranged' },
        { name: 'Machinist',    id: 'MCN', type: 'DPS', subtype: 'Ranged' },
        { name: 'Dancer',       id: 'DNC', type: 'DPS', subtype: 'Ranged' },
        { name: 'Black Mage',   id: 'BLM', type: 'DPS', subtype: 'Caster' },
        { name: 'Summoner',     id: 'SMN', type: 'DPS', subtype: 'Caster' },
        { name: 'Red Mage',     id: 'RDM', type: 'DPS', subtype: 'Caster' }
    ],
    roulettes: {
        'leveling': {
            level: 15,
            roles: [ 'TANK', 'HEAL', 'DPS', 'DPS' ]
        },
        '50/60/70': {
            level: 50,
            roles: [ 'TANK', 'HEAL', 'DPS', 'DPS' ]
        },
        '80': {
            level: 80,
            roles: [ 'TANK', 'HEAL', 'DPS', 'DPS' ]
        },
        'expert': {
            level: 80,
            roles: [ 'TANK', 'HEAL', 'DPS', 'DPS' ]
        },
        'alliance': {
            level: 50,
            roles: [ 'TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS', 'DPS' ]
        },
        'trial': {
            level: 60,
            roles: [ 'TANK', 'TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS' ]
        },
    }
}