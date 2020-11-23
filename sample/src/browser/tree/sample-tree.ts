import { injectable } from 'inversify';
import { TreeNode, CompositeTreeNode, SelectableTreeNode, ExpandableTreeNode, TreeImpl } from '@theia/core/lib/browser';
import { Group, Person } from '../sample';

@injectable()
export class SampleTree extends TreeImpl {

    async resolveChildren(parent: CompositeTreeNode): Promise<TreeNode[]> {
        if (parent.children.length > 0) {
            return [...parent.children];
        }

        if (GroupNode.is(parent)) {
            if (parent.group && parent.group?.members) {
                var nodes = this.toNodes(parent.group?.members, parent);
                return nodes;
            }
        }

        return [];
    }

    protected toNodes(callers: Person[], parent: CompositeTreeNode): TreeNode[] {
        var nodes = callers.map(caller => this.toNode(caller, parent));
        return nodes;
    }

    protected toNode(caller: Person, parent: CompositeTreeNode | undefined): TreeNode {
        var node = PersonNode.create(caller, parent);

        var exisitingNode = this.getNode(node.id);
        if (exisitingNode) {
            return exisitingNode;
        }

        return node;
    }
}

export interface GroupNode extends ExpandableTreeNode {
    group: Group;
}

export namespace GroupNode {
    export function is(node: TreeNode | object | undefined): node is GroupNode {
        return !!node && 'group' in node;
    }

    export function create(group: Group, parent: TreeNode | undefined): GroupNode {
        const id = group.groupName;
        return <GroupNode>{
            id, group, parent,
            // name: 'Group.: ' + group.groupName,
            children: [],
            expanded: false,
        };
    }
}

export interface PersonNode extends SelectableTreeNode {
    person: Person;
}

export namespace PersonNode {
    export function is(node: TreeNode | object | undefined): node is PersonNode {
        return !!node && 'person' in node;
    }

    export function create(person: Person, parent: CompositeTreeNode | undefined): PersonNode {
        const idPrefix = (parent) ? parent.id + '/' : '';
        const id = idPrefix + person.firstName + person.lastName;
        return <PersonNode>{
            id, person, parent,
            // name: 'Person: ' + person.firstName + ' ' + person.lastName,
            selected: false
        };
    }
}