export type StartPoint = {
    id: number,
    name: string,
    x: number,
    y: number
};

export type AreaMap = {
    id: number,
    name: string,
    starts: StartPoint[]
}

export type Mob = {
    id: number,
    area: number,
    name: string,
    x: number,
    y: number
}