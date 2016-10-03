import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Quill from 'Quill';
import './main.html';

Template.hello.onCreated(function() {

   this.quill = new ReactiveVar();
});

Template.hello.onRendered(function() {
  var instance = this;

  instance.editor = document.getElementById('editor-container');
  instance.quill = new Quill(instance.editor, {
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ]
    },
    placeholder: 'Compose an epic...',
    theme: 'snow' // or 'bubble'
  });

});

Template.hello.helpers({

});

Template.hello.events({
  'click button'(event, instance) {
    var data = JSON.stringify(instance.quill.getContents());
    console.log(instance.quill.getContents());

    console.log(data);

  },
});
