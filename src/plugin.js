(function () {
    'use strict';

    tinymce.PluginManager.add('ace', function (editor, url) {
        var dialog;
        var pluginDir = url;

        editor.contentCSS.push(pluginDir + '/' + "style.css");

        var escapePreHtml = function (content) {
            return content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        };
        var checkElementIsAcePreTag = function (element) {
            if (!element) {
                return false;
            }
            if (element.nodeName.toLowerCase() == "pre" && element.className.indexOf('ace-editor') != -1) {
                return true;
            }
            return false;
        };

        var openDialog = function () {
            var selectedNode = null;
            var modalTitle;
            var mode = "html";
            var width = "100%";
            var height = "200px";
            var code = "";
            if (checkElementIsAcePreTag(editor.selection.getNode())) {
                modalTitle = "Edit Code";
                selectedNode = editor.selection.getNode();
                if (selectedNode.getAttribute("data-ace-mode")) {
                    mode = selectedNode.getAttribute("data-ace-mode");
                }
                if (selectedNode.getAttribute("data-ace-width")) {
                    width = selectedNode.getAttribute("data-ace-width");
                }
                if (selectedNode.getAttribute("data-ace-height")) {
                    height = selectedNode.getAttribute("data-ace-height");
                }
                code = editor.selection.getNode().innerHTML;
            } else {
                selectedNode = null;
                modalTitle = "Insert Code";
            }

            dialog = editor.windowManager.openUrl({
                title: modalTitle,
                url: pluginDir + '/' + 'dialog.html',
                buttons: [{
                        type: 'custom',
                        name: 'save',
                        text: 'Save',
                        primary: true,
                        align: 'end'
                    },
                    {
                        type: 'cancel',
                        name: 'cancel',
                        text: 'Close',
                        primary: false,
                        align: 'end'
                    }
                ],
                onAction: function (dialogApi, trigger) {
                    switch (trigger.name) {
                        case 'save':
                            dialogApi.sendMessage({
                                mceAction: "save",
                            });
                            break;
                    }
                },
                onMessage: function (dialogApi, data) {
                    switch (data.mceAction) {
                        case 'init':
                            dialogApi.sendMessage({
                                mceAction: "init",
                                mode: mode,
                                code: code,
                                width: width,
                                height: height,
                            });
                            break;
                        case 'save':
                            code = data.code;
                            mode = data.mode;
                            width = data.width;
                            height = data.height;
                            if (code && code != "") {
                                var preTag = "<pre class=\"ace-editor\" data-ace-mode=\"" + mode + "\" data-ace-width=\"" + width + "\" data-ace-height=\"" + height + "\" contenteditable=\"false\" style=\"width: " + width + "; height: " + height + ";\">" + escapePreHtml(code) + "</pre><p></p>";
                                if (selectedNode !== null) {
                                    selectedNode.outerHTML = preTag;
                                } else {
                                    editor.insertContent(preTag);
                                }
                            }
                            dialog.close();
                            break;
                    }
                }
            });

        };


        editor.on('dblclick', function (e) {
            if (checkElementIsAcePreTag(e.target)) {
                openDialog();
            }
        });

        editor.ui.registry.addIcon('ace', '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 10l-2 2 2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 10l2 2-2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 15l2-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>');

        editor.ui.registry.addButton('ace', {
            icon: 'ace',
            tooltip: 'ACE Editor',
            onAction: function () {
                openDialog();
            }
        });
        // Adds a menu item to the tools menu
        editor.ui.registry.addMenuItem('ace', {
            icon: 'ace',
            text: 'ACE Editor',
            context: 'insert',
            onAction: function () {
                // Open window with a specific url
                openDialog();
            }
        });
    });
}());