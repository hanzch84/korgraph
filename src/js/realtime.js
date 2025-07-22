// src/js/realtime.js
import { supabase } from '../../supabase/init.js'

export function subscribeNewWords(handleNew) {
  supabase
    .from('words')
    .on('INSERT', payload => {
      handleNew(payload.new.word)
    })
    .subscribe()
}
