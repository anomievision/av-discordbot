declare global {
    export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
        ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
        : S;

    export type SnakeToCamelCaseNested<T> = T extends object
        ? T extends Array<infer U>
        ? Array<SnakeToCamelCaseNested<U>>
        : {
            [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<T[K]>;
        }
        : T;

    export type CamelCaseToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
        ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelCaseToSnakeCase<U>}`
        : S;

    export type CamelCaseToSnakeNested<T> = T extends object
        ? T extends Array<infer U extends string>
        ? Array<CamelCaseToSnakeCase<U>>
        : {
            [K in keyof T as CamelCaseToSnakeCase<K & string>]: CamelCaseToSnakeNested<T[K]>;
        }
        : T;
}

export { };