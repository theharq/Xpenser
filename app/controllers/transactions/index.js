import Ember from 'ember';

export default Ember.Controller.extend({

  filteredTransactions: Ember.computed.filter('model', function(transaction) {
    return transaction.get('date').getMonth() === new Date().getMonth();
  }),

  actions: {
    smsImport: function(){
      alert("to be implemented");

      return false;
    }
  }
});
