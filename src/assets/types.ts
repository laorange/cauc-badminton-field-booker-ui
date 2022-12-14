export interface Preference {
    fields: string[],
    times: number[],
}

export interface UserInfo {
    cipher: string,
    account: string,
    password: string,
    startNow: boolean,
    preferences: Preference[]
}
