# Safari Web Inspector accessibility checks

Use this guide to inspect the rendered HTML and accessibility information in Safari.

Safari uses **Web Inspector** for inspecting webpages. Depending on your Safari and macOS version, the exact accessibility inspection features and labels may differ.

Official references:

- <https://developer.apple.com/documentation/safari-developer-tools/web-inspector>
- <https://developer.apple.com/documentation/safari-developer-tools/inspecting-safari-macos>
- <https://developer.apple.com/documentation/accessibility/accessibility-inspector>

## Enable the Develop menu

If you do not see the **Develop** menu in Safari:

1. Open **Safari**.
2. Open **Settings** or **Preferences**.
3. Go to **Advanced**.
4. Enable **Show features for web developers** or **Show Develop menu in menu bar**, depending on your Safari version.

## Open Web Inspector

Use one of these methods:

- Right-click the page and select **Inspect Element**.
- Open the **Develop** menu and select **Show Web Inspector**.
- Press `Command` + `Option` + `I` on macOS.

## Inspect an element

1. Open Web Inspector.
2. Select the element in the Elements or DOM view.
3. Look for accessibility-related information in the available side panels or node details.

Because Safari's Web Inspector UI can vary by version, focus on the inspection goal rather than one exact panel name.

## Use macOS Accessibility Inspector when useful

macOS also includes an Accessibility Inspector app as part of Apple's developer tools. It can inspect accessibility information exposed by apps and web content.

Use it when you want another view of what the platform exposes to assistive technologies.

## What to check

For the selected element or accessible object, look for:

- role;
- accessible name or label;
- description or help text;
- value;
- state;
- relationships;
- whether the element is focusable;
- whether hidden or decorative content is exposed unexpectedly.

## Example: checking a heading

Given this HTML:

```html
<h2>Shipping address</h2>
```

Check that Safari exposes:

- role: heading;
- name: Shipping address;
- level: 2, where available.

## Example: checking a native details element

Given this HTML:

```html
<details>
  <summary>Shipping options</summary>
  <p>Choose standard or express delivery during checkout.</p>
</details>
```

Check before and after opening:

- the summary is keyboard operable;
- the expanded or collapsed state is exposed where available;
- the content becomes available when the disclosure is open;
- focus behavior is predictable.

## Safari-specific reminder

Safari accessibility debugging may involve both Safari Web Inspector and macOS accessibility tools. When documenting steps for readers, test them against the Safari version you expect readers to use, and keep screenshots in the companion repository rather than relying on them in long-lived book text.
