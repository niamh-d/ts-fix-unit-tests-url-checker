enum Strength {
    VERY_WEAK = "Very weak!",
    WEAK = "Weak!",
    MEDIUM = "Medium!",
    STRONG = "Strong!",
    VERY_STRONG = "Very strong!",
    REJECTED = "Rejected!"
}

// magic numbers
const basicBonus = 1;
const mediumBonus = 2;
const extraBonus = 3;

// Returns a score from 0 to 3 depending on the length of the password
function scoreLength(pw: string): number {
    // MAX SCORE POSSIBLE = 3
    const len = pw.length
    if(len >= 20) return extraBonus;
    if(len >= 12) return mediumBonus;
    if(len >= 8) return basicBonus;
    return 0;
}

// returns true for passwords that have both upper and lower case characters
function checkMixedCase(pw:string): boolean {
   return /[A-Z]/.test(pw) && /[a-z]/.test(pw)
}

// Returns a score from 0 to 6 depending on the make-up of the password
// as regards inclusion of mixed case, special characters, numbers
function scoreChars(pw: string): number {
    // MAX SCORE POSSIBLE = 6
    let score = 0;
    // checks for mixed case
    if (checkMixedCase(pw)) score += mediumBonus
    // checks for use of numbers
    if(/\d/.test(pw)) score += mediumBonus
    // checks for use of special characters
    if (/[\W_]/.test(pw))  score += mediumBonus
    return score
}

// utility function to convert strength rating to enum
function strengthLabel(strength: number): string {
    if(strength >= 8) return Strength.VERY_STRONG
    if(strength >= 6) return Strength.STRONG
    if(strength >= 4) return Strength.MEDIUM
    if(strength === 3) return Strength.WEAK
    if(strength < 3) return Strength.VERY_WEAK
}

function applyRejectionCriteria(pw: string): boolean {
    // rejects password made up only of numbers
    if(/^\d+$/.test(pw)) return true;
    // rejects passwords that are shorter than 8 characters and do not mix case
    return scoreLength(pw) < 2 && !checkMixedCase(pw);
}

export default function calculatePasswordStrength(password: string): string {

    if(applyRejectionCriteria(password)) return Strength.REJECTED

    //MAX SCORE POSSIBLE = 9
    let strength = 0;

    strength += scoreLength(password)
    strength += scoreChars(password)

    return strengthLabel(strength)
}