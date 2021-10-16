module.exports = {
    Jobs: [
        { name: 'Paladin',      id: 'PAL', type: 'TANK' },
        { name: 'Warrior',      id: 'WAR', type: 'TANK' },
        { name: 'Dark Knight',  id: 'DRK', type: 'TANK' },
        { name: 'Gunbreaker',   id: 'GNB', type: 'TANK' },
        { name: 'White Mage',   id: 'WHM', type: 'HEAL', subtype: 'Pure' },
        { name: 'Astrologian',  id: 'AST', type: 'HEAL', subtype: 'Pure' },
        { name: 'Scholar',      id: 'SCH', type: 'HEAL', subtype: 'Barrier' },
        // { name: 'Sage',         id: 'SAG', type: 'HEAL' },
        { name: 'Monk',         id: 'MNK', type: 'DPS', subtype: 'Melee' },
        { name: 'Dragoon',      id: 'DRG', type: 'DPS', subtype: 'Melee' },
        { name: 'Ninja',        id: 'NIN', type: 'DPS', subtype: 'Melee' },
        { name: 'Samurai',      id: 'SAM', type: 'DPS', subtype: 'Melee' },
        // { name: 'Reaper',       id: 'SAM', type: 'DPS', subtype: 'Melee' },
        { name: 'Bard',         id: 'BRD', type: 'DPS', subtype: 'Ranged' },
        { name: 'Machinist',    id: 'MCN', type: 'DPS', subtype: 'Ranged' },
        { name: 'Dancer',       id: 'DNC', type: 'DPS', subtype: 'Ranged' },
        { name: 'Black Mage',   id: 'BLM', type: 'DPS', subtype: 'Caster' },
        { name: 'Summoner',     id: 'SMN', type: 'DPS', subtype: 'Caster' },
        { name: 'Red Mage',     id: 'RDM', type: 'DPS', subtype: 'Caster' }
    ],
    Roulettes: {
        'expert': {
            level: 80,
            description: 'Expert dungeons',
            roles: ['TANK', 'HEAL', 'DPS', 'DPS'] // 1, 1, 2 
        },
        '80': {
            level: 80,
            description: 'Level 80 dungeons',
            roles: ['TANK', 'HEAL', 'DPS', 'DPS'] // 1, 1, 2
        },
        '50/60/70': {
            level: 50,
            description: 'Level 50/60/70 dungeons',
            roles: ['TANK', 'HEAL', 'DPS', 'DPS'] // 1, 1, 2
        },
        'leveling': {
            level: 16,
            description: 'Leveling roulette',
            roles: ['TANK', 'HEAL', 'DPS', 'DPS'] // 1, 1, 2
        },
        'trials': {
            level: 50,
            description: 'Trials',
            roles: ['TANK', 'TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS'] // 2, 2, 4
        },
        'story': {
            level: 50,
            description: `Main scenario (Don't forget to grab popcorn!)`,
            roles: ['TANK', 'TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS'] // 2, 2, 4
        },
        'alliance': {
            level: 50,
            description: `Alliance raids`,
            roles: ['TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS', 'DPS'] // 1, 2, 5
        },
        'raid': {
            level: 60,
            description: `Normal raids`,
            roles: ['TANK', 'TANK', 'HEAL', 'HEAL', 'DPS', 'DPS', 'DPS', 'DPS'] // 2, 2, 4
        }
    }
};