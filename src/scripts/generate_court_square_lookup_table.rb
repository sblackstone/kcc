require 'json'

ans = []
0.upto(63) do |i|
  ans[i] = [18,19,20,21,26,27,28,29,34,35,36,37,42,43,44,45].include?(i) ? 1 : 0
end

puts ans.to_json
