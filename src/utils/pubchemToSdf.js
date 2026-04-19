const ELEMENT_SYMBOLS = {
    1: 'H', 2: 'He', 3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O',
    9: 'F', 10: 'Ne', 11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P',
    16: 'S', 17: 'Cl', 18: 'Ar', 19: 'K', 20: 'Ca', 26: 'Fe', 29: 'Cu',
    30: 'Zn', 35: 'Br', 53: 'I',
}

export default function pubchemToSdf(json) {
    const compound = json.PC_Compounds[0]
    const { aid, element } = compound.atoms
    const { aid1, aid2, order } = compound.bonds
    const conformer = compound.coords[0].conformers[0]
    const { x, y, z } = conformer

    const nAtoms = aid.length
    const nBonds = aid1.length

    const lines = []

    lines.push('')
    lines.push('     PubChem')
    lines.push('')
    lines.push(
        String(nAtoms).padStart(3) +
        String(nBonds).padStart(3) +
        '  0  0  0  0  0  0  0  0999 V2000'
    )

    for (let i = 0; i < nAtoms; i++) {
        const sym = ELEMENT_SYMBOLS[element[i]] || '?'
        lines.push(
            x[i].toFixed(4).padStart(10) +
            y[i].toFixed(4).padStart(10) +
            z[i].toFixed(4).padStart(10) +
            ' ' + sym.padEnd(3) +
            ' 0  0  0  0  0  0  0  0  0  0  0  0'
        )
    }

    for (let i = 0; i < nBonds; i++) {
        lines.push(
            String(aid1[i]).padStart(3) +
            String(aid2[i]).padStart(3) +
            String(order[i]).padStart(3) +
            '  0  0  0  0'
        )
    }

    lines.push('M  END')
    lines.push('$$$$')

    return lines.join('\n')
}
