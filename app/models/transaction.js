import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  note: DS.attr('string'),
  originalAmount: DS.attr('string'),
  category: DS.attr('string', {defaultValue: 'Otros'}),
  categoryImage: DS.attr('string', {defaultValue: 'ember.png'}),

  dateTime: Ember.computed(function(){
    return this.get('date').getTime();
  }),

  amount: Ember.computed('originalAmount', function(){
    let amount = this.get('originalAmount');
    let decimal = /\,\d{2}$/.test(amount) ? ',' : '.';
    let regex = new RegExp('[^0-9-' + decimal + ']', 'g');
    return parseFloat(amount
      .replace(regex, '')    // strip out any cruft
      .replace(decimal, '.') // make sure decimal point is standard
    );
  })
});
