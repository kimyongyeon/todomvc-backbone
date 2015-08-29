// js/views/app.js

var app = app || {};

// 애플리케이션
// ----------- window.app.Todos.create({title:'My First Todo item'});

// Appview는 Ui의 최상단 컴포넌트다.
app.AppView = Backbone.View.extend({
	
	// 새로운 엘리먼트를 만드는 대신에
	// 기존의 html에 존재하는 애플리케이션의 el에 바인딩 한다.
	el : '#todoapp',
	// 애플리케이션의 하단에 있는 통계 정보 출력단에 필요한 템플릿
	statsTemplate: _.template( $('#stats-template').html() ),
	
	// 신규
	// 새로운 아이템이 만들어질때 발생하는 이벤트나
	// 아이템이 완료되었을때 발생되는 이벤트의 처리를 위임한다.
	events: {
		
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
		
	},
	
	// initialize에서 항목이 추가하거나 변경될 때 필요한 
	// 'Todos' 컬렉션에 관련 이벤트를 바인딩 한다.
	initialize: function() {
		
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		
		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		
		// 신규
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);
		
		app.Todos.fetch();
		
	},
	
	// 신규
	// 통계 정보를 갱신하기 위해 어플리케이션을 다시 렌더링 한다.
	// 애플리케이션의 다른 부분은 변경이 없다.
	render: function() {

		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if (app.Todos.length ) {
			this.$main.show();
			this.$footer.show();
			
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
			
			this.$('#filters li a')
			.removeClass('selected')
			.filter(' [href="#/ ' + ( app.TodoFilter || '' ) + ' "] ')
			.addClass('selected');

 		} else {

			this.$main.hide();
			this.$footer.hide();

		}

		this.allCheckbox.checked = !remaining;

	},
	
	// 신규
	filterOne: function(todo) {
		todo.trigger('visible');
	},
	
	// 신규
	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},
	
	// 신규
	// 새로운 todo 항목을 위한 속성을 생성한다.
	newAttributes: function() {

		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		};
		
	},
	
	// 신규
	// input 필드에서 'return'키를 누르면
	// 새로운 todo모델을 만들고 이를 localStorage에 저장한다.
	createOnEnter: function(event) {
		
		if (event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}
		
		app.Todos.create( this.newAttributes() );
		
		this.$input.val('');
	},
	
	// 신규
	// 완료된 todo 항목들을 모두 삭제하고, 모델도 삭제한다.
	clearCompleted: function() {
		console.log("clear");
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},
	
	// 신규
	toggleAllComplete: function() {
		
		var completed = this.allCheckbox.checked;
		
		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});
	},
	
	// 항목을 추가하기 위한 뷰를 생성해서
	// 목록에서 단일 todo 항목을 추가하고 뷰를 <ul> 태그에 덧붙인다.
	addOne: function(todo) {
		var view = new app.TodoView({model: todo});
		$('#todo-list').append( view.render().el );
	},
	
	// ** Todos ** 컬렉션에 있는 모든 아이템을 한 번에 추가한다.
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	}
});