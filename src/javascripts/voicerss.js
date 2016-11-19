const voicerss = {
    
    speech: function (e) {
        this._validate(e), this._request(e)
    },
    _validate: function (e) {
        if (!e) throw "The settings are undefined";
        if (!e.key) throw "The API key is undefined";
        if (!e.src) throw "The text is undefined";
        if (!e.hl) throw "The language is undefined";
        if (e.c && "auto" != e.c.toLowerCase()) {
            var a = !1;
            switch (e.c.toLowerCase()) {
                case "mp3":
                    a = (new Audio).canPlayType("audio/mpeg").replace("no", "");
                    break;
                case "wav":
                    a = (new Audio).canPlayType("audio/wav").replace("no", "");
                    break;
                case "aac":
                    a = (new Audio).canPlayType("audio/aac").replace("no", "");
                    break;
                case "ogg":
                    a = (new Audio).canPlayType("audio/ogg").replace("no", "");
                    break;
                case "caf":
                    a = (new Audio).canPlayType("audio/x-caf").replace("no", "")
            }
            if (!a) throw "The browser does not support the audio codec " + e.c
        }
    },
    _request: function (e) {
        $.ajax({
            type: "POST",
            url: "https://api.voicerss.org/",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: this._buildRequest(e),
            dataType: "text",
            success: function (e, a, c) {
                if (0 == e.indexOf("ERROR")) throw e;
                new Audio(e).play()
            }
        })
    },
    _buildRequest: function (e) {
        var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec();
        return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true"
    },
    _detectCodec: function () {
        var e = new Audio;
        return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : ""
    }
};

export default voicerss;