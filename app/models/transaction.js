import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  originalDate: DS.attr('string'),
  originalAmount: DS.attr('string'),
  note: DS.attr('string'),
  category: DS.attr('string'),
  categoryImage: DS.attr('string'),

  date: Ember.computed.alias('originalDate'),
  amount: Ember.computed.alias('originalAmount')
});