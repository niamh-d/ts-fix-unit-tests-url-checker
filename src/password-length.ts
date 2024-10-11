enum Strength {
    VERY_WEAK = "Very weak!",
    WEAK = "Weak",
    MEDIUM = "Medium",
    STRONG = "Strong",
    VERY_STRONG = "Very strong!"
}

const basicBonus = 1;
const mediumBonus = 2;
const extraBonus = 3;

function scoreLength(pw: string): number {
    // MAX SCORE POSSIBLE = 3
    const len = pw.length
    if(len >= 20) return extraBonus;
    if(len >= 12) return mediumBonus;
    if(len >= 8) return basicBonus;
    return 0;
}

function scoreChars(pw: string): number {
    // MAX SCORE POSSIBLE = 6
    let score = 0;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += mediumBonus
    if(/\d/.test(pw)) score += mediumBonus
    if (/[\W_]/.test(pw))  score += mediumBonus
    return score
}

function strengthLabel(strength: number): string {
    if(strength >= 8) return Strength.VERY_STRONG
    if(strength >= 6) return Strength.STRONG
    if(strength >= 4) return Strength.MEDIUM
    if(strength === 3) return Strength.WEAK
    if(strength < 3) return Strength.VERY_WEAK
}

export default function calculatePasswordStrength(password: string): string {
    //MAX SCORE POSSIBLE = 9
    let strength = 0;

    strength += scoreLength(password)
    strength += scoreChars(password)

    return strengthLabel(strength)
}