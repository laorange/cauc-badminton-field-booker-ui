export interface Preference {
    fields: string[],
    times: string[],
}

export interface UserInfo {
    cipher: string,
    account: string,
    password: string,
    fieldNum: number,
    preferences: Preference[]
}
