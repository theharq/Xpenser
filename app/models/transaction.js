import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  originalAmount: DS.attr('string'),
  note: DS.attr('string'),
  category: DS.attr('string'),
  categoryImage: DS.attr('string'),

  amount: Ember.computed.alias('originalAmount')
});