import Ember from 'ember';

export default Ember.Component.extend({

  transactionAmounts: Ember.computed.mapBy('groupedTransaction.transactions', 'amount'),
  amountsTotal: Ember.computed.sum('transactionAmounts'),

  date: Ember.computed('groupedTransaction.key',function(){
    return new Date(this.get('groupedTransaction.key'));
  }),

  day: Ember.computed('date',function(){
    return new Date(this.get('date')).getDate();
  }),

  weekday: Ember.computed('date',function(){
    let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return days[new Date(this.get('date')).getDay()];
  }),

  month: Ember.computed('date',function(){
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                  "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return months[new Date(this.get('date')).getMonth()];
  }),

  year: Ember.computed('date',function(){
    return new Date(this.get('date')).getFullYear();
  })
});
