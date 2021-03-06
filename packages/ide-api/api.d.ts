export interface EvalHelper { }
interface ActiveEvalEmitter {
	removeAllListeners(event?: string): void;
	emit(event: string, ...args: any[]): void;
	on(event: string, cb: (...args: any[]) => void): void;
}
interface IDisposable {
	dispose(): void;
}
interface Disposer extends IDisposable {
	onDidDispose: (cb: () => void) => void;
}
interface Event<T> {
	(listener: (e: T) => any, thisArgs?: any, disposables?: IDisposable[]): IDisposable;
}
interface IAction extends IDisposable {
	id: string;
	label: string;
	tooltip: string;
	class: string | undefined;
	enabled: boolean;
	checked: boolean;
	radio: boolean;
	run(event?: any): Promise<any>;
}
interface IStatusbarEntry {
	readonly text: string;
	readonly tooltip?: string;
	readonly color?: string;
	readonly command?: string;
	readonly arguments?: any[];
	readonly showBeak?: boolean;
}
interface IStatusbarService {
	addEntry(entry: IStatusbarEntry, alignment: ide.StatusbarAlignment, priority?: number): IDisposable;
	setStatusMessage(message: string, autoDisposeAfter?: number, delayBy?: number): IDisposable;
}
type NotificationMessage = string | Error;
interface INotificationProperties {
	sticky?: boolean;
	silent?: boolean;
}
interface INotification extends INotificationProperties {
	severity: ide.Severity;
	message: NotificationMessage;
	source?: string;
	actions?: INotificationActions;
}
interface INotificationActions {
	primary?: IAction[];
	secondary?: IAction[];
}

interface INotificationProgress {
	infinite(): void;
	total(value: number): void;
	worked(value: number): void;
	done(): void;
}

interface INotificationHandle {
	readonly onDidClose: Event<void>;
	readonly progress: INotificationProgress;
	updateSeverity(severity: ide.Severity): void;
	updateMessage(message: NotificationMessage): void;
	updateActions(actions?: INotificationActions): void;
	close(): void;
}

interface IPromptChoice {
	label: string;
	isSecondary?: boolean;
	keepOpen?: boolean;
	run: () => void;
}

interface IPromptOptions extends INotificationProperties {
	onCancel?: () => void;
}

interface INotificationService {
	notify(notification: INotification): INotificationHandle;
	info(message: NotificationMessage | NotificationMessage[]): void;
	warn(message: NotificationMessage | NotificationMessage[]): void;
	error(message: NotificationMessage | NotificationMessage[]): void;
	prompt(severity: ide.Severity, message: string, choices: IPromptChoice[], options?: IPromptOptions): INotificationHandle;
}

interface IBaseCommandAction {
	id: string;
	title: string;
	category?: string;
}

interface ICommandAction extends IBaseCommandAction {
	// iconLocation?: { dark: URI; light?: URI; };
	// precondition?: ContextKeyExpr;
	// toggled?: ContextKeyExpr;
}

interface ISerializableCommandAction extends IBaseCommandAction {
	// iconLocation?: { dark: UriComponents; light?: UriComponents; };
}

interface IMenuItem {
	command: ICommandAction;
	alt?: ICommandAction;
	// when?: ContextKeyExpr;
	group?: 'navigation' | string;
	order?: number;
}

interface IMenuRegistry {
	appendMenuItem(menu: ide.MenuId, item: IMenuItem): IDisposable;
}

export interface ICommandHandler {
	(accessor: any, ...args: any[]): void;
}

export interface ICommand {
	id: string;
	handler: ICommandHandler;
	description?: ICommandHandlerDescription | null;
}

export interface ICommandHandlerDescription {
	description: string;
	args: { name: string; description?: string; }[];
	returns?: string;
}

interface ICommandRegistry {
	registerCommand(command: ICommand): IDisposable;
}

