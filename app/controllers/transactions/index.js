import Ember from 'ember';
import moment from 'moment';
import groupBy from 'ember-group-by';
import { listSMS } from '../../utils/list-sms';

export default Ember.Controller.extend({

  filteredTransactions: Ember.computed.filter('model', function(transaction) {
    return transaction.get('date').getMonth() === new Date().getMonth();
  }),

  sortingDateDesc: ['date:desc'],
  sortedTransactions: Ember.computed.sort('filteredTransactions', 'sortingDateDesc'),
  groupedTransactions: groupBy('sortedTransactions', 'dateTime'),

  actions: {
    smsImport: function(){
      var self = this;
      var regexAmount = new RegExp(/\$([0-9]+\S*)/);
      var regexDate = new RegExp(/\s(\d{2}\/\d{2}\/\d{4})/);
      var localTransactions = self.get('model');

      listSMS({address: '85814', maxCount: 9999}).then(function(transactions) {

        transactions.forEach(function(transaction){

          var msg = transaction.body;

          if (!localTransactions.isAny('note', msg) && regexAmount.test(msg)){

            let newTransaction = self.store.createRecord('transaction', {
              note: msg,
              date: moment(msg.match(regexDate)[1]).toDate(),
              originalAmount: msg.match(regexAmount)[1]
            });

            newTransaction.save();
          }
        });
      });

      return false;
    }
  }
});
