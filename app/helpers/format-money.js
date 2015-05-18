import Ember from 'ember';

export function formatMoney(value) {
  return `$ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export default Ember.HTMLBars.makeBoundHelper(formatMoney);
