require 'json'

moves = []

0.upto(63) do |i|
  moves[i] = []
  #i - 1, i + 1, i - 8, i + 8
  moves[i] << i - 1 unless i % 8 == 0
  moves[i] << i + 1 unless i % 8 == 7
  moves[i] << i + 8 unless i / 8.0 >= 7
  moves[i] << i - 8 unless i < 8.0

end


puts moves.to_json

