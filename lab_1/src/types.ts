export type PositionType = "Developer" | "Manager" | "Designer"

export type Employee = {
    firstName: string,
    lastName: string,
    age: number,
    position: PositionType,
    programmingLanguages: string[]
}