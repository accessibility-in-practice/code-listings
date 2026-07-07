# Chrome DevTools accessibility checks

Use this guide to inspect the rendered HTML and accessibility information in Chrome DevTools.

Chrome DevTools includes an **Accessibility** tab in the **Elements** panel. This tab can show the accessibility tree, ARIA attributes, and computed accessibility properties for the selected DOM node.

Official reference: <https://developer.chrome.com/docs/devtools/accessibility/reference>

## Open DevTools

Use one of these methods:

- Right-click the page and select **Inspect**.
- Press `F12`.
- Press `Ctrl` + `Shift` + `I` on Windows or Linux.
- Press `Command` + `Option` + `I` on macOS.

## Inspect an element

1. Open the **Elements** panel.
2. Select the element in the DOM tree.
3. Open the **Accessibility** tab near the **Styles**, **Computed**, and other side-panel tabs.
4. If you do not see the **Accessibility** tab, look behind the overflow or “More tabs” control.

## What to check

For the selected element, look for:

- role;
- accessible name;
- description;
- computed accessibility properties;
- ARIA attributes;
- states such as expanded, checked, selected, disabled, or invalid;
- whether the element appears in the accessibility tree.

## Use the Inspect tool overlay

1. Select the inspect-element cursor in DevTools.
2. Hover over or select an element on the page.
3. Review the overlay information, when available, for basic accessibility information such as name and role.

Use this as a quick signal, not as the final test. Always inspect the selected node when something looks suspicious.

## Switch to the accessibility tree, if available

Some versions of Chrome DevTools allow you to switch from the DOM tree to an accessibility-tree view.

Use this when you want to inspect the structure that is closer to what assistive technologies receive.

Ask:

- Does the element appear where expected?
- Does it have the expected role?
- Does it have the expected name?
- Are hidden or decorative elements omitted when they should be?
- Are important controls missing?

## Example: checking a button

Given this HTML:

```html
<button type="button">Save changes</button>
```

Check that Chrome exposes something equivalent to:

- role: button;
- name: Save changes;
- focusable: yes;
- disabled: false, unless the button is disabled.

## Example: checking a disclosure control

Given this HTML:

```html
<button type="button" aria-expanded="false" aria-controls="details">
  Show details
</button>
<div id="details" hidden>
  Extra information goes here.
</div>
```

Check before and after activation:

- `aria-expanded` changes from `false` to `true`;
- the controlled content becomes visible when expanded;
- keyboard focus remains predictable;
- the button keeps an accessible name.

## Chrome-specific reminder

Chrome and Edge DevTools are similar because both browsers are Chromium-based, but their DevTools documentation and UI labels may still differ. Prefer the browser-specific guide when writing steps for readers.
