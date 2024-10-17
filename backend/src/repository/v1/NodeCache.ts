import { User } from "../../services/v1/User";
import { IUser } from "../../models/v1/IUser";
import NodeCache from "node-cache";



export class NodeCacheManager{
    private static cache : NodeCache = new NodeCache({stdTTL:3600});

    public static get<T>(key:number): T |undefined{
        return NodeCacheManager.cache.get<T>(key);
    }
    public static getUser(id: number, user: IUser, ttl: number): boolean {
        // Assuming you have a User class or similar, instantiate it correctly.
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        // Store the userData in cache with ttl
        return NodeCacheManager.cache.set(userData.id, userData, ttl);
    }
    public static del<T>(key:number): number{
        return NodeCacheManager.cache.del(key);
    }
    public static has(key:number): boolean{
        return NodeCacheManager.cache.has(key);
    }

    public static flushAll(key:number): void{
         NodeCacheManager.cache.flushAll();
    }
}