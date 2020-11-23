import { injectable, inject } from 'inversify';
import { CompositeTreeNode, TreeModelImpl } from '@theia/core/lib/browser';
import { GroupNode, SampleTree } from './sample-tree';
import { Group, Person } from '../sample';

@injectable()
export class SampleTreeModel extends TreeModelImpl {

    @inject(SampleTree) protected readonly tree: SampleTree;

    getTree(): SampleTree {
        return this.tree;
    }

    async init(): Promise<void> {
        this.tree.root = undefined;

        const person: Person = {
            firstName: 'Fred',
            lastName: 'Feuerstein'
        }

        const root: CompositeTreeNode = GroupNode.create(<Group>{
            groupName: 'TheFeuersteins',
            members: [
                person
            ],
        }, 
        undefined);
        
        this.tree.root = root;        
    }
}