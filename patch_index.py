with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    '<label>Category: <span id="categoryDisplay">No category selected</span></label>',
    '<label>Category: <span id="categoryDisplay">No category selected</span></label>\n        <div id="setupErrorMsg" class="form-error-message" aria-live="polite"></div>'
)

with open('index.html', 'w') as f:
    f.write(content)
