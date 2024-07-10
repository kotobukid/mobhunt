import type {Point2DWithID} from "@/types";

export const useCalcRoute = () => {

    function getDistance(p1: Point2DWithID, p2: Point2DWithID): number {
        // calculate Euclidean distance between two points
        // return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function generatePermutations<T>(arr: T[]): T[][] {
        if (arr.length <= 1) return [arr];
        let perms: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
            let rest = generatePermutations([...arr.slice(0, i), ...arr.slice(i + 1)]);
            for (let perm of rest) {
                perms.push([arr[i], ...perm]);
            }
        }
        return perms;
    }

    function getShortestRoute(starts: Point2DWithID[], points: Point2DWithID[]): Point2DWithID[] {
        let minDistance = Infinity;
        let minRoute: Point2DWithID[] = [];
        const pointPermutations = generatePermutations(points);
        for (const start of starts) {
            for (const pointPerm of pointPermutations) {
                let route = [start, ...pointPerm];
                let distance = 0;
                for (let i = 0; i < route.length - 1; i++)
                    distance += getDistance(route[i], route[i + 1]);
                if (distance < minDistance) {
                    minDistance = distance;
                    minRoute = route;
                }
            }
        }
        return minRoute;
    }

    return {
        getShortestRoute
    };
}