const questions = [
  {
    q: "What is HTML?",
    a: ["Programming Language", "Markup Language", "Database", "OS"],
    correct: 1
  },
  {
    q: "CSS is used for?",
    a: ["Logic", "Styling", "Database", "Server"],
    correct: 1
  },
  {
    q: "JavaScript is?",
    a: ["Frontend Language", "Backend Only", "Database", "None"],
    correct: 0
  },
  {
    q: "Which tag is used for JS?",
    a: ["<js>", "<script>", "<code>", "<link>"],
    correct: 1
  },
  {
    q: "Which is not a JS type?",
    a: ["String", "Boolean", "Float", "Undefined"],
    correct: 2
  }
];

let current = 0;
let score = 0;
let username = "";
let answered = false;

// START
function startQuiz() {
  username = document.getElementById("username").value;

  if (!username) {
    alert("Enter your name");
    return;
  }

  // RESET EVERYTHING
  current = 0;
  score = 0;

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");

  showQuestion();
}

// SHOW QUESTION
function showQuestion() {
  answered = false;

  let q = questions[current];
  document.getElementById("question").innerText = q.q;

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach((ans, index) => {
    let btn = document.createElement("button");

    btn.innerText = String.fromCharCode(65 + index) + ". " + ans;

    btn.onclick = () => {
      if (answered) return;

      answered = true;

      let buttons = answersDiv.querySelectorAll("button");

      buttons.forEach((b, i) => {
        b.disabled = true;

        if (i === q.correct) {
          b.style.backgroundColor = "green";
          b.style.color = "white";
        } else if (i === index) {
          b.style.backgroundColor = "red";
          b.style.color = "white";
        }
      });

      if (index === q.correct) {
        score++;
      }
    };

    answersDiv.appendChild(btn);
  });
}

// NEXT
function nextQuestion() {
  if (!answered) {
    alert("Please select an answer!");
    return;
  }

  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// RESULT
function showResult() {
  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");

  document.getElementById("scoreText").innerText =
    username + ", your score: " + score + "/" + questions.length;

  if (score >= 3) {
    document.getElementById("resultText").innerText =
      "✅ Qualified for Contest!";
  } else {
    document.getElementById("resultText").innerText =
      "❌ Not Qualified!";
  }
}

// CONTEST
function showContest() {
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("contestScreen").classList.remove("hidden");

  if (score >= 3) {
    document.getElementById("contestMsg").innerText =
      "You are invited to Weekly Contest!";
    startCountdown();
  } else {
    document.getElementById("contestMsg").innerText =
      "You cannot attend contest.";
  }
}

// COUNTDOWN
function startCountdown() {
  let time = 10;

  let timer = setInterval(() => {
    document.getElementById("countdown").innerText =
      "Contest starts in: " + time + "s";

    time--;

    if (time < 0) clearInterval(timer);
  }, 1000);
}

// RANK
function showRank() {
  document.getElementById("contestScreen").classList.add("hidden");
  document.getElementById("rankScreen").classList.remove("hidden");

  let rank = "";
  let hackathon = "";

  if (score === 5) {
    rank = "🏆 Rank A";
    hackathon = "🎉 Eligible for Hackathon!";
  } else if (score >= 3) {
    rank = "🥈 Rank B";
    hackathon = "⏳ Waitlisted";
  } else {
    rank = "🥉 Rank C";
    hackathon = "📚 Improve skills";
  }

  document.getElementById("rankText").innerText = rank;
  document.getElementById("hackathonText").innerText = hackathon;
}

// RESTART
function restart() {
  location.reload();
}