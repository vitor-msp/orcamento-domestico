export interface IRepository {
    save(entity: any): void
    delete(id: string): void
    get(id: string): any
    getAll(): any[]
}