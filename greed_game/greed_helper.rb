# Greed Game Helper Functions

def roll_dice(num_dice)
  dice = []
  num_dice.times do
    dice << rand(1..6)
  end
  puts "Rolled: #{dice.join(', ')}"
  dice
end

def calculate_score(dice)
  # Count occurrences of each die value
  counts = Hash.new(0)
  dice.each { |die| counts[die] += 1 }
  
  score = 0
  scoring_dice = []
  
  # Check for triplets first
  counts.each do |value, count|
    if count >= 3
      case value
      when 1
        score += 1000
      when 6
        score += 600
      when 5
        score += 500
      when 4
        score += 400
      when 3
        score += 300
      when 2
        score += 200
      end
      
      # Mark 3 dice as scoring
      3.times { scoring_dice << value }
      counts[value] -= 3
    end
  end
  
  # Check for individual 1's and 5's
  if counts[1] > 0
    score += counts[1] * 100
    counts[1].times { scoring_dice << 1 }
  end
  
  if counts[5] > 0
    score += counts[5] * 50
    counts[5].times { scoring_dice << 5 }
  end
  
  # Calculate non-scoring dice
  non_scoring_dice = dice - scoring_dice
  
  [score, scoring_dice, non_scoring_dice]
end

def display_scores(players)
  puts "\n=== Current Scores ==="
  players.each do |player|
    status = player.in_game ? "In Game" : "Not In Game"
    puts "#{player.name}: #{player.score} points (#{status})"
  end
  puts "======================"
end
