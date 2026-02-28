with open('js/modules/ui/screens/setup.js', 'r') as f:
    content = f.read()

content = content.replace(
    '''        if (num > 2 && info && info.topic && info.category) {
            $('#distributeTopicButton').show();
        } else {
            $('#distributeTopicButton').hide();
        }''',
    '''        $('#distributeTopicButton').show();

        if (num > 2 && info && info.topic && info.category) {
            $('#setupErrorMsg').removeClass('is-visible');
        }'''
)

content = content.replace(
    '''        $('#distributeTopicButton').hide();''',
    '''        $('#setupErrorMsg').removeClass('is-visible').empty();
        $('#distributeTopicButton').show();'''
)

with open('js/modules/ui/screens/setup.js', 'w') as f:
    f.write(content)
