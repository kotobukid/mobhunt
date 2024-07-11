export type StartPoint = {
    id: number,
    name: string,
    x: number,
    y: number
};

export type AreaMap = {
    id: number,
    name: string,
    img: string,
    starts: StartPoint[]
};

export type Mob = {
    id: number,
    area: number,
    name: string,
    x: number,
    y: number
};

export type MobClient = {
    selected: boolean
} & Mob;

export type Point2DWithID = {
    x: number,
    y: number,
    id: number
};

export type Point2D = {
    x: number,
    y: number
};