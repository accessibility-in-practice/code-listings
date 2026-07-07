# Firefox Developer Tools accessibility checks

Use this guide to inspect the rendered HTML and accessibility information in Firefox Developer Tools.

Firefox includes an **Accessibility** panel, often referred to as the Accessibility Inspector. It lets you inspect accessibility information exposed for the current page.

Official reference: <https://firefox-source-docs.mozilla.org/devtools-user/accessibility_inspector/>

## Open Developer Tools

Use one of these methods:

- Right-click the page and select **Inspect**.
- Press `F12`.
- Press `Ctrl` + `Shift` + `I` on Windows or Linux.
- Press `Command` + `Option` + `I` on macOS.

## Open the Accessibility panel

1. Open Firefox Developer Tools.
2. Select the **Accessibility** tab in the toolbox.
3. If the panel is not visible, check the DevTools settings or overflow menu and enable the Accessibility panel.

Firefox may need to activate its accessibility engine when this panel is opened.

## Inspect an element from the page

You can usually start from the rendered page:

1. Right-click an element on the page.
2. Choose **Inspect Accessibility Properties**, if available.
3. Review the accessibility information shown for that element.

You can also start from the HTML inspector:

1. Inspect an element in the page inspector.
2. Right-click the element in the HTML pane.
3. Choose the option to show accessibility properties, if available.

## What to check

For the selected element, look for:

- role;
- name;
- description;
- states;
- properties;
- relations;
- keyboard focusability;
- whether the element appears in the accessibility tree.

## Example: checking a link

Given this HTML:

```html
<a href="/settings">Account settings</a>
```

Check that Firefox exposes:

- role: link;
- name: Account settings;
- focusable: yes;
- action: activatable or equivalent;
- a useful destination through the `href`.

## Example: checking an icon button

Given this HTML:

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <!-- icon paths -->
  </svg>
</button>
```

Check that Firefox exposes:

- role: button;
- name: Close dialog;
- the decorative SVG is not exposed as a separate meaningful control;
- the button is keyboard focusable.

## Firefox-specific reminder

Firefox's Accessibility panel is especially useful when you want to compare DOM structure with accessibility-tree structure. If something is visible on the page but missing from the accessibility tree, check whether it is hidden, decorative, unnamed, or not semantically meaningful.
