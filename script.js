const FAV_ICON_WIDTH = 16;
const FAV_ICON_HEIGHT = 16;

class SpriteCanvas {
    constructor(target) {
        this._ele = document.querySelector(target);
        this._ctx = this._ele.getContext("2d");
        this._mouse = {
            x: 0,
            y: 0
        };
        this._points = [];
        this.lifecycle();
        this.registerEventHandlers();
    }

    registerEventHandlers() {
        window.addEventListener("mousemove", this.registerHover.bind(this));
        this._ele.addEventListener("mousedown", this.registerClick.bind(this));
        document.querySelector(".actions__render").addEventListener("click", this.export.bind(this));
    }

    registerHover(event) {
        const {clientX, clientY} = event;
        const canvasRect = this._ele.getBoundingClientRect();
        this._mouse = {
            x: clientX - canvasRect.left,
            y: clientY - canvasRect.top
        };
        this.lifecycle();
    }

    registerClick(event) {
        let width = this._ele.width / FAV_ICON_WIDTH;
        let height = this._ele.height / FAV_ICON_HEIGHT;
        let posX = Math.floor(this._mouse.x / width);
        let posY = Math.floor(this._mouse.y / height);
        if (this._points[posX] !== undefined && this._points[posX][posY] !== undefined) {
            this._points[posX][posY] = undefined;
        } else {
            if (this._points[posX] === undefined) this._points[posX] = [];
            this._points[posX][posY] = "black";
        }
        this.lifecycle();
    }

    clear() {
        this._ctx.clearRect(0, 0, this._ele.width, this._ele.height);
        this._ctx.strokeStyle = "black";
        this._ctx.lineWidth = "0.1";
        let width = this._ele.width / FAV_ICON_WIDTH;
        let height = this._ele.height / FAV_ICON_HEIGHT;
        for (let x = 0; x < FAV_ICON_WIDTH; x += 1) {
            for (let y = 0; y < FAV_ICON_HEIGHT; y += 1) {
                this._ctx.strokeRect((x * width), (y * height), width, height);
            }
        }
    }

    drawMouse() {
        this._ctx.fillStyle = "black";
        let width = this._ele.width / FAV_ICON_WIDTH;
        let height = this._ele.height / FAV_ICON_HEIGHT;
        let posX = Math.floor(this._mouse.x / width) * width;
        let posY = Math.floor(this._mouse.y / height) * height;
        this._ctx.fillRect(posX, posY, width, height);
    }

    drawPoints() {
        let width = this._ele.width / FAV_ICON_WIDTH;
        let height = this._ele.height / FAV_ICON_HEIGHT;
        for (let x = 0; x < FAV_ICON_WIDTH; x += 1) {
            if (this._points[x] === undefined) continue;
            for (let y = 0; y < FAV_ICON_HEIGHT; y += 1) {
                if (this._points[x][y] !== undefined) {
                    this._ctx.fillStyle = this._points[x][y];
                    this._ctx.fillRect((x * width), (y * height), width, height);
                }
            }
        }
    }

    export() {
        this._ctx.clearRect(0, 0, this._ele.width, this._ele.height);
        this.drawPoints();
        const data = this._ele.toDataURL("image/x-icon");
        document.querySelector("img.preview__image").src = data;
        document.querySelector("a.preview__download").href = data;
        this.lifecycle();
        document.querySelector(".editor__preview").classList.remove("preview--hidden");
    }

    lifecycle() {
        this.clear();
        this.drawPoints();
        this.drawMouse();
    }
}

document.addEventListener('DOMContentLoaded', function(){
    const spriteCanvas = new SpriteCanvas(".editor__canvas");
}, false);

