import Ember from 'ember';
import { dateHelpers } from '../../utils/date-helpers';

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
      var self = this;
      var regexAmount = new RegExp(/\$([0-9]+\S*)/);
      var regexDate = new RegExp(/\s(\d{2}\/\d{2}\/\d{4})/);

      SMS.listSMS({address: '85814', maxCount: 9999}, function(data){

        data.forEach(function(transaction){

          var msg = transaction.body;

          if (regexAmount.test(msg)){

            let newTransaction = self.store.createRecord('transaction', {
              note: msg,
              date: dateHelpers(msg.match(regexDate)[1]).toDate(),
              originalAmount: msg.match(regexAmount)[1]
            });

            newTransaction.save();
          }
        });

      }, function(err){
        alert('error listing sms: ' + err);
      });

      return false;
    }
  }
});
