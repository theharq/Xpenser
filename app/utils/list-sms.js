import Ember from 'ember';

export function listSMS(filter){
  return new Ember.RSVP.Promise(function(resolve, reject){
      window.SMS.listSMS(filter, resolve, reject);
  });
}