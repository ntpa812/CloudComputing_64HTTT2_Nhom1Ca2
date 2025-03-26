/*! uiCropper v1.0.4 License: MIT */
angular.module("uiCropper", []),
    angular.module("uiCropper").factory("cropAreaCircle", ["cropArea", function (e) {
        var t = function () {
            e.apply(this, arguments),
                this._boxResizeBaseSize = 25,
                this._boxResizeNormalRatio = 1,
                this._boxResizeHoverRatio = 1.2,
                this._iconMoveNormalRatio = .9,
                this._iconMoveHoverRatio = 1.2,
                this._boxResizeNormalSize = this._boxResizeBaseSize * this._boxResizeNormalRatio,
                this._boxResizeHoverSize = this._boxResizeBaseSize * this._boxResizeHoverRatio,
                this._posDragStartX = 0,
                this._posDragStartY = 0,
                this._posResizeStartX = 0,
                this._posResizeStartY = 0,
                this._posResizeStartSize = 0,
                this._boxResizeIsHover = !1,
                this._areaIsHover = !1,
                this._boxResizeIsDragging = !1,
                this._areaIsDragging = !1
        };
        return t.prototype = new e,
            t.prototype.getType = function () {
                return "circle"
            }
            ,
            t.prototype._calcCirclePerimeterCoords = function (e) {
                var t = this._size.w / 2
                    , i = e * (Math.PI / 180);
                return [this.getCenterPoint().x + t * Math.cos(i), this.getCenterPoint().y + t * Math.sin(i)]
            }
            ,
            t.prototype._calcResizeIconCenterCoords = function () {
                return this._calcCirclePerimeterCoords(-45)
            }
            ,
            t.prototype._isCoordWithinArea = function (e) {
                return Math.sqrt((e[0] - this.getCenterPoint().x) * (e[0] - this.getCenterPoint().x) + (e[1] - this.getCenterPoint().y) * (e[1] - this.getCenterPoint().y)) < this._size.w / 2
            }
            ,
            t.prototype._isCoordWithinBoxResize = function (e) {
                var t = this._calcResizeIconCenterCoords()
                    , i = this._boxResizeHoverSize / 2;
                return e[0] > t[0] - i && e[0] < t[0] + i && e[1] > t[1] - i && e[1] < t[1] + i
            }
            ,
            t.prototype._drawArea = function (e, t, i) {
                e.arc(t.x, t.y, i.w / 2, 0, 2 * Math.PI)
            }
            ,
            t.prototype.draw = function () {
                e.prototype.draw.apply(this, arguments);
                var t = this.getCenterPoint();
                this._cropCanvas.drawIconMove([t.x, t.y], this._areaIsHover ? this._iconMoveHoverRatio : this._iconMoveNormalRatio),
                    this._cropCanvas.drawIconResizeBoxNESW(this._calcResizeIconCenterCoords(), this._boxResizeBaseSize, this._boxResizeIsHover ? this._boxResizeHoverRatio : this._boxResizeNormalRatio)
            }
            ,
            t.prototype.processMouseMove = function (e, t) {
                var i = "default"
                    , r = !1;
                if (this._boxResizeIsHover = !1,
                    this._areaIsHover = !1,
                    this._areaIsDragging)
                    this.setCenterPointOnMove({
                        x: e - this._posDragStartX,
                        y: t - this._posDragStartY
                    }),
                        this._areaIsHover = !0,
                        i = "move",
                        r = !0,
                        this._events.trigger("area-move");
                else if (this._boxResizeIsDragging) {
                    i = "nesw-resize";
                    var s, o, a;
                    s = (o = e - this._posResizeStartX) > (a = this._posResizeStartY - t) ? this._posResizeStartSize.w + 2 * a : this._posResizeStartSize.w + 2 * o;
                    var n = {}
                        , h = {};
                    n.x = this.getCenterPoint().x - .5 * s,
                        h.x = this.getCenterPoint().x + .5 * s,
                        n.y = this.getCenterPoint().y - .5 * s,
                        h.y = this.getCenterPoint().y + .5 * s,
                        this.circleOnMove(n, h),
                        this._boxResizeIsHover = !0,
                        r = !0,
                        this._events.trigger("area-resize")
                } else
                    this._isCoordWithinBoxResize([e, t]) ? (i = "nesw-resize",
                        this._areaIsHover = !1,
                        this._boxResizeIsHover = !0,
                        r = !0) : this._isCoordWithinArea([e, t]) && (i = "move",
                            this._areaIsHover = !0,
                            r = !0);
                return angular.element(this._ctx.canvas).css({
                    cursor: i
                }),
                    r
            }
            ,
            t.prototype.processMouseDown = function (e, t) {
                if (this._isCoordWithinBoxResize([e, t]))
                    this._areaIsDragging = !1,
                        this._areaIsHover = !1,
                        this._boxResizeIsDragging = !0,
                        this._boxResizeIsHover = !0,
                        this._posResizeStartX = e,
                        this._posResizeStartY = t,
                        this._posResizeStartSize = this._size,
                        this._events.trigger("area-resize-start");
                else if (this._isCoordWithinArea([e, t])) {
                    this._areaIsDragging = !0,
                        this._areaIsHover = !0,
                        this._boxResizeIsDragging = !1,
                        this._boxResizeIsHover = !1;
                    var i = this.getCenterPoint();
                    this._posDragStartX = e - i.x,
                        this._posDragStartY = t - i.y,
                        this._events.trigger("area-move-start")
                }
            }
            ,
            t.prototype.processMouseUp = function () {
                this._areaIsDragging && (this._areaIsDragging = !1,
                    this._events.trigger("area-move-end")),
                    this._boxResizeIsDragging && (this._boxResizeIsDragging = !1,
                        this._events.trigger("area-resize-end")),
                    this._areaIsHover = !1,
                    this._boxResizeIsHover = !1,
                    this._posDragStartX = 0,
                    this._posDragStartY = 0
            }
            ,
            t
    }
    ]),
    angular.module("uiCropper").factory("cropAreaRectangle", ["cropArea", function (e) {
        var t = function () {
            e.apply(this, arguments),
                this._resizeCtrlBaseRadius = 15,
                this._resizeCtrlNormalRatio = .6,
                this._resizeCtrlHoverRatio = .7,
                this._iconMoveNormalRatio = .9,
                this._iconMoveHoverRatio = 1.2,
                this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius * this._resizeCtrlNormalRatio,
                this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius * this._resizeCtrlHoverRatio,
                this._posDragStartX = 0,
                this._posDragStartY = 0,
                this._posResizeStartX = 0,
                this._posResizeStartY = 0,
                this._posResizeStartSize = {
                    w: 0,
                    h: 0
                },
                this._resizeCtrlIsHover = -1,
                this._areaIsHover = !1,
                this._resizeCtrlIsDragging = -1,
                this._areaIsDragging = !1
        };
        return t.prototype = new e,
            t.prototype.getType = function () {
                return "rectangle"
            }
            ,
            t.prototype._calcRectangleCorners = function () {
                var e = this.getSize()
                    , t = this.getSouthEastBound();
                return [[e.x, e.y], [t.x, e.y], [e.x, t.y], [t.x, t.y]]
            }
            ,
            t.prototype._calcRectangleDimensions = function () {
                var e = this.getSize()
                    , t = this.getSouthEastBound();
                return {
                    left: e.x,
                    top: e.y,
                    right: t.x,
                    bottom: t.y
                }
            }
            ,
            t.prototype._isCoordWithinArea = function (e) {
                var t = this._calcRectangleDimensions();
                return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom
            }
            ,
            t.prototype._isCoordWithinResizeCtrl = function (e) {
                for (var t = this._calcRectangleCorners(), i = -1, r = 0, s = t.length; r < s; r++) {
                    var o = t[r];
                    if (e[0] > o[0] - this._resizeCtrlHoverRadius && e[0] < o[0] + this._resizeCtrlHoverRadius && e[1] > o[1] - this._resizeCtrlHoverRadius && e[1] < o[1] + this._resizeCtrlHoverRadius) {
                        i = r;
                        break
                    }
                }
                return i
            }
            ,
            t.prototype._drawArea = function (e, t, i) {
                e.rect(i.x, i.y, i.w, i.h)
            }
            ,
            t.prototype.draw = function () {
                e.prototype.draw.apply(this, arguments);
                var t = this.getCenterPoint();
                this._cropCanvas.drawIconMove([t.x, t.y], this._areaIsHover ? this._iconMoveHoverRatio : this._iconMoveNormalRatio);
                for (var i = this._calcRectangleCorners(), r = 0, s = i.length; r < s; r++) {
                    var o = i[r];
                    this._cropCanvas.drawIconResizeBoxBase(o, this._resizeCtrlBaseRadius, this._resizeCtrlIsHover === r ? this._resizeCtrlHoverRatio : this._resizeCtrlNormalRatio)
                }
            }
            ,
            t.prototype.processMouseMove = function (e, t) {
                var i = "default"
                    , r = !1;
                if (this._resizeCtrlIsHover = -1,
                    this._areaIsHover = !1,
                    this._areaIsDragging)
                    this.setCenterPointOnMove({
                        x: e - this._posDragStartX,
                        y: t - this._posDragStartY
                    }),
                        this._areaIsHover = !0,
                        i = "move",
                        r = !0,
                        this._events.trigger("area-move");
                else if (this._resizeCtrlIsDragging > -1) {
                    var s = this.getSize()
                        , o = this.getSouthEastBound()
                        , a = e;
                    switch (this._resizeCtrlIsDragging) {
                        case 0:
                            this._aspect && (a = o.x - (o.y - t) * this._aspect),
                                this.setSizeByCorners({
                                    x: a,
                                    y: t
                                }, {
                                    x: o.x,
                                    y: o.y
                                }),
                                i = "nwse-resize";
                            break;
                        case 1:
                            this._aspect && (a = s.x + (o.y - t) * this._aspect),
                                this.setSizeByCorners({
                                    x: s.x,
                                    y: t
                                }, {
                                    x: a,
                                    y: o.y
                                }),
                                i = "nesw-resize";
                            break;
                        case 2:
                            this._aspect && (a = o.x - (t - s.y) * this._aspect),
                                this.setSizeByCorners({
                                    x: a,
                                    y: s.y
                                }, {
                                    x: o.x,
                                    y: t
                                }),
                                i = "nesw-resize";
                            break;
                        case 3:
                            this._aspect && (a = s.x + (t - s.y) * this._aspect),
                                this.setSizeByCorners({
                                    x: s.x,
                                    y: s.y
                                }, {
                                    x: a,
                                    y: t
                                }),
                                i = "nwse-resize"
                    }
                    this._resizeCtrlIsHover = this._resizeCtrlIsDragging,
                        r = !0,
                        this._events.trigger("area-resize")
                } else {
                    var n = this._isCoordWithinResizeCtrl([e, t]);
                    if (n > -1) {
                        switch (n) {
                            case 0:
                                i = "nwse-resize";
                                break;
                            case 1:
                            case 2:
                                i = "nesw-resize";
                                break;
                            case 3:
                                i = "nwse-resize"
                        }
                        this._areaIsHover = !1,
                            this._resizeCtrlIsHover = n,
                            r = !0
                    } else
                        this._isCoordWithinArea([e, t]) && (i = "move",
                            this._areaIsHover = !0,
                            r = !0)
                }
                return angular.element(this._ctx.canvas).css({
                    cursor: i
                }),
                    r
            }
            ,
            t.prototype.processMouseDown = function (e, t) {
                var i = this._isCoordWithinResizeCtrl([e, t]);
                if (i > -1)
                    this._areaIsDragging = !1,
                        this._areaIsHover = !1,
                        this._resizeCtrlIsDragging = i,
                        this._resizeCtrlIsHover = i,
                        this._posResizeStartX = e,
                        this._posResizeStartY = t,
                        this._posResizeStartSize = this._size,
                        this._events.trigger("area-resize-start");
                else if (this._isCoordWithinArea([e, t])) {
                    this._areaIsDragging = !0,
                        this._areaIsHover = !0,
                        this._resizeCtrlIsDragging = -1,
                        this._resizeCtrlIsHover = -1;
                    var r = this.getCenterPoint();
                    this._posDragStartX = e - r.x,
                        this._posDragStartY = t - r.y,
                        this._events.trigger("area-move-start")
                }
            }
            ,
            t.prototype.processMouseUp = function () {
                this._areaIsDragging && (this._areaIsDragging = !1,
                    this._events.trigger("area-move-end")),
                    this._resizeCtrlIsDragging > -1 && (this._resizeCtrlIsDragging = -1,
                        this._events.trigger("area-resize-end")),
                    this._areaIsHover = !1,
                    this._resizeCtrlIsHover = -1,
                    this._posDragStartX = 0,
                    this._posDragStartY = 0
            }
            ,
            t
    }
    ]),
    angular.module("uiCropper").factory("cropAreaSquare", ["cropArea", function (e) {
        var t = function () {
            e.apply(this, arguments),
                this._resizeCtrlBaseRadius = 15,
                this._resizeCtrlNormalRatio = .6,
                this._resizeCtrlHoverRatio = .7,
                this._iconMoveNormalRatio = .9,
                this._iconMoveHoverRatio = 1.2,
                this._resizeCtrlNormalRadius = this._resizeCtrlBaseRadius * this._resizeCtrlNormalRatio,
                this._resizeCtrlHoverRadius = this._resizeCtrlBaseRadius * this._resizeCtrlHoverRatio,
                this._posDragStartX = 0,
                this._posDragStartY = 0,
                this._posResizeStartX = 0,
                this._posResizeStartY = 0,
                this._posResizeStartSize = 0,
                this._resizeCtrlIsHover = -1,
                this._areaIsHover = !1,
                this._resizeCtrlIsDragging = -1,
                this._areaIsDragging = !1
        };
        return t.prototype = new e,
            t.prototype.getType = function () {
                return "square"
            }
            ,
            t.prototype._calcSquareCorners = function () {
                var e = this.getSize()
                    , t = this.getSouthEastBound();
                return [[e.x, e.y], [t.x, e.y], [e.x, t.y], [t.x, t.y]]
            }
            ,
            t.prototype._calcSquareDimensions = function () {
                var e = this.getSize()
                    , t = this.getSouthEastBound();
                return {
                    left: e.x,
                    top: e.y,
                    right: t.x,
                    bottom: t.y
                }
            }
            ,
            t.prototype._isCoordWithinArea = function (e) {
                var t = this._calcSquareDimensions();
                return e[0] >= t.left && e[0] <= t.right && e[1] >= t.top && e[1] <= t.bottom
            }
            ,
            t.prototype._isCoordWithinResizeCtrl = function (e) {
                for (var t = this._calcSquareCorners(), i = -1, r = 0, s = t.length; r < s; r++) {
                    var o = t[r];
                    if (e[0] > o[0] - this._resizeCtrlHoverRadius && e[0] < o[0] + this._resizeCtrlHoverRadius && e[1] > o[1] - this._resizeCtrlHoverRadius && e[1] < o[1] + this._resizeCtrlHoverRadius) {
                        i = r;
                        break
                    }
                }
                return i
            }
            ,
            t.prototype._drawArea = function (e, t, i) {
                e.rect(i.x, i.y, i.w, i.h)
            }
            ,
            t.prototype.draw = function () {
                e.prototype.draw.apply(this, arguments);
                var t = this.getCenterPoint();
                this._cropCanvas.drawIconMove([t.x, t.y], this._areaIsHover ? this._iconMoveHoverRatio : this._iconMoveNormalRatio);
                for (var i = this._calcSquareCorners(), r = 0, s = i.length; r < s; r++) {
                    var o = i[r];
                    this._cropCanvas.drawIconResizeBoxBase(o, this._resizeCtrlBaseRadius, this._resizeCtrlIsHover === r ? this._resizeCtrlHoverRatio : this._resizeCtrlNormalRatio)
                }
            }
            ,
            t.prototype._clampPoint = function (e, t) {
                var i = this._ctx.canvas.width;
                return e < 0 && (t -= Math.abs(e),
                    e = 0),
                    t < 0 && (e -= Math.abs(t),
                        t = 0),
                    e > i && (t -= i - e,
                        e = i),
                    t > i && (e -= i - t,
                        t = i),
                {
                    x: e,
                    y: t
                }
            }
            ,
            t.prototype.processMouseMove = function (e, t) {
                var i = "default"
                    , r = !1;
                if (this._resizeCtrlIsHover = -1,
                    this._areaIsHover = !1,
                    this._areaIsDragging)
                    this.setCenterPointOnMove({
                        x: e - this._posDragStartX,
                        y: t - this._posDragStartY
                    }),
                        this._areaIsHover = !0,
                        i = "move",
                        r = !0,
                        this._events.trigger("area-move");
                else if (this._resizeCtrlIsDragging > -1) {
                    var s, o;
                    switch (this._resizeCtrlIsDragging) {
                        case 0:
                            s = -1,
                                o = -1,
                                i = "nwse-resize";
                            break;
                        case 1:
                            s = 1,
                                o = -1,
                                i = "nesw-resize";
                            break;
                        case 2:
                            s = -1,
                                o = 1,
                                i = "nesw-resize";
                            break;
                        case 3:
                            s = 1,
                                o = 1,
                                i = "nwse-resize"
                    }
                    var a, n = (e - this._posResizeStartX) * s, h = (t - this._posResizeStartY) * o;
                    a = n > h ? this._posResizeStartSize.w + h : this._posResizeStartSize.w + n;
                    var c = Math.max(this._minSize.w, a)
                        , u = {}
                        , l = {}
                        , g = {}
                        , p = {}
                        , f = this.getSize()
                        , d = this.getSouthEastBound();
                    switch (this._resizeCtrlIsDragging) {
                        case 0:
                            u.x = d.x - c,
                                u.y = d.y - c,
                                u = this._clampPoint(u.x, u.y),
                                this.setSizeByCorners(u, {
                                    x: d.x,
                                    y: d.y
                                }),
                                i = "nwse-resize";
                            break;
                        case 1:
                            p.x = f.x + c,
                                p.y = d.y - c,
                                p = this._clampPoint(p.x, p.y),
                                this.setSizeByCorners({
                                    x: f.x,
                                    y: p.y
                                }, {
                                    x: p.x,
                                    y: d.y
                                }),
                                i = "nesw-resize";
                            break;
                        case 2:
                            g.x = d.x - c,
                                g.y = f.y + c,
                                g = this._clampPoint(g.x, g.y),
                                this.setSizeByCorners({
                                    x: g.x,
                                    y: f.y
                                }, {
                                    x: d.x,
                                    y: g.y
                                }),
                                i = "nesw-resize";
                            break;
                        case 3:
                            l.x = f.x + c,
                                l.y = f.y + c,
                                l = this._clampPoint(l.x, l.y),
                                this.setSizeByCorners({
                                    x: f.x,
                                    y: f.y
                                }, l),
                                i = "nwse-resize"
                    }
                    this._resizeCtrlIsHover = this._resizeCtrlIsDragging,
                        r = !0,
                        this._events.trigger("area-resize")
                } else {
                    var v = this._isCoordWithinResizeCtrl([e, t]);
                    if (v > -1) {
                        switch (v) {
                            case 0:
                                i = "nwse-resize";
                                break;
                            case 1:
                            case 2:
                                i = "nesw-resize";
                                break;
                            case 3:
                                i = "nwse-resize"
                        }
                        this._areaIsHover = !1,
                            this._resizeCtrlIsHover = v,
                            r = !0
                    } else
                        this._isCoordWithinArea([e, t]) && (i = "move",
                            this._areaIsHover = !0,
                            r = !0)
                }
                return angular.element(this._ctx.canvas).css({
                    cursor: i
                }),
                    r
            }
            ,
            t.prototype.processMouseDown = function (e, t) {
                var i = this._isCoordWithinResizeCtrl([e, t]);
                if (i > -1)
                    this._areaIsDragging = !1,
                        this._areaIsHover = !1,
                        this._resizeCtrlIsDragging = i,
                        this._resizeCtrlIsHover = i,
                        this._posResizeStartX = e,
                        this._posResizeStartY = t,
                        this._posResizeStartSize = this._size,
                        this._events.trigger("area-resize-start");
                else if (this._isCoordWithinArea([e, t])) {
                    this._areaIsDragging = !0,
                        this._areaIsHover = !0,
                        this._resizeCtrlIsDragging = -1,
                        this._resizeCtrlIsHover = -1;
                    var r = this.getCenterPoint();
                    this._posDragStartX = e - r.x,
                        this._posDragStartY = t - r.y,
                        this._events.trigger("area-move-start")
                }
            }
            ,
            t.prototype.processMouseUp = function () {
                this._areaIsDragging && (this._areaIsDragging = !1,
                    this._events.trigger("area-move-end")),
                    this._resizeCtrlIsDragging > -1 && (this._resizeCtrlIsDragging = -1,
                        this._events.trigger("area-resize-end")),
                    this._areaIsHover = !1,
                    this._resizeCtrlIsHover = -1,
                    this._posDragStartX = 0,
                    this._posDragStartY = 0
            }
            ,
            t
    }
    ]),
    angular.module("uiCropper").factory("cropArea", ["cropCanvas", function (e) {
        var t = function (t, i) {
            this._ctx = t,
                this._events = i,
                this._minSize = {
                    x: 0,
                    y: 0,
                    w: 80,
                    h: 80
                },
                this._initSize = void 0,
                this._initCoords = void 0,
                this._allowCropResizeOnCorners = !1,
                this._forceAspectRatio = !1,
                this._aspect = null,
                this._cropCanvas = new e(t),
                this._image = new Image,
                this._size = {
                    x: 0,
                    y: 0,
                    w: 150,
                    h: 150
                }
        };
        return t.prototype.setAllowCropResizeOnCorners = function (e) {
            this._allowCropResizeOnCorners = e
        }
            ,
            t.prototype.getImage = function () {
                return this._image
            }
            ,
            t.prototype.setImage = function (e) {
                this._image = e
            }
            ,
            t.prototype.setForceAspectRatio = function (e) {
                this._forceAspectRatio = e
            }
            ,
            t.prototype.setAspect = function (e) {
                this._aspect = e
            }
            ,
            t.prototype.getAspect = function () {
                return this._aspect
            }
            ,
            t.prototype.getCanvasSize = function () {
                return {
                    w: this._ctx.canvas.width,
                    h: this._ctx.canvas.height
                }
            }
            ,
            t.prototype.getSize = function () {
                return this._size
            }
            ,
            t.prototype.setSize = function (e) {
                e = this._processSize(e),
                    this._size = this._preventBoundaryCollision(e)
            }
            ,
            t.prototype.setSizeOnMove = function (e) {
                e = this._processSize(e),
                    this._allowCropResizeOnCorners ? this._size = this._preventBoundaryCollision(e) : this._size = this._allowMouseOutsideCanvas(e)
            }
            ,
            t.prototype.circleOnMove = function (e, t) {
                var i = {
                    x: e.x,
                    y: e.y,
                    w: t.x - e.x,
                    h: t.y - e.y
                }
                    , r = this._ctx.canvas.height
                    , s = this._ctx.canvas.width;
                (i.w > s || i.h > r) && (s < r ? (i.w = s,
                    i.h = s) : (i.w = r,
                        i.h = r)),
                    i.x + i.w > s && (i.x = s - i.w),
                    i.y + i.h > r && (i.y = r - i.h),
                    i.x < 0 && (i.x = 0),
                    i.y < 0 && (i.y = 0),
                    this._minSize.w > i.w && (i.w = this._minSize.w,
                        i.x = this._size.x),
                    this._minSize.h > i.h && (i.h = this._minSize.h,
                        i.y = this._size.y),
                    this._size = i
            }
            ,
            t.prototype.setSizeByCorners = function (e, t) {
                var i = {
                    x: e.x,
                    y: e.y,
                    w: t.x - e.x,
                    h: t.y - e.y
                };
                this.setSize(i)
            }
            ,
            t.prototype.getSouthEastBound = function () {
                return this._southEastBound(this.getSize())
            }
            ,
            t.prototype.setMinSize = function (e) {
                this._minSize = this._processSize(e),
                    this.setSize(this._minSize)
            }
            ,
            t.prototype.getMinSize = function () {
                return this._minSize
            }
            ,
            t.prototype.getCenterPoint = function () {
                var e = this.getSize();
                return {
                    x: e.x + e.w / 2,
                    y: e.y + e.h / 2
                }
            }
            ,
            t.prototype.setCenterPoint = function (e) {
                var t = this.getSize();
                this.setSize({
                    x: e.x - t.w / 2,
                    y: e.y - t.h / 2,
                    w: t.w,
                    h: t.h
                })
            }
            ,
            t.prototype.setCenterPointOnMove = function (e) {
                var t = this.getSize();
                this.setSizeOnMove({
                    x: e.x - t.w / 2,
                    y: e.y - t.h / 2,
                    w: t.w,
                    h: t.h
                })
            }
            ,
            t.prototype.setInitSize = function (e) {
                this._initSize = this._processSize(e),
                    this.setSize(this._initSize)
            }
            ,
            t.prototype.getInitSize = function () {
                return this._initSize
            }
            ,
            t.prototype.setInitCoords = function (e) {
                e.h = this.getSize().h,
                    e.w = this.getSize().w,
                    this._initCoords = this._processSize(e),
                    this.setSize(this._initCoords)
            }
            ,
            t.prototype.getInitCoords = function () {
                return this._initCoords
            }
            ,
            t.prototype.getType = function () {
                return "circle"
            }
            ,
            t.prototype._allowMouseOutsideCanvas = function (e) {
                var t = this._ctx.canvas.height
                    , i = this._ctx.canvas.width
                    , r = {
                        w: e.w,
                        h: e.h
                    };
                return e.x < 0 ? r.x = 0 : e.x + e.w > i ? r.x = i - e.w : r.x = e.x,
                    e.y < 0 ? r.y = 0 : e.y + e.h > t ? r.y = t - e.h : r.y = e.y,
                    r
            }
            ,
            t.prototype._preventBoundaryCollision = function (e) {
                var t = this._ctx.canvas.height
                    , i = this._ctx.canvas.width
                    , r = {
                        x: e.x,
                        y: e.y
                    }
                    , s = this._southEastBound(e);
                r.x < 0 && (r.x = 0),
                    r.y < 0 && (r.y = 0),
                    s.x > i && (s.x = i),
                    s.y > t && (s.y = t);
                var o = this._forceAspectRatio ? e.w : s.x - r.x
                    , a = this._forceAspectRatio ? e.h : s.y - r.y;
                a > t && (a = t),
                    this._aspect && (o = a * this._aspect,
                        r.x + o > i && (a = (o = i - r.x) / this._aspect,
                            this._minSize.w > o && (o = this._minSize.w),
                            this._minSize.h > a && (a = this._minSize.h),
                            r.x = i - o),
                        r.y + a > t && (r.y = t - a)),
                    this._forceAspectRatio && (o = a,
                        r.x + o > i && ((o = i - r.x) < this._minSize.w && (o = this._minSize.w),
                            a = o));
                var n = {
                    x: r.x,
                    y: r.y,
                    w: o,
                    h: a
                };
                return n.w < this._minSize.w && !this._forceAspectRatio && (n.w = this._minSize.w,
                    (s = this._southEastBound(n)).x > i && (s.x = i,
                        r.x = Math.max(s.x - i, s.x - this._minSize.w),
                        n = {
                            x: r.x,
                            y: r.y,
                            w: s.x - r.x,
                            h: s.y - r.y
                        })),
                    n.h < this._minSize.h && !this._forceAspectRatio && (n.h = this._minSize.h,
                        (s = this._southEastBound(n)).y > t && (s.y = t,
                            r.y = Math.max(s.y - t, s.y - this._minSize.h),
                            n = {
                                x: r.x,
                                y: r.y,
                                w: s.x - r.x,
                                h: s.y - r.y
                            })),
                    this._forceAspectRatio && ((s = this._southEastBound(n)).y > t && (n.y = t - n.h),
                        s.x > i && (n.x = i - n.w)),
                    n
            }
            ,
            t.prototype._dontDragOutside = function () {
                var e = this._ctx.canvas.height
                    , t = this._ctx.canvas.width;
                this._width > t && (this._width = t),
                    this._height > e && (this._height = e),
                    this._x < this._width / 2 && (this._x = this._width / 2),
                    this._x > t - this._width / 2 && (this._x = t - this._width / 2),
                    this._y < this._height / 2 && (this._y = this._height / 2),
                    this._y > e - this._height / 2 && (this._y = e - this._height / 2)
            }
            ,
            t.prototype._drawArea = function () { }
            ,
            t.prototype._processSize = function (e) {
                "number" == typeof e && (e = {
                    w: e,
                    h: e
                });
                var t = e.w;
                return this._aspect && (t = e.h * this._aspect),
                {
                    x: void 0 === e.x ? this.getSize().x : e.x,
                    y: void 0 === e.y ? this.getSize().y : e.y,
                    w: t || this._minSize.w,
                    h: e.h || this._minSize.h
                }
            }
            ,
            t.prototype._southEastBound = function (e) {
                return {
                    x: e.x + e.w,
                    y: e.y + e.h
                }
            }
            ,
            t.prototype.draw = function () {
                this._cropCanvas.drawCropArea(this._image, this.getCenterPoint(), this._size, this._drawArea)
            }
            ,
            t.prototype.processMouseMove = function () { }
            ,
            t.prototype.processMouseDown = function () { }
            ,
            t.prototype.processMouseUp = function () { }
            ,
            t
    }
    ]),
    angular.module("uiCropper").factory("cropCanvas", [function () {
        var e = [[-.5, -2], [-3, -4.5], [-.5, -7], [-7, -7], [-7, -.5], [-4.5, -3], [-2, -.5]]
            , t = [[.5, -2], [3, -4.5], [.5, -7], [7, -7], [7, -.5], [4.5, -3], [2, -.5]]
            , i = [[-.5, 2], [-3, 4.5], [-.5, 7], [-7, 7], [-7, .5], [-4.5, 3], [-2, .5]]
            , r = [[.5, 2], [3, 4.5], [.5, 7], [7, 7], [7, .5], [4.5, 3], [2, .5]]
            , s = [[-1.5, -2.5], [-1.5, -6], [-5, -6], [0, -11], [5, -6], [1.5, -6], [1.5, -2.5]]
            , o = [[-2.5, -1.5], [-6, -1.5], [-6, -5], [-11, 0], [-6, 5], [-6, 1.5], [-2.5, 1.5]]
            , a = [[-1.5, 2.5], [-1.5, 6], [-5, 6], [0, 11], [5, 6], [1.5, 6], [1.5, 2.5]]
            , n = [[2.5, -1.5], [6, -1.5], [6, -5], [11, 0], [6, 5], [6, 1.5], [2.5, 1.5]]
            , h = {
                areaOutline: "#fff",
                resizeBoxStroke: "#bababa",
                resizeBoxFill: "#444",
                resizeBoxArrowFill: "#fff",
                resizeCircleStroke: "#bababa",
                resizeCircleFill: "#444",
                moveIconFill: "#fff"
            }
            , c = {
                strokeWidth: 1
            };
        return function (u) {
            var l = function (e, t, i) {
                return [i * e[0] + t[0], i * e[1] + t[1]]
            }
                , g = function (e, t, i, r) {
                    u.save(),
                        u.fillStyle = t,
                        u.beginPath();
                    var s, o = l(e[0], i, r);
                    u.moveTo(o[0], o[1]);
                    for (var a in e)
                        a > 0 && (s = l(e[a], i, r),
                            u.lineTo(s[0], s[1]));
                    u.lineTo(o[0], o[1]),
                        u.fill(),
                        u.closePath(),
                        u.restore()
                };
            this.drawIconMove = function (e, t) {
                g(s, h.moveIconFill, e, t),
                    g(o, h.moveIconFill, e, t),
                    g(a, h.moveIconFill, e, t),
                    g(n, h.moveIconFill, e, t)
            }
                ,
                this.drawIconResizeCircle = function (e, t, i) {
                    var r = t * i;
                    u.save(),
                        u.strokeStyle = h.resizeCircleStroke,
                        u.lineWidth = c.strokeWidth,
                        u.fillStyle = h.resizeCircleFill,
                        u.beginPath(),
                        u.arc(e[0], e[1], r, 0, 2 * Math.PI),
                        u.fill(),
                        u.stroke(),
                        u.closePath(),
                        u.restore()
                }
                ,
                this.drawIconResizeBoxBase = function (e, t, i) {
                    var r = t * i;
                    u.save(),
                        u.strokeStyle = h.resizeBoxStroke,
                        u.lineWidth = c.strokeWidth,
                        u.fillStyle = h.resizeBoxFill,
                        u.fillRect(e[0] - r / 2, e[1] - r / 2, r, r),
                        u.strokeRect(e[0] - r / 2, e[1] - r / 2, r, r),
                        u.restore()
                }
                ,
                this.drawIconResizeBoxNESW = function (e, r, s) {
                    this.drawIconResizeBoxBase(e, r, s),
                        g(t, h.resizeBoxArrowFill, e, s),
                        g(i, h.resizeBoxArrowFill, e, s)
                }
                ,
                this.drawIconResizeBoxNWSE = function (t, i, s) {
                    this.drawIconResizeBoxBase(t, i, s),
                        g(e, h.resizeBoxArrowFill, t, s),
                        g(r, h.resizeBoxArrowFill, t, s)
                }
                ,
                this.drawCropArea = function (e, t, i, r) {
                    var s = Math.abs(e.width / u.canvas.width)
                        , o = Math.abs(e.height / u.canvas.height)
                        , a = Math.abs(t.x - i.w / 2)
                        , n = Math.abs(t.y - i.h / 2);
                    u.save(),
                        u.strokeStyle = h.areaOutline,
                        u.lineWidth = c.strokeWidth,
                        u.setLineDash([5, 5]),
                        u.beginPath(),
                        r(u, t, i),
                        u.stroke(),
                        u.clip(),
                        i.w > 0 && u.drawImage(e, a * s, n * o, Math.abs(i.w * s), Math.abs(i.h * o), a, n, Math.abs(i.w), Math.abs(i.h)),
                        u.beginPath(),
                        r(u, t, i),
                        u.stroke(),
                        u.clip(),
                        u.restore()
                }
        }
    }
    ]),
    angular.module("uiCropper").service("cropEXIF", [function () {
        function e(e) {
            return !!e.exifdata
        }
        function t(e, t) {
            t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "",
                e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
            for (var i = atob(e), r = i.length, s = new ArrayBuffer(r), o = new Uint8Array(s), a = 0; a < r; a++)
                o[a] = i.charCodeAt(a);
            return s
        }
        function i(e, t) {
            var i = new XMLHttpRequest;
            i.open("GET", e, !0),
                i.responseType = "blob",
                i.onload = function (e) {
                    200 !== this.status && 0 !== this.status || t(this.response)
                }
                ,
                i.send()
        }
        function r(e, r) {
            function a(t) {
                var i = s(t)
                    , a = o(t);
                e.exifdata = i || {},
                    e.iptcdata = a || {},
                    r && r.call(e)
            }
            var n = new FileReader;
            if (e.src) {
                /^data\:/i.test(e.src) ? a(t(e.src)) : /^blob\:/i.test(e.src) && (n.onload = function (e) {
                    a(e.target.result)
                }
                    ,
                    i(e.src, function (e) {
                        n.readAsArrayBuffer(e)
                    }));
                var h = new XMLHttpRequest;
                h.onload = function () {
                    if (200 !== this.status && 0 !== this.status)
                        throw "Could not load image";
                    a(h.response),
                        h = null
                }
                    ,
                    h.open("GET", e.src, !0),
                    h.responseType = "arraybuffer";
                try {
                    h.send(null)
                } catch (e) { }
            } else
                window.FileReader && (e instanceof window.Blob || e instanceof window.File) && (n.onload = function (e) {
                    l && console.log("Got file of length " + e.target.result.byteLength),
                        a(e.target.result)
                }
                    ,
                    n.readAsArrayBuffer(e))
        }
        function s(e) {
            var t = new DataView(e);
            if (l && console.log("Got file of length " + e.byteLength),
                255 !== t.getUint8(0) || 216 !== t.getUint8(1))
                return l && console.log("Not a valid JPEG"),
                    !1;
            for (var i, r = 2, s = e.byteLength; r < s;) {
                if (255 !== t.getUint8(r))
                    return l && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)),
                        !1;
                if (i = t.getUint8(r + 1),
                    l && console.log(i),
                    225 === i)
                    return l && console.log("Found 0xFFE1 marker"),
                        u(t, r + 4, t.getUint16(r + 2));
                r += 2 + t.getUint16(r + 2)
            }
        }
        function o(e) {
            var t = new DataView(e);
            if (l && console.log("Got file of length " + e.byteLength),
                255 !== t.getUint8(0) || 216 !== t.getUint8(1))
                return l && console.log("Not a valid JPEG"),
                    !1;
            for (var i = 2, r = e.byteLength; i < r;) {
                if (function (e, t) {
                    return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
                }(t, i)) {
                    var s = t.getUint8(i + 7);
                    return s % 2 != 0 && (s += 1),
                        0 === s && (s = 4),
                        a(e, i + 8 + s, t.getUint16(i + 6 + s))
                }
                i++
            }
        }
        function a(e, t, i) {
            for (var r, s, o, a, n = new DataView(e), h = {}, u = t; u < t + i;)
                28 === n.getUint8(u) && 2 === n.getUint8(u + 1) && (a = n.getUint8(u + 2)) in v && ((o = n.getInt16(u + 3)) + 5,
                    s = v[a],
                    r = c(n, u + 5, o),
                    h.hasOwnProperty(s) ? h[s] instanceof Array ? h[s].push(r) : h[s] = [h[s], r] : h[s] = r),
                    u++;
            return h
        }
        function n(e, t, i, r, s) {
            var o, a, n, c = e.getUint16(i, !s), u = {};
            for (n = 0; n < c; n++)
                o = i + 12 * n + 2,
                    !(a = r[e.getUint16(o, !s)]) && l && console.log("Unknown tag: " + e.getUint16(o, !s)),
                    u[a] = h(e, o, t, i, s);
            return u
        }
        function h(e, t, i, r, s) {
            var o, a, n, h, u, l, g = e.getUint16(t + 2, !s), p = e.getUint32(t + 4, !s), f = e.getUint32(t + 8, !s) + i;
            switch (g) {
                case 1:
                case 7:
                    if (1 === p)
                        return e.getUint8(t + 8, !s);
                    for (o = p > 4 ? f : t + 8,
                        a = [],
                        h = 0; h < p; h++)
                        a[h] = e.getUint8(o + h);
                    return a;
                case 2:
                    return o = p > 4 ? f : t + 8,
                        c(e, o, p - 1);
                case 3:
                    if (1 === p)
                        return e.getUint16(t + 8, !s);
                    for (o = p > 2 ? f : t + 8,
                        a = [],
                        h = 0; h < p; h++)
                        a[h] = e.getUint16(o + 2 * h, !s);
                    return a;
                case 4:
                    if (1 === p)
                        return e.getUint32(t + 8, !s);
                    for (a = [],
                        h = 0; h < p; h++)
                        a[h] = e.getUint32(f + 4 * h, !s);
                    return a;
                case 5:
                    if (1 === p)
                        return u = e.getUint32(f, !s),
                            l = e.getUint32(f + 4, !s),
                            n = {},
                            n.numerator = u,
                            n.denominator = l,
                            n;
                    for (a = [],
                        h = 0; h < p; h++)
                        u = e.getUint32(f + 8 * h, !s),
                            l = e.getUint32(f + 4 + 8 * h, !s),
                            a[h] = {},
                            a[h].numerator = u,
                            a[h].denominator = l;
                    return a;
                case 9:
                    if (1 === p)
                        return e.getInt32(t + 8, !s);
                    for (a = [],
                        h = 0; h < p; h++)
                        a[h] = e.getInt32(f + 4 * h, !s);
                    return a;
                case 10:
                    if (1 === p)
                        return e.getInt32(f, !s) / e.getInt32(f + 4, !s);
                    for (a = [],
                        h = 0; h < p; h++)
                        a[h] = e.getInt32(f + 8 * h, !s) / e.getInt32(f + 4 + 8 * h, !s);
                    return a
            }
        }
        function c(e, t, i) {
            for (var r = "", s = t; s < t + i; s++)
                r += String.fromCharCode(e.getUint8(s));
            return r
        }
        function u(e, t) {
            if ("Exif" !== c(e, t, 4))
                return l && console.log("Not valid EXIF data! " + c(e, t, 4)),
                    !1;
            var i, r, s, o, a, h = t + 6;
            if (18761 === e.getUint16(h))
                i = !1;
            else {
                if (19789 !== e.getUint16(h))
                    return l && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),
                        !1;
                i = !0
            }
            if (42 !== e.getUint16(h + 2, !i))
                return l && console.log("Not valid TIFF data! (no 0x002A)"),
                    !1;
            var u = e.getUint32(h + 4, !i);
            if (u < 8)
                return l && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(h + 4, !i)),
                    !1;
            if ((r = n(e, h, h + u, p, i)).ExifIFDPointer) {
                o = n(e, h, h + r.ExifIFDPointer, g, i);
                for (s in o) {
                    switch (s) {
                        case "LightSource":
                        case "Flash":
                        case "MeteringMode":
                        case "ExposureProgram":
                        case "SensingMethod":
                        case "SceneCaptureType":
                        case "SceneType":
                        case "CustomRendered":
                        case "WhiteBalance":
                        case "GainControl":
                        case "Contrast":
                        case "Saturation":
                        case "Sharpness":
                        case "SubjectDistanceRange":
                        case "FileSource":
                            o[s] = d[s][o[s]];
                            break;
                        case "ExifVersion":
                        case "FlashpixVersion":
                            o[s] = String.fromCharCode(o[s][0], o[s][1], o[s][2], o[s][3]);
                            break;
                        case "ComponentsConfiguration":
                            o[s] = d.Components[o[s][0]] + d.Components[o[s][1]] + d.Components[o[s][2]] + d.Components[o[s][3]]
                    }
                    r[s] = o[s]
                }
            }
            if (r.GPSInfoIFDPointer) {
                a = n(e, h, h + r.GPSInfoIFDPointer, f, i);
                for (s in a) {
                    switch (s) {
                        case "GPSVersionID":
                            a[s] = a[s][0] + "." + a[s][1] + "." + a[s][2] + "." + a[s][3]
                    }
                    r[s] = a[s]
                }
            }
            return r
        }
        var l = !1
            , g = this.Tags = {
                36864: "ExifVersion",
                40960: "FlashpixVersion",
                40961: "ColorSpace",
                40962: "PixelXDimension",
                40963: "PixelYDimension",
                37121: "ComponentsConfiguration",
                37122: "CompressedBitsPerPixel",
                37500: "MakerNote",
                37510: "UserComment",
                40964: "RelatedSoundFile",
                36867: "DateTimeOriginal",
                36868: "DateTimeDigitized",
                37520: "SubsecTime",
                37521: "SubsecTimeOriginal",
                37522: "SubsecTimeDigitized",
                33434: "ExposureTime",
                33437: "FNumber",
                34850: "ExposureProgram",
                34852: "SpectralSensitivity",
                34855: "ISOSpeedRatings",
                34856: "OECF",
                37377: "ShutterSpeedValue",
                37378: "ApertureValue",
                37379: "BrightnessValue",
                37380: "ExposureBias",
                37381: "MaxApertureValue",
                37382: "SubjectDistance",
                37383: "MeteringMode",
                37384: "LightSource",
                37385: "Flash",
                37396: "SubjectArea",
                37386: "FocalLength",
                41483: "FlashEnergy",
                41484: "SpatialFrequencyResponse",
                41486: "FocalPlaneXResolution",
                41487: "FocalPlaneYResolution",
                41488: "FocalPlaneResolutionUnit",
                41492: "SubjectLocation",
                41493: "ExposureIndex",
                41495: "SensingMethod",
                41728: "FileSource",
                41729: "SceneType",
                41730: "CFAPattern",
                41985: "CustomRendered",
                41986: "ExposureMode",
                41987: "WhiteBalance",
                41988: "DigitalZoomRation",
                41989: "FocalLengthIn35mmFilm",
                41990: "SceneCaptureType",
                41991: "GainControl",
                41992: "Contrast",
                41993: "Saturation",
                41994: "Sharpness",
                41995: "DeviceSettingDescription",
                41996: "SubjectDistanceRange",
                40965: "InteroperabilityIFDPointer",
                42016: "ImageUniqueID"
            }
            , p = this.TiffTags = {
                256: "ImageWidth",
                257: "ImageHeight",
                34665: "ExifIFDPointer",
                34853: "GPSInfoIFDPointer",
                40965: "InteroperabilityIFDPointer",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                274: "Orientation",
                277: "SamplesPerPixel",
                284: "PlanarConfiguration",
                530: "YCbCrSubSampling",
                531: "YCbCrPositioning",
                282: "XResolution",
                283: "YResolution",
                296: "ResolutionUnit",
                273: "StripOffsets",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                513: "JPEGInterchangeFormat",
                514: "JPEGInterchangeFormatLength",
                301: "TransferFunction",
                318: "WhitePoint",
                319: "PrimaryChromaticities",
                529: "YCbCrCoefficients",
                532: "ReferenceBlackWhite",
                306: "DateTime",
                270: "ImageDescription",
                271: "Make",
                272: "Model",
                305: "Software",
                315: "Artist",
                33432: "Copyright"
            }
            , f = this.GPSTags = {
                0: "GPSVersionID",
                1: "GPSLatitudeRef",
                2: "GPSLatitude",
                3: "GPSLongitudeRef",
                4: "GPSLongitude",
                5: "GPSAltitudeRef",
                6: "GPSAltitude",
                7: "GPSTimeStamp",
                8: "GPSSatellites",
                9: "GPSStatus",
                10: "GPSMeasureMode",
                11: "GPSDOP",
                12: "GPSSpeedRef",
                13: "GPSSpeed",
                14: "GPSTrackRef",
                15: "GPSTrack",
                16: "GPSImgDirectionRef",
                17: "GPSImgDirection",
                18: "GPSMapDatum",
                19: "GPSDestLatitudeRef",
                20: "GPSDestLatitude",
                21: "GPSDestLongitudeRef",
                22: "GPSDestLongitude",
                23: "GPSDestBearingRef",
                24: "GPSDestBearing",
                25: "GPSDestDistanceRef",
                26: "GPSDestDistance",
                27: "GPSProcessingMethod",
                28: "GPSAreaInformation",
                29: "GPSDateStamp",
                30: "GPSDifferential"
            }
            , d = this.StringValues = {
                ExposureProgram: {
                    0: "Not defined",
                    1: "Manual",
                    2: "Normal program",
                    3: "Aperture priority",
                    4: "Shutter priority",
                    5: "Creative program",
                    6: "Action program",
                    7: "Portrait mode",
                    8: "Landscape mode"
                },
                MeteringMode: {
                    0: "Unknown",
                    1: "Average",
                    2: "CenterWeightedAverage",
                    3: "Spot",
                    4: "MultiSpot",
                    5: "Pattern",
                    6: "Partial",
                    255: "Other"
                },
                LightSource: {
                    0: "Unknown",
                    1: "Daylight",
                    2: "Fluorescent",
                    3: "Tungsten (incandescent light)",
                    4: "Flash",
                    9: "Fine weather",
                    10: "Cloudy weather",
                    11: "Shade",
                    12: "Daylight fluorescent (D 5700 - 7100K)",
                    13: "Day white fluorescent (N 4600 - 5400K)",
                    14: "Cool white fluorescent (W 3900 - 4500K)",
                    15: "White fluorescent (WW 3200 - 3700K)",
                    17: "Standard light A",
                    18: "Standard light B",
                    19: "Standard light C",
                    20: "D55",
                    21: "D65",
                    22: "D75",
                    23: "D50",
                    24: "ISO studio tungsten",
                    255: "Other"
                },
                Flash: {
                    0: "Flash did not fire",
                    1: "Flash fired",
                    5: "Strobe return light not detected",
                    7: "Strobe return light detected",
                    9: "Flash fired, compulsory flash mode",
                    13: "Flash fired, compulsory flash mode, return light not detected",
                    15: "Flash fired, compulsory flash mode, return light detected",
                    16: "Flash did not fire, compulsory flash mode",
                    24: "Flash did not fire, auto mode",
                    25: "Flash fired, auto mode",
                    29: "Flash fired, auto mode, return light not detected",
                    31: "Flash fired, auto mode, return light detected",
                    32: "No flash function",
                    65: "Flash fired, red-eye reduction mode",
                    69: "Flash fired, red-eye reduction mode, return light not detected",
                    71: "Flash fired, red-eye reduction mode, return light detected",
                    73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                    77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                    79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                    89: "Flash fired, auto mode, red-eye reduction mode",
                    93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                    95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                },
                SensingMethod: {
                    1: "Not defined",
                    2: "One-chip color area sensor",
                    3: "Two-chip color area sensor",
                    4: "Three-chip color area sensor",
                    5: "Color sequential area sensor",
                    7: "Trilinear sensor",
                    8: "Color sequential linear sensor"
                },
                SceneCaptureType: {
                    0: "Standard",
                    1: "Landscape",
                    2: "Portrait",
                    3: "Night scene"
                },
                SceneType: {
                    1: "Directly photographed"
                },
                CustomRendered: {
                    0: "Normal process",
                    1: "Custom process"
                },
                WhiteBalance: {
                    0: "Auto white balance",
                    1: "Manual white balance"
                },
                GainControl: {
                    0: "None",
                    1: "Low gain up",
                    2: "High gain up",
                    3: "Low gain down",
                    4: "High gain down"
                },
                Contrast: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
                },
                Saturation: {
                    0: "Normal",
                    1: "Low saturation",
                    2: "High saturation"
                },
                Sharpness: {
                    0: "Normal",
                    1: "Soft",
                    2: "Hard"
                },
                SubjectDistanceRange: {
                    0: "Unknown",
                    1: "Macro",
                    2: "Close view",
                    3: "Distant view"
                },
                FileSource: {
                    3: "DSC"
                },
                Components: {
                    0: "",
                    1: "Y",
                    2: "Cb",
                    3: "Cr",
                    4: "R",
                    5: "G",
                    6: "B"
                }
            }
            , v = {
                120: "caption",
                110: "credit",
                25: "keywords",
                55: "dateCreated",
                80: "byline",
                85: "bylineTitle",
                122: "captionWriter",
                105: "headline",
                116: "copyright",
                15: "category"
            };
        this.getData = function (t, i) {
            return !((t instanceof Image || t instanceof HTMLImageElement) && !t.complete) && (e(t) ? i && i.call(t) : r(t, i),
                !0)
        }
            ,
            this.getTag = function (t, i) {
                if (e(t))
                    return t.exifdata[i]
            }
            ,
            this.getAllTags = function (t) {
                if (!e(t))
                    return {};
                var i, r = t.exifdata, s = {};
                for (i in r)
                    r.hasOwnProperty(i) && (s[i] = r[i]);
                return s
            }
            ,
            this.pretty = function (t) {
                if (!e(t))
                    return "";
                var i, r = t.exifdata, s = "";
                for (i in r)
                    r.hasOwnProperty(i) && ("object" == typeof r[i] ? r[i] instanceof Number ? s += i + " : " + r[i] + " [" + r[i].numerator + "/" + r[i].denominator + "]\r\n" : s += i + " : [" + r[i].length + " values]\r\n" : s += i + " : " + r[i] + "\r\n");
                return s
            }
            ,
            this.readFromBinaryFile = function (e) {
                return s(e)
            }
    }
    ]),
    angular.module("uiCropper").factory("cropHost", ["$document", "$q", "cropAreaCircle", "cropAreaSquare", "cropAreaRectangle", "cropEXIF", function (e, t, i, r, s, o) {
        var a = 8
            , n = function (e) {
                var t = e.getBoundingClientRect()
                    , i = document.body
                    , r = document.documentElement
                    , s = window.pageYOffset || r.scrollTop || i.scrollTop
                    , o = window.pageXOffset || r.scrollLeft || i.scrollLeft
                    , a = r.clientTop || i.clientTop || 0
                    , n = r.clientLeft || i.clientLeft || 0
                    , h = t.top + s - a
                    , c = t.left + o - n;
                return {
                    top: Math.round(h),
                    left: Math.round(c)
                }
            };
        return function (h, c, u) {
            function l() {
                g.clearRect(0, 0, g.canvas.width, g.canvas.height),
                    null !== p && (g.drawImage(p, 0, 0, g.canvas.width, g.canvas.height),
                        g.save(),
                        g.fillStyle = "rgba(0, 0, 0, 0.65)",
                        g.fillRect(0, 0, g.canvas.width, g.canvas.height),
                        g.restore(),
                        f.draw())
            }
            var g = null
                , p = null
                , f = null
                , d = null
                , v = null
                , m = this
                , w = [100, 100]
                , _ = [300, 300]
                , y = null
                , z = []
                , S = {
                    w: 200,
                    h: 200
                }
                , C = null
                , I = "image/png"
                , x = null
                , R = !1;
            this.setInitMax = function (e) {
                d = e
            }
                ,
                this.setAllowCropResizeOnCorners = function (e) {
                    f.setAllowCropResizeOnCorners(e)
                }
                ;
            var b = function () {
                if (null !== p) {
                    f.setImage(p);
                    var e = [p.width, p.height]
                        , t = p.width / p.height
                        , i = e;
                    i[0] > _[0] ? (i[0] = _[0],
                        i[1] = i[0] / t) : i[0] < w[0] && (i[0] = w[0],
                            i[1] = i[0] / t),
                        "fixed-height" === y && i[1] > _[1] ? (i[1] = _[1],
                            i[0] = i[1] * t) : i[1] < w[1] && (i[1] = w[1],
                                i[0] = i[1] * t),
                        h.prop("width", i[0]).prop("height", i[1]),
                        "fixed-height" === y && h.css({
                            "margin-left": -i[0] / 2 + "px",
                            "margin-top": -i[1] / 2 + "px"
                        });
                    var r = g.canvas.width
                        , s = g.canvas.height
                        , o = m.getAreaType();
                    if ("circle" === o || "square" === o)
                        s < r && (r = s),
                            s = r;
                    else if ("rectangle" === o && v) {
                        var a = f.getAspect();
                        r / s > a ? r = a * s : s = a * r
                    }
                    if (d ? f.setSize({
                        w: r,
                        h: s
                    }) : void 0 !== f.getInitSize() ? f.setSize({
                        w: Math.min(f.getInitSize().w, r / 2),
                        h: Math.min(f.getInitSize().h, s / 2)
                    }) : f.setSize({
                        w: Math.min(200, r / 2),
                        h: Math.min(200, s / 2)
                    }),
                        f.getInitCoords())
                        if (m.areaInitIsRelativeToImage) {
                            var n = p.width / i[0];
                            f.setSize({
                                w: f.getInitSize().w / n,
                                h: f.getInitSize().h / n,
                                x: f.getInitCoords().x / n,
                                y: f.getInitCoords().y / n
                            })
                        } else
                            f.setSize({
                                w: f.getSize().w,
                                h: f.getSize().h,
                                x: f.getInitCoords().x,
                                y: f.getInitCoords().y
                            });
                    else
                        f.setCenterPoint({
                            x: g.canvas.width / 2,
                            y: g.canvas.height / 2
                        })
                } else
                    h.prop("width", 0).prop("height", 0).css({
                        "margin-top": 0
                    });
                l()
            }
                , D = function (e) {
                    return angular.isDefined(e.changedTouches) ? e.changedTouches : e.originalEvent.changedTouches
                }
                , M = function (e) {
                    if (null !== p) {
                        var t, i, r = n(g.canvas);
                        "touchmove" === e.type ? (t = D(e)[0].pageX,
                            i = D(e)[0].pageY) : (t = e.pageX,
                                i = e.pageY),
                            f.processMouseMove(t - r.left, i - r.top),
                            l()
                    }
                }
                , P = function (e) {
                    if (e.preventDefault(),
                        e.stopPropagation(),
                        null !== p) {
                        var t, i, r = n(g.canvas);
                        "touchstart" === e.type ? (t = D(e)[0].pageX,
                            i = D(e)[0].pageY) : (t = e.pageX,
                                i = e.pageY),
                            f.processMouseDown(t - r.left, i - r.top),
                            l()
                    }
                }
                , A = function (e) {
                    if (null !== p) {
                        var t, i, r = n(g.canvas);
                        "touchend" === e.type ? (t = D(e)[0].pageX,
                            i = D(e)[0].pageY) : (t = e.pageX,
                                i = e.pageY),
                            f.processMouseUp(t - r.left, i - r.top),
                            l()
                    }
                }
                , B = function (e, t) {
                    var i, r;
                    if (r = angular.element("<canvas></canvas>")[0],
                        i = r.getContext("2d"),
                        r.width = e.w,
                        r.height = e.h,
                        null !== p) {
                        var s = (t.x - f.getSize().w / 2) * (p.width / g.canvas.width)
                            , o = (t.y - f.getSize().h / 2) * (p.height / g.canvas.height)
                            , a = f.getSize().w * (p.width / g.canvas.width)
                            , n = f.getSize().h * (p.height / g.canvas.height);
                        if (R)
                            i.drawImage(p, s, o, a, n, 0, 0, e.w, e.h);
                        else {
                            var h, c, u = a / n;
                            u > 1 ? h = (c = e.w) / u : c = (h = e.h) * u,
                                r.width = c,
                                r.height = h,
                                i.drawImage(p, s, o, a, n, 0, 0, Math.round(c), Math.round(h))
                        }
                    }
                    return r
                }
                , H = function (e) {
                    var t, i = {
                        dataURI: null,
                        imageData: null
                    };
                    return t = B(e, f.getCenterPoint()),
                        null !== p && (i.dataURI = null !== x ? t.toDataURL(I, x) : t.toDataURL(I)),
                        i
                };
            this.getResultImage = function () {
                if (0 === z.length)
                    return H(this.getResultImageSize());
                for (var e = [], t = 0; t < z.length; t++)
                    e.push({
                        dataURI: H(z[t]).dataURI,
                        w: z[t].w,
                        h: z[t].h
                    });
                return e
            }
                ,
                this.getResultImageDataBlob = function () {
                    var e, i = t.defer();
                    return e = B(this.getResultImageSize(), f.getCenterPoint()),
                        null !== x ? e.toBlob(function (e) {
                            i.resolve(e)
                        }, I, x) : e.toBlob(function (e) {
                            i.resolve(e)
                        }, I),
                        i.promise
                }
                ,
                this.getAreaCoords = function () {
                    return f.getSize()
                }
                ,
                this.getArea = function () {
                    return f
                }
                ,
                this.setNewImageSource = function (e) {
                    if (p = null,
                        b(),
                        e) {
                        var t = new Image;
                        t.onload = function () {
                            u.trigger("load-done"),
                                o.getData(t, function () {
                                    var e = o.getTag(t, "Orientation");
                                    if ([3, 6, 8].indexOf(e) > -1) {
                                        var i = document.createElement("canvas")
                                            , r = i.getContext("2d")
                                            , s = t.width
                                            , a = t.height
                                            , n = 0
                                            , h = 0
                                            , c = 0
                                            , l = 0
                                            , g = 0;
                                        switch (l = s,
                                        g = a,
                                        e) {
                                            case 3:
                                                n = -t.width,
                                                    h = -t.height,
                                                    c = 180;
                                                break;
                                            case 6:
                                                s = t.height,
                                                    a = t.width,
                                                    h = -t.height,
                                                    l = a,
                                                    g = s,
                                                    c = 90;
                                                break;
                                            case 8:
                                                s = t.height,
                                                    a = t.width,
                                                    n = -t.width,
                                                    l = a,
                                                    g = s,
                                                    c = 270
                                        }
                                        if (s > 1e3 || a > 1e3) {
                                            var f = 0;
                                            s > 1e3 ? (f = 1e3 / s,
                                                s = 1e3,
                                                a *= f) : a > 1e3 && (f = 1e3 / a,
                                                    a = 1e3,
                                                    s *= f),
                                                h *= f,
                                                n *= f,
                                                l *= f,
                                                g *= f
                                        }
                                        i.width = s,
                                            i.height = a,
                                            r.rotate(c * Math.PI / 180),
                                            r.drawImage(t, n, h, l, g),
                                            (p = new Image).onload = function () {
                                                b(),
                                                    u.trigger("image-updated")
                                            }
                                            ,
                                            p.src = i.toDataURL(I)
                                    } else
                                        p = t,
                                            u.trigger("image-updated");
                                    b()
                                })
                        }
                            ,
                            t.onerror = function () {
                                u.trigger("load-error")
                            }
                            ,
                            u.trigger("load-start"),
                            e instanceof window.Blob ? t.src = URL.createObjectURL(e) : ("http" !== e.substring(0, 4).toLowerCase() && "//" !== e.substring(0, 2) || (t.crossOrigin = "anonymous"),
                                t.src = e)
                    }
                }
                ,
                this.setMaxDimensions = function (e, t) {
                    if (_ = [e, t],
                        null !== p) {
                        var i = g.canvas.width
                            , r = g.canvas.height
                            , s = [p.width, p.height]
                            , o = p.width / p.height
                            , a = s;
                        a[0] > _[0] ? (a[0] = _[0],
                            a[1] = a[0] / o) : a[0] < w[0] && (a[0] = w[0],
                                a[1] = a[0] / o),
                            "fixed-height" === y && a[1] > _[1] ? (a[1] = _[1],
                                a[0] = a[1] * o) : a[1] < w[1] && (a[1] = w[1],
                                    a[0] = a[1] * o),
                            h.prop("width", a[0]).prop("height", a[1]),
                            "fixed-height" === y && h.css({
                                "margin-left": -a[0] / 2 + "px",
                                "margin-top": -a[1] / 2 + "px"
                            });
                        var n = g.canvas.width / i
                            , c = g.canvas.height / r
                            , u = Math.min(n, c)
                            , d = f.getCenterPoint();
                        f.setSize({
                            w: f.getSize().w * u,
                            h: f.getSize().h * u
                        }),
                            f.setCenterPoint({
                                x: d.x * n,
                                y: d.y * c
                            })
                    } else
                        h.prop("width", 0).prop("height", 0).css({
                            "margin-top": 0
                        });
                    l()
                }
                ,
                this.setAreaMinSize = function (e) {
                    angular.isUndefined(e) || (e = "number" == typeof e || "string" == typeof e ? {
                        w: parseInt(parseInt(e), 10),
                        h: parseInt(parseInt(e), 10)
                    } : {
                        w: parseInt(e.w, 10),
                        h: parseInt(e.h, 10)
                    },
                        isNaN(e.w) || isNaN(e.h) || (f.setMinSize(e),
                            l()))
                }
                ,
                this.setAreaMinRelativeSize = function (e) {
                    if (null !== p && !angular.isUndefined(e)) {
                        var t = f.getCanvasSize();
                        "number" == typeof e || "string" == typeof e ? (C = {
                            w: e,
                            h: e
                        },
                            e = {
                                w: t.w / (p.width / parseInt(parseInt(e), 10)),
                                h: t.h / (p.height / parseInt(parseInt(e), 10))
                            }) : (C = e,
                                e = {
                                    w: t.w / (p.width / parseInt(parseInt(e.w), 10)),
                                    h: t.h / (p.height / parseInt(parseInt(e.h), 10))
                                }),
                            isNaN(e.w) || isNaN(e.h) || (f.setMinSize(e),
                                l())
                    }
                }
                ,
                this.setAreaInitSize = function (e) {
                    angular.isUndefined(e) || (e = "number" == typeof e || "string" == typeof e ? {
                        w: parseInt(parseInt(e), 10),
                        h: parseInt(parseInt(e), 10)
                    } : {
                        w: parseInt(e.w, 10),
                        h: parseInt(e.h, 10)
                    },
                        isNaN(e.w) || isNaN(e.h) || (f.setInitSize(e),
                            l()))
                }
                ,
                this.setAreaInitCoords = function (e) {
                    angular.isUndefined(e) || (e = {
                        x: parseInt(e.x, 10),
                        y: parseInt(e.y, 10)
                    },
                        isNaN(e.x) || isNaN(e.y) || (f.setInitCoords(e),
                            l()))
                }
                ,
                this.setMaxCanvasDimensions = function (e) {
                    if (!angular.isUndefined(e)) {
                        var t = [];
                        t = "number" == typeof e || "string" == typeof e ? [parseInt(parseInt(e), 10), parseInt(parseInt(e), 10)] : [parseInt(e.w, 10), parseInt(e.h, 10)],
                            !isNaN(t[0]) && t[0] > 0 && t[0] > w[0] && !isNaN(t[1]) && t[1] > 0 && t[1] > w[1] && (_ = t)
                    }
                }
                ,
                this.setMinCanvasDimensions = function (e) {
                    if (!angular.isUndefined(e)) {
                        var t = [];
                        t = "number" == typeof e || "string" == typeof e ? [parseInt(parseInt(e), 10), parseInt(parseInt(e), 10)] : [parseInt(e.w, 10), parseInt(e.h, 10)],
                            !isNaN(t[0]) && t[0] >= 0 && !isNaN(t[1]) && t[1] >= 0 && (w = t)
                    }
                }
                ,
                this.setScalemode = function (e) {
                    y = e
                }
                ,
                this.getScalemode = function () {
                    return y
                }
                ,
                this.getResultImageSize = function () {
                    if ("selection" === S)
                        return f.getSize();
                    if ("max" === S) {
                        var e = 1;
                        p && g && g.canvas && (e = p.width / g.canvas.width);
                        var t = {
                            w: e * f.getSize().w,
                            h: e * f.getSize().h
                        };
                        return C && (t.w < C.w && (t.w = C.w),
                            t.h < C.h && (t.h = C.h)),
                            t
                    }
                    return S
                }
                ,
                this.setResultImageSize = function (e) {
                    if (angular.isArray(e))
                        return z = e.slice(),
                            void (e = {
                                w: parseInt(e[0].w, 10),
                                h: parseInt(e[0].h, 10)
                            });
                    angular.isUndefined(e) || (angular.isString(e) ? S = e : (angular.isNumber(e) && (e = {
                        w: e = parseInt(e, 10),
                        h: e
                    }),
                        e = {
                            w: parseInt(e.w, 10),
                            h: parseInt(e.h, 10)
                        },
                        isNaN(e.w) || isNaN(e.h) || (S = e,
                            l())))
                }
                ,
                this.setResultImageFormat = function (e) {
                    I = e
                }
                ,
                this.setResultImageQuality = function (e) {
                    e = parseFloat(e),
                        !isNaN(e) && e >= 0 && e <= 1 && (x = e)
                }
                ,
                this.getAreaType = function () {
                    return f.getType()
                }
                ,
                this.setAreaType = function (e) {
                    var t = f.getCenterPoint()
                        , o = f.getSize()
                        , a = f.getMinSize()
                        , n = t.x
                        , h = t.y
                        , c = i;
                    "square" === e ? c = r : "rectangle" === e && (c = s),
                        (f = new c(g, u)).setMinSize(a),
                        f.setSize(o),
                        "square" === e || "circle" === e ? (R = !0,
                            f.setForceAspectRatio(!0)) : (R = !1,
                                f.setForceAspectRatio(!1)),
                        f.setCenterPoint({
                            x: n,
                            y: h
                        }),
                        null !== p && f.setImage(p),
                        l()
                }
                ,
                this.getDominantColor = function (e) {
                    var i = new Image
                        , r = new ColorThief
                        , s = null
                        , o = t.defer();
                    return i.src = e,
                        i.onload = function () {
                            s = r.getColor(i),
                                o.resolve(s)
                        }
                        ,
                        o.promise
                }
                ,
                this.getPalette = function (e) {
                    var i = new Image
                        , r = new ColorThief
                        , s = null
                        , o = t.defer();
                    return i.src = e,
                        i.onload = function () {
                            s = r.getPalette(i, a),
                                o.resolve(s)
                        }
                        ,
                        o.promise
                }
                ,
                this.setPaletteColorLength = function (e) {
                    a = e
                }
                ,
                this.setAspect = function (e) {
                    v = !0,
                        f.setAspect(e);
                    var t = f.getMinSize();
                    t.w = t.h * e,
                        f.setMinSize(t);
                    var i = f.getSize();
                    i.w = i.h * e,
                        f.setSize(i)
                }
                ,
                g = h[0].getContext("2d"),
                f = new i(g, u),
                e.on("mousemove", M),
                h.on("mousedown", P),
                e.on("mouseup", A),
                e.on("touchmove", M),
                h.on("touchstart", P),
                e.on("touchend", A),
                this.destroy = function () {
                    e.off("mousemove", M),
                        h.off("mousedown", P),
                        e.off("mouseup", A),
                        e.off("touchmove", M),
                        h.off("touchstart", P),
                        e.off("touchend", A),
                        h.remove()
                }
        }
    }
    ]),
    angular.module("uiCropper").factory("cropPubSub", [function () {
        return function () {
            var e = {};
            this.on = function (t, i) {
                return t.split(" ").forEach(function (t) {
                    e[t] || (e[t] = []),
                        e[t].push(i)
                }),
                    this
            }
                ,
                this.trigger = function (t, i) {
                    return angular.forEach(e[t], function (e) {
                        e.call(null, i)
                    }),
                        this
                }
        }
    }
    ]),
    angular.module("uiCropper").directive("uiCropper", ["$timeout", "cropHost", "cropPubSub", function (e, t, i) {
        return {
            restrict: "E",
            scope: {
                image: "=",
                resultImage: "=",
                resultArrayImage: "=?",
                resultBlob: "=?",
                urlBlob: "=?",
                chargement: "=?",
                cropject: "=?",
                maxCanvasDimensions: "=?",
                minCanvasDimensions: "=?",
                canvasScalemode: "@?",
                changeOnFly: "=?",
                liveView: "=?",
                initMaxArea: "=?",
                areaCoords: "=?",
                areaType: "@",
                areaMinSize: "=?",
                areaInitSize: "=?",
                areaInitCoords: "=?",
                areaInitIsRelativeToImage: "=?",
                areaMinRelativeSize: "=?",
                resultImageSize: "=?",
                resultImageFormat: "@",
                resultImageQuality: "=?",
                aspectRatio: "=?",
                allowCropResizeOnCorners: "=?",
                dominantColor: "=?",
                paletteColor: "=?",
                paletteColorLength: "=?",
                onChange: "&",
                onLoadBegin: "&",
                onLoadDone: "&",
                onLoadError: "&"
            },
            template: "<canvas></canvas>",
            controller: ["$scope", function (e) {
                e.events = new i
            }
            ],
            link: function (i, r) {
                var s = i.events
                    , o = new t(r.find("canvas"), {}, s);
                i.canvasScalemode ? o.setScalemode(i.canvasScalemode) : o.setScalemode("fixed-height"),
                    r.addClass(o.getScalemode());
                var a, n = function (e) {
                    e.areaCoords = o.getAreaCoords()
                }, h = function (e, t, i) {
                    if ("" !== e.image && (!e.liveView.block || t)) {
                        var r, s = o.getResultImage();
                        angular.isArray(s) ? (r = s[0].dataURI,
                            e.resultArrayImage = s) : r = s.dataURI;
                        var h = window.URL || window.webkitURL;
                        a !== r && (a = r,
                            e.resultImage = r,
                            e.liveView.callback && e.liveView.callback(r),
                            i && i(r),
                            o.getResultImageDataBlob().then(function (t) {
                                e.resultBlob = t,
                                    e.urlBlob = h.createObjectURL(t)
                            }),
                            e.resultImage && (o.getDominantColor(e.resultImage).then(function (t) {
                                e.dominantColor = t
                            }),
                                o.getPalette(e.resultImage).then(function (t) {
                                    e.paletteColor = t
                                })),
                            n(e),
                            e.onChange({
                                $dataURI: e.resultImage
                            }))
                    }
                };
                i.liveView && "boolean" == typeof i.liveView.block ? i.liveView.render = function (e) {
                    h(i, !0, e)
                }
                    : i.liveView = {
                        block: !1
                    };
                var c = function (e) {
                    var t = o.getAreaCoords()
                        , i = {
                            x: o.getArea().getImage().width / o.getArea().getCanvasSize().w,
                            y: o.getArea().getImage().height / o.getArea().getCanvasSize().h
                        };
                    e.cropject = {
                        canvasSize: o.getArea().getCanvasSize(),
                        areaCoords: t,
                        cropWidth: t.w,
                        cropHeight: t.h,
                        cropTop: t.y,
                        cropLeft: t.x,
                        cropImageWidth: Math.round(t.w * i.x),
                        cropImageHeight: Math.round(t.h * i.y),
                        cropImageTop: Math.round(t.y * i.y),
                        cropImageLeft: Math.round(t.x * i.x)
                    }
                }
                    , u = function (t) {
                        return function () {
                            e(function () {
                                i.$apply(function (e) {
                                    t(e)
                                })
                            })
                        }
                    };
                i.chargement || (i.chargement = function () {
                    switch (window.navigator.userLanguage || window.navigator.language) {
                        case "nl":
                        case "nl_NL":
                            return "Aan het laden";
                        case "fr":
                        case "fr-FR":
                            return "Chargement";
                        case "es":
                        case "es-ES":
                            return "Cargando";
                        case "ca":
                        case "ca-ES":
                            return "Càrrega";
                        case "de":
                        case "de-DE":
                            return "Laden";
                        case "pt":
                        case "pt-BR":
                            return "Carregando";
                        default:
                            return "Loading"
                    }
                }());
                var l = function () {
                    r.append('<div class="loading"><span>' + i.chargement + "...</span></div>")
                };
                s.on("load-start", u(function (e) {
                    e.onLoadBegin({})
                })).on("load-done", u(function (e) {
                    var t = r.children();
                    angular.forEach(t, function (e) {
                        angular.element(e).hasClass("loading") && angular.element(e).remove()
                    }),
                        c(e),
                        e.onLoadDone({})
                })).on("load-error", u(function (e) {
                    e.onLoadError({})
                })).on("area-move area-resize", u(function (e) {
                    !0 === e.changeOnFly && h(e),
                        c(e)
                })).on("image-updated", u(function (e) {
                    o.setAreaMinRelativeSize(e.areaMinRelativeSize)
                })).on("area-move-end area-resize-end image-updated", u(function (e) {
                    h(e),
                        c(e)
                })),
                    i.$watch("image", function (t) {
                        t && l(),
                            null !== i.timeout && e.cancel(i.timeout),
                            i.timeout = e(function () {
                                i.timeout = null,
                                    o.setInitMax(i.initMaxArea),
                                    o.setNewImageSource(i.image)
                            }, 100)
                    }),
                    i.$watch("areaType", function () {
                        o.setAreaType(i.areaType),
                            h(i)
                    }),
                    i.$watch("areaMinSize", function () {
                        o.setAreaMinSize(i.areaMinSize),
                            h(i)
                    }),
                    i.$watch("areaMinRelativeSize", function () {
                        "" !== i.image && (o.setAreaMinRelativeSize(i.areaMinRelativeSize),
                            h(i))
                    }),
                    i.$watch("areaInitSize", function () {
                        o.setAreaInitSize(i.areaInitSize),
                            h(i)
                    }),
                    i.$watch("areaInitCoords", function () {
                        o.setAreaInitCoords(i.areaInitCoords),
                            o.areaInitIsRelativeToImage = i.areaInitIsRelativeToImage,
                            h(i)
                    }),
                    i.$watch("maxCanvasDimensions", function () {
                        o.setMaxCanvasDimensions(i.maxCanvasDimensions)
                    }),
                    i.$watch("minCanvasDimensions", function () {
                        o.setMinCanvasDimensions(i.minCanvasDimensions)
                    }),
                    i.$watch("resultImageFormat", function () {
                        o.setResultImageFormat(i.resultImageFormat),
                            h(i)
                    }),
                    i.$watch("resultImageQuality", function () {
                        o.setResultImageQuality(i.resultImageQuality),
                            h(i)
                    }),
                    i.$watch("resultImageSize", function () {
                        o.setResultImageSize(i.resultImageSize),
                            h(i)
                    }),
                    i.$watch("paletteColorLength", function () {
                        o.setPaletteColorLength(i.paletteColorLength)
                    }),
                    i.$watch("aspectRatio", function () {
                        "string" == typeof i.aspectRatio && "" !== i.aspectRatio && (i.aspectRatio = parseInt(i.aspectRatio)),
                            i.aspectRatio && o.setAspect(i.aspectRatio)
                    }),
                    i.$watch("allowCropResizeOnCorners", function () {
                        i.allowCropResizeOnCorners && o.setAllowCropResizeOnCorners(i.allowCropResizeOnCorners)
                    }),
                    i.$watch(function () {
                        return "fixed-height" === o.getScalemode() ? [r[0].clientWidth, r[0].clientHeight] : "full-width" === o.getScalemode() ? r[0].clientWidth : void 0
                    }, function (e) {
                        "fixed-height" === o.getScalemode() && e[0] > 0 && e[1] > 0 && (o.setMaxDimensions(e[0], e[1]),
                            h(i)),
                            "full-width" === o.getScalemode() && e > 0 && o.setMaxDimensions(e)
                    }, !0),
                    i.$on("$destroy", function () {
                        o.destroy()
                    })
            }
        }
    }
    ]),
    function (e) {
        "use strict";
        var t, i = e.Uint8Array, r = e.HTMLCanvasElement, s = r && r.prototype, o = /\s*;\s*base64\s*(?:;|$)/i, a = "toDataURL", n = function (e) {
            for (var r, s, o = e.length, a = new i(o / 4 * 3 | 0), n = 0, h = 0, c = [0, 0], u = 0, l = 0; o--;)
                s = e.charCodeAt(n++),
                    255 !== (r = t[s - 43]) && void 0 !== r && (c[1] = c[0],
                        c[0] = s,
                        l = l << 6 | r,
                        4 === ++u && (a[h++] = l >>> 16,
                            61 !== c[1] && (a[h++] = l >>> 8),
                            61 !== c[0] && (a[h++] = l),
                            u = 0));
            return a
        };
        i && (t = new i([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])),
            r && !s.toBlob && (s.toBlob = function (e, t) {
                if (t || (t = "image/png"),
                    this.mozGetAsFile)
                    e(this.mozGetAsFile("canvas", t));
                else if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(t))
                    e(this.msToBlob());
                else {
                    var r, s = Array.prototype.slice.call(arguments, 1), h = this[a].apply(this, s), c = h.indexOf(","), u = h.substring(c + 1), l = o.test(h.substring(0, c));
                    Blob.fake ? ((r = new Blob).encoding = l ? "base64" : "URI",
                        r.data = u,
                        r.size = u.length) : i && (r = l ? new Blob([n(u)], {
                            type: t
                        }) : new Blob([decodeURIComponent(u)], {
                            type: t
                        })),
                        void 0 !== e && e(r)
                }
            }
                ,
                s.toDataURLHD ? s.toBlobHD = function () {
                    a = "toDataURLHD";
                    var e = this.toBlob();
                    return a = "toDataURL",
                        e
                }
                    : s.toBlobHD = s.toBlob)
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content || this),
    function () {
        var e = function (e) {
            this.canvas = document.createElement("canvas"),
                this.context = this.canvas.getContext("2d"),
                document.body.appendChild(this.canvas),
                this.width = this.canvas.width = e.width,
                this.height = this.canvas.height = e.height,
                this.context.drawImage(e, 0, 0, this.width, this.height)
        };
        e.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height)
        }
            ,
            e.prototype.update = function (e) {
                this.context.putImageData(e, 0, 0)
            }
            ,
            e.prototype.getPixelCount = function () {
                return this.width * this.height
            }
            ,
            e.prototype.getImageData = function () {
                return this.context.getImageData(0, 0, this.width, this.height)
            }
            ,
            e.prototype.removeCanvas = function () {
                this.canvas.parentNode.removeChild(this.canvas)
            }
            ;
        var t = function () { };
        if (window.ColorThief = t,
            t.prototype.getColor = function (e, t) {
                return this.getPalette(e, 5, t)[0]
            }
            ,
            t.prototype.getPalette = function (t, i, s) {
                void 0 === i && (i = 10),
                    (void 0 === s || s < 1) && (s = 10);
                for (var o, a, n, h, c = new e(t), u = c.getImageData().data, l = c.getPixelCount(), g = [], p = 0; p < l; p += s)
                    a = u[(o = 4 * p) + 0],
                        n = u[o + 1],
                        h = u[o + 2],
                        u[o + 3] >= 125 && (a > 250 && n > 250 && h > 250 || g.push([a, n, h]));
                var f = r.quantize(g, i)
                    , d = f ? f.palette() : null;
                return c.removeCanvas(),
                    d
            }
            ,
            !i)
            var i = {
                map: function (e, t) {
                    var i = {};
                    return t ? e.map(function (e, r) {
                        return i.index = r,
                            t.call(i, e)
                    }) : e.slice()
                },
                naturalOrder: function (e, t) {
                    return e < t ? -1 : e > t ? 1 : 0
                },
                sum: function (e, t) {
                    var i = {};
                    return e.reduce(t ? function (e, r, s) {
                        return i.index = s,
                            e + t.call(i, r)
                    }
                        : function (e, t) {
                            return e + t
                        }
                        , 0)
                },
                max: function (e, t) {
                    return Math.max.apply(null, t ? i.map(e, t) : e)
                }
            };
        var r = function () {
            function e(e, t, i) {
                return (e << 2 * h) + (t << h) + i
            }
            function t(e) {
                function t() {
                    i.sort(e),
                        r = !0
                }
                var i = []
                    , r = !1;
                return {
                    push: function (e) {
                        i.push(e),
                            r = !1
                    },
                    peek: function (e) {
                        return r || t(),
                            void 0 === e && (e = i.length - 1),
                            i[e]
                    },
                    pop: function () {
                        return r || t(),
                            i.pop()
                    },
                    size: function () {
                        return i.length
                    },
                    map: function (e) {
                        return i.map(e)
                    },
                    debug: function () {
                        return r || t(),
                            i
                    }
                }
            }
            function r(e, t, i, r, s, o, a) {
                var n = this;
                n.r1 = e,
                    n.r2 = t,
                    n.g1 = i,
                    n.g2 = r,
                    n.b1 = s,
                    n.b2 = o,
                    n.histo = a
            }
            function s() {
                this.vboxes = new t(function (e, t) {
                    return i.naturalOrder(e.vbox.count() * e.vbox.volume(), t.vbox.count() * t.vbox.volume())
                }
                )
            }
            function o(t) {
                var i, r, s, o, a = 1 << 3 * h, n = new Array(a);
                return t.forEach(function (t) {
                    r = t[0] >> c,
                        s = t[1] >> c,
                        o = t[2] >> c,
                        i = e(r, s, o),
                        n[i] = (n[i] || 0) + 1
                }),
                    n
            }
            function a(e, t) {
                var i, s, o, a = 1e6, n = 0, h = 1e6, u = 0, l = 1e6, g = 0;
                return e.forEach(function (e) {
                    i = e[0] >> c,
                        s = e[1] >> c,
                        o = e[2] >> c,
                        i < a ? a = i : i > n && (n = i),
                        s < h ? h = s : s > u && (u = s),
                        o < l ? l = o : o > g && (g = o)
                }),
                    new r(a, n, h, u, l, g, t)
            }
            function n(t, r) {
                function s(e) {
                    var t, i, s, o, a, n = e + "1", h = e + "2", u = 0;
                    for (c = r[n]; c <= r[h]; c++)
                        if (f[c] > p / 2) {
                            for (s = r.copy(),
                                o = r.copy(),
                                a = (t = c - r[n]) <= (i = r[h] - c) ? Math.min(r[h] - 1, ~~(c + i / 2)) : Math.max(r[n], ~~(c - 1 - t / 2)); !f[a];)
                                a++;
                            for (u = d[a]; !u && f[a - 1];)
                                u = d[--a];
                            return s[h] = a,
                                o[n] = s[h] + 1,
                                [s, o]
                        }
                }
                if (r.count()) {
                    var o = r.r2 - r.r1 + 1
                        , a = r.g2 - r.g1 + 1
                        , n = r.b2 - r.b1 + 1
                        , h = i.max([o, a, n]);
                    if (1 == r.count())
                        return [r.copy()];
                    var c, u, l, g, p = 0, f = [], d = [];
                    if (h == o)
                        for (c = r.r1; c <= r.r2; c++) {
                            for (g = 0,
                                u = r.g1; u <= r.g2; u++)
                                for (l = r.b1; l <= r.b2; l++)
                                    g += t[e(c, u, l)] || 0;
                            p += g,
                                f[c] = p
                        }
                    else if (h == a)
                        for (c = r.g1; c <= r.g2; c++) {
                            for (g = 0,
                                u = r.r1; u <= r.r2; u++)
                                for (l = r.b1; l <= r.b2; l++)
                                    g += t[e(u, c, l)] || 0;
                            p += g,
                                f[c] = p
                        }
                    else
                        for (c = r.b1; c <= r.b2; c++) {
                            for (g = 0,
                                u = r.r1; u <= r.r2; u++)
                                for (l = r.g1; l <= r.g2; l++)
                                    g += t[e(u, l, c)] || 0;
                            p += g,
                                f[c] = p
                        }
                    return f.forEach(function (e, t) {
                        d[t] = p - e
                    }),
                        s(h == o ? "r" : h == a ? "g" : "b")
                }
            }
            var h = 5
                , c = 8 - h
                , u = 1e3
                , l = .75;
            return r.prototype = {
                volume: function (e) {
                    var t = this;
                    return t._volume && !e || (t._volume = (t.r2 - t.r1 + 1) * (t.g2 - t.g1 + 1) * (t.b2 - t.b1 + 1)),
                        t._volume
                },
                count: function (t) {
                    var i = this
                        , r = i.histo;
                    if (!i._count_set || t) {
                        var s, o, a, n = 0;
                        for (s = i.r1; s <= i.r2; s++)
                            for (o = i.g1; o <= i.g2; o++)
                                for (a = i.b1; a <= i.b2; a++)
                                    n += r[e(s, o, a)] || 0;
                        i._count = n,
                            i._count_set = !0
                    }
                    return i._count
                },
                copy: function () {
                    var e = this;
                    return new r(e.r1, e.r2, e.g1, e.g2, e.b1, e.b2, e.histo)
                },
                avg: function (t) {
                    var i = this
                        , r = i.histo;
                    if (!i._avg || t) {
                        var s, o, a, n, c = 0, u = 1 << 8 - h, l = 0, g = 0, p = 0;
                        for (o = i.r1; o <= i.r2; o++)
                            for (a = i.g1; a <= i.g2; a++)
                                for (n = i.b1; n <= i.b2; n++)
                                    c += s = r[e(o, a, n)] || 0,
                                        l += s * (o + .5) * u,
                                        g += s * (a + .5) * u,
                                        p += s * (n + .5) * u;
                        i._avg = c ? [~~(l / c), ~~(g / c), ~~(p / c)] : [~~(u * (i.r1 + i.r2 + 1) / 2), ~~(u * (i.g1 + i.g2 + 1) / 2), ~~(u * (i.b1 + i.b2 + 1) / 2)]
                    }
                    return i._avg
                },
                contains: function (e) {
                    var t = this
                        , i = e[0] >> c;
                    return gval = e[1] >> c,
                        bval = e[2] >> c,
                        i >= t.r1 && i <= t.r2 && gval >= t.g1 && gval <= t.g2 && bval >= t.b1 && bval <= t.b2
                }
            },
                s.prototype = {
                    push: function (e) {
                        this.vboxes.push({
                            vbox: e,
                            color: e.avg()
                        })
                    },
                    palette: function () {
                        return this.vboxes.map(function (e) {
                            return e.color
                        })
                    },
                    size: function () {
                        return this.vboxes.size()
                    },
                    map: function (e) {
                        for (var t = this.vboxes, i = 0; i < t.size(); i++)
                            if (t.peek(i).vbox.contains(e))
                                return t.peek(i).color;
                        return this.nearest(e)
                    },
                    nearest: function (e) {
                        for (var t, i, r, s = this.vboxes, o = 0; o < s.size(); o++)
                            ((i = Math.sqrt(Math.pow(e[0] - s.peek(o).color[0], 2) + Math.pow(e[1] - s.peek(o).color[1], 2) + Math.pow(e[2] - s.peek(o).color[2], 2))) < t || void 0 === t) && (t = i,
                                r = s.peek(o).color);
                        return r
                    },
                    forcebw: function () {
                        var e = this.vboxes;
                        e.sort(function (e, t) {
                            return i.naturalOrder(i.sum(e.color), i.sum(t.color))
                        });
                        var t = e[0].color;
                        t[0] < 5 && t[1] < 5 && t[2] < 5 && (e[0].color = [0, 0, 0]);
                        var r = e.length - 1
                            , s = e[r].color;
                        s[0] > 251 && s[1] > 251 && s[2] > 251 && (e[r].color = [255, 255, 255])
                    }
                },
            {
                quantize: function (e, r) {
                    function h(e, t) {
                        for (var i, r = 1, s = 0; s < u;)
                            if ((i = e.pop()).count()) {
                                var o = n(c, i)
                                    , a = o[0]
                                    , h = o[1];
                                if (!a)
                                    return;
                                if (e.push(a),
                                    h && (e.push(h),
                                        r++),
                                    r >= t)
                                    return;
                                if (s++ > u)
                                    return
                            } else
                                e.push(i),
                                    s++
                    }
                    if (!e.length || r < 2 || r > 256)
                        return !1;
                    var c = o(e)
                        , g = 0;
                    c.forEach(function () {
                        g++
                    });
                    var p = a(e, c)
                        , f = new t(function (e, t) {
                            return i.naturalOrder(e.count(), t.count())
                        }
                        );
                    f.push(p),
                        h(f, l * r);
                    for (var d = new t(function (e, t) {
                        return i.naturalOrder(e.count() * e.volume(), t.count() * t.volume())
                    }
                    ); f.size();)
                        d.push(f.pop());
                    h(d, r - d.size());
                    for (var v = new s; d.size();)
                        v.push(d.pop());
                    return v
                }
            }
        }();
        "function" == typeof define && define.amd ? define([], function () {
            return t
        }) : "object" == typeof exports ? module.exports = t : this.ColorThief = t
    }
        .call(this),
    function () {
        function e(e) {
            var t = e.naturalWidth;
            if (t * e.naturalHeight > 1048576) {
                var i = document.createElement("canvas");
                i.width = i.height = 1;
                var r = i.getContext("2d");
                return r.drawImage(e, 1 - t, 0),
                    0 === r.getImageData(0, 0, 1, 1).data[3]
            }
            return !1
        }
        function t(e, t, i) {
            var r = document.createElement("canvas");
            r.width = 1,
                r.height = i;
            var s = r.getContext("2d");
            s.drawImage(e, 0, 0);
            for (var o = s.getImageData(0, 0, 1, i).data, a = 0, n = i, h = i; h > a;)
                0 === o[4 * (h - 1) + 3] ? n = h : a = h,
                    h = n + a >> 1;
            var c = h / i;
            return 0 === c ? 1 : c
        }
        function i(e, t, i) {
            var s = document.createElement("canvas");
            return r(e, s, t, i),
                s.toDataURL("image/jpeg", t.quality || .8)
        }
        function r(i, r, o, a) {
            var n = i.naturalWidth
                , h = i.naturalHeight;
            if (n + h !== !1) {
                var c = o.width
                    , u = o.height
                    , l = r.getContext("2d");
                l.save(),
                    s(r, l, c, u, o.orientation),
                    e(i) && (n /= 2,
                        h /= 2);
                var g = 1024
                    , p = document.createElement("canvas");
                p.width = p.height = g;
                for (var f = p.getContext("2d"), d = a ? t(i, n, h) : 1, v = Math.ceil(g * c / n), m = Math.ceil(g * u / h / d), w = 0, _ = 0; w < h;) {
                    for (var y = 0, z = 0; y < n;)
                        f.clearRect(0, 0, g, g),
                            f.drawImage(i, -y, -w),
                            l.drawImage(p, 0, 0, g, g, z, _, v, m),
                            y += g,
                            z += v;
                    w += g,
                        _ += m
                }
                l.restore(),
                    p = f = null
            }
        }
        function s(e, t, i, r, s) {
            switch (s) {
                case 5:
                case 6:
                case 7:
                case 8:
                    e.width = r,
                        e.height = i;
                    break;
                default:
                    e.width = i,
                        e.height = r
            }
            switch (s) {
                case 2:
                    t.translate(i, 0),
                        t.scale(-1, 1);
                    break;
                case 3:
                    t.translate(i, r),
                        t.rotate(Math.PI);
                    break;
                case 4:
                    t.translate(0, r),
                        t.scale(1, -1);
                    break;
                case 5:
                    t.rotate(.5 * Math.PI),
                        t.scale(1, -1);
                    break;
                case 6:
                    t.rotate(.5 * Math.PI),
                        t.translate(0, -r);
                    break;
                case 7:
                    t.rotate(.5 * Math.PI),
                        t.translate(i, -r),
                        t.scale(-1, 1);
                    break;
                case 8:
                    t.rotate(-.5 * Math.PI),
                        t.translate(-i, 0)
            }
        }
        function o(e) {
            if (window.Blob && e instanceof Blob) {
                if (!a)
                    throw Error("No createObjectURL function found to create blob url");
                var t = new Image;
                t.src = a.createObjectURL(e),
                    this.blob = e,
                    e = t
            }
            if (!e.naturalWidth && !e.naturalHeight) {
                var i = this;
                e.onload = e.onerror = function () {
                    var e = i.imageLoadListeners;
                    if (e) {
                        i.imageLoadListeners = null;
                        for (var t = 0, r = e.length; t < r; t++)
                            e[t]()
                    }
                }
                    ,
                    this.imageLoadListeners = []
            }
            this.srcImage = e
        }
        var a = window.URL && window.URL.createObjectURL ? window.URL : window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL : null;
        o.prototype.render = function (e, t, s) {
            if (this.imageLoadListeners) {
                var o = this;
                this.imageLoadListeners.push(function () {
                    o.render(e, t, s)
                })
            } else {
                t = t || {};
                var n = this.srcImage.naturalWidth
                    , h = this.srcImage.naturalHeight
                    , c = t.width
                    , u = t.height
                    , l = t.maxWidth
                    , g = t.maxHeight
                    , p = !this.blob || "image/jpeg" === this.blob.type;
                c && !u ? u = h * c / n << 0 : u && !c ? c = n * u / h << 0 : (c = n,
                    u = h),
                    l && c > l && (u = h * (c = l) / n << 0),
                    g && u > g && (c = n * (u = g) / h << 0);
                var f = {
                    width: c,
                    height: u
                };
                for (var d in t)
                    f[d] = t[d];
                var v = e.tagName.toLowerCase();
                "img" === v ? e.src = i(this.srcImage, f, p) : "canvas" === v && r(this.srcImage, e, f, p),
                    "function" == typeof this.onrender && this.onrender(e),
                    s && s(),
                    this.blob && (this.blob = null,
                        a.revokeObjectURL(this.srcImage.src))
            }
        }
            ,
            "function" == typeof define && define.amd ? define([], function () {
                return o
            }) : "object" == typeof exports ? module.exports = o : this.MegaPixImage = o
    }
        .call(this);
