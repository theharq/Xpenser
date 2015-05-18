import Ember from 'ember';

export default Ember.Component.extend({

  transactionAmounts: Ember.computed.mapBy('groupedTransaction.transactions', 'amount'),
  amountsTotal: Ember.computed.sum('transactionAmounts'),

  formattedDate: Ember.computed('groupedTransaction.key',function(){
    return moment(this.get('groupedTransaction.key')).format('dddd D MMMM');
  })
});
