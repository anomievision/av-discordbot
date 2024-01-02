import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export function useCamelToSnakeCase<T extends Record<string, any>>(object: T): CamelCaseToSnakeNested<T> {
    return snakecaseKeys(object) as unknown as CamelCaseToSnakeNested<T>;
}

export function useSnakeToCamelCase<T extends Record<string, any>>(object: T): SnakeToCamelCaseNested<T> {
    return camelcaseKeys(object) as unknown as SnakeToCamelCaseNested<T>;
}
