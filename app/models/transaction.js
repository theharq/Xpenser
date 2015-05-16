import DS from 'ember-data';

var Transaction = DS.Model.extend({
  amount: DS.attr('number'),
  date: DS.attr('date'),
  note: DS.attr('string')
});

Transaction.reopenClass({
  FIXTURES: [
    {id: 1, amount: 1000, date: '2013-02-07', note: 'note 1'},
    {id: 2, amount: 2000, date: '2013-02-07', note: 'note 2'},
    {id: 3, amount: 3000, date: '2013-02-07', note: 'note 3'},
    {id: 4, amount: 4000, date: '2013-02-07', note: 'note 4'}
  ]
});

export default Transaction;