var TAFFY, exports, T;
!function () {
    "use strict";
    var _t_, _e_, _n_, _r_, _i_, _s_, _u_, _o_, _c_, _a_, _l_, _f_, _h_, _T_, _g_, _F_, _p_, _d_, _A_, _v_, _y_, _m_, ___, _x_;
    if (!TAFFY)
        for (_i_ = "2.7",
            _s_ = 1,
            _u_ = "000000",
            _o_ = 1e3,
            _c_ = {},
            _x_ = function (_t_) {
                var _e_ = Array.prototype.slice.call(_t_);
                return _e_.sort()
            }
            ,
            _a_ = function (_t_) {
                return TAFFY.isArray(_t_) || TAFFY.isObject(_t_) ? _t_ : JSON.parse(_t_)
            }
            ,
            _A_ = function (_t_, _e_) {
                return _v_(_t_, function (_t_) {
                    return _e_.indexOf(_t_) >= 0
                })
            }
            ,
            _v_ = function (_t_, _e_, _n_) {
                var _r_ = [];
                return null == _t_ ? _r_ : Array.prototype.filter && _t_.filter === Array.prototype.filter ? _t_.filter(_e_, _n_) : (_l_(_t_, function (_t_, _i_, _s_) {
                    _e_.call(_n_, _t_, _i_, _s_) && (_r_[_r_.length] = _t_)
                }),
                    _r_)
            }
            ,
            ___ = function (_t_) {
                return "[object RegExp]" === Object.prototype.toString.call(_t_)
            }
            ,
            _m_ = function (_t_) {
                var _e_ = T.isArray(_t_) ? [] : T.isObject(_t_) ? {} : null;
                if (null === _t_)
                    return _t_;
                for (var _n_ in _t_)
                    _e_[_n_] = ___(_t_[_n_]) ? _t_[_n_].toString() : T.isArray(_t_[_n_]) || T.isObject(_t_[_n_]) ? _m_(_t_[_n_]) : _t_[_n_];
                return _e_
            }
            ,
            _y_ = function (_t_) {
                var _e_ = JSON.stringify(_t_);
                return null === _e_.match(/regex/) ? _e_ : JSON.stringify(_m_(_t_))
            }
            ,
            _l_ = function (_t_, _e_, _n_) {
                var _r_, _i_, _s_, _u_;
                if (_t_ && (T.isArray(_t_) && 1 === _t_.length || !T.isArray(_t_)))
                    _e_(T.isArray(_t_) ? _t_[0] : _t_, 0);
                else
                    for (_s_ = 0,
                        _t_ = T.isArray(_t_) ? _t_ : [_t_],
                        _u_ = _t_.length; _u_ > _s_ && (_i_ = _t_[_s_],
                            T.isUndefined(_i_) && !_n_ || (_r_ = _e_(_i_, _s_),
                                _r_ !== T.EXIT)); _s_++)
                        ;
            }
            ,
            _f_ = function (_t_, _e_) {
                var _n_, _r_, _i_ = 0;
                for (_r_ in _t_)
                    if (_t_.hasOwnProperty(_r_) && (_n_ = _e_(_t_[_r_], _r_, _i_++),
                        _n_ === T.EXIT))
                        break
            }
            ,
            _c_.extend = function (_t_, _e_) {
                _c_[_t_] = function () {
                    return _e_.apply(this, _x_(arguments))
                }
            }
            ,
            _h_ = function (_t_) {
                var _e_;
                return T.isString(_t_) && /[t][0-9]*[r][0-9]*/i.test(_t_) ? !0 : T.isObject(_t_) && _t_.___id && _t_.___s ? !0 : T.isArray(_t_) ? (_e_ = !0,
                    _l_(_t_, function (_t_) {
                        return _h_(_t_) ? void 0 : (_e_ = !1,
                            TAFFY.EXIT)
                    }),
                    _e_) : !1
            }
            ,
            _g_ = function (_t_, _e_) {
                var _n_ = !0;
                return _l_(_e_, function (_e_) {
                    switch (T.typeOf(_e_)) {
                        case "function":
                            if (!_e_.apply(_t_))
                                return _n_ = !1,
                                    TAFFY.EXIT;
                            break;
                        case "array":
                            _n_ = 1 === _e_.length ? _g_(_t_, _e_[0]) : 2 === _e_.length ? _g_(_t_, _e_[0]) || _g_(_t_, _e_[1]) : 3 === _e_.length ? _g_(_t_, _e_[0]) || _g_(_t_, _e_[1]) || _g_(_t_, _e_[2]) : 4 === _e_.length ? _g_(_t_, _e_[0]) || _g_(_t_, _e_[1]) || _g_(_t_, _e_[2]) || _g_(_t_, _e_[3]) : !1,
                                _e_.length > 4 && _l_(_e_, function (_e_) {
                                    _g_(_t_, _e_) && (_n_ = !0)
                                })
                    }
                }),
                    _n_
            }
            ,
            _T_ = function (_t_) {
                var _e_ = [];
                return T.isString(_t_) && /[t][0-9]*[r][0-9]*/i.test(_t_) && (_t_ = {
                    ___id: _t_
                }),
                    T.isArray(_t_) ? (_l_(_t_, function (_t_) {
                        _e_.push(_T_(_t_))
                    }),
                        _t_ = function () {
                            var _t_ = this
                                , _n_ = !1;
                            return _l_(_e_, function (_e_) {
                                _g_(_t_, _e_) && (_n_ = !0)
                            }),
                                _n_
                        }
                    ) : T.isObject(_t_) ? (T.isObject(_t_) && _t_.___id && _t_.___s && (_t_ = {
                        ___id: _t_.___id
                    }),
                        _f_(_t_, function (_t_, _n_) {
                            T.isObject(_t_) || (_t_ = {
                                is: _t_
                            }),
                                _f_(_t_, function (_t_, _r_) {
                                    var _i_, _s_ = [];
                                    _i_ = "hasAll" === _r_ ? function (_t_, _e_) {
                                        _e_(_t_)
                                    }
                                        : _l_,
                                        _i_(_t_, function (_t_) {
                                            var _e_, _i_ = !0;
                                            _e_ = function () {
                                                var _e_, _s_ = this[_n_], _u_ = "==", _o_ = "!=", _c_ = "===", _a_ = "<", _l_ = ">", _f_ = "<=", _h_ = ">=", _T_ = "!==";
                                                return "undefined" == typeof _s_ ? !1 : (0 === _r_.indexOf("!") && _r_ !== _o_ && _r_ !== _T_ && (_i_ = !1,
                                                    _r_ = _r_.substring(1, _r_.length)),
                                                    _e_ = "regex" === _r_ ? _t_.test(_s_) : "lt" === _r_ || _r_ === _a_ ? _t_ > _s_ : "gt" === _r_ || _r_ === _l_ ? _s_ > _t_ : "lte" === _r_ || _r_ === _f_ ? _t_ >= _s_ : "gte" === _r_ || _r_ === _h_ ? _s_ >= _t_ : "left" === _r_ ? 0 === _s_.indexOf(_t_) : "leftnocase" === _r_ ? 0 === _s_.toLowerCase().indexOf(_t_.toLowerCase()) : "right" === _r_ ? _s_.substring(_s_.length - _t_.length) === _t_ : "rightnocase" === _r_ ? _s_.toLowerCase().substring(_s_.length - _t_.length) === _t_.toLowerCase() : "like" === _r_ ? _s_.indexOf(_t_) >= 0 : "likenocase" === _r_ ? _s_.toLowerCase().indexOf(_t_.toLowerCase()) >= 0 : _r_ === _c_ || "is" === _r_ ? _s_ === _t_ : _r_ === _u_ ? _s_ == _t_ : _r_ === _T_ ? _s_ !== _t_ : _r_ === _o_ ? _s_ != _t_ : "isnocase" === _r_ ? _s_.toLowerCase ? _s_.toLowerCase() === _t_.toLowerCase() : _s_ === _t_ : "has" === _r_ ? T.has(_s_, _t_) : "hasall" === _r_ ? T.hasAll(_s_, _t_) : "contains" === _r_ ? TAFFY.isArray(_s_) && _s_.indexOf(_t_) > -1 : -1 !== _r_.indexOf("is") || TAFFY.isNull(_s_) || TAFFY.isUndefined(_s_) || TAFFY.isObject(_t_) || TAFFY.isArray(_t_) ? T[_r_] && T.isFunction(T[_r_]) && 0 === _r_.indexOf("is") ? T[_r_](_s_) === _t_ : T[_r_] && T.isFunction(T[_r_]) ? T[_r_](_s_, _t_) : !1 : _t_ === _s_[_r_],
                                                    _e_ = _e_ && !_i_ ? !1 : _e_ || _i_ ? _e_ : !0)
                                            }
                                                ,
                                                _s_.push(_e_)
                                        }),
                                        _e_.push(1 === _s_.length ? _s_[0] : function () {
                                            var _t_ = this
                                                , _e_ = !1;
                                            return _l_(_s_, function (_n_) {
                                                _n_.apply(_t_) && (_e_ = !0)
                                            }),
                                                _e_
                                        }
                                        )
                                })
                        }),
                        _t_ = function () {
                            var _t_ = this
                                , _n_ = !0;
                            return _n_ = (1 !== _e_.length || _e_[0].apply(_t_)) && (2 !== _e_.length || _e_[0].apply(_t_) && _e_[1].apply(_t_)) && (3 !== _e_.length || _e_[0].apply(_t_) && _e_[1].apply(_t_) && _e_[2].apply(_t_)) && (4 !== _e_.length || _e_[0].apply(_t_) && _e_[1].apply(_t_) && _e_[2].apply(_t_) && _e_[3].apply(_t_)) ? !0 : !1,
                                _e_.length > 4 && _l_(_e_, function (_e_) {
                                    _g_(_t_, _e_) || (_n_ = !1)
                                }),
                                _n_
                        }
                    ) : T.isFunction(_t_) ? _t_ : void 0
            }
            ,
            _p_ = function (_t_, _e_) {
                var _n_ = function (_t_, _n_) {
                    var _r_ = 0;
                    return T.each(_e_, function (_e_) {
                        var _i_, _s_, _u_, _o_, _c_;
                        if (_i_ = _e_.split(" "),
                            _s_ = _i_[0],
                            _u_ = 1 === _i_.length ? "logical" : _i_[1],
                            "logical" === _u_)
                            _o_ = _F_(_t_[_s_]),
                                _c_ = _F_(_n_[_s_]),
                                T.each(_o_.length <= _c_.length ? _o_ : _c_, function (_t_, _e_) {
                                    return _o_[_e_] < _c_[_e_] ? (_r_ = -1,
                                        TAFFY.EXIT) : _o_[_e_] > _c_[_e_] ? (_r_ = 1,
                                            TAFFY.EXIT) : void 0
                                });
                        else if ("logicaldesc" === _u_)
                            _o_ = _F_(_t_[_s_]),
                                _c_ = _F_(_n_[_s_]),
                                T.each(_o_.length <= _c_.length ? _o_ : _c_, function (_t_, _e_) {
                                    return _o_[_e_] > _c_[_e_] ? (_r_ = -1,
                                        TAFFY.EXIT) : _o_[_e_] < _c_[_e_] ? (_r_ = 1,
                                            TAFFY.EXIT) : void 0
                                });
                        else {
                            if ("asec" === _u_ && _t_[_s_] < _n_[_s_])
                                return _r_ = -1,
                                    T.EXIT;
                            if ("asec" === _u_ && _t_[_s_] > _n_[_s_])
                                return _r_ = 1,
                                    T.EXIT;
                            if ("desc" === _u_ && _t_[_s_] > _n_[_s_])
                                return _r_ = -1,
                                    T.EXIT;
                            if ("desc" === _u_ && _t_[_s_] < _n_[_s_])
                                return _r_ = 1,
                                    T.EXIT
                        }
                        return 0 === _r_ && "logical" === _u_ && _o_.length < _c_.length ? _r_ = -1 : 0 === _r_ && "logical" === _u_ && _o_.length > _c_.length ? _r_ = 1 : 0 === _r_ && "logicaldesc" === _u_ && _o_.length > _c_.length ? _r_ = -1 : 0 === _r_ && "logicaldesc" === _u_ && _o_.length < _c_.length && (_r_ = 1),
                            0 !== _r_ ? T.EXIT : void 0
                    }),
                        _r_
                };
                return _t_ && _t_.push ? _t_.sort(_n_) : _t_
            }
            ,
            function () {
                var _t_ = {}
                    , _e_ = 0;
                _F_ = function (_n_) {
                    return _e_ > _o_ && (_t_ = {},
                        _e_ = 0),
                        _t_["_" + _n_] || function () {
                            var _r_, _i_, _s_, _u_ = String(_n_), _o_ = [], _c_ = "_", _a_ = "";
                            for (_r_ = 0,
                                _i_ = _u_.length; _i_ > _r_; _r_++)
                                _s_ = _u_.charCodeAt(_r_),
                                    _s_ >= 48 && 57 >= _s_ || 46 === _s_ ? ("n" !== _a_ && (_a_ = "n",
                                        _o_.push(_c_.toLowerCase()),
                                        _c_ = ""),
                                        _c_ += _u_.charAt(_r_)) : ("s" !== _a_ && (_a_ = "s",
                                            _o_.push(parseFloat(_c_)),
                                            _c_ = ""),
                                            _c_ += _u_.charAt(_r_));
                            return _o_.push("n" === _a_ ? parseFloat(_c_) : _c_.toLowerCase()),
                                _o_.shift(),
                                _t_["_" + _n_] = _o_,
                                _e_++,
                                _o_
                        }()
                }
            }(),
            _d_ = function () {
                this.context({
                    results: this.getDBI().query(this.context())
                })
            }
            ,
            _c_.extend("filter", function () {
                var _t_ = TAFFY.mergeObj(this.context(), {
                    run: null
                })
                    , _e_ = [];
                return _l_(_t_.q, function (_t_) {
                    _e_.push(_t_)
                }),
                    _t_.q = _e_,
                    _l_(_x_(arguments), function (_e_) {
                        _t_.q.push(_T_(_e_)),
                            _t_.filterRaw.push(_e_)
                    }),
                    this.getroot(_t_)
            }),
            _c_.extend("order", function (_t_) {
                _t_ = _t_.split(",");
                var _e_, _n_ = [];
                return _l_(_t_, function (_t_) {
                    _n_.push(_t_.replace(/^\s*/, "").replace(/\s*$/, ""))
                }),
                    _e_ = TAFFY.mergeObj(this.context(), {
                        sort: null
                    }),
                    _e_.order = _n_,
                    this.getroot(_e_)
            }),
            _c_.extend("limit", function (_t_) {
                var _e_, _n_ = TAFFY.mergeObj(this.context(), {});
                return _n_.limit = _t_,
                    _n_.run && _n_.sort && (_e_ = [],
                        _l_(_n_.results, function (_n_, _r_) {
                            return _r_ + 1 > _t_ ? TAFFY.EXIT : void _e_.push(_n_)
                        }),
                        _n_.results = _e_),
                    this.getroot(_n_)
            }),
            _c_.extend("start", function (_t_) {
                var _e_, _n_ = TAFFY.mergeObj(this.context(), {});
                return _n_.start = _t_,
                    _n_.run && _n_.sort && !_n_.limit ? (_e_ = [],
                        _l_(_n_.results, function (_n_, _r_) {
                            _r_ + 1 > _t_ && _e_.push(_n_)
                        }),
                        _n_.results = _e_) : _n_ = TAFFY.mergeObj(this.context(), {
                            run: null,
                            start: _t_
                        }),
                    this.getroot(_n_)
            }),
            _c_.extend("update", function (_t_, _e_, _n_) {
                var _r_, _i_ = !0, _s_ = {}, _u_ = _x_(arguments);
                return !TAFFY.isString(_t_) || 2 !== arguments.length && 3 !== arguments.length ? (_s_ = _t_,
                    2 === _u_.length && (_i_ = _e_)) : (_s_[_t_] = _e_,
                        3 === arguments.length && (_i_ = _n_)),
                    _r_ = this,
                    _d_.call(this),
                    _l_(this.context().results, function (_t_) {
                        var _e_ = _s_;
                        TAFFY.isFunction(_e_) ? _e_ = _e_.apply(TAFFY.mergeObj(_t_, {})) : T.isFunction(_e_) && (_e_ = _e_(TAFFY.mergeObj(_t_, {}))),
                            TAFFY.isObject(_e_) && _r_.getDBI().update(_t_.___id, _e_, _i_)
                    }),
                    this.context().results.length && this.context({
                        run: null
                    }),
                    this
            }),
            _c_.extend("remove", function (_t_) {
                var _e_ = this
                    , _n_ = 0;
                return _d_.call(this),
                    _l_(this.context().results, function (_t_) {
                        _e_.getDBI().remove(_t_.___id),
                            _n_++
                    }),
                    this.context().results.length && (this.context({
                        run: null
                    }),
                        _e_.getDBI().removeCommit(_t_)),
                    _n_
            }),
            _c_.extend("count", function () {
                return _d_.call(this),
                    this.context().results.length
            }),
            _c_.extend("callback", function (_t_, _e_) {
                if (_t_) {
                    var _n_ = this;
                    setTimeout(function () {
                        _d_.call(_n_),
                            _t_.call(_n_.getroot(_n_.context()))
                    }, _e_ || 0)
                }
                return null
            }),
            _c_.extend("get", function () {
                return _d_.call(this),
                    this.context().results
            }),
            _c_.extend("stringify", function () {
                return JSON.stringify(this.get())
            }),
            _c_.extend("first", function () {
                return _d_.call(this),
                    this.context().results[0] || !1
            }),
            _c_.extend("last", function () {
                return _d_.call(this),
                    this.context().results[this.context().results.length - 1] || !1
            }),
            _c_.extend("sum", function () {
                var _t_ = 0
                    , _e_ = this;
                return _d_.call(_e_),
                    _l_(_x_(arguments), function (_n_) {
                        _l_(_e_.context().results, function (_e_) {
                            _t_ += _e_[_n_] || 0
                        })
                    }),
                    _t_
            }),
            _c_.extend("min", function (_t_) {
                var _e_ = null;
                return _d_.call(this),
                    _l_(this.context().results, function (_n_) {
                        (null === _e_ || _n_[_t_] < _e_) && (_e_ = _n_[_t_])
                    }),
                    _e_
            }),
            function () {
                var _t_ = function () {
                    var _t_, _e_, _n_;
                    return _t_ = function (_t_, _e_, _n_) {
                        var _r_, _i_, _s_;
                        switch (2 === _n_.length ? (_r_ = _t_[_n_[0]],
                            _s_ = "===",
                            _i_ = _e_[_n_[1]]) : (_r_ = _t_[_n_[0]],
                                _s_ = _n_[1],
                                _i_ = _e_[_n_[2]]),
                        _s_) {
                            case "===":
                                return _r_ === _i_;
                            case "!==":
                                return _r_ !== _i_;
                            case "<":
                                return _i_ > _r_;
                            case ">":
                                return _r_ > _i_;
                            case "<=":
                                return _i_ >= _r_;
                            case ">=":
                                return _r_ >= _i_;
                            case "==":
                                return _r_ == _i_;
                            case "!=":
                                return _r_ != _i_;
                            default:
                                throw String(_s_) + " is not supported"
                        }
                    }
                        ,
                        _e_ = function (_t_, _e_) {
                            var _n_, _r_, _i_ = {};
                            for (_n_ in _t_)
                                _t_.hasOwnProperty(_n_) && (_i_[_n_] = _t_[_n_]);
                            for (_n_ in _e_)
                                _e_.hasOwnProperty(_n_) && "___id" !== _n_ && "___s" !== _n_ && (_r_ = TAFFY.isUndefined(_i_[_n_]) ? "" : "right_",
                                    _i_[_r_ + String(_n_)] = _e_[_n_]);
                            return _i_
                        }
                        ,
                        _n_ = function (_n_) {
                            var _r_, _i_, _s_ = _x_(arguments), _u_ = _s_.length, _o_ = [];
                            if ("function" != typeof _n_.filter) {
                                if (!_n_.TAFFY)
                                    throw "TAFFY DB or result not supplied";
                                _r_ = _n_()
                            } else
                                _r_ = _n_;
                            return this.context({
                                results: this.getDBI().query(this.context())
                            }),
                                TAFFY.each(this.context().results, function (_n_) {
                                    _r_.each(function (_r_) {
                                        var _c_, _a_ = !0;
                                        t: for (_i_ = 1; _u_ > _i_ && (_c_ = _s_[_i_],
                                            _a_ = "function" == typeof _c_ ? _c_(_n_, _r_) : "object" == typeof _c_ && _c_.length ? _t_(_n_, _r_, _c_) : !1,
                                            _a_); _i_++)
                                            ;
                                        _a_ && _o_.push(_e_(_n_, _r_))
                                    })
                                }),
                                TAFFY(_o_)()
                        }
                }();
                _c_.extend("join", _t_)
            }(),
            _c_.extend("max", function (_t_) {
                var _e_ = null;
                return _d_.call(this),
                    _l_(this.context().results, function (_n_) {
                        (null === _e_ || _n_[_t_] > _e_) && (_e_ = _n_[_t_])
                    }),
                    _e_
            }),
            _c_.extend("select", function () {
                var _t_ = []
                    , _e_ = _x_(arguments);
                return _d_.call(this),
                    1 === arguments.length ? _l_(this.context().results, function (_n_) {
                        _t_.push(_n_[_e_[0]])
                    }) : _l_(this.context().results, function (_n_) {
                        var _r_ = [];
                        _l_(_e_, function (_t_) {
                            _r_.push(_n_[_t_])
                        }),
                            _t_.push(_r_)
                    }),
                    _t_
            }),
            _c_.extend("distinct", function () {
                var _t_ = []
                    , _e_ = _x_(arguments);
                return _d_.call(this),
                    1 === arguments.length ? _l_(this.context().results, function (_n_) {
                        var _r_ = _n_[_e_[0]]
                            , _i_ = !1;
                        _l_(_t_, function (_t_) {
                            return _r_ === _t_ ? (_i_ = !0,
                                TAFFY.EXIT) : void 0
                        }),
                            _i_ || _t_.push(_r_)
                    }) : _l_(this.context().results, function (_n_) {
                        var _r_ = []
                            , _i_ = !1;
                        _l_(_e_, function (_t_) {
                            _r_.push(_n_[_t_])
                        }),
                            _l_(_t_, function (_t_) {
                                var _n_ = !0;
                                return _l_(_e_, function (_e_, _i_) {
                                    return _r_[_i_] !== _t_[_i_] ? (_n_ = !1,
                                        TAFFY.EXIT) : void 0
                                }),
                                    _n_ ? (_i_ = !0,
                                        TAFFY.EXIT) : void 0
                            }),
                            _i_ || _t_.push(_r_)
                    }),
                    _t_
            }),
            _c_.extend("supplant", function (_t_, _e_) {
                var _n_ = [];
                return _d_.call(this),
                    _l_(this.context().results, function (_e_) {
                        _n_.push(_t_.replace(/\{([^\{\}]*)\}/g, function (_t_, _n_) {
                            var _r_ = _e_[_n_];
                            return "string" == typeof _r_ || "number" == typeof _r_ ? _r_ : _t_
                        }))
                    }),
                    _e_ ? _n_ : _n_.join("")
            }),
            _c_.extend("each", function (_t_) {
                return _d_.call(this),
                    _l_(this.context().results, _t_),
                    this
            }),
            _c_.extend("map", function (_t_) {
                var _e_ = [];
                return _d_.call(this),
                    _l_(this.context().results, function (_n_) {
                        _e_.push(_t_(_n_))
                    }),
                    _e_
            }),
            T = function (_t_) {
                var _e_, _n_, _r_, _i_ = [], _o_ = {}, _F_ = 1, _d_ = {
                    template: !1,
                    onInsert: !1,
                    onUpdate: !1,
                    onRemove: !1,
                    onDBChange: !1,
                    storageName: !1,
                    forcePropertyCase: null,
                    cacheSize: 100,
                    name: ""
                }, _A_ = new Date, _v_ = 0, _m_ = 0, ___ = {};
                return _n_ = function (_t_) {
                    var _e_ = []
                        , _r_ = !1;
                    return 0 === _t_.length ? _i_ : (_l_(_t_, function (_t_) {
                        T.isString(_t_) && /[t][0-9]*[r][0-9]*/i.test(_t_) && _i_[_o_[_t_]] && (_e_.push(_i_[_o_[_t_]]),
                            _r_ = !0),
                            T.isObject(_t_) && _t_.___id && _t_.___s && _i_[_o_[_t_.___id]] && (_e_.push(_i_[_o_[_t_.___id]]),
                                _r_ = !0),
                            T.isArray(_t_) && _l_(_t_, function (_t_) {
                                _l_(_n_(_t_), function (_t_) {
                                    _e_.push(_t_)
                                })
                            })
                    }),
                        _r_ && _e_.length > 1 && (_e_ = []),
                        _e_)
                }
                    ,
                    _e_ = {
                        dm: function (_t_) {
                            return _t_ && (_A_ = _t_,
                                ___ = {},
                                _v_ = 0,
                                _m_ = 0),
                                _d_.onDBChange && setTimeout(function () {
                                    _d_.onDBChange.call(_i_)
                                }, 0),
                                _d_.storageName && setTimeout(function () {
                                    localStorage.setItem("taffy_" + _d_.storageName, JSON.stringify(_i_))
                                }),
                                _A_
                        },
                        insert: function (_t_, _n_) {
                            var _c_ = []
                                , _h_ = []
                                , _T_ = _a_(_t_);
                            return _l_(_T_, function (_t_, _r_) {
                                var _a_, _T_;
                                return T.isArray(_t_) && 0 === _r_ ? (_l_(_t_, function (_t_) {
                                    _c_.push("lower" === _d_.forcePropertyCase ? _t_.toLowerCase() : "upper" === _d_.forcePropertyCase ? _t_.toUpperCase() : _t_)
                                }),
                                    !0) : (T.isArray(_t_) ? (_a_ = {},
                                        _l_(_t_, function (_t_, _e_) {
                                            _a_[_c_[_e_]] = _t_
                                        }),
                                        _t_ = _a_) : T.isObject(_t_) && _d_.forcePropertyCase && (_T_ = {},
                                            _f_(_t_, function (_e_, _n_) {
                                                _T_["lower" === _d_.forcePropertyCase ? _n_.toLowerCase() : "upper" === _d_.forcePropertyCase ? _n_.toUpperCase() : _n_] = _t_[_n_]
                                            }),
                                            _t_ = _T_),
                                        _F_++,
                                        _t_.___id = "T" + String(_u_ + _s_).slice(-6) + "R" + String(_u_ + _F_).slice(-6),
                                        _t_.___s = !0,
                                        _h_.push(_t_.___id),
                                        _d_.template && (_t_ = T.mergeObj(_d_.template, _t_)),
                                        _i_.push(_t_),
                                        _o_[_t_.___id] = _i_.length - 1,
                                        _d_.onInsert && (_n_ || TAFFY.isUndefined(_n_)) && _d_.onInsert.call(_t_),
                                        void _e_.dm(new Date))
                            }),
                                _r_(_h_)
                        },
                        sort: function (_t_) {
                            return _i_ = _p_(_i_, _t_.split(",")),
                                _o_ = {},
                                _l_(_i_, function (_t_, _e_) {
                                    _o_[_t_.___id] = _e_
                                }),
                                _e_.dm(new Date),
                                !0
                        },
                        update: function (_t_, _n_, _r_) {
                            var _s_, _u_, _c_, _a_, _l_ = {};
                            _d_.forcePropertyCase && (_f_(_n_, function (_t_, _e_) {
                                _l_["lower" === _d_.forcePropertyCase ? _e_.toLowerCase() : "upper" === _d_.forcePropertyCase ? _e_.toUpperCase() : _e_] = _t_
                            }),
                                _n_ = _l_),
                                _s_ = _i_[_o_[_t_]],
                                _u_ = T.mergeObj(_s_, _n_),
                                _c_ = {},
                                _a_ = !1,
                                _f_(_u_, function (_t_, _e_) {
                                    (TAFFY.isUndefined(_s_[_e_]) || _s_[_e_] !== _t_) && (_c_[_e_] = _t_,
                                        _a_ = !0)
                                }),
                                _a_ && (_d_.onUpdate && (_r_ || TAFFY.isUndefined(_r_)) && _d_.onUpdate.call(_u_, _i_[_o_[_t_]], _c_),
                                    _i_[_o_[_t_]] = _u_,
                                    _e_.dm(new Date))
                        },
                        remove: function (_t_) {
                            _i_[_o_[_t_]].___s = !1
                        },
                        removeCommit: function (_t_) {
                            var _n_;
                            for (_n_ = _i_.length - 1; _n_ > -1; _n_--)
                                _i_[_n_].___s || (_d_.onRemove && (_t_ || TAFFY.isUndefined(_t_)) && _d_.onRemove.call(_i_[_n_]),
                                    _o_[_i_[_n_].___id] = void 0,
                                    _i_.splice(_n_, 1));
                            _o_ = {},
                                _l_(_i_, function (_t_, _e_) {
                                    _o_[_t_.___id] = _e_
                                }),
                                _e_.dm(new Date)
                        },
                        query: function (_t_) {
                            var _r_, _s_, _u_, _o_, _c_, _a_;
                            if (_d_.cacheSize && (_s_ = "",
                                _l_(_t_.filterRaw, function (_t_) {
                                    return T.isFunction(_t_) ? (_s_ = "nocache",
                                        TAFFY.EXIT) : void 0
                                }),
                                "" === _s_ && (_s_ = _y_(T.mergeObj(_t_, {
                                    q: !1,
                                    run: !1,
                                    sort: !1
                                })))),
                                !_t_.results || !_t_.run || _t_.run && _e_.dm() > _t_.run) {
                                if (_u_ = [],
                                    _d_.cacheSize && ___[_s_])
                                    return ___[_s_].i = _v_++,
                                        ___[_s_].results;
                                0 === _t_.q.length && 0 === _t_.index.length ? (_l_(_i_, function (_t_) {
                                    _u_.push(_t_)
                                }),
                                    _r_ = _u_) : (_o_ = _n_(_t_.index),
                                        _l_(_o_, function (_e_) {
                                            (0 === _t_.q.length || _g_(_e_, _t_.q)) && _u_.push(_e_)
                                        }),
                                        _r_ = _u_)
                            } else
                                _r_ = _t_.results;
                            return !(_t_.order.length > 0) || _t_.run && _t_.sort || (_r_ = _p_(_r_, _t_.order)),
                                _r_.length && (_t_.limit && _t_.limit < _r_.length || _t_.start) && (_c_ = [],
                                    _l_(_r_, function (_e_, _n_) {
                                        if (!_t_.start || _t_.start && _n_ + 1 >= _t_.start)
                                            if (_t_.limit) {
                                                if (_a_ = _t_.start ? _n_ + 1 - _t_.start : _n_,
                                                    _a_ < _t_.limit)
                                                    _c_.push(_e_);
                                                else if (_a_ > _t_.limit)
                                                    return TAFFY.EXIT
                                            } else
                                                _c_.push(_e_)
                                    }),
                                    _r_ = _c_),
                                _d_.cacheSize && "nocache" !== _s_ && (_m_++,
                                    setTimeout(function () {
                                        var _t_, _e_;
                                        _m_ >= 2 * _d_.cacheSize && (_m_ = 0,
                                            _t_ = _v_ - _d_.cacheSize,
                                            _e_ = {},
                                            _f_(function (_n_, _r_) {
                                                _n_.i >= _t_ && (_e_[_r_] = _n_)
                                            }),
                                            ___ = _e_)
                                    }, 0),
                                    ___[_s_] = {
                                        i: _v_++,
                                        results: _r_
                                    }),
                                _r_
                        }
                    },
                    _r_ = function () {
                        var _t_, _n_;
                        return _t_ = TAFFY.mergeObj(TAFFY.mergeObj(_c_, {
                            insert: void 0
                        }), {
                            getDBI: function () {
                                return _e_
                            },
                            getroot: function (_t_) {
                                return _r_.call(_t_)
                            },
                            context: function (_t_) {
                                return _t_ && (_n_ = TAFFY.mergeObj(_n_, _t_.hasOwnProperty("results") ? TAFFY.mergeObj(_t_, {
                                    run: new Date,
                                    sort: new Date
                                }) : _t_)),
                                    _n_
                            },
                            extend: void 0
                        }),
                            _n_ = this && this.q ? this : {
                                limit: !1,
                                start: !1,
                                q: [],
                                filterRaw: [],
                                index: [],
                                order: [],
                                results: !1,
                                run: null,
                                sort: null,
                                settings: _d_
                            },
                            _l_(_x_(arguments), function (_t_) {
                                _h_(_t_) ? _n_.index.push(_t_) : _n_.q.push(_T_(_t_)),
                                    _n_.filterRaw.push(_t_)
                            }),
                            _t_
                    }
                    ,
                    _s_++,
                    _t_ && _e_.insert(_t_),
                    _r_.insert = _e_.insert,
                    _r_.merge = function (_t_, _n_, _i_) {
                        var _s_ = {}
                            , _u_ = []
                            , _o_ = {};
                        return _i_ = _i_ || !1,
                            _n_ = _n_ || "id",
                            _l_(_t_, function (_t_) {
                                var _o_;
                                _s_[_n_] = _t_[_n_],
                                    _u_.push(_t_[_n_]),
                                    _o_ = _r_(_s_).first(),
                                    _o_ ? _e_.update(_o_.___id, _t_, _i_) : _e_.insert(_t_, _i_)
                            }),
                            _o_[_n_] = _u_,
                            _r_(_o_)
                    }
                    ,
                    _r_.TAFFY = !0,
                    _r_.sort = _e_.sort,
                    _r_.settings = function (_t_) {
                        return _t_ && (_d_ = TAFFY.mergeObj(_d_, _t_),
                            _t_.template && _r_().update(_t_.template)),
                            _d_
                    }
                    ,
                    _r_.store = function (_t_) {
                        var _e_, _n_ = !1;
                        return localStorage && (_t_ && (_e_ = localStorage.getItem("taffy_" + _t_),
                            _e_ && _e_.length > 0 && (_r_.insert(_e_),
                                _n_ = !0),
                            _i_.length > 0 && setTimeout(function () {
                                localStorage.setItem("taffy_" + _d_.storageName, JSON.stringify(_i_))
                            })),
                            _r_.settings({
                                storageName: _t_
                            })),
                            _r_
                    }
                    ,
                    _r_
            }
            ,
            TAFFY = T,
            T.each = _l_,
            T.eachin = _f_,
            T.extend = _c_.extend,
            TAFFY.EXIT = "TAFFYEXIT",
            TAFFY.mergeObj = function (_t_, _e_) {
                var _n_ = {};
                return _f_(_t_, function (_e_, _r_) {
                    _n_[_r_] = _t_[_r_]
                }),
                    _f_(_e_, function (_t_, _r_) {
                        _n_[_r_] = _e_[_r_]
                    }),
                    _n_
            }
            ,
            TAFFY.has = function (_t_, _e_) {
                var _n_, _r_ = !1;
                if (_t_.TAFFY)
                    return _r_ = _t_(_e_),
                        _r_.length > 0 ? !0 : !1;
                switch (T.typeOf(_t_)) {
                    case "object":
                        if (T.isObject(_e_))
                            _f_(_e_, function (_n_, _i_) {
                                return _r_ !== !0 || T.isUndefined(_t_[_i_]) || !_t_.hasOwnProperty(_i_) ? (_r_ = !1,
                                    TAFFY.EXIT) : void (_r_ = T.has(_t_[_i_], _e_[_i_]))
                            });
                        else if (T.isArray(_e_))
                            _l_(_e_, function (_n_, _i_) {
                                return _r_ = T.has(_t_, _e_[_i_]),
                                    _r_ ? TAFFY.EXIT : void 0
                            });
                        else if (T.isString(_e_))
                            return TAFFY.isUndefined(_t_[_e_]) ? !1 : !0;
                        return _r_;
                    case "array":
                        if (T.isObject(_e_))
                            _l_(_t_, function (_n_, _i_) {
                                return _r_ = T.has(_t_[_i_], _e_),
                                    _r_ === !0 ? TAFFY.EXIT : void 0
                            });
                        else if (T.isArray(_e_))
                            _l_(_e_, function (_n_, _i_) {
                                return _l_(_t_, function (_n_, _s_) {
                                    return _r_ = T.has(_t_[_s_], _e_[_i_]),
                                        _r_ === !0 ? TAFFY.EXIT : void 0
                                }),
                                    _r_ === !0 ? TAFFY.EXIT : void 0
                            });
                        else if (T.isString(_e_) || T.isNumber(_e_))
                            for (_r_ = !1,
                                _n_ = 0; _n_ < _t_.length; _n_++)
                                if (_r_ = T.has(_t_[_n_], _e_))
                                    return !0;
                        return _r_;
                    case "string":
                        if (T.isString(_e_) && _e_ === _t_)
                            return !0;
                        break;
                    default:
                        if (T.typeOf(_t_) === T.typeOf(_e_) && _t_ === _e_)
                            return !0
                }
                return !1
            }
            ,
            TAFFY.hasAll = function (_t_, _e_) {
                var _n_, _r_ = TAFFY;
                return _r_.isArray(_e_) ? (_n_ = !0,
                    _l_(_e_, function (_e_) {
                        return _n_ = _r_.has(_t_, _e_),
                            _n_ === !1 ? TAFFY.EXIT : void 0
                    }),
                    _n_) : _r_.has(_t_, _e_)
            }
            ,
            TAFFY.typeOf = function (_t_) {
                var _e_ = typeof _t_;
                return "object" === _e_ && (_t_ ? "number" != typeof _t_.length || _t_.propertyIsEnumerable("length") || (_e_ = "array") : _e_ = "null"),
                    _e_
            }
            ,
            TAFFY.getObjectKeys = function (_t_) {
                var _e_ = [];
                return _f_(_t_, function (_t_, _n_) {
                    _e_.push(_n_)
                }),
                    _e_.sort(),
                    _e_
            }
            ,
            TAFFY.isSameArray = function (_t_, _e_) {
                return TAFFY.isArray(_t_) && TAFFY.isArray(_e_) && _t_.join(",") === _e_.join(",") ? !0 : !1
            }
            ,
            TAFFY.isSameObject = function (_t_, _e_) {
                var _n_ = TAFFY
                    , _r_ = !0;
                return _n_.isObject(_t_) && _n_.isObject(_e_) && _n_.isSameArray(_n_.getObjectKeys(_t_), _n_.getObjectKeys(_e_)) ? _f_(_t_, function (_i_, _s_) {
                    return _n_.isObject(_t_[_s_]) && _n_.isObject(_e_[_s_]) && _n_.isSameObject(_t_[_s_], _e_[_s_]) || _n_.isArray(_t_[_s_]) && _n_.isArray(_e_[_s_]) && _n_.isSameArray(_t_[_s_], _e_[_s_]) || _t_[_s_] === _e_[_s_] ? void 0 : (_r_ = !1,
                        TAFFY.EXIT)
                }) : _r_ = !1,
                    _r_
            }
            ,
            _t_ = ["String", "Number", "Object", "Array", "Boolean", "Null", "Function", "Undefined"],
            _e_ = function (_t_) {
                return function (_e_) {
                    return TAFFY.typeOf(_e_) === _t_.toLowerCase() ? !0 : !1
                }
            }
            ,
            _n_ = 0; _n_ < _t_.length; _n_++)
            _r_ = _t_[_n_],
                TAFFY["is" + _r_] = _e_(_r_)
}(),
    "object" == typeof exports && (exports.taffy = TAFFY);
