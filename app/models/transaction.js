import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  date: DS.attr('date'),
  note: DS.attr('string')
});