declare namespace ide {
	export const client: {
		run(func: (helper: ActiveEvalEmitter) => Disposer): ActiveEvalEmitter;
		run<T1>(func: (helper: ActiveEvalEmitter, a1: T1) => Disposer, a1: T1): ActiveEvalEmitter;
		run<T1, T2>(func: (helper: ActiveEvalEmitter, a1: T1, a2: T2) => Disposer, a1: T1, a2: T2): ActiveEvalEmitter;
		run<T1, T2, T3>(func: (helper: ActiveEvalEmitter, a1: T1, a2: T2, a3: T3) => Disposer, a1: T1, a2: T2, a3: T3): ActiveEvalEmitter;
		run<T1, T2, T3, T4>(func: (helper: ActiveEvalEmitter, a1: T1, a2: T2, a3: T3, a4: T4) => Disposer, a1: T1, a2: T2, a3: T3, a4: T4): ActiveEvalEmitter;
		run<T1, T2, T3, T4, T5>(func: (helper: ActiveEvalEmitter, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => Disposer, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5): ActiveEvalEmitter;
		run<T1, T2, T3, T4, T5, T6>(func: (helper: ActiveEvalEmitter, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => Disposer, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6): ActiveEvalEmitter;

		evaluate<R>(func: (helper: EvalHelper) => R | Promise<R>): Promise<R>;
		evaluate<R, T1>(func: (helper: EvalHelper, a1: T1) => R | Promise<R>, a1: T1): Promise<R>;
		evaluate<R, T1, T2>(func: (helper: EvalHelper, a1: T1, a2: T2) => R | Promise<R>, a1: T1, a2: T2): Promise<R>;
		evaluate<R, T1, T2, T3>(func: (helper: EvalHelper, a1: T1, a2: T2, a3: T3) => R | Promise<R>, a1: T1, a2: T2, a3: T3): Promise<R>;
		evaluate<R, T1, T2, T3, T4>(func: (helper: EvalHelper, a1: T1, a2: T2, a3: T3, a4: T4) => R | Promise<R>, a1: T1, a2: T2, a3: T3, a4: T4): Promise<R>;
		evaluate<R, T1, T2, T3, T4, T5>(func: (helper: EvalHelper, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R | Promise<R>, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5): Promise<R>;
		evaluate<R, T1, T2, T3, T4, T5, T6>(func: (helper: EvalHelper, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6) => R | Promise<R>, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, a6: T6): Promise<R>;
	};

	export const workbench: {
		readonly statusbarService: IStatusbarService;
		readonly notificationService: INotificationService;
		readonly menuRegistry: IMenuRegistry;
		readonly commandRegistry: ICommandRegistry;
	};

	export enum Severity {
		Ignore = 0,
		Info = 1,
		Warning = 2,
		Error = 3
	} 

	export enum StatusbarAlignment {
		LEFT = 0,
		RIGHT = 1,
	}

	export enum MenuId {
		CommandPalette,
		DebugBreakpointsContext,
		DebugCallStackContext,
		DebugConsoleContext,
		DebugVariablesContext,
		DebugWatchContext,
		EditorContext,
		EditorTitle,
		EditorTitleContext,
		EmptyEditorGroupContext,
		ExplorerContext,
		MenubarAppearanceMenu,
		MenubarDebugMenu,
		MenubarEditMenu,
		MenubarFileMenu,
		MenubarGoMenu,
		MenubarHelpMenu,
		MenubarLayoutMenu,
		MenubarNewBreakpointMenu,
		MenubarPreferencesMenu,
		MenubarRecentMenu,
		MenubarSelectionMenu,
		MenubarSwitchEditorMenu,
		MenubarSwitchGroupMenu,
		MenubarTerminalMenu,
		MenubarViewMenu,
		OpenEditorsContext,
		ProblemsPanelContext,
		SCMChangeContext,
		SCMResourceContext,
		SCMResourceGroupContext,
		SCMSourceControl,
		SCMTitle,
		SearchContext,
		TouchBarContext,
		ViewItemContext,
		ViewTitle,
	}
}

declare global {
	interface Window {
		ide?: typeof ide;
	
		addEventListener(event: "ide-ready", callback: (ide: CustomEvent & { readonly ide: typeof ide }) => void): void;
	}
}
