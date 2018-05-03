require 'json'

moves = []

def rank(i)
  i % 8
end

def file(i)
  i / 8
end






0.upto(63) do |i|
  moves[i] = []
  moves[i] << i + 8 unless file(i) > 5 # Down
  moves[i] << i - 8 unless file(i) < 2 # Up
  moves[i] << i - 1  unless rank(i) < 2 # Left
  moves[i] << i + 1  unless rank(i) > 5 # Right
end

#0.upto(63) do |i|
#  puts "%i %s" % [ i, moves[i].to_json ]
#end

puts moves.to_json


