# Greed Dice Game
require_relative 'greed_helper'

class Player
  attr_accessor :name, :score, :in_game
  
  def initialize(name)
    @name = name
    @score = 0
    @in_game = false
  end
end

def player_turn(player)
  puts "\n#{player.name}'s turn"
  puts "Current total score: #{player.score}"
  
  turn_score = 0
  dice_to_roll = 5
  
  loop do
    # Roll dice
    dice = roll_dice(dice_to_roll)
    
    # Calculate score
    roll_score, scoring_dice, non_scoring_dice = calculate_score(dice)
    
    puts "Scoring dice: #{scoring_dice.join(', ')}" unless scoring_dice.empty?
    puts "Non-scoring dice: #{non_scoring_dice.join(', ')}" unless non_scoring_dice.empty?
    puts "Roll score: #{roll_score}"
    
    # Check if roll scored any points
    if roll_score == 0
      puts "No points scored! Turn ends and you lose all accumulated points for this turn."
      return 0
    end
    
    turn_score += roll_score
    puts "Turn total so far: #{turn_score}"
    
    # Check if player gets "in the game"
    if !player.in_game && turn_score >= 300
      player.in_game = true
      puts "#{player.name} is now in the game!"
    end
    
    # Determine dice for next roll
    if non_scoring_dice.empty?
      # All dice scored, can roll all 5 again
      dice_to_roll = 5
      puts "All dice scored! You can roll all 5 dice again."
    else
      # Roll only non-scoring dice
      dice_to_roll = non_scoring_dice.length
      puts "You can roll the #{dice_to_roll} non-scoring dice again."
    end
    
    # Ask if player wants to continue
    puts "Do you want to roll again? (y/n)"
    choice = gets.chomp.downcase
    
    if choice != 'y' && choice != 'yes'
      puts "Banking #{turn_score} points."
      break
    end
  end
  
  turn_score
end

def check_final_round(players)
  players.any? { |player| player.score >= 3000 }
end

def play_game
  print "Enter the number of players: "
  num_players = gets.chomp.to_i
  
  # Create players
  players = []
  num_players.times do |i|
    print "Enter name for player #{i + 1}: "
    name = gets.chomp
    players << Player.new(name)
  end
  
  puts "\nStarting Greed Game!"
  
  
  current_player_index = 0
  final_round = false
  final_round_starter = nil
  
  loop do
    current_player = players[current_player_index]
    
    # Check if we've entered final round
    if !final_round && check_final_round(players)
      final_round = true
      final_round_starter = current_player
      puts "\n🎯 FINAL ROUND! #{current_player.name} has reached 3000+ points!"
      puts "Each other player gets one more turn."
    end
    
    display_scores(players)
    
    # Player's turn
    turn_points = player_turn(current_player)
    
    # Add points only if player is in the game
    if current_player.in_game
      current_player.score += turn_points
      puts "#{current_player.name} banked #{turn_points} points. Total: #{current_player.score}"
    else
      puts "#{current_player.name} is not in the game yet. Points not banked."
    end
    
    # Move to next player
    current_player_index = (current_player_index + 1) % num_players
    
    # Check if final round is complete
    if final_round && current_player_index == players.index(final_round_starter)
      break
    end
  end
  
  # Determine winner
  winner = players.max_by(&:score)
  
  puts "\n GAME OVER! "
  display_scores(players)
  puts "\nWinner: #{winner.name} with #{winner.score} points!"
end

# Start the game
play_game
