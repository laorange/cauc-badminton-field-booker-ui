export interface Preference {
    fields: string[],
    times: number[],
}

export interface UserInfo {
    cipher: string,
    account: string,
    password: string,
    fieldNum: number,
    preferences: Preference[]
}
