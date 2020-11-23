import { injectable, inject } from 'inversify';
import { LabelProviderContribution, DidChangeLabelEvent, LabelProvider } from '@theia/core/lib/browser/label-provider';
import { TreeLabelProvider } from '@theia/core/lib/browser/tree/tree-label-provider';
import { PersonNode } from './sample-tree';

@injectable()
export class SamplePersonTreeLabelProvider implements LabelProviderContribution {

    @inject(LabelProvider)
    protected readonly labelProvider: LabelProvider;

    @inject(TreeLabelProvider)
    protected readonly treeLabelProvider: TreeLabelProvider;

    canHandle(element: object): number {
        const isPerson = PersonNode.is(element);
        if (isPerson) {
            const num = this.treeLabelProvider.canHandle(element);
            return num + 1;
        }
        return 0;
    }

    getIcon(node: PersonNode): string {
        return this.labelProvider.getIcon(node.person);
    }

    getName(node: PersonNode): string {
        return node.person.firstName;
    }

    getDescription(node: PersonNode): string {
        return node.person.lastName;
    }

    affects(node: PersonNode, event: DidChangeLabelEvent): boolean {
        return event.affects(node.person);
    }

}