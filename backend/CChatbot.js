class CChatbot {
    constructor() {
        this._name = "Chatbot";
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    getResponse(message) {
        return "Hello, I am " + this.name + ". You said: " + message;
    }
}