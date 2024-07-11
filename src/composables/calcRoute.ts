import type {Point2DWithID} from "@/types";
import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";

export const useCalcRoute = () => {
    const mapStore = useMapStore();
    const mobStore = useMobStore();

    const calc_route = (allDistances: Map<string, number>) => {
        return getShortestRoute(allDistances, mapStore.starts_filtered, mobStore.mobs_selected);
    };

    function getDistance(p1: Point2DWithID, p2: Point2DWithID): number {
        // calculate Euclidean distance between two points
        // return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    function generateKey(p1: Point2DWithID, p2: Point2DWithID): string {
        const ids = [p1.id, p2.id].sort().join('_');
        return ids;
    }

    function calculateAllDistances(points: Point2DWithID[]): Map<string, number> {
        const distances = new Map<string, number>();
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const distance = getDistance(points[i], points[j]);
                distances.set(generateKey(points[i], points[j]), distance);
            }
        }
        return distances;
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

    function getShortestRoute(allDistances: Map<string, number>, starts: Point2DWithID[], points: Point2DWithID[]): Point2DWithID[] {
        let minDistance = Infinity;
        let minRoute: Point2DWithID[] = [];
        const pointPermutations = generatePermutations(points);
        for (const start of starts) {
            for (const pointPerm of pointPermutations) {
                let route = [start, ...pointPerm];
                let distance = 0;
                for (let i = 0; i < route.length - 1; i++) {
                    const key = generateKey(route[i], route[i + 1]);
                    distance += allDistances.get(key)!;
                }
                if (distance < minDistance) {
                    minDistance = distance;
                    minRoute = route;
                }
            }
        }
        return minRoute;
    }

    return {
        calc_route,
        getShortestRoute,
        calculateAllDistances
    };
}