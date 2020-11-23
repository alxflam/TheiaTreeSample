import { injectable } from 'inversify';
import { MenuModelRegistry, Command, CommandRegistry } from '@theia/core/lib/common';
import { AbstractViewContribution, OpenViewArguments, Widget } from '@theia/core/lib/browser';
import { EDITOR_CONTEXT_MENU } from '@theia/editor/lib/browser';
import { SampleTreeWidget } from './tree/sample-tree-widget';
import { SAMPLE_ID } from './sample';
import { TabBarToolbarContribution, TabBarToolbarRegistry } from '@theia/core/lib/browser/shell/tab-bar-toolbar';

export const SAMPLE_TOGGLE_COMMAND_ID = 'sample:toggle';
export const SAMPLE_LABEL = 'Sample';

export namespace CallHierarchyCommands {
    export const OPEN: Command = {
        id: 'sample:open',
        label: 'Open Sample Tree'
    };
    export const REFRESH: Command = {
        id: 'sample.refresh',
        category: 'Sample',
        label: 'Refresh',
        iconClass: 'refresh'
    };
}

@injectable()
export class SampleContribution extends AbstractViewContribution<SampleTreeWidget> implements TabBarToolbarContribution {

    constructor() {
        super({
            widgetId: SAMPLE_ID,
            widgetName: SAMPLE_LABEL,
            defaultWidgetOptions: {
                area: 'bottom'
            },
            toggleCommandId: SAMPLE_TOGGLE_COMMAND_ID,
            toggleKeybinding: 'ctrlcmd+shift+f3'
        });
    }

    

    async openView(args?: Partial<OpenViewArguments>): Promise<SampleTreeWidget> {
        const widget = await super.openView(args);
        return widget;
    }

    registerCommands(registry: CommandRegistry): void {
        super.registerCommands(registry);

        registry.registerCommand(CallHierarchyCommands.OPEN, {
            execute: () => this.openView({
                toggle: false,
                activate: true
            }),
            isEnabled: () => true
        });

        registry.registerCommand(CallHierarchyCommands.REFRESH, {
            execute: widget => this.withWidget(widget, () => this.refreshTranslationNavigator()),
            isEnabled: widget => this.withWidget(widget, () => true),
            isVisible: widget => this.withWidget(widget, () => true)
        });

    }

    protected withWidget<T>(widget: Widget | undefined = this.tryGetWidget(), cb: (navigator: SampleTreeWidget) => T): T | false {
        if (widget instanceof SampleTreeWidget && widget.id === SAMPLE_ID) {
            return cb(widget);
        }
        return false;
    }

    async refreshTranslationNavigator(): Promise<void> {
        const { model } = await this.widget;
        await model.refresh();
    }

    registerToolbarItems(registry: TabBarToolbarRegistry): void {
        registry.registerItem({
            id: CallHierarchyCommands.REFRESH.id,
            command: CallHierarchyCommands.REFRESH.id,
            tooltip: 'Refresh',
            priority: 0,
        });
    }

    registerMenus(menus: MenuModelRegistry): void {
        const menuPath = [...EDITOR_CONTEXT_MENU, 'navigation'];
        menus.registerMenuAction(menuPath, {
            commandId: CallHierarchyCommands.OPEN.id,
            label: SAMPLE_LABEL
        });
        super.registerMenus(menus);
    }

}