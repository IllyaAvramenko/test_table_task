export const getMapKeyByIndex = (map: Map<any, any> | undefined, index: number): any => {
   if (map) {
      return Array.from(map?.keys())[index]
   } 
   return false
}