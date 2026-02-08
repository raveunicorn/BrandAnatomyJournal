// ==UserScript==
// @name         BrandAnatomy Keystatic Toolbar
// @namespace    http://brandanatomy.journal/
// @version      1.0
// @description  Adds custom tag insertion buttons to Keystatic editor
// @match        http://127.0.0.1:*/keystatic/*
// @match        http://localhost:*/keystatic/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Wait for the editor to load
    function waitForEditor() {
        const checkInterval = setInterval(() => {
            const editor = document.querySelector('[contenteditable="true"]');
            if (editor && !document.getElementById('baj-toolbar')) {
                createToolbar();
                clearInterval(checkInterval);
            }
        }, 1000);
    }

    function createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'baj-toolbar';
        toolbar.innerHTML = `
            <style>
                #baj-toolbar {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #1a1a1a;
                    border-radius: 12px;
                    padding: 8px;
                    display: flex;
                    gap: 6px;
                    z-index: 99999;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    font-family: system-ui, sans-serif;
                }
                .baj-btn {
                    background: #0067DE;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .baj-btn:hover {
                    background: #0055b8;
                    transform: translateY(-1px);
                }
                .baj-btn:active {
                    transform: translateY(0);
                }
                .baj-btn-circle { background: #0067DE; }
                .baj-btn-underline { background: #0067DE; }
                .baj-btn-note { background: #e67e22; }
            </style>
            <button class="baj-btn baj-btn-circle" data-tag="circle" title="Hand Circle">⭕ Circle</button>
            <button class="baj-btn baj-btn-underline" data-tag="underline" title="Hand Underline">〰️ Underline</button>
            <button class="baj-btn baj-btn-note" data-tag="note" title="Margin Note">📝 Note</button>
        `;

        document.body.appendChild(toolbar);

        // Add click handlers
        toolbar.querySelectorAll('.baj-btn').forEach(btn => {
            btn.addEventListener('click', () => insertTag(btn.dataset.tag));
        });
    }

    function insertTag(type) {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        let tagText = '';

        switch (type) {
            case 'circle':
                tagText = selectedText
                    ? `{% HandCircle content="${selectedText}" /%}`
                    : `{% HandCircle content="ТЕКСТ" /%}`;
                break;
            case 'underline':
                tagText = selectedText
                    ? `{% HandUnderline content="${selectedText}" /%}`
                    : `{% HandUnderline content="ТЕКСТ" /%}`;
                break;
            case 'note':
                tagText = `{% MarginNote note="${selectedText || 'Заметка на полях'}" /%}`;
                break;
        }

        // Try to insert at cursor position
        const editor = document.querySelector('[contenteditable="true"]');
        if (editor) {
            // If text was selected, replace it
            if (selectedText && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(tagText));
            } else {
                // Otherwise copy to clipboard with notification
                navigator.clipboard.writeText(tagText).then(() => {
                    showNotification(`Скопировано: ${type}`);
                });
            }
        } else {
            navigator.clipboard.writeText(tagText).then(() => {
                showNotification(`Скопировано: ${type}`);
            });
        }
    }

    function showNotification(message) {
        const notif = document.createElement('div');
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #333;
            color: white;
            padding: 10px 16px;
            border-radius: 8px;
            font-size: 13px;
            z-index: 999999;
            animation: fadeInOut 2s ease-in-out;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(10px); }
                15% { opacity: 1; transform: translateY(0); }
                85% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(notif);

        setTimeout(() => notif.remove(), 2000);
    }

    // Start watching
    waitForEditor();
})();
