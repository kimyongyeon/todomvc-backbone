// js/models/todo.js

var app = app || {};

// Todo 모델
// -------------
// 우리의 기본 Todo 모델은 'title', 'order', 'completed' 속성을 가진다.

app.Todo = Backbone.Model.extend({
	// defaults에 기본 속성을 정의함으로써 todo 항목이 생성될 때 'title'과 'completed' 키를 가지고 있음을 보장할 수 있다.
	// 이 todo 항목의 'completed' 상태를 토글시킨다.
	default: {
		title: '',
		completed: false
	},
	
	// 이 todo 항목의 'completed' 상태를 토글시킨다.
	toggle: function() {
		this.save({
			completed: !this.get('completed')
		});
	}
});