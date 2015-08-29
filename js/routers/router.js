/**
 * Created by yongyeon on 2015-08-29.
 */
// Todo 라우터
// ----------

var Workspace = Backbone.Router.extend({
    routers : {
       '*filter' : 'setFilter'
    },

    setFilter: function(param) {
        // 현재 사용되는 필터를 설정한다.

        // 각 Todo 뷰의 항목들을 숨김 여부를 나타내는
        // 컬렉션 필터 이벤트를 트리거 시킨다.
        window.app.Todos.trigger('filter');
    }
});

app.TodoRouter = new Workspace();
Backbone.history.start();