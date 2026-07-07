# DevTools accessibility checks

This folder contains browser-specific walkthroughs for inspecting the accessibility information produced by a web page.

The exact DevTools interface may change over time. Treat these files as companion notes that can be updated separately from the book. The important part is not memorizing a browser UI. The important part is knowing what to inspect.

## Files

- [`common-checks.md`](common-checks.md): The accessibility questions to ask in any browser.
- [`chrome.md`](chrome.md): Inspecting rendered HTML and accessibility information in Chrome DevTools.
- [`edge.md`](edge.md): Inspecting rendered HTML and accessibility information in Microsoft Edge DevTools.
- [`firefox.md`](firefox.md): Inspecting rendered HTML and accessibility information in Firefox Developer Tools.
- [`safari.md`](safari.md): Inspecting rendered HTML and accessibility information in Safari Web Inspector.

## What these guides are for

Use these guides when you want to verify what the browser receives and exposes after your HTML, CSS, JavaScript, framework, component library, or build process has done its work.

They are especially useful for checking whether a component renders:

- the expected HTML element;
- the expected role;
- a useful accessible name;
- the correct state, such as expanded, checked, selected, disabled, or invalid;
- the correct relationship to labels, descriptions, controls, and error messages;
- a sensible focus order;
- keyboard behavior that matches the control.

## What these guides are not for

DevTools can help you inspect and debug accessibility information, but DevTools alone is not a full accessibility audit.

Use DevTools alongside:

- keyboard testing;
- browser zoom and reflow checks;
- automated accessibility checks;
- screen reader testing;
- testing with disabled people where possible;
- review against the relevant accessibility standard for your project.

## Stable principle

DevTools change. The accessibility questions do not.

When a browser exposes a control to users and assistive technologies, check whether the browser exposes the right element, name, role, state, relationship, and behavior.
