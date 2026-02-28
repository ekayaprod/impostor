with open('js/main.js', 'r') as f:
    content = f.read()

content = content.replace(
    '''    var debouncedUpdate = _.debounce(function() {
        GameApp.UI.updatePlayerListInState();
    }, 300);''',
    '''    var debouncedUpdate = _.debounce(function() {
        GameApp.UI.updatePlayerListInState();
        $('#setupErrorMsg').removeClass('is-visible');
    }, 300);'''
)

content = content.replace(
    '''        GameApp.UI.updatePlayerListInState();
        debouncedUpdate.cancel(); // Cancel pending debounce since we just saved
    });''',
    '''        GameApp.UI.updatePlayerListInState();
        $('#setupErrorMsg').removeClass('is-visible');
        debouncedUpdate.cancel(); // Cancel pending debounce since we just saved
    });'''
)

with open('js/main.js', 'w') as f:
    f.write(content)
