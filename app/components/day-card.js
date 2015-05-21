import Ember from 'ember';

export default Ember.Component.extend({

  transactionAmounts: Ember.computed.mapBy('groupedTransaction.items', 'amount'),
  amountsTotal: Ember.computed.sum('transactionAmounts'),

  date: Ember.computed(function(){
    return new Date(this.get('groupedTransaction.value'));
  }),

  day: Ember.computed(function(){
    return new Date(this.get('date')).getDate();
  }),

  weekday: Ember.computed(function(){
    let days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    return days[new Date(this.get('date')).getDay()];
  }),

  month: Ember.computed(function(){
    let months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                  "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return months[new Date(this.get('date')).getMonth()];
  }),

  year: Ember.computed(function(){
    return new Date(this.get('date')).getFullYear();
  })
});
