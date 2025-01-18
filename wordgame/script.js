// Binary Search Tree Node
class Node {
    constructor(word, hint) {
      this.word = word;
      this.hint = hint;
      this.left = null;
      this.right = null;
    }
  }
  
  // Binary Search Tree
  class BST {
    constructor() {
      this.root = null;
    }
  
    // Insert a word with a hint
    insert(word, hint) {
      const newNode = new Node(word, hint);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this._insertNode(this.root, newNode);
      }
    }
  
    _insertNode(node, newNode) {
      if (newNode.word < node.word) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          this._insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this._insertNode(node.right, newNode);
        }
      }
    }
  
    // Find a random word
    findRandom() {
      const words = [];
      this._inOrderTraversal(this.root, words);
      return words[Math.floor(Math.random() * words.length)];
    }
  
    _inOrderTraversal(node, words) {
      if (node !== null) {
        this._inOrderTraversal(node.left, words);
        words.push(node);
        this._inOrderTraversal(node.right, words);
      }
    }
  }
  
  // Game logic
  const bst = new BST();
  
  // Add words and hints to the tree
  bst.insert("apple", "A fruit that keeps doctors away.");
  bst.insert("banana", "A yellow fruit monkeys love.");
  bst.insert("chess", "A strategy game played on a checkered board.");
  bst.insert("pencil", "Used for writing and drawing.");
  bst.insert("guitar", "A stringed musical instrument.");
  bst.insert("javascript", "A programming language for the web.");
  bst.insert("pyramid", "A triangular structure built by ancient Egyptians.");
  
  let currentWord;
  let attempts;
  
  // Start a new game
  function startGame() {
    const randomNode = bst.findRandom();
    currentWord = randomNode.word;
    attempts = 3; // Allow 3 guesses
    document.getElementById("hint").innerText = `Hint: ${randomNode.hint}`;
    document.getElementById("message").innerText = "You have 3 attempts!";
    document.getElementById("guess").value = "";
  }
  
  // Submit a guess
  function submitGuess() {
    const userGuess = document.getElementById("guess").value.toLowerCase();
    if (!userGuess) {
      document.getElementById("message").innerText = "Please enter a guess!";
      return;
    }
  
    if (userGuess === currentWord) {
      document.getElementById("message").innerText = "🎉 Correct! You guessed the word!";
    } else {
      attempts--;
      if (attempts > 0) {
        document.getElementById("message").innerText = `Wrong! Try again. Attempts left: ${attempts}`;
      } else {
        document.getElementById("message").innerText = `Game Over! The word was "${currentWord}".`;
      }
    }
    document.getElementById("guess").value = "";
  }
  
  // Initialize the game
  startGame();
  