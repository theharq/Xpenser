import Ember from 'ember';
import moment from 'moment';
import groupBy from 'ember-group-by';
import { listSMS } from '../../utils/list-sms';

export default Ember.Controller.extend({
  sortingDateDesc: ['date:desc'],
  sortedTransactions: Ember.computed.sort('model', 'sortingDateDesc'),
  groupedTransactions: groupBy('sortedTransactions', 'dateTime'),

  actions: {
    smsImport(){
      const regexAmount = new RegExp(/\$([0-9]+\S*)/);
      const regexDate = new RegExp(/\s(\d{2}\/\d{2}\/\d{4})/);
      let localTransactions = this.get('model');

      listSMS({address: '85814', maxCount: 9999}).then((transactions) => {

        transactions.forEach((transaction) => {

          var msg = transaction.body;

          if (!localTransactions.isAny('note', msg) && regexAmount.test(msg)){

            let newTransaction = self.store.createRecord('transaction', {
              note: msg,
              date: moment(msg.match(regexDate)[1], "DD/MM/YYYY").toDate(),
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
