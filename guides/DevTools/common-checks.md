# Common DevTools accessibility checks

Use this checklist in any browser. The exact DevTools labels may differ, but the goal is the same: inspect the rendered output, not the framework source.

## 1. Inspect the rendered element

Find the element in the browser's element inspector.

Ask:

- What HTML element was rendered?
- Is it the element you expected?
- Could a native element have been used instead of a generic element plus ARIA?

Examples:

```html
<button type="button">Save changes</button>
```

is usually preferable to:

```html
<div role="button" tabindex="0">Save changes</div>
```

## 2. Check the role

Find the role exposed by the browser.

Ask:

- Does the role match the visible purpose of the control?
- Did the role come from native HTML, such as `button`, `a`, `input`, `select`, or `nav`?
- If ARIA was used to override the role, was that override necessary?

Examples:

- A clickable button should expose a button role.
- A navigation link should expose a link role and have an `href`.
- A checkbox should expose a checkbox role and its checked state.

## 3. Check the accessible name

The accessible name is the name exposed to assistive technologies. It often comes from visible text, a `<label>`, `aria-label`, or `aria-labelledby`.

Ask:

- Does the control have a name?
- Does the name match or include the visible label?
- Is the name specific enough to make sense out of context?
- Is the name generated from visible text where possible?

Examples:

Good:

```html
<button type="button">Save changes</button>
```

Risky:

```html
<button type="button" aria-label="Submit">Save changes</button>
```

The second example exposes a name that does not match the visible text.

## 4. Check descriptions and error messages

Some controls need extra information, such as help text, constraints, or validation errors.

Ask:

- Is the description exposed to assistive technologies?
- Is the error message associated with the field?
- Is the invalid state exposed when the field is invalid?
- Does the visible text match the programmatic relationship?

Example:

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email" aria-describedby="email-help email-error" aria-invalid="true">
<p id="email-help">Use your work email address.</p>
<p id="email-error">Enter a valid email address.</p>
```

## 5. Check states

Interactive controls often expose states.

Ask:

- Is the checked, selected, expanded, pressed, disabled, hidden, or invalid state correct?
- Does the state update when the UI changes?
- Is the visual state consistent with the programmatic state?

Examples:

```html
<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>
<nav id="menu" hidden>...</nav>
```

When the menu opens, `aria-expanded` should change to `true`, and the controlled content should become available.

## 6. Check relationships

Some elements need to be connected to other elements.

Ask:

- Is a form control associated with its label?
- Is help text associated with the relevant control?
- Does a disclosure button identify the content it controls?
- Are grouped controls inside a useful group, such as `fieldset` and `legend`?

Example:

```html
<fieldset>
  <legend>Delivery method</legend>
  <label><input type="radio" name="delivery" value="standard"> Standard</label>
  <label><input type="radio" name="delivery" value="express"> Express</label>
</fieldset>
```

## 7. Check focus order

Use the keyboard, not only DevTools.

Ask:

- Can you reach the control with `Tab` when expected?
- Does focus move in a logical order?
- Is focus visible?
- Does focus get trapped only when there is a good reason, such as an open modal dialog?
- Can you leave the component with the keyboard?

## 8. Check keyboard operation

Ask:

- Can the control be operated without a mouse?
- Does it use expected keys?
- Does a button activate with `Enter` and `Space`?
- Does a link activate with `Enter`?
- Do custom widgets follow the expected keyboard pattern for that widget?

## 9. Check hidden content

Ask:

- Is hidden content really hidden from both sighted users and assistive technologies when appropriate?
- Is visually hidden content still available to assistive technologies when intended?
- Is content exposed too early, such as collapsed menu items that should not be reachable yet?

## 10. Check the output after state changes

Many bugs appear only after interaction.

Repeat the inspection after:

- opening and closing menus;
- expanding and collapsing sections;
- submitting invalid forms;
- adding or removing items;
- changing tabs;
- opening and closing dialogs;
- navigating between views in a single-page application.

## Reminder

The source code may be JSX, templates, partials, custom elements, or generated markup. The accessibility question is what the browser ultimately renders and exposes.
