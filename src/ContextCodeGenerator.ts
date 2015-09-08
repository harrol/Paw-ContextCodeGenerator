var ContextCodeGenerator = function() {

    this.generate = function(context: any): string {
        var result = {
            "context": context,
            "request": context.getCurrentRequest(),
            "lastExchange": context.getCurrentRequest().getLastExchange()
        };
        return JSON.stringify(result, null, 4);
    }
};

ContextCodeGenerator.identifier = 'com.lissenberg.ContextCodeGenerator';
ContextCodeGenerator.title = 'Paw context';
ContextCodeGenerator.fileExtension = 'json';
ContextCodeGenerator.languageHighlighter = 'javascript';

registerCodeGenerator(ContextCodeGenerator);


