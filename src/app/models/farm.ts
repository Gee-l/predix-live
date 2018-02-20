import {} from './node'
import { Node } from './node' 

export class Farm {
    uri: string;
    name: string;
    description: string;
    location: {};
    nodes: Node[];

    constructor(uri: string, name: string, description: string, location: {}, nodes: Node[]) {
        this.uri = uri;
        this.name = name;
        this.description = description;
        this.location = location;
        this.nodes = nodes;
    }
}