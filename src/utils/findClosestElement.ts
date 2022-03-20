export const findClosestElement = (arr: number[], goal: number): number => {
   const closest = arr.reduce((prev, curr) => {
      return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
   })
   return closest
}