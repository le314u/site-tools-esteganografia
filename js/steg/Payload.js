class Payload {

    constructor(type, data, name = "", mime = "") {

        this.type = type;
        this.data = data;
        this.name = name;
        this.mime = mime;
    }

    toJSON() {

        return JSON.stringify({
            type: this.type,
            data: this.data,
            name: this.name,
            mime: this.mime
        });

    }

    static fromJSON(json) {

        const obj = JSON.parse(json);

        return new Payload(
            obj.type,
            obj.data,
            obj.name,
            obj.mime
        );

    }

}