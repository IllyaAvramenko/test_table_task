export const getMapKeyByIndex = (map: Map<number, any> | undefined, index: number): number  => {
   if (map) return Array.from(map?.keys())[index]
   return -1
}