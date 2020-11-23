import { WidgetFactory, LabelProviderContribution, bindViewContribution } from '@theia/core/lib/browser';
import { SAMPLE_ID } from './sample';

import { ContainerModule } from 'inversify';
import { SampleContribution } from './sample-contribution';
import { createSampleTreeWidget } from './tree/sample-tree-container';
import { SamplePersonTreeLabelProvider } from './tree/sample-tree-label-provider';
import { TabBarToolbarContribution } from '@theia/core/lib/browser/shell/tab-bar-toolbar';
import { SampleGroupTreeLabelProvider } from './tree/sample-group-tree-label-provider';

export default new ContainerModule(bind => {

    bindViewContribution(bind, SampleContribution);
    bind(TabBarToolbarContribution).toService(SampleContribution);

    bind(WidgetFactory).toDynamicValue(context => ({
        id: SAMPLE_ID,
        createWidget: () => createSampleTreeWidget(context.container)
    })).inSingletonScope();

    bind(SamplePersonTreeLabelProvider).toSelf().inSingletonScope();
    bind(LabelProviderContribution).toService(SamplePersonTreeLabelProvider);

    bind(SampleGroupTreeLabelProvider).toSelf().inSingletonScope();
    bind(LabelProviderContribution).toService(SampleGroupTreeLabelProvider);

});