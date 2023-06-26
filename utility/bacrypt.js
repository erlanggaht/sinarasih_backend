import {  compareSync, hashSync } from "bcrypt"


export default function enkrip_hash (textpassword) {
    const salt = 10
    const hash = hashSync (textpassword,salt)

    return hash
}

export function enkrip_compare (textpassword,hashpasswod) {
    const compare = compareSync(textpassword,hashpasswod)

    return compare
}

