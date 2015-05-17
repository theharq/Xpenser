import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    smsImport: function(){
      var self = this;

      if(SMS) {

        SMS.listSMS({address: '85814', maxCount: 9999}, function(data){

          data.forEach(function(transaction){

            if (/^Bancolombia le informa/.test(transaction.body)){
              self.store.createRecord('transaction', {
                note: transaction.body,
                date: transaction.body.match(/\s(\d{2}\/\d{2}\/\d{4})/)[1],
                originalAmount: transaction.body.match(/\$([0-9]+\S*)/)[1],
                categoryImage: "ember.png",
                category: "Otros"
              });
            }
          });

        }, function(err){
          alert('error list sms: ' + err);
        });
      }

      return false;
    }
  }
});
