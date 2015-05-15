import DS from 'ember-data';

var Transaction = DS.Model.extend({
  amount: DS.attr('number'),
  added: DS.attr('date'),
  note: DS.attr('string')
});

Transaction.reopenClass({
  FIXTURES: [
    {id: 1, amount: 1000, added: '2013-02-07T16:44:57', note: 'note 1'},
    {id: 2, amount: 2000, added: '2013-02-07T16:44:57', note: 'note 2'},
    {id: 3, amount: 3000, added: '2013-02-07T16:44:57', note: 'note 3'},
    {id: 4, amount: 4000, added: '2013-02-07T16:44:57', note: 'note 4'}
  ]
});

export default Transaction;