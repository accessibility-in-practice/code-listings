# Microsoft Edge DevTools accessibility checks

Use this guide to inspect the rendered HTML and accessibility information in Microsoft Edge DevTools.

Microsoft Edge DevTools includes an **Accessibility** tab in the **Elements** tool. Microsoft describes this tab as a place to view the accessibility tree, ARIA attributes, and computed accessibility properties of DOM nodes.

Official references:

- <https://learn.microsoft.com/en-us/microsoft-edge/devtools/accessibility/accessibility-tab>
- <https://learn.microsoft.com/en-us/microsoft-edge/devtools/accessibility/test-accessibility-tree>

## Open DevTools

Use one of these methods:

- Right-click the page and select **Inspect**.
- Press `F12`.
- Press `Ctrl` + `Shift` + `I` on Windows or Linux.
- Press `Command` + `Option` + `I` on macOS.

## Inspect an element

1. Open the **Elements** tool.
2. Select the element in the DOM tree.
3. Open the **Accessibility** tab near the side-panel tabs.
4. If you do not see the **Accessibility** tab, check the overflow or “More tabs” menu.

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
2. Hover over a control on the page.
3. Look for accessibility information in the overlay, such as the control's name and role.

This is useful for quick checks, especially when you want to confirm whether a visible label is exposed as the accessible name.

## Inspect the accessibility tree

Edge DevTools can show accessibility-tree information for the page and selected elements.

Use this to check whether the browser exposes the structure you expect:

- Are headings exposed as headings?
- Are buttons exposed as buttons?
- Are links exposed as links?
- Are form fields named correctly?
- Are hidden elements absent when they should be absent?
- Are expanded or collapsed states updated when the UI changes?

## Example: checking a form field

Given this HTML:

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email">
```

Check that Edge exposes:

- role: textbox or equivalent text-input role;
- name: Email address;
- focusable: yes;
- value: the current value, if one exists.

## Example: checking an invalid field

Given this HTML:

```html
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
<p id="email-error">Enter a valid email address.</p>
```

Check that:

- the field is named `Email address`;
- the field exposes an invalid state;
- the error message is exposed as a description;
- the visible and programmatic information agree.

## Edge-specific reminder

Edge and Chrome DevTools are similar, but not identical. Do not rely on screenshots alone. Check the current labels and panel locations before publishing browser-specific instructions.
