// VitaHue Health & Wellness Platform JavaScript

// Global VitaHue State
window.vitaHueState = {
    currentSection: 'overview',
    userProfile: null,
    healthGoals: [],
    appointments: [],
    medications: []
};

// Initialize VitaHue when loaded
function initializeVitaHue() {
    console.log('VitaHue Health Platform Initialized');
    
    // Add smooth scroll behavior to navigation
    addNavigationListeners();
    
    // Initialize interactive elements
    initializeInteractiveElements();
    
    // Load user preferences if available
    loadUserPreferences();
    
    // Start health tips rotation
    startHealthTipsRotation();
}

// Navigation Functions
function addNavigationListeners() {
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToVitaHueSection(targetId);
            updateActiveNavigation(this);
        });
    });
}

function scrollToVitaHueSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        window.vitaHueState.currentSection = sectionId;
    }
}

function updateActiveNavigation(activeElement) {
    document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    activeElement.classList.add('active');
}

// Interactive Elements
function initializeInteractiveElements() {
    // Health Assessment Quiz
    initializeHealthQuiz();
    
    // BMI Calculator
    initializeBMICalculator();
    
    // Medication Reminders
    initializeMedicationTracker();
    
    // Goal Setting
    initializeGoalSetting();
}

// Health Assessment Quiz
function initializeHealthQuiz() {
    window.startHealthAssessment = function() {
        const quizData = [
            {
                question: "How would you rate your overall health?",
                options: ["Excellent", "Good", "Fair", "Poor"],
                category: "general"
            },
            {
                question: "How many days per week do you exercise?",
                options: ["0-1 days", "2-3 days", "4-5 days", "6-7 days"],
                category: "fitness"
            },
            {
                question: "How many hours of sleep do you get per night?",
                options: ["Less than 6", "6-7 hours", "7-8 hours", "More than 8"],
                category: "sleep"
            },
            {
                question: "How would you describe your stress level?",
                options: ["Very low", "Low", "Moderate", "High"],
                category: "mental"
            }
        ];
        
        showQuizModal(quizData);
    };
}

function showQuizModal(questions) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-green-700">Health Assessment</h3>
                <button onclick="closeQuizModal()" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="quiz-content">
                <!-- Quiz questions will be populated here -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    populateQuiz(questions);
    
    window.closeQuizModal = function() {
        document.body.removeChild(modal);
    };
}

