// js / collections/ todos.js

var app = app || {};

// Todo 컬렉션
// -----------

// todo의 컬렉션은 서버에 저장되지 않고
// *localStorage*에 저장된다.
var TodoList = Backbone.Collection.extend({
	// 컬렉션의 모델을 참조
	model: app.Todo,
	
	// "todos-backbone" 네임스페이스 아래 모든 todo 항목들을 저장한다.
	// 이 작업을 위해서 이 페이지에는
	// Backbone localStorage 플러그인이 필요하다.
	// 콘솔에서 테스트가 필요한 경우에는
	// 에러를 피하기 위해 다음 라인을 주석 처리 해야 한다.
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	
	// 완료된 모든 todo 항목들을 추려낸다.
	completed: function() {
		return this.filter(function(todo) {
			return todo.get('completed');
		});
	},
	
	// 완료되지 않은 todo 항목들의 목록만 추려낸다.
	remaining: function() {
		// apply는 이 함수의 스코프 내에 this를 정의할 수 있도록 해준다.
		return this.without.apply( this, this.completed() );
		
	},
	
	// 데이터베이스 내에 특별한 순서 없이 저장이 되었다고 해도 순번을 유지할 수 있다.
	// 이는 새로운 항목을 위해 다음 순번을 생성한다.
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	},
	
	// Todo는 삽입된 순서대로 정렬된다.
	comparator: function(todo) {
		return todo.get('order');
	}
});

//  ** Todos** 목록의 전역 컬렉션을 생성한다.
app.Todos = new TodoList();

