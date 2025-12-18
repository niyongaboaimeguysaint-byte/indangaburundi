import { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, Award, ChevronRight } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: "facile" | "moyen" | "avancé";
}

const questions: Question[] = [
  {
    id: 1,
    question: "Comment s'appellent les célèbres tambours sacrés du Burundi?",
    options: ["Djembé", "Ingoma", "Talking Drum", "Dundun"],
    correct: 1,
    explanation: "Les Ingoma sont les tambours sacrés du Burundi. Les Tambourinaires du Burundi sont inscrits au patrimoine culturel immatériel de l'UNESCO depuis 2014.",
    difficulty: "facile",
  },
  {
    id: 2,
    question: "Que signifie le mot 'Ubuntu' dans la philosophie burundaise?",
    options: ["La force", "Je suis parce que nous sommes", "Le courage", "La sagesse"],
    correct: 1,
    explanation: "Ubuntu signifie 'Je suis parce que nous sommes'. C'est une philosophie africaine qui met l'accent sur l'humanité partagée et l'interconnexion entre les personnes.",
    difficulty: "facile",
  },
  {
    id: 3,
    question: "Quelle danse traditionnelle est exécutée par les guerriers?",
    options: ["Agasimbo", "Intore", "Umuganuro", "Imvyino"],
    correct: 1,
    explanation: "L'Intore est la danse des guerriers burundais. Elle symbolise la bravoure, l'honneur et l'élégance des anciens guerriers royaux.",
    difficulty: "moyen",
  },
  {
    id: 4,
    question: "Quelle est la langue nationale du Burundi?",
    options: ["Swahili", "Français", "Kirundi", "Lingala"],
    correct: 2,
    explanation: "Le Kirundi est la langue nationale du Burundi, parlée par la quasi-totalité de la population. Le français est également une langue officielle.",
    difficulty: "facile",
  },
  {
    id: 5,
    question: "Combien de tambours composent traditionnellement un ensemble d'Ingoma?",
    options: ["3 tambours", "7 tambours", "12 tambours", "25 tambours"],
    correct: 2,
    explanation: "Un ensemble traditionnel d'Ingoma comprend généralement 12 tambours, dont un tambour central (Inkiranya) entouré de tambours accompagnateurs.",
    difficulty: "avancé",
  },
  {
    id: 6,
    question: "Quelle fête traditionnelle célèbre les semailles au Burundi?",
    options: ["Umuganuro", "Kwibuka", "Ubuntu Day", "Harvest Festival"],
    correct: 0,
    explanation: "Umuganuro est la fête traditionnelle des semailles au Burundi. C'est une célébration importante qui marque le début de la saison agricole avec des danses et rituels.",
    difficulty: "moyen",
  },
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "facile": return "bg-green-100 text-green-700";
      case "moyen": return "bg-yellow-100 text-yellow-700";
      case "avancé": return "bg-red-100 text-red-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (quizCompleted) {
    return (
      <section id="quiz" className="section-padding bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            <Award className="w-20 h-20 text-secondary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quiz Terminé!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Votre score: <span className="text-primary font-bold text-2xl">{score}/{questions.length}</span>
            </p>
            <p className="text-muted-foreground mb-8">
              {score === questions.length
                ? "Félicitations! Vous êtes un expert de la culture burundaise!"
                : score >= questions.length / 2
                ? "Bien joué! Continuez à explorer la culture burundaise."
                : "Continuez à apprendre! Notre assistant IA peut vous aider à en savoir plus."}
            </p>
            <button onClick={restartQuiz} className="btn-primary">
              Recommencer le Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section id="quiz" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Quiz Culturel
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Testez vos <span className="text-secondary">connaissances</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez la richesse de la culture burundaise à travers ce quiz interactif.
          </p>
        </div>

        <div className="bg-card rounded-3xl p-6 md:p-10 shadow-lg">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-muted-foreground text-sm">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-8">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              let optionStyle = "bg-muted border-border hover:border-primary/50";
              
              if (showResult) {
                if (index === question.correct) {
                  optionStyle = "bg-green-50 border-green-500 text-green-700";
                } else if (index === selectedAnswer && index !== question.correct) {
                  optionStyle = "bg-red-50 border-red-500 text-red-700";
                }
              } else if (selectedAnswer === index) {
                optionStyle = "bg-primary/10 border-primary";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between ${optionStyle}`}
                >
                  <span>{option}</span>
                  {showResult && index === question.correct && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correct && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className="bg-muted rounded-xl p-6 mb-8 animate-fade-in">
              <p className="text-foreground font-medium mb-2">Explication:</p>
              <p className="text-muted-foreground">{question.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <button
              onClick={handleNextQuestion}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {currentQuestion < questions.length - 1 ? "Question Suivante" : "Voir le Résultat"}
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
