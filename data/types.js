module.exports = {
    Jobs: [
        { name: 'Paladin',      id: 'PAL', role: 'TANK' },
        { name: 'Warrior',      id: 'WAR', role: 'TANK' },
        { name: 'Dark Knight',  id: 'DRK', role: 'TANK' },
        { name: 'Gunbreaker',   id: 'GNB', role: 'TANK' },
        { name: 'White Mage',   id: 'WHM', role: 'HEAL', subtype: 'Pure' },
        { name: 'Astrologian',  id: 'AST', role: 'HEAL', subtype: 'Pure' },
        { name: 'Scholar',      id: 'SCH', role: 'HEAL', subtype: 'Barrier' },
        // { name: 'Sage',         id: 'SAG', role: 'HEAL' },
        { name: 'Monk',         id: 'MNK', role: 'DPS', subtype: 'Melee' },
        { name: 'Dragoon',      id: 'DRG', role: 'DPS', subtype: 'Melee' },
        { name: 'Ninja',        id: 'NIN', role: 'DPS', subtype: 'Melee' },
        { name: 'Samurai',      id: 'SAM', role: 'DPS', subtype: 'Melee' },
        // { name: 'Reaper',       id: 'SAM', role: 'DPS', subtype: 'Melee' },
        { name: 'Bard',         id: 'BRD', role: 'DPS', subtype: 'Ranged' },
        { name: 'Machinist',    id: 'MCN', role: 'DPS', subtype: 'Ranged' },
        { name: 'Dancer',       id: 'DNC', role: 'DPS', subtype: 'Ranged' },
        { name: 'Black Mage',   id: 'BLM', role: 'DPS', subtype: 'Caster' },
        { name: 'Summoner',     id: 'SMN', role: 'DPS', subtype: 'Caster' },
        { name: 'Red Mage',     id: 'RDM', role: 'DPS', subtype: 'Caster' }
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
            description: `Main scenario`,
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