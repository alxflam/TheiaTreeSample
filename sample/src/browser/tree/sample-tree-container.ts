import { interfaces, Container } from 'inversify';
import { createTreeContainer, Tree, TreeImpl, TreeModel, TreeModelImpl, TreeWidget } from '@theia/core/lib/browser';
import { SampleTree } from './sample-tree';
import { SampleTreeModel } from './sample-tree-model';
import { SampleTreeWidget } from './sample-tree-widget';

function createSampleTreeContainer(parent: interfaces.Container): Container {
    const child = createTreeContainer(parent);

    child.unbind(TreeImpl);
    child.bind(SampleTree).toSelf();
    child.rebind(Tree).toService(SampleTree);

    child.unbind(TreeModelImpl);
    child.bind(SampleTreeModel).toSelf();
    child.rebind(TreeModel).toService(SampleTreeModel);

    child.bind(SampleTreeWidget).toSelf();
    child.rebind(TreeWidget).toService(SampleTreeWidget);

    return child;
}

export function createSampleTreeWidget(parent: interfaces.Container): SampleTreeWidget {
    return createSampleTreeContainer(parent).get(SampleTreeWidget);
}