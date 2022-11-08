export interface Preference {
    fields: string[],
    times: string[],
}

export interface UserInfo {
    account: string,
    password: string,
    fieldNum: number,
    preferences: Preference[]
}
