enum Strength {
    REJECTED = "Rejected!",
    WEAK = "Weak!",
    MEDIUM = "Medium!",
    STRONG = "Strong!",
    VERY_STRONG = "Very strong!",
}

// magic numbers
const basicBonus = 1;
const mediumBonus = 2;
const extraBonus = 3;
const min_pw_len = 8;

// Returns a score from 0 to 3 depending on the length of the password
function scoreLength(pw: string): number {
    // MAX SCORE POSSIBLE = 3
    const len = pw.length
    if(len >= 20) return extraBonus;
    if(len >= 12) return mediumBonus;
    return len >= min_pw_len? basicBonus: 0;
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
    if(strength <= 2) return Strength.REJECTED
}

// automatically rejects certain password types
function applyRejectionCriteria(pw: string): boolean {
    const lenScore = scoreLength(pw)
    // rejects password of length 7 characters or shorter
    if(lenScore === 0) return true;
    // rejects password made up only of numbers
    if(/^\d+$/.test(pw)) return true;
    // rejects passwords that are shorter than 12 characters and do not mix case
    return lenScore < 2 && !checkMixedCase(pw);
}

export default function calculatePasswordStrength(password: string): string {

    //MAX SCORE POSSIBLE = 9
    let strength = 0;

    if(applyRejectionCriteria(password)) return Strength.REJECTED

    strength += scoreLength(password)
    strength += scoreChars(password)

    return strengthLabel(strength)
}