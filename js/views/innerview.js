/**
 * Created by yongyeon on 2015-08-29.
 */

var OuterView = Backbone.View.extend({

    initialize: function() {
       this.children = {};
       this.child = new Backbone.View();
       this.children[this.child.cid] = this.child;
    },

    render: function() {
        this.$el.html('<div data-view-cid="' + this.child.cid + '"></div>');
        _.each(this.children, function(view, cid) {
            this.$('[data-view-cid="' + cid + '"]').replaceWith(view.el);
        }, this);
    }

});

var InnerView = Backbone.View.extend({
   initialize: function(){
       this.render();
   },
   render: function() {
       this.$el.html(template);
   }
});

var User = Backbone.Model.extend({
   //정규식 패턴
    patterns: {
        specialCharacters: '[^a-zA-Z 0-9]+',
        digits: '[0-9]',
        email: '^a-zA-Z0-9._-]+@[a-zA-Z0-9][a-zA-Z0-9.-]*[.]{1}[a-zA-Z]{2,6}$'
    },
    // 유효성 검사기(validator)
    validators: {
        minLength: function(value, minLength) {
            return value.length => minLength;
        },

        maxLength: function(value, maxLength) {
            return value.length <= maxLength;
        },

        isEmail: function(value) {
            return User.prototype.validators.pattern(value, User.prototype.patterns.specialCharacters);
        },

        hasSpecialCharater: function(value) {
            return User.prototype.validators.pattern(value, User.prototype.patterns.specialCharacters);
        }
    }
});

var Backbone19 = Backbone.noConflict();
// Backbone19 는 가장 최근에 로드된 버전을 참조하고
// 'window.Backbone'에는
// 이전에 로드된 버전이 저장된다.