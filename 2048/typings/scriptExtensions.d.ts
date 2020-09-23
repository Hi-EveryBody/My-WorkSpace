declare namespace otris {
    namespace notifications {
        /**
         * Some default values for the notifications
         */
        interface NotificationDefaults {
            /**
             * default notification type (info)
             */
            type: string;
            /**
             * default value for the sticky flag (false)
             */
            sticky: boolean;
            /**
             * default value for the remove on action flag (true)
             */
            removeOnAction: boolean;
            /**
             * default timeout value (8000)
             */
            timeout: number;
        }

        interface NotificationStatus {
            new: string;
            read: string;
            delivered: string;
        }

        /**
         * Create a new notification
         */
        class Notification {
            /**
             * 
             * @param message - message
             * @param title - notification title
             * @param type -  notification type
             * @param action - Add a click action for the notification
             * @param sticky - Remove notification only if closed or clicked (otris.notifications.NotificationDefaults.sticky)
             */
            constructor(message?: string, title?: string, type?: string, action?: otris.ScriptReturn, sticky?: boolean);

            /**
             * Set the user who *produced* the notification (e.g. the author of a file message)
             * Defaults to the current system user
             * @param user - system user
             */
            setProducer(user?: SystemUser): void;

            /**
             * Set the notification title
             * @param title - notification title
             */
            setTitle(title: string): void;

            /**
             * Set the notification message
             * @param message - message
             */
            setMessage(message: string): void;

            /**
             * Set the type of the notification
             * @param type - notification type
             */
            setType(type: string): void;

            /**
             * Set the click action of the notification
             * @param action - notification onclick action
             */
            setAction(action: otris.ScriptReturn): void;

            /**
             * Set the onload action of the notification
             * @param onloadAction - notification onload action
             */
            setOnloadAction(onloadAction: otris.ScriptReturn): void;

            /**
             * Set a referenceId for the notification
             * @param referenceId - reference id
             */
            setReferenceId(referenceId: string): void;

            /**
             * Set the current progress value for a long running task. Set a value between 0 and 100.
             * A value over 100 means the task is done and was successful.
             * A negative value indicates that the task failed.
             * The notification type must be set to `progress`.
             * It is also necessary to set a [referenceId]{@link otris.notifications.Notification#setReferenceId} as a identifier for the task.
             * @param progressValue - current progress
             */
            setProgressValue(progressValue: Number): void;

            /**
             * Set the timeout for this notification
             * @param timeout - notification timeout
             */
            setTimeout(timeout: number): void;

            /**
             * Remove notification only if closed or clicked (otris.notifications.NotificationDefaults.sticky)
             * @param sticky - sticky flag
             */
            setSticky(sticky: boolean): void;

            /**
             * Remove the notification if action is executed
             * @param removeOnAction - remove on action flag
             */
            setRemoveOnAction(removeOnAction: boolean): void;

            /**
             * Publish the notification to the given user(s)
             * @param user - recipients
             */
            publish(user: string | SystemUser | string[] | SystemUser[]): void;

        }

        class NotificationEntry {
            /**
             * A {@link otris.notifications.NotificationEntry} is the **persisted** version of a {@link otris.notifications.Notification}.
             */
            constructor();

            /**
             * Persists the notification entry
             */
            save(): void;

            /**
             * Alias for [save()]{@link otris.notifications.NotificationEntry#save}.
             */
            publish(): void;

            /**
             * Change the status of the notification entry.
             * @param status - new status
             */
            setStatus(status: otris.notifications.NotificationStatus): void;

            /**
             * Delete entry
             */
            delete(): void;

            /**
             * Returns the status of the notification entry.
             * @returns current status
             */
            getStatus(): otris.notifications.NotificationStatus;

            /**
             * Returns the timestamp of the notification entry.
             * @returns timestamp (number of milliseconds elapsed since January 1, 1970 00:00:00 UTC)
             */
            getTimestamp(): Number;

            /**
             * Set the user who *produced* the notification (e.g. the author of a file message)
             * Defaults to the current system user
             * @param user - system user
             */
            setProducer(user?: SystemUser): void;

            /**
             * Set the notification title
             * @param title - notification title
             */
            setTitle(title: string): void;

            /**
             * Set the notification message
             * @param message - message
             */
            setMessage(message: string): void;

            /**
             * Set the type of the notification
             * @param type - notification type
             */
            setType(type: string): void;

            /**
             * Set the click action of the notification
             * @param action - notification onclick action
             */
            setAction(action: otris.ScriptReturn): void;

            /**
             * Set the onload action of the notification
             * @param onloadAction - notification onload action
             */
            setOnloadAction(onloadAction: otris.ScriptReturn): void;

            /**
             * Set a referenceId for the notification
             * @param referenceId - reference id
             */
            setReferenceId(referenceId: string): void;

            /**
             * Set the current progress value for a long running task. Set a value between 0 and 100.
             * A value over 100 means the task is done and was successful.
             * A negative value indicates that the task failed.
             * The notification type must be set to `progress`.
             * It is also necessary to set a [referenceId]{@link otris.notifications.Notification#setReferenceId} as a identifier for the task.
             * @param progressValue - current progress
             */
            setProgressValue(progressValue: Number): void;

            /**
             * Set the timeout for this notification
             * @param timeout - notification timeout
             */
            setTimeout(timeout: number): void;

            /**
             * Remove notification only if closed or clicked (otris.notifications.NotificationDefaults.sticky)
             * @param sticky - sticky flag
             */
            setSticky(sticky: boolean): void;

            /**
             * Remove the notification if action is executed
             * @param removeOnAction - remove on action flag
             */
            setRemoveOnAction(removeOnAction: boolean): void;

        }

        class NotificationManager {
            /**
             * The {@link otris.notifications.NotificationManager} provides several methods to retrieve and manipulate notifications
             */
            constructor();

            /**
             * Deletes all notifications of the given status
             * @param user login of a user or a {@link SystemUser}
             * @param status notification status
             */
            deleteNotificationsByStatus(user: string | SystemUser, status: otris.notifications.NotificationStatus): void;

            /**
             * Returns the notifications of a given user
             * @param user login of a user or a {@link SystemUser}
             * @param status restrict to specific status
             * @returns array of notification entries {@link otris.notifications.NotificationEntry}
             */
            getNotificationEntries(user: string | SystemUser, status?: otris.notifications.NotificationStatus): any[];

        }

    }

    namespace scriptlist {
        interface ListAction {
            /**
             * Unique name of the action
             */
            name: string;
            /**
             * Label to display for this action
             */
            label: string;
            /**
             * Type of the action ("button" or "list") default: "button"
             */
            type: string;
            /**
             * Action to be executed, e.g., ("runScript:myScript&myParam=value")
             */
            action: string;
            /**
             * The action is displayed with the referenced icon (`entypo:` or `ionicons:` syntax is supported). **Only for type `button`**
             */
            imageFile?: string;
            /**
             * Optional tooltip
             */
            tooltip?: string;
            /**
             * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a client function that is called with an array of ids if showCheckboxes is enabled
             */
            clientAction?: string;
            /**
             * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a gadget action belonging to the same gadgetScript to be executed on click
             */
            gadgetAction?: string;
            /**
             * default false, if true a script parameter dialog will always be displayed if the script has defined parameter (*since Documents 5.0f*)
             */
            useScriptParameterDialog?: boolean;
            /**
             * the title of the script parameter dialog (*since Documents 5.0f*)
             */
            dialogTitle?: string;
            /**
             * Function to be exucuted in the client. (*since Documents 5.0f*)
```
// The parameters documentsContext and options will be passed.
function(documentsContext, options) {

    documentsContext: A newly created DocumentsContext

    options: {
        dobyGrid: doby-grid object for scriptlist
        listActionName: name of the action being executed
        selectedGroupsIds: list of the selected group ids
        selectedIds: list of selected ids
    }

}
```
             */
            clientScript?: Function;
        }

        /**
         * This class represents a generic List that can be displayed and used in
DOCUMENTS 5 and above. It can be used as the return value of a PortalScript and
will be usually displayed in the main ListView.

To implement the various list functions, the following **script parameters** are available.
Some of the parameters are not always set since they are only transferred when a value change occurs.

```
var scriptListParams = {
    start : (typeof start != "undefined") ? parseInt(start) : 0,
    limit: (typeof limit != "undefined") ? parseInt(limit) : 50,
    sort: (typeof sort != "undefined") ? sort : null,
    sortState: (typeof sortState != "undefined") ? sortState : null,
    searchExpression: (typeof searchExpression != "undefined") ? searchExpression : null,
    sortExpression: (typeof sortExpression != "undefined") ? sortExpression : null,
    sortOrder: (typeof sortOrder != "undefined") ? sortOrder : null,
    sortMode: (typeof sortMode != "undefined") ? sortMode : null
};
```

<img src="assets/myapilist.jpg"/>
         */
        class List {
            /**
             * 
             * @param title - The title of the list that will be displayed in the lists toolbar
             */
            constructor(title: string);

            /**
             * Adds a new action to the list.
             * @param action - List action to be addded to the list.
             * @param action.name Unique name of the action
             * @param action.label Label to display for this action
             * @param action.type Type of the action ("button" or "list") default: "button"
             * @param action.action Action to be executed, e.g., ("runScript:myScript&myParam=value")
             * @param action.imageFile The action is displayed with the referenced icon (`entypo:` or `ionicons:` syntax is supported). **Only for type `button`**
             * @param action.tooltip Optional tooltip
             * @param action.clientAction <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a client function that is called with an array of ids if showCheckboxes is enabled
             * @param action.gadgetAction <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a gadget action belonging to the same gadgetScript to be executed on click
             * @param action.useScriptParameterDialog default false, if true a script parameter dialog will always be displayed if the script has defined parameter (*since Documents 5.0f*)
             * @param action.dialogTitle the title of the script parameter dialog (*since Documents 5.0f*)
             * @param action.clientScript Function to be exucuted in the client. (*since Documents 5.0f*)
             *        ```
             *        // The parameters documentsContext and options will be passed.
             *        function(documentsContext, options) {
             *        
             *        documentsContext: A newly created DocumentsContext
             *        
             *        options: {
             *        dobyGrid: doby-grid object for scriptlist
             *        listActionName: name of the action being executed
             *        selectedGroupsIds: list of the selected group ids
             *        selectedIds: list of selected ids
             *        }
             *        
             *        }
             *        ```
             */
            addAction(action?: addAction_action): void;

            /**
             * Add a column to the list
             * @param key - the technical name of the column
             * @param label - the human readable label of the column
             * @param dataType - the type of the column (STRING, NUMBER, CUSTOM or CHECKBOX)
             * @returns Object of otris.scriptlist.Column
             */
            addColumn(key: string | Object, label: string, dataType: string): Object;

            /**
             * Adds a listener to the ScriptList. If a registered event occurs the ScriptList script is called.
             * With {@link otris.scriptlist.getScriptListEvent} you can check if the script was triggered by an event.
             * Currently the following **events** are supported:
             * 
             * * `reloadRow`
             * Listen to file updates. Example for the `scriptListEvent`: `{name: "reloadRow", ids: ["dopaag_fi110", "dopaag_fi111", "dopaag_fi112"], loadedIds: ["dopaag_fi110", .., "dopaag_fi122"]}`
             * In your script you have to check if the given ids are part of your list and/or if the referenced files matches your search criterias.
             * The `ids` array contains the updated files and the `loadedIds` array contains the ids of the currently loaded ScriptList rows.
             * For the **return value** you can use the helper class {@link otris.scriptlist.RowUpdate}.
             * * `moveRow` (*since Documents 5.0e*)
             * Listen to drop row event after one row or a selection of rows has been dropped at its new position. Example for the `scriptListEvent` : `{ name: "moveRow", ids: ["id_row_1", "id_row_2"], newIndex: 9 }`
             * In your script you can either return a new list for complete rerendering or the ScriptList or return the strings **MOVE_ROW_SUCCESS** and **MOVE_ROW_DENIED** to allow/reject dropping rows at the new position. If the user should get a message when dropping the row, an {@link otris.scriptlist.MoveRowResult} can be returned.
             * Example for `otris.scriptlist.MoveRowResult`: `{ success: false, message: "The row can't be moved to this position." }`
             * * `fileShown` (*since Documents 5.0f*)
             * @param eventName - event name (currently supported: `reloadRow`, `moveRow`, `fileShown`)
             */
            addListener(eventName: string): void;

            /**
             * Add a parameter that will be send to the script when the next page is beeing
             * retrieved (infinite scrolling)
             * @param key - Name of the parameter
             * @param value - Value of the parameter
             */
            addParameter(key: string, value: any): void;

            /**
             * Add a row to the list
             * @param key - The UNIQUE key of the row. (Can be a fileId or any other unique id)
             * @param values - An array containing the values of this row in the order of which the columns has been added to the list OR an object mapping the column keys to the columns values.
             * @returns
             */
            addRow(key: string, values: any[] | Object): otris.scriptlist.Row;

            /**
             * Adds a setting (an option that can be defined by the user) to the gadget.
             * @param option - Setting(s) to add to the gadget.
             */
            addSettings(option: GadgetSetting | GadgetSetting[]): void;

            /**
             * Mark this list object to contain the last entries of the total list. Using this function means
             * "the entries contained in this list are the last ones in the overall list"
             */
            endList(): void;

            /**
             * 
             * @see otris.scriptlist.getScriptListEvent
             */
            getScriptListEvent(): void;

            /**
             * Sets whether or not the columns should take up the entire available space of the table automatically
             * @param autoWidth - true for the columns to take up the full width of the table
             */
            setAutoColumnWidth(autoWidth: boolean): void;

            /**
             * Sets whether all rows should be displayed without scrollbar.
             * @param autoHeight - Enable auto height
             */
            setAutoHeight(autoHeight: any): void;

            /**
             * Set whether or not the details row of the entries should be expanded automatically
             * when an entry is clicked.
             * @param autoShow - Show detail rows automatically
             */
            setAutoShowDetails(autoShow: boolean): void;

            /**
             * Set the compact view setting for the list
             * @param compactView - true for default compact view or a String as a template for the compact view
             * @param lineHeight - line height of the compact view line
             */
            setCompactView(compactView: boolean | string, lineHeight: number): void;

            /**
             * Set the maximum with that the compact view will be used for (the point where the view is switched from full view to compact view)
             * @param width - the with where to switch at
             */
            setCompactViewWidth(width: number): void;

            /**
             * Set list to display groupings collapsed.
             * @param collapsed - true, if the list is collapsed
             */
            setCollapsed(collapsed: boolean): void;

            /**
             * Set the columns. Removes any columns that have been added before.
             * @param columnArray - Array of column configurations
             */
            setColumns(columnArray: any[]): void;

            /**
             * Set the parameters that should be send to the details script when expanding a details row
             * @param detailsParams - object of the parameters to pass to the script
             */
            setDetailsParams(detailsParams: Object): void;

            /**
             * Set the name of the script that will be called when a details row is expanded.
             * Allowed returnTypes for the script are: "HTML" and "ScriptList"
             * @param detailsScriptName - The scriptName
             */
            setDetailsScriptName(detailsScriptName: string): void;

            /**
             * This can be used to explicitly allow text selection if moveRows is also activated or
             * just to disable text selection if unwanted.
             * @param enableTextSelection - Enable the text selection
             */
            setEnableTextSelection(enableTextSelection: any): void;

            /**
             * Will set the grid height so all groups can be expanded. Can only be used with fitHeight = true.
             * @param fitGroups - Set grid height so all groups will fit expanded
             */
            setFitGroups(fitGroups: boolean): void;

            /**
             * Try to resize the grid until all rows fit (only applicable for subgrids)
             * @param fitHeight - Resize grid until content fits
             */
            setFitHeight(fitHeight: boolean): void;

            /**
             * Sets whether the height of the grid should be increased if expanding the group
             * would cause a scrollbar to be shown. Can only be used with fitHeight = true.
             * @param fitHeightOnGroupExpand - Fit height of grid so all rows of the expanded group will be visible
             */
            setFitHeightOnGroupExpand(fitHeightOnGroupExpand: boolean): void;

            /**
             * Sets whether the height of the grid should be increased if expanding the group
             * would cause a scrollbar to be shown. Can only be used with fitHeight = true.
             * @param fitHeightOnGroupCollapse - Fit height of grid so only the collapsed group will be visible
             */
            setFitHeightOnGroupCollapse(fitHeightOnGroupCollapse: boolean): void;

            /**
             * Sets whether or not the compactView should always be displayed, even is the table is wide enough to display the normal table view
             * @param forceCompactView - Always show list in compact view
             */
            setForceCompactView(forceCompactView: boolean): void;

            /**
             * Sets the index up to which column the columns should be frozen. This will cause the content of all columns on the right to have
             * it`s own horizontal scrollbar when scrolling.
             * @param index - index up to which the columns should stay still on scroll
             */
            setFrozenColumns(index: boolean): void;

            /**
             * Sets whether details rows should fill the available row space if the current grid is a subgrid of a folder.
             * @param fullDetailsWidth - Fill whole width
             */
            setFullDetailsWidth(fullDetailsWidth: boolean): void;

            /**
             * Set template for rendering group header HTML
             * @param groupHeaderTemplate - Template string to use (e.g. `<div style="padding-left:calc({{index}}*15px)"><span class="otrIcon"></span><b>{{value}}</b></div>`)
             */
            setGroupHeaderTemplate(groupHeaderTemplate: string): void;

            /**
             * Set the groupings for the list.
             * @param groupings - Array of names and/or objects of columns to group by. Object notation:  { column_id: string, collapsed: boolean }
             */
            setGrouping(groupings: (string | Object)[]): void;

            /**
             * Sets whether group rows can be focussed
             * @param groupsFocusable - Allow focusing of group rows
             */
            setGroupsFocusable(groupsFocusable: boolean): void;

            /**
             * Adds a html header to the table which is displayed above the table.
             * @param htmlheader - the html to display
             */
            setHTMLHeader(htmlheader: string): void;

            /**
             * Set the height for the current grid (only applicable for subgrids)
             * @param height - Height of the details row
             */
            setHeight(height: number): void;

            /**
             * Set the minimum height for the current grid (only applicable for subgrids)
             * @param minHeight - Minimum height of the detail rows content
             */
            setMinHeight(minHeight: number): void;

            /**
             * Set the maximum height for the current grid (only applicable for subgrids)
             * @param maxHeight - Maximum height of the detail rows content
             */
            setMaxHeight(maxHeight: number): void;

            /**
             * Sets whether rows can be moved to other positions by drag and drop. The row will be moved on client side only.
             * @param moveRows - allow moving rows to a new position
             */
            setMoveRows(moveRows: boolean): void;

            /**
             * Add a navibar entry. Define a script with parameters that reloads the scriptlist.
             * *Only works if scriptlist is displayed in main list view area.*
             * If scriptlist is used as gadget use the `setNavibarEntry()` from the gadget api.
             * @param options - navibar entry options or `true` for using default values
             * @param options.label - label for the navibar entry (defaults to the scriptlist title)
             * @param options.scriptName - label for the navibar entry (defaults to the value of `context.scriptName`)
             * @param options.scriptParams - key/value object for optional script parameter
             */
            setNavibarEntry(options?: setNavibarEntry_options): void;

            /**
             * Allows resizing of rows.
             * @param resizableRows Allow resizing rows.
             */
            setResizableRows(resizableRows: boolean): void;

            /**
             * Sets whether columns should be resized to its content.
             * Attention: This only work with showHeader = true !!!
             * @param resizeColumnsToContent - Resize columns so all content is visible
             */
            setResizeColumnsToContent(resizeColumnsToContent: boolean): void;

            /**
             * Sets whether subgrids of grids should scroll their content so they will always stay inside it's parent containers
             * viewport.
             * @param scrollWithParent - Scroll with parent container
             */
            setScrollWithParent(scrollWithParent: boolean): void;

            /**
             * Sets the name of the search context (displayed in the searchbar).
             * If no name was set for the searchContext, the list's name will be used.
             * @param searchContext - The search context name or a config object
             * @param searchContext.name - The search context name
             * @param searchContext.remoteSearch - Enable/disable remote search
             * @param searchContext.liveSearch - Automatic search after keyboard input (*since Documents 5.0e*)
             */
            setSearchContext(searchContext?: setSearchContext_searchContext): void;

            /**
             * Sets whether or not to display a checkboxes for each column for multi selection. The selected IDs will be available
             * in ScriptListActions as the JSON parameter "selectedIds" when executing a portal script.
             * 
             * Example:
             * ```
             * if(typeof selectedIds !== "undefined") {
             * 
             * // parse selected ids to array
             * var idsArr = JSON.parse(selectedIds);
             * 
             * for(var i=0,ii=idsArr.length; i<ii; i++) {
             * ...
             * }
             * }
             * ```
             * @param showCheckboxes - Show checkboxes
             */
            setShowCheckboxes(showCheckboxes: boolean): void;

            /**
             * Set whether or not to display a column containing a + sign for each entry that can be
             * used to expand the entry and show some details inside the table.
             * @param showDetailsColumn - Show the plus sign
             */
            setShowDetailsColumn(showDetailsColumn: boolean): void;

            /**
             * Enable a checkbox inside of group headers. The selected group IDs will be available in ScriptListActions as the JSON
             * parameter "selectedGroupIds" when executing a portal script.
             * 
             * Example:
             * ```
             * if(typeof selectedGroupIds !== "undefined") {
             * 
             * // parse selected group ids to array
             * var idsArrGroup = JSON.parse(selectedGroupIds);
             * 
             * for(var i=0,ii=idsArrGroup.length; i<ii; i++) {
             * ...
             * }
             * }
             * ```
             * @param showGroupCheckbox - Enables the group checkbox if true.
             */
            setShowGroupCheckbox(showGroupCheckbox: boolean): void;

            /**
             * Show or hide the list header (column labels)
             * @param showToolbar - show the list header (column labels)
             */
            setShowHeader(showToolbar: boolean): void;

            /**
             * Show or hide the index numbers for each row on the left side of the grid.
             * @param showIndexNumbers Show index numbers
             */
            setShowIndexNumbers(showIndexNumbers: boolean): void;

            /**
             * Set whether or not display an extra column for dragging rows if moveRows or moveRowsRemote is enabled.
             * @param showMoveColumn - Show the drag column
             */
            setShowMoveColumn(showMoveColumn: boolean): void;

            /**
             * Set whether or not to display a search box in the toolbar
             * @param showSearchBox - True for searchbox with default remote search. Object: { remoteSearch: boolean }
             */
            setShowSearchBox(showSearchBox: boolean | Object): void;

            /**
             * Displays a filter field above each column for filtering its content.
             * This can only be used if showHeader is true.
             * @param showQuickFilter Show filter
             */
            setShowQuickFilter(showQuickFilter: boolean): void;

            /**
             * Sets whether the title should be displayed. This can be used to for example only show the button or just a search box without the scriptlists title.
             * @param showTitle - show or hide title
             */
            setShowTitle(showTitle: boolean): void;

            /**
             * Show or hide the lists toolbar
             * @param showToolbar - show the toolbar
             */
            setShowToolbar(showToolbar: boolean): void;

            /**
             * Set sorting for the list
             * @param sort - True for sortable with default remote sort, Object: { sortable: boolean, remoteSort: boolean}
             */
            setSort(sort: boolean | Object): void;

            /**
             * Set the start index of the list. The index of the first entry in this list object
             * in relation to the total number of entries in the list.
             * @param startIndex - Index of the first entry
             */
            setStartIndex(startIndex: number): void;

            /**
             * Will stick group rows to the top of the grid while scrolling through the group.
             * @param stickyGroupRows Stick group rows to top
             */
            setStickyGroupRows(stickyGroupRows: boolean): void;

            /**
             * Shows the rows' sublists as a single row of blob thumbnails.
             * For this to work correctly, all information needed to render the thumbnail must be available on the subrow.
             * @param sublistBlobThumbnails - Shows the sublist as a row ob blob thumbnails.
             */
            setSublistBlobThumbnails(sublistBlobThumbnails: boolean): void;

            /**
             * Adjust the default styling of the list with a {@link otris.scriptlist.ScriptListStyle} configuration.
             * @param style - {@link otris.scriptlist.ScriptListStyle} instance or a style configuration (Used for the {@link otris.scriptlist.ScriptListStyle} constructor)
             * @returns The given or a new {@link otris.scriptlist.ScriptListStyle} instance
             * @see otris.scriptlist.ScriptListStyle
             */
            setListStyle(style: otris.scriptlist.ScriptListStyle): otris.scriptlist.ScriptListStyle;

            /**
             * Set the title of the list.
             * @param title - list title
             */
            setTitle(title: string): void;

            /**
             * Return a proper JSON representation of this list.
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(): string;

        }

        /**
         * Returns the ScriptList event. See [addListener]{@link otris.scriptlist.List#addListener} for details.
         * **Notice:** Returns `undefined` if the script was not triggered by an event.
         * @returns ScriptList event object
         */
        function getScriptListEvent(): Object | undefined;

        /**
         * This class represents a RowUpdate used for the `reloadRow` event.
         */
        class RowUpdate {
            /**
             * 
             * @param updateData - an array of row update objects
             * @param updateData.id - id of the row
             * @param updateData.data - updated row data (plain key/value object)
             */
            constructor(updateData: (undefined_updateData)[]);

            /**
             * Adds a new entry
             * @param rowId - row id
             * @param newData - updated row data (plain key/value object)
             */
            addEntry(rowId: string, newData: Object): void;

            /**
             * Return a proper JSON representation of this `rowUpdate`.
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(): string;

        }

        /**
         * This class represents a Row used in a {@link otris.scriptlist.List}.
You do not need to instantiate objects of this class directly. Instances of
this class are returned from the [addRow]{@link otris.scriptlist.List#addRow}
method of the List object.
         */
        class Row {
            constructor();

            /**
             * Add a subrow to display as a sublist after the last grid column.
             * This can also be used to add documents that will be opened on click on a certain file.
             * @param config `String` if only value should be displayed or `Object` for further configuration.
             * @param config.icons Array of icons to be used for the subrow. Currently only the first icon is displayed.
             * @param config.documentName full document name to be displayed if referenced subrow is a file document. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.extension Extension of the document to be used as automatically generate file type icon. This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.size Size to be displayed on hover thumbnail icon, with unit (e.g. byte). This is only needed if thumbnails are created automatically based on these paremeters.
             * @param config.onclick Javascript Code to be executed if the subrow was clicked.
             * @param config.values 0 :name to be displayed
             *        1 :size filesize to be displayed if list is displayed as blobthumbnails
             * @returns
             */
            addSubrow(config: addSubrow_config): otris.scriptlist.Subrow;

            /**
             * Tag the row with a predefined grey marker or insert custom html
             * @param tag - True for a standard grey marker, String for HTML
             */
            setTag(tag: boolean | string): void;

            /**
             * Mark the row as emphasized. Shown with bold text in the list.
             * @param emphasized - emphasized flag
             */
            setEmphasized(emphasized: boolean): void;

            /**
             * Set the tag color
             * @param tagColor - Html color for the row's tag
             */
            setTagColor(tagColor: string): void;

            /**
             * Set the row specific name of the script that is called when the rows details row will be expanded.
             * (Overwrites the scriptName set in the list).
             * @param detailsScriptName - the scriptname to use for displaying the details row
             */
            setDetailsScriptName(detailsScriptName: string): void;

            /**
             * Set the row specific parameters that should be send to the details script when expanding
             * the details row. Overwrites the parameters set in the list.
             * @param detailsParams - key/value object of parameters to pass to the details script
             */
            setDetailsParams(detailsParams: Object): void;

            /**
             * Action which will be fired when the row is clicked.
             * Available actions: showFile, showFolder, runScript
             * @param newAction - function to be executed on mouse click
             */
            setAction(newAction: string): void;

            /**
             * Set handler for click event.
             * @param newOnclick - function as string to be executed on mouse click
             */
            setOnClick(newOnclick: string): void;

            /**
             * Checks the row on display
             * @param selected - True if row should be selected in view
             */
            setSelected(selected: boolean): void;

            /**
             * Set handler for double click event.
             * @param newOnDoubleclick - function as string to be executed on mouse double click
             */
            setOnDoubleClick(newOnDoubleclick: string): void;

            /**
             * Transfer function returning the data of the Row for a gadget.
             * @returns Data of the row
             */
            transfer(): Object;

        }

        /**
         * This class represents a Subrow used in a {@link otris.scriptlist.Row}.
You do not need to instantiate objects of this class directly. Instances of
this class are returned from the [addSubrow]{@link otris.scriptlist.Row#addSubrow}
method of the List object.
         */
        class Subrow {
            constructor();

            /**
             * Javascript Code to be executed if the subrow was clicked.
             * @param newOnclick Javascript Code to be executed if the subrow was clicked.
             */
            setOnClick(newOnclick: string): void;

            /**
             * Sets an array of icons to be used for the subrow. Currently only the first icon is displayed.
             * @param icons array of icons to be used for the subrow
             */
            setIcons(icons: string[]): void;

            /**
             * Sets the document id if the parent row is referencing a file.
             * This is only needed if thumbnails are created automatically based on these paremeters.
             * @param documentId document id if the parent row is referencing a file
             */
            setDocumentId(documentId: string): void;

            /**
             * Sets the full document name to be displayed if referenced subrow is a file document.
             * This is only needed if thumbnails are created automatically based on these paremeters.
             * @param documentName full document name to be displayed if referenced subrow is a file document
             */
            setDocumentName(documentName: string): void;

            /**
             * Sets the extension of the document to be used as automatically generate file type icon.
             * This is only needed if thumbnails are created automatically based on these paremeters.
             * @param extension extension of the document
             */
            setExtension(extension: string): void;

            /**
             * Sets the size to be displayed on hover thumbnail icon, with unit (e.g. byte).
             * This is only needed if thumbnails are created automatically based on these paremeters.
             * @param size Size to be displayed on hover thumbnail icon, with unit (e.g. byte).
             */
            setSize(size: string): void;

            /**
             * Sets the values to be displayed in the sublist. Normally only array[0] is needed,
             * array[1] is reserved for special display of blob thumbnails.
             * values: 0 :name to be displayed
             * 1 :size filesize to be displayed if list is displayed as blobthumbnails
             * @param values Values to be displayed in the sublist.
             */
            setValues(values: string[]): void;

        }

        /**
         * This class represents a Column used in a {@link otris.scriptlist.List}.
You do not need to instatiate objects of this class directly. Instances of this
class are returned from the [addColumn]{@link otris.scriptlist.List#addColumn}
method of the List object.
         */
        class Column {
            /**
             * 
             * @param key - Id for the column
             * @param label - Header label of the column
             * @param dataType - Data type of the data in this column
             */
            constructor(key: Object, label: string, dataType: Object);

            /**
             * Flag, if column is visible
             */
            visible: any;

            /**
             * Set the key (the technical name) of this column
             * @param key - the new key
             */
            setKey(key: string): void;

            /**
             * Set the width(in pixels) of this column
             * @param width - width of the column
             */
            setWidth(width: Number): void;

            /**
             * Set the label of the column
             * @param label - the new label
             */
            setLabel(label: string): void;

            /**
             * Set the data type of the column.
             * @param dataType - the new data type (STRING, NUMBER, CUSTOM or CHECKBOX)
             */
            setDataType(dataType: DataType): void;

            /**
             * Sets the sort order.
             * @param sortOrder - Possible values: 0, 1 (ascending), -1 (descending) (Use: 2,-2 / 3,-3 / ... for multi column sort). This method is only
             *        to be used with remote sort.
             */
            setSortOrder(sortOrder: string): void;

            /**
             * Sets wether or not the column should be visible.
             * Useful when you need columns to group by or columns containing a unique id that
             * should not be displayed in the grid.
             * @param visible - true, if the column should be visible
             */
            setVisible(visible: boolean): void;

            /**
             * Transfer function returning the data of the Column for a gadget.
             * @returns Data of the column
             */
            transfer(): Object;

        }

        /**
         * Result to be returned after move row with moveRowsRemote enabled. This will cause the scriptlist to approve/deny rendering the row at the new position without rerendering the whole scriplist.
If no message will be displayed the script may also just return "MOVE_ROW_SUCCESS" or "MOVE_ROW_DENIED".
         */
        class MoveRowResult {
            /**
             * 
             * @param result Move row result options
             * @param result.success Move row was successfull.
             * @param result.message Detailed message why moving the row failed/succeded.
             */
            constructor(result?: undefined_result);

        }

        class ScriptListStyle {
            /**
             * 
             * @param configuration style configuration
             * @see otris.scriptlist.List#setListStyle
             */
            constructor(configuration: Object);

        }

    }

    namespace tools {
        class ClientHeaderCode {
            /**
             * A class to generate client header code. Useful for the script defined as `clientHeaderCode` script in the global properties.
             */
            constructor();

            /**
             * Add javascript code from portal scripts.
             * The scripts are not executed. Only the contents of the scripts were added as script code to the header.
             * > **Note:** Each script code is embedded in an IIFE (Immediately-invoked Function Expression) to prevent the pollution of the global scope.
             * @param names - script names
             */
            addScriptCodeByScriptName(names: string[]): void;

            /**
             * Add the code of a given function. The native *toString()* method is used to serialize the function code.
             * On the client side the function is executed with an IIFE (Immediately-invoked Function Expression).
             * Optionally, you can pass a data object (The data object is serialized with `JSON.stringify`).
             * If a data object `dataObject` is defined. The function is called *(in the browser)* with this object as parameter.
             * @param codeFunction function
             * @param dataObject data object
             */
            addScriptCodeWithFunction(codeFunction: Function, dataObject?: Object): void;

            /**
             * Add javascript code as string.
             * @param code javascript code
             */
            addCode(code: string): void;

            /**
             * Add the given CSS code inside a `<style>` tag.
             * @param cssCode CSS code
             */
            addStyle(cssCode: string): void;

            /**
             * Add the given string inside the `<head>` tag.
             * @param headString string to embed in `<head>` tag
             */
            addHeadString(headString: string): void;

            /**
             * Generates the client header code string.
             */
            transfer(): void;

        }

    }

    namespace tour {
        /**
         * This class is used to create a guided tour for the documents system
         */
        class Tour {
            constructor();

            /**
             * Sets the tour configuration.
             * This overrides all previously made settings like language, etc.
             * @param tourConfiguration - complete tour configuration
             */
            setTourConfiguration(tourConfiguration: Object): void;

            /**
             * Gets the tour configuration
             * @returns tourConfiguration - complete tour configuration
             */
            getTourConfiguration(): Object;

            /**
             * Sets the language of the tour (Is used for button labels and loading text).
             * The default value is the language of the current system user.
             * @param lang a language string like "en" or "de"
             */
            setTourLanguage(lang: string): void;

            /**
             * Gets the language of the tour (Is used for button labels and loading text).
             * The default value is the language of the current system user.
             */
            getTourLanguage(): void;

            /**
             * Return the JSON representation of the tour
             * @returns JSON representation that can be used as a return value of a PortalScript
             */
            transfer(): string;

        }

    }

    namespace tree {
        interface ScriptTreeEvent {
            /**
             * event name
             */
            name: string;
            /**
             * node id
             */
            nodeId?: string;
        }

        /**
         * Returns the ScriptTree event.
         * Currently the event `subtree` is supported. See [lazyLoad]{@link otris.TreeItem#lazyLoad} for details.
         * **Notice:** Returns `undefined` if the script was not triggered by an event.
         * @returns ScriptTree event object
         */
        function getScriptTreeEvent(): ScriptTreeEvent | undefined;

    }

    /**
     * Creates a ScriptReturn. Used in {@link otris.notifications.Notification} to define actions
     */
    class ScriptReturn {
        /**
         * 
         * @param returnType returnType of the ScriptReturn
         * @param returnValue returnValue of the ScriptReturn
         */
        constructor(returnType: string, returnValue: string);

        /**
         * Set the returnType
         * @param returnType - returnType of the ScriptReturn
         */
        setReturnType(returnType: string): void;

        /**
         * Set the returnValue
         * @param returnValue - returnValue of the ScriptReturn
         */
        setReturnValue(returnValue: string): void;

    }

    /**
     * PortalScript to create the data for the ScriptTree. This script needs to be
included in any other PortalScript which builds a ScriptTree. The returnType of the
script where this API is used must be `context.returnType = "scriptTree";`
     */
    class TreeItem {
        /**
         * 
         * @param id - Unique id of the item in the tree
         * @param name - Name of this node
         */
        constructor(id: string, name: string);

        /**
         * Unique id of the node in the tree
         */
        id: any;

        /**
         * Name of the tree node
         */
        name: any;

        /**
         * Tooltip for the tree node
         */
        tooltip: any;

        /**
         * Parent of this child, or null if it is the root node
         */
        parent: any;

        /**
         * Selection of this node true or false
         */
        isActive: any;

        /**
         * URL which will be opend if the node is clicked
         */
        url: any;

        /**
         * <strong>DEPRECATED!</strong> Do not use this attribute!
         */
        bullet: any;

        /**
         * Sets the opened tree level.
         */
        openTreeLevel: any;

        /**
         * Adds an icon to the tree item. Possible values: **image path**, **entypo icon** or **ionicons icon**
         */
        activebullet: any;

        /**
         * If set to true the outbar label is updated with the defined tree title (Only relevant for the root node)
         */
        updateOutbarLabel: any;

        /**
         * If set to `true` the children of the nodes are lazy loaded (Only relevant for the root node, defaults to `false`)
         * **Note:** Lazy loading is only used if the node data does not contain `children` (added with [addItem]{@link otris.TreeItem#addItem}) and the [hasChilds]{@link otris.TreeItem#} flag is set to `true`.
         * In the example below you can see how to return a subtree using [otris.tree.getScriptTreeEvent()]{@link otris.tree#getScriptTreeEvent}.
         */
        lazyLoad: any;

        /**
         * Specifies if the tree item is draggable (defaults to `true`)
         */
        draggable: any;

        /**
         * Specifies if the tree item has childs (relevant for lazy loading, defaults to `false`)
         */
        hasChilds: any;

        /**
         * List of nodes
         */
        items: any;

        /**
         * Action which will be fired when the node is clicked.
         * Possible actions `showFile:[FILE_ID]`, `showFolder:[FOLDER_ID]` and `executeScript:[SCRIPTNAME]`
         */
        action: any;

        /**
         * Drop action which will be fired when something will be dropped to this node.
         * The defined script is executed before a file is uploaded. The script should return
         * a fileId of a document. script returnType = (showFile|showNewFile)
         */
        dropaction: any;

        /**
         * Drop action which will be fired when something will be dropped to this node.
         * The script is only executed if items from within documents are dropped on the node
         * The script is called with the following json encoded parameter object (parameter name: `dndActionJSON`):
         * <pre>dndAction = {
         * treeType  string  "scriptTree"
         * nodeId    string  id of the drop target
         * action    string  "copy"/"move"
         * itemIds   array   ids of the dropped items
         * itemType  string  type of the items
         * }</pre>
         * Decode the parameter object in the script: <pre>var dndAction = JSON.parse(dndActionJSON);</pre>
         */
        docItemsDropAction: any;

        /**
         * The tree item drop action will be fired when one or more tree items are dropped on a tree node.
         * The script is called with the following json encoded parameter object (parameter name: `dndActionJSON`):
         * **This property is only relevant for the root node**
         * <pre>dndAction = {
         * nodeId    string  id of the drop target
         * itemIds   array   ids of the dropped nodes
         * action    string  "copy"/"move"
         * }</pre>
         * Decode the parameter object in the script: <pre>var dndAction = JSON.parse(dndActionJSON);</pre>
         */
        treeItemsDropAction: any;

        /**
         * Sets the type for this tree item (defaults to: `node`)
         * Only accepts the following characters for the given string: `a-z`,`0-9`,`-` and `_`
         * Non valid strings are automatically transformed (characters are transformed to lower case or replaced with `_`)
         * @param type - The type for this tree item
         */
        setType(type: string): void;

        /**
         * Sets the accepted types (e.g. for drag and drop) for this tree item (defaults to: `["node"]`)
         * See [setType]{@link otris.TreeItem#setType} for valid type strings
         * @param types - An array of accepted types
         */
        setAcceptedTypes(types: string[]): void;

        /**
         * Add a new node as a childnode to this node.
         * This node will be the parent of the added node.
         */
        addItem(): void;

        /**
         * Set the level up to which the tree will be opened.
         * @param level Level up wich the tree will be opened
         */
        setOpenTreeLevel(level: Number): void;

        /**
         * Make this object ready for being transferred to the client.
         */
        transfer(): void;

        /**
         * Internal function for building the ScriptTree XML.
         * @param myLevel - Current level in the tree
         * @returns XML document representing the tree
         */
        getAll(myLevel: number): string;

        /**
         * Internal function returning the attributes of this class as ScriptTree XML.
         * @returns XML fragment with the attributes of this class
         */
        getAsXML(): string;

        /**
         * Converts the string to a valid XML string. For internal purposes only.
         * @param value - value to convert
         * @returns the converted string
         */
        convertToXMLString(value: string): string;

    }

    namespace treechart {
        /**
         * Style definition for a {@link otris.treechart.TreeNode}.
         */
        interface Skin {
            /**
             * code for node color
             */
            Color: string;
            /**
             * Color code for the border of a node
             */
            borderColor: string;
            /**
             * Name of the font for the node's label
             */
            font: string;
            /**
             * Color code for the node's label
             */
            fontColor: string;
            /**
             * Font size for the node's label
             */
            fontSize: number;
            /**
             * Radius if the corner should be rounded
             */
            borderRoundness: number;
            /**
             * Vertical margin of the label to the node's border
             */
            vMargin: number;
            /**
             * Horizontal margin of the label to the node's border
             */
            hMargin: number;
            /**
             * Code how leafs should be rendered
             */
            leafRendering: string;
            /**
             * Color code for highlighted node
             */
            highlightColorIn: string;
            /**
             * Color code for de-highlighting a node
             */
            highlightColorOut: string;
        }

        /**
         * Script command for executing an action. The following commands are available:
         * * `showFile:fileId`
         * * `runScript:scriptName (return needs to be a TreeChart)`
         * * `showFolder:folderId`
         * * `clientFunction:functionName` **Only available if TreeChart is used as a gadget (`otris.gadget.gui.TreeChart`)**
         * The client function is called with the following object as parameter
         * `{nodeId: "[nodeId]", nodeLabel: "[nodeLabel]", eventName: "[click|dblClick|rightClick]"}`
         */
        interface ActionScript {
        }

        /**
         * Event handlers on a {@link otris.treechart.TreeNode}.
         */
        interface EventHandlers {
            /**
             * Action for handling the click event
             */
            click: otris.treechart.ActionScript;
            /**
             * Action for handling the double click event
             */
            dblClick: otris.treechart.ActionScript;
            /**
             * Action for handling the right click event
             */
            rightClick: otris.treechart.ActionScript;
        }

        /**
         * Label of an edge between two {@link otris.treechart.TreeNode}.
         */
        interface EdgeLabel {
            /**
             * Labe of the edge
             */
            label: string;
        }

        /**
         * Specifies the edge between two {@link otris.treechart.TreeNode}. nodeId is the id
         * of the child {@link otris.treechart.TreeNode}. For every child there has to be
         * a corresponding property having the same name as the id of the child node.
         */
        interface Edge {
            /**
             * Label of the edge
             */
            nodeId: otris.treechart.EdgeLabel;
        }

        /**
         * Code for the orientation of the tree. Allowed values are `LR` (left to right) and `TB` (top to bottom)
         */
        interface Orientation {
        }

        /**
         * Class for gathering the data needed for the Dynamic Tree Chart.
         */
        class TreeChart {
            constructor();

            /**
             * Transfer function generating the data for the Dynamic Tree Chart.
             * @returns JSON representation of the gathered data
             */
            transfer(): string;

            /**
             * Creates a tree node. This method is provided for convenience.
             * Tree nodes can be also created via the constructor of {@link otris.treechart.TreeNode}.
             * @param id - Id of the new node
             * @param label - Label of the node
             * @returns Created tree node
             */
            createNode(id: string, label: string): otris.treechart.TreeNode;

            /**
             * Creates a tree node and initialize it as a leaf. This method is provided for convenience.
             * Tree nodes can be also created via the constructor of {@link otris.treechart.TreeNode}.
             * @param id - Id of the new node
             * @param label - Label of the node
             * @returns Created tree node as leaf
             */
            createLeaf(id: string, label: string): otris.treechart.TreeNode;

            /**
             * Sets the root node of the tree.
             * @param node - Root node of the tree
             */
            setRoot(node: otris.treechart.TreeNode): void;

        }

        /**
         * Represents a node for the {@link TreeChart}
         */
        class TreeNode {
            /**
             * 
             * @param id - Id of the node
             */
            constructor(id: string);

            /**
             * Adds another node as child to the node.
             * @param child - Node to add as a child
             */
            addChild(child: otris.treechart.TreeNode): void;

            /**
             * Convenience method to retrieve the event handlers of the node.
             * 
             * Possible actions:
             * 
             * &emsp;&emsp;showFile:fileId[?dlcRegisterId=registerId&dlcDocumentId=documentId]
             * &emsp;&emsp;showFolder:folderId
             * &emsp;&emsp;runScript:scriptName
             * @returns Object with the node's event handlers
             */
            getActionEvents(): otris.treechart.EventHandlers;

            /**
             * Checks, if a node is a child of this node.
             * @param node - Node to be checked
             * @returns true, if the node is a child of this node
             */
            isChild(node: otris.treechart.TreeNode): boolean;

            /**
             * Convenience method for setting the label of an edge to a child node.
             * @param child - Child node which edge should be labeled. If the node is not a child, it becomes a child
             * @param label - Label of the edge to the child node
             */
            setEdgeLabel(child: otris.treechart.TreeNode, label: string): void;

            /**
             * Method to set a tree node to be groupable. This will collapse all grouped nodes to one node.
             * Attention: Only nodes that are leafs can be grouped together, otherwise the design will break!
             * @param groupable - Value of groupable
             */
            setGroupable(groupable: boolean): void;

        }

        /**
         * Style specification for a {@link TreeNode}. This class can be used
like a style template. By applying the same NodeStyle on various nodes makes
the nodes look the same.
         */
        class NodeStyle {
            /**
             * 
             * @param fillColor - Color code for the fill color of the node
             * @param borderColor -Color code for the border of the node
             * @param font - Name of the font
             * @param fontColor - Color code for the
             * @param fontSize - Font size of the node text
             * @param borderRoundness - Sharpness of the node corner
             * @param vMargin - Vertical margin of the node
             * @param hMargin - Horizontal margin of the node
             */
            constructor(fillColor: string, borderColor: string, font: string, fontColor: string, fontSize: string, borderRoundness: number, vMargin: number, hMargin: number);

            /**
             * Set a NodeStyle property.
             * * **fillColor** (string) Color code for the fill color of the node
             * * **borderColor** (string) Color code for the border of the node
             * * **font** (string) Name of the font
             * * **fontColor** (string) Color code for the
             * * **fontSize** (string) Font size of the node text
             * * **fontStyle** (string) Specifies the font style for the node text. Possible values: normal, italic, oblique, initial, inherit
             * * **borderRoundness** (number) Sharpness of the node corner
             * * **vMargin** (number) Vertical margin of the node
             * * **hMargin** (number) Horizontal margin of the node
             * @param propertyName - property name
             * @param propertyValue - property value
             */
            setProperty(propertyName: string, propertyValue: string | number): void;

            /**
             * Applies the style specification on a node.
             * @param node - The node the style should applied on
             * @returns The node with the applied style
             */
            applyOn(node: otris.treechart.TreeNode): otris.treechart.TreeNode;

        }

    }

}

/**
 * The Portalscript SystemUser
 */
declare interface SystemUser {
}

declare interface GadgetSetting {
    /**
     * The techincal name of the setting
     */
    name: string;
    /**
     * The default value to be used if no value is specified. If a number is specified the default value will be the value from the enum array with the given index.
     */
    def: string | number;
    /**
     * The type of the setting. (`string` | `boolean` | `number`)
     */
    type: string;
    /**
     * An Array of values i.e. ["A", "B"] that the user can choose from. Or an Array of key value pairs i.e. [[0, "A"], [1, "B"]]. The values must be of the type defined in <i>type</i>.
     */
    enum: string[] | (string[])[];
    /**
     * The description of this setting
     */
    desc?: string;
}

/**
 * Enum string values.
 */
declare enum DataType {
    STRING = "STRING",
    NUMBER = "NUMBER",
    CUSTOM = "CUSTOM",
    CHECKBOX = "CHECKBOX",
}

declare interface addAction_action {
    /**
     * Unique name of the action
     */
    name: string;
    /**
     * Label to display for this action
     */
    label: string;
    /**
     * Type of the action ("button" or "list") default: "button"
     */
    type: string;
    /**
     * Action to be executed, e.g., ("runScript:myScript&myParam=value")
     */
    action: string;
    /**
     * The action is displayed with the referenced icon (`entypo:` or `ionicons:` syntax is supported). **Only for type `button`**
     */
    imageFile: string;
    /**
     * Optional tooltip
     */
    tooltip: string;
    /**
     * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a client function that is called with an array of ids if showCheckboxes is enabled
     */
    clientAction: string;
    /**
     * <strong>[ONLY USEABLE IN GADGET CONTEXT]</strong> Register a gadget action belonging to the same gadgetScript to be executed on click
     */
    gadgetAction: string;
    /**
     * default false, if true a script parameter dialog will always be displayed if the script has defined parameter (*since Documents 5.0f*)
     */
    useScriptParameterDialog: boolean;
    /**
     * the title of the script parameter dialog (*since Documents 5.0f*)
     */
    dialogTitle: string;
    /**
     * Function to be exucuted in the client. (*since Documents 5.0f*)
```
// The parameters documentsContext and options will be passed.
function(documentsContext, options) {

    documentsContext: A newly created DocumentsContext

    options: {
        dobyGrid: doby-grid object for scriptlist
        listActionName: name of the action being executed
        selectedGroupsIds: list of the selected group ids
        selectedIds: list of selected ids
    }

}
```
     */
    clientScript: Function;
}

declare interface setNavibarEntry_options {
    /**
     * label for the navibar entry (defaults to the scriptlist title)
     */
    label: string;
    /**
     * label for the navibar entry (defaults to the value of `context.scriptName`)
     */
    scriptName: string;
    /**
     * key/value object for optional script parameter
     */
    scriptParams: object;
}

declare interface setSearchContext_searchContext {
    /**
     * The search context name
     */
    name: string;
    /**
     * Enable/disable remote search
     */
    remoteSearch: boolean;
    /**
     * Automatic search after keyboard input (*since Documents 5.0e*)
     */
    liveSearch: boolean;
}

declare interface undefined_updateData {
    /**
     * id of the row
     */
    id: string;
    /**
     * updated row data (plain key/value object)
     */
    data: Object;
}

declare interface addSubrow_config {
    /**
     * Array of icons to be used for the subrow. Currently only the first icon is displayed.
     */
    icons: string[];
    /**
     * full document name to be displayed if referenced subrow is a file document. This is only needed if thumbnails are created automatically based on these paremeters.
     */
    documentName: string;
    /**
     * Extension of the document to be used as automatically generate file type icon. This is only needed if thumbnails are created automatically based on these paremeters.
     */
    extension: string;
    /**
     * Size to be displayed on hover thumbnail icon, with unit (e.g. byte). This is only needed if thumbnails are created automatically based on these paremeters.
     */
    size: string;
    /**
     * Javascript Code to be executed if the subrow was clicked.
     */
    onclick: string;
    /**
     * 0 :name to be displayed
								   1 :size filesize to be displayed if list is displayed as blobthumbnails
     */
    values: string[];
}

declare interface undefined_result {
    /**
     * Move row was successfull.
     */
    success: boolean;
    /**
     * Detailed message why moving the row failed/succeded.
     */
    message: string;
}

