import { injectable, inject } from 'inversify';
import { LabelProviderContribution, DidChangeLabelEvent, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
import { GroupNode } from './sample-tree';

@injectable()
export class SampleGroupTreeLabelProvider implements LabelProviderContribution {

    @inject(LabelProvider)
    protected readonly labelProvider: LabelProvider;

    @inject(TreeLabelProvider)
    protected readonly treeLabelProvider: TreeLabelProvider;

    canHandle(element: object): number {
        const isPerson = GroupNode.is(element);
        if (isPerson) {
            const num = this.treeLabelProvider.canHandle(element);
            return num + 1;
        }
        return 0;
    }

    getIcon(node: GroupNode): string {
        return this.labelProvider.getIcon(node.group);
    }

    getName(node: GroupNode): string {
        return node.group.groupName;
    }

    getDescription(node: GroupNode): string {
        return node.group.groupName;
    }

    affects(node: GroupNode, event: DidChangeLabelEvent): boolean {
        return event.affects(node.group);
    }

}