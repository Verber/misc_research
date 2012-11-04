var App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
    templateName:'application',
    classNames: ['application-view']
});

App.TasksView = Ember.View.extend({
    templateName:  'tasks'
});

App.TasksController = Ember.ArrayController.extend();

App.Router = Ember.Router.extend({
    root: Ember.Route.extend({
        index: Ember.Route.extend({
            route: '/',
            goToTasks: Ember.Route.transitionTo('root.tasks')
            //redirectsTo: '/tasks'
        }),
        tasks: Ember.Route.extend({
            route: '/tasks',
            showTask: Ember.Route.transitionTo('root.task'),
            enter: function ( router ){
                console.log("The tasks sub-state was entered.");
            },
            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet(
                    'tasks',
                    App.Task.all()
                );
            }
        }),
        task: Ember.Route.extend({
            route: '/tasks/:task_id',
            connectOutlets: function(router, task) {
                router.get('applicationController').connectOutlet('task', task);
            }
        })
    })
});

App.Task = Ember.Object.extend();
App.Task.reopenClass({
    _listOfTasks: Em.A(),
    all: function() {
        var allTasks = this._listOfTasks;
        $.getJSON('api/web/app.php/tasks.json',function(response){
            allTasks.clear();
            allTasks.pushObjects(response);
        });
        return this._listOfTasks;
    }
});

App.initialize();