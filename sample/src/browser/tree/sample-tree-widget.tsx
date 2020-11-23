import { injectable, inject } from 'inversify';
import {
    ContextMenuRenderer, TreeWidget, TreeProps,
    TreeModel,
} from '@theia/core/lib/browser';
import { LabelProvider } from '@theia/core/lib/browser/label-provider';
import { SampleTreeModel } from './sample-tree-model';
import { SAMPLE_ID } from '../sample';
import { EditorManager } from '@theia/editor/lib/browser';
import * as React from 'react';

@injectable()
export class SampleTreeWidget extends TreeWidget {

    constructor(
        @inject(TreeProps) readonly props: TreeProps,
        @inject(SampleTreeModel) readonly model: SampleTreeModel,
        @inject(ContextMenuRenderer) contextMenuRenderer: ContextMenuRenderer,
        @inject(LabelProvider) protected readonly labelProvider: LabelProvider,
        @inject(EditorManager) readonly editorManager: EditorManager
    ) {
        super(props, model, contextMenuRenderer);

        this.id = SAMPLE_ID;
        this.title.label = 'Sample';
        this.title.caption = 'Sample';
        this.title.iconClass = 'fa call-hierarchy-tab-icon';
        this.title.closable = true;
    }

    protected renderTree(model: TreeModel): React.ReactNode {
        return model.root === undefined ? <div className='theia-widget-noInfo'>Model root not set.</div> : super.renderTree(model)
    }

}