import Ember from 'ember';

export default Ember.Controller.extend({

  filteredTransactions: Ember.computed.filter('model', function(transaction) {
    return transaction.get('date').getMonth() === new Date().getMonth();
  }),


  groupedTransactions: Ember.computed('filteredTransactions', function(){
    var groupedTransactions = Ember.A();
    var transactions = this.get('filteredTransactions');

    transactions.forEach(function(transaction){
      var key = transaction.get('date').toISOString(),
          group = groupedTransactions.findBy('key', key) || Ember.Object.create({key: key, count: 0, transactions: Ember.A()});
      if(!groupedTransactions.contains(group)) {
        groupedTransactions.pushObject(group);
      }
      group.incrementProperty('count');
      group.transactions.pushObject(transaction);
    });

    return groupedTransactions;
  }),

  actions: {
    smsImport: function(){
      alert("to be implemented");

      return false;
    }
  }
});