function populateQuiz(questions) {
    const content = document.getElementById('quiz-content');
    let currentQuestion = 0;
    let answers = [];
    
    function showQuestion(index) {
        if (index >= questions.length) {
            showQuizResults(answers);
            return;
        }
        
        const question = questions[index];
        content.innerHTML = `
            <div class="mb-4">
                <p class="font-semibold mb-3">${index + 1}. ${question.question}</p>
                <div class="space-y-2">
                    ${question.options.map((option, optionIndex) => `
                        <label class="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <input type="radio" name="question-${index}" value="${optionIndex}" class="mr-3">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="flex justify-between mt-4">
                    ${index > 0 ? `<button onclick="previousQuestion()" class="px-4 py-2 text-green-700 hover:bg-green-50 rounded">Previous</button>` : '<div></div>'}
                    <button onclick="nextQuestion()" class="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">
                        ${index === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        `;
    }
    
    window.nextQuestion = function() {
        const selected = document.querySelector(`input[name="question-${currentQuestion}"]:checked`);
        if (selected) {
            answers[currentQuestion] = parseInt(selected.value);
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            alert('Please select an answer before continuing.');
        }
    };
    
    window.previousQuestion = function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    };
    
    showQuestion(0);
}

function showQuizResults(answers) {
    const avgScore = answers.reduce((sum, score) => sum + score, 0) / answers.length;
    let healthStatus, recommendations;
    
    if (avgScore <= 1) {
        healthStatus = "Excellent Health";
        recommendations = ["Maintain your current healthy lifestyle", "Continue regular exercise", "Keep up good sleep habits"];
    } else if (avgScore <= 2) {
        healthStatus = "Good Health";
        recommendations = ["Consider increasing physical activity", "Focus on stress management", "Maintain regular health check-ups"];
    } else if (avgScore <= 3) {
        healthStatus = "Fair Health";
        recommendations = ["Consult with healthcare provider", "Develop an exercise routine", "Improve sleep quality"];
    } else {
        healthStatus = "Needs Attention";
        recommendations = ["Schedule health consultation", "Create wellness plan", "Consider lifestyle changes"];
    }
    
    document.getElementById('quiz-content').innerHTML = `
        <div class="text-center">
            <i class="fas fa-chart-line text-4xl text-green-700 mb-4"></i>
            <h4 class="text-lg font-bold mb-2">${healthStatus}</h4>
            <div class="bg-gray-50 p-4 rounded mb-4">
                <h5 class="font-semibold mb-2">Recommendations:</h5>
                <ul class="text-left space-y-1">
                    ${recommendations.map(rec => `<li>• ${rec}</li>`).join('')}
                </ul>
            </div>
            <button onclick="closeQuizModal()" class="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
                Close
            </button>
        </div>
    `;
}

// BMI Calculator
function initializeBMICalculator() {
    window.calculateBMI = function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        
        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height values.');
            return;
        }
        
        // Convert height from inches to meters
        const heightInMeters = height * 0.0254;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        let category, color, advice;
        if (bmi < 18.5) {
            category = "Underweight";
            color = "text-blue-600";
            advice = "Consider consulting with a healthcare provider about healthy weight gain strategies.";
        } else if (bmi < 25) {
            category = "Normal weight";
            color = "text-green-600";
            advice = "Great! Maintain your current healthy lifestyle.";
        } else if (bmi < 30) {
            category = "Overweight";
            color = "text-yellow-600";
            advice = "Consider adopting a balanced diet and regular exercise routine.";
        } else {
            category = "Obese";
            color = "text-red-600";
            advice = "Consider consulting with a healthcare provider for a personalized wellness plan.";
        }
        
        document.getElementById('bmi-result').innerHTML = `
            <div class="bg-gray-50 p-4 rounded mt-4">
                <h4 class="font-bold ${color}">BMI: ${bmi.toFixed(1)}</h4>
                <p class="font-semibold">Category: ${category}</p>
                <p class="mt-2 text-sm">${advice}</p>
            </div>
        `;
    };
}

// Medication Tracker
function initializeMedicationTracker() {
    window.addMedication = function() {
        const name = document.getElementById('med-name').value;
        const time = document.getElementById('med-time').value;
        const frequency = document.getElementById('med-frequency').value;
        
        if (!name || !time || !frequency) {
            alert('Please fill in all medication details.');
            return;
        }
        
        const medication = {
            id: Date.now(),
            name: name,
            time: time,
            frequency: frequency,
            taken: false
        };
        
        window.vitaHueState.medications.push(medication);
        displayMedications();
        clearMedicationForm();
    };
    
    window.removeMedication = function(id) {
        window.vitaHueState.medications = window.vitaHueState.medications.filter(med => med.id !== id);
        displayMedications();
    };
    
    window.toggleMedication = function(id) {
        const med = window.vitaHueState.medications.find(med => med.id === id);
        if (med) {
            med.taken = !med.taken;
            displayMedications();
        }
    };
}

function displayMedications() {
    const container = document.getElementById('medication-list');
    if (!container) return;
    
    if (window.vitaHueState.medications.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">No medications added yet.</p>';
        return;
    }
    
    container.innerHTML = window.vitaHueState.medications.map(med => `
        <div class="flex items-center justify-between bg-gray-50 p-3 rounded ${med.taken ? 'opacity-50' : ''}">
            <div class="flex-1">
                <span class="font-semibold ${med.taken ? 'line-through' : ''}">${med.name}</span>
                <div class="text-sm text-gray-600">${med.time} - ${med.frequency}</div>
            </div>
            <div class="flex space-x-2">
                <button onclick="toggleMedication(${med.id})" class="text-green-600 hover:text-green-800">
                    <i class="fas fa-${med.taken ? 'undo' : 'check'}"></i>
                </button>
                <button onclick="removeMedication(${med.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function clearMedicationForm() {
    document.getElementById('med-name').value = '';
    document.getElementById('med-time').value = '';
    document.getElementById('med-frequency').value = 'daily';
}

// Goal Setting
function initializeGoalSetting() {
    window.addHealthGoal = function() {
        const goal = document.getElementById('health-goal').value;
        const target = document.getElementById('goal-target').value;
        
        if (!goal || !target) {
            alert('Please enter both goal and target.');
            return;
        }
        
        const newGoal = {
            id: Date.now(),
            goal: goal,
            target: target,
            progress: 0,
            completed: false
        };
        
        window.vitaHueState.healthGoals.push(newGoal);
        displayHealthGoals();
        clearGoalForm();
    };
    
    window.updateGoalProgress = function(id, progress) {
        const goal = window.vitaHueState.healthGoals.find(g => g.id === id);
        if (goal) {
            goal.progress = Math.min(100, Math.max(0, progress));
            goal.completed = goal.progress >= 100;
            displayHealthGoals();
        }
    };
    
    window.removeGoal = function(id) {
        window.vitaHueState.healthGoals = window.vitaHueState.healthGoals.filter(g => g.id !== id);
        displayHealthGoals();
    };
}

function displayHealthGoals() {
    const container = document.getElementById('goals-list');
    if (!container) return;
    
    if (window.vitaHueState.healthGoals.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center">No health goals set yet.</p>';
        return;
    }
    
    container.innerHTML = window.vitaHueState.healthGoals.map(goal => `
        <div class="bg-gray-50 p-4 rounded ${goal.completed ? 'border-l-4 border-green-500' : ''}">
            <div class="flex justify-between items-start mb-2">
                <h5 class="font-semibold ${goal.completed ? 'text-green-700' : ''}">${goal.goal}</h5>
                <button onclick="removeGoal(${goal.id})" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash text-sm"></i>
                </button>
            </div>
            <p class="text-sm text-gray-600 mb-2">Target: ${goal.target}</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div class="bg-green-600 h-2 rounded-full transition-all" style="width: ${goal.progress}%"></div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm ${goal.completed ? 'text-green-700 font-semibold' : 'text-gray-600'}">
                    ${goal.progress}% ${goal.completed ? 'Completed!' : 'Progress'}
                </span>
                ${!goal.completed ? `
                    <input type="range" min="0" max="100" value="${goal.progress}" 
                           onchange="updateGoalProgress(${goal.id}, this.value)" 
                           class="w-20 ml-2">
                ` : ''}
            </div>
        </div>
    `).join('');
}

function clearGoalForm() {
    document.getElementById('health-goal').value = '';
    document.getElementById('goal-target').value = '';
}

// Health Tips Rotation
function startHealthTipsRotation() {
    const tips = [
        "Drink 8 glasses of water daily for optimal hydration.",
        "Aim for 30 minutes of physical activity most days of the week.",
        "Get 7-9 hours of quality sleep each night.",
        "Practice deep breathing for 5 minutes daily to reduce stress.",
        "Include colorful fruits and vegetables in every meal.",
        "Take regular breaks from screen time to rest your eyes.",
        "Practice gratitude by writing down 3 things you're thankful for daily.",
        "Wash your hands frequently to prevent illness."
    ];
    
    let currentTipIndex = 0;
    const tipElement = document.getElementById('rotating-tip');
    
    if (tipElement) {
        function updateTip() {
            tipElement.style.opacity = '0';
            setTimeout(() => {
                tipElement.textContent = tips[currentTipIndex];
                tipElement.style.opacity = '1';
                currentTipIndex = (currentTipIndex + 1) % tips.length;
            }, 300);
        }
        
        updateTip(); // Show first tip immediately
        setInterval(updateTip, 5000); // Rotate every 5 seconds
    }
}

// User Preferences
function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('vitahue-preferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            window.vitaHueState = { ...window.vitaHueState, ...preferences };
            
            // Restore medications and goals
            if (window.vitaHueState.medications) {
                displayMedications();
            }
            if (window.vitaHueState.healthGoals) {
                displayHealthGoals();
            }
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
    }
}

function saveUserPreferences() {
    try {
        localStorage.setItem('vitahue-preferences', JSON.stringify({
            medications: window.vitaHueState.medications,
            healthGoals: window.vitaHueState.healthGoals
        }));
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

// Auto-save preferences
setInterval(saveUserPreferences, 30000); // Save every 30 seconds

// Emergency Contact Function
window.callEmergency = function() {
    if (confirm('This will attempt to call emergency services (911). Continue?')) {
        window.location.href = 'tel:911';
    }
};

// Initialize when DOM is ready (called from main loadVitaHue function)
window.initializeVitaHue = initializeVitaHue;