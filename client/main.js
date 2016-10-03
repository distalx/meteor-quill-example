import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import Quill from 'Quill';
import qrender from 'quill-render';
import './main.html';

Template.hello.onCreated(function() {

   this.quill = new ReactiveVar();
   this.outputText = new ReactiveVar();
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
  demoText:function(){


      return Template.instance().outputText.get();
  }
});

Template.hello.events({
  'click button'(event, instance) {

    var delta = instance.quill.getContents();
    var data = JSON.stringify(instance.quill.getContents());
    //console.log(delta);
    //console.log(data);

    //console.log(qrender(delta.ops));
    instance.outputText.set(qrender(delta.ops))
  },
});